//Basic Imports
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Spinner, Button, Row, Col } from "react-bootstrap";

//Components
import PokemonCard from "@/components/pokemonCard";
import SearchBar from "@/components/searchBar";
import { Pokemon, PokemonPage } from "@/models/pokemon";
import { getPokemon, getPokemonPage } from "@/consume/pokeAPI";

export default function Home() {
    const [pokemonPage, setPokemonPage] = useState<PokemonPage | null>(null);
    const [page, setPage] = useState<number>(0);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSearched, setSearched] = useState<boolean>(false); //If pokemon is searched the grid of pokemon is "hidden"

    //Load dato of searched and random pokemon
    const handleSearch = async (searchTerm: string) => {
        if(searchTerm === "Random"){
            searchTerm = (Math.floor(Math.random() * 1025) + 1).toString();
        }
        try{
            setIsLoading(true);
            const data = await getPokemon(searchTerm);
            setPokemon(data);
            setSearched(true);
            setIsLoading(false);
        } catch(error) {
            alert(error);
            setIsLoading(false);
            setSearched(false);
        }
    };

    //Load data of a page or pages of pokemons
    useEffect(() => {
        const fetchPokemonPage = async () => {
            try {
                setIsLoading(true);
                const data = await getPokemonPage(page);
                setPokemonPage(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        if (!page) {
            //The localstorage is to avoid losing number of page whe click on a specific pokemon
            //Change for cache management libraries and do it better
            let temp: string | null = localStorage.getItem('current_page');
            if (temp == null){
                localStorage.setItem('current_page', "1");
                setPage(1);
            } else {
                setPage(parseInt(temp)+1);
            }
            fetchPokemonPage();
        } else {
            fetchPokemonPage();
        }
    }, [page]);

    //Loading...
    if (isLoading) {
        return(
            <div className="d-flex flex-column align-items-center">
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    return (
        <>
        <Head>
            <title>Pokédex</title>
            <meta name="description" content="Pokédex by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/Poke.png" />
        </Head>

        <div className="background-container">
            <center>
            <div className="grid-container">
                <Link href="/" className="none"><h1>Pokédex</h1></Link>
            </div>
            </center>
            <div className="filter-container">
                <center>
                <SearchBar onSearch={handleSearch} />
                </center>
            </div>
            <center>
            <div className="grid-container">
                <div className="py-4 d-flex justify-content-center">
                    <Button style={{ fontSize: '1.75em', padding: '10px 20px' }} onClick={() => handleSearch("Random")}>¡Sorprendeme!</Button>
                </div>
                <Row sm={4}>
                    {pokemon && pokemonPage && isSearched ? (
                        <Col key={pokemon?.name}>
                            <PokemonCard name={pokemon?.name} />
                        </Col>
                    ) : (
                        pokemonPage?.results.map(pokemonCard => (
                            <Col key={pokemonCard.name}>
                                <PokemonCard name={pokemonCard.name} />
                            </Col>
                        ))
                    )
                    }
                </Row>
            </div>
            </center>
            <div className="py-4 d-flex justify-content-center gap-2 mt-4">
                {isSearched ? 
                (
                    <Button onClick={() => {setSearched(false); setPage(1); localStorage.setItem('current_page', "1")}}>Lista de Pokémones</Button>
                ) : (
                    <Button onClick={() => {setPage(page+1); localStorage.setItem('current_page', page.toString());}}>Cargar más Pokémones!</Button>
                )}
            </div>
        </div>
        </>
    );
}
