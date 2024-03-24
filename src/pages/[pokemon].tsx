//Basic imports
import { useRouter } from "next/router";
import { Spinner, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

//Components import
import { getPokemon, getPokemonPage } from "@/consume/pokeAPI";
import { Pokemon } from "@/models/pokemon";


//PokemonDetailsPage
export default function PokemonDetailsPage(){
    const router = useRouter();
    const [pokemon_prev, setPokemonPrev] = useState<Pokemon | null>(null);
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [pokemon_next, setPokemonNext] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Lod Data form previous, current, and next pokemon
    useEffect(() => {
        const fetchPokemon = async () => {
            const pokemon = router.query.pokemon?.toString() || "";
            try {
                setIsLoading(true);
                //Data of current pokemon
                const data_current = await getPokemon(pokemon);
                setPokemon(data_current);
                var data;

                //Edge error handling 1
                if(data_current.id == 1){
                    data = await getPokemon("1025");
                    setPokemonPrev(data);
                    data = await getPokemon("2");
                    setPokemonNext(data);
                }
                //Edge error handling 2
                else if(data_current.id == 1025){
                    data = await getPokemon("1024");
                    setPokemonPrev(data);
                    data = await getPokemon("1");
                    setPokemonNext(data);
                }
                //Common case
                else {
                    data = await getPokemon((data_current.id - 1).toString());
                    setPokemonPrev(data);
                    data = await getPokemon((data_current.id + 1).toString());
                    setPokemonNext(data)
                }
                setIsLoading(false);
            } catch (error) {
                setPokemon(null);
                setIsLoading(false);
            }
        };

        if (router.query.pokemon) {
            fetchPokemon();
        }
    }, [router.query.pokemon]);

    //Loading...
    if (isLoading) {
        return(
            <div className="d-flex flex-column align-items-center">
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    //404 not finished
    if (!isLoading && pokemon === null) {
        return(
            <div className="grid-container d-flex flex-column align-items-center">
                <p>Pokemon no encontrado</p>
            </div>
        );
    }

    return(
        <>
        <Head>
            {pokemon && <title className="capitalize">{`${pokemon.name.toUpperCase()}`}</title>}
            <link rel="icon" href="/Poke.png" />
        </Head>

        <div className="d-flex flex-column align-items-center background-container">
            <div className="grid-container">
                <center>
                <Link href={`/`} className="none"><h1>Pokédex</h1></Link>
                <div className="py-4">
                {pokemon_prev && pokemon_next &&
                    <>
                    <Link href={pokemon_prev.name}><Button variant="secondary" className="capitalize">{"N.° " + pokemon_prev.id + " " + pokemon_prev.name}</Button></Link>
                    <Link href={pokemon_next.name}><Button variant="secondary" className="capitalize">{pokemon_next.name + " " + "N.° " + pokemon_next.id}</Button></Link>
                    </>
                }
                </div>
                {pokemon && 
                    <>
                    <h1 className="text-center text-capitalize">{pokemon.name + " N.° " + pokemon.id}</h1>
                    <Image
                        src={pokemon.sprites.other["official-artwork"].front_default}
                        alt={"Pokemon: " + pokemon.name}
                        width={400}
                        height={400}
                    />
                    <div>
                        <div>
                            <strong>Types:</strong>
                            {pokemon.types.map(type => (
                                <Button key={type.type.name} variant="secondary" className={"capitalize " + type.type.name}>{type.type.name}</Button>
                            ))}
                        </div>
                        <div><strong>Height:</strong>{pokemon.height / 10} m</div>
                        <div><strong>Weight:</strong>{pokemon.weight / 10} kg</div>
                    </div>
                    </>
                }
                </center>
            </div>
        </div>
        </>
    );
}