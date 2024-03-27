//Basic imports
import Link from "next/link";
import Image from "next/image";
import { Spinner, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

//Components import
import { getPokemon } from "@/consume/pokeAPI";
import { Pokemon } from "@/models/pokemon";
import styles from "@/styles/PokemonCard.module.css";

//Create and export card component of a pokemon
export default function PokemonCard({name} : {name: string}) {
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //Load data from a pokemong using axios
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                setIsLoading(true);
                const data = await getPokemon(name);
                setPokemon(data);
                setIsLoading(false);
            } catch (error) {
                setPokemon(null);
                setIsLoading(false);
            }
        };
        if (name) {
            fetchPokemon();
        }
    }, [name]);

    //Loading...
    if (isLoading) {
        return(
            <div className="d-flex flex-column align-items-center">
                <Spinner animation="border" variant="primary"/>
            </div>
        );
    }

    return(
        <>
        <div className={styles.entry}>
            {pokemon &&
            <div>
                <div className={styles.card}>
                    <Link href={"/" + name}>
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={"Pokemon: " + pokemon.name}
                            width={200}
                            height={200}
                        />
                    </Link>
                </div>
                <div className="py-2" style={{alignContent: 'left'}}>
                    <figcaption style={{color: 'grey', textAlign: 'left'}}>{"N.° " + (pokemon.id).toString().padStart(4, "0")}</figcaption>
                    <div style={{textAlign: 'left'}}>
                        <p className="text-capitalize" style={{fontSize:'30px', fontWeight:'500', marginBottom:'0'}}>{pokemon.name}</p>
                        {pokemon.types.map((type, index) => (
                            <Button key={index} variant="secondary" size="sm" className={"capitalize " + type.type.name} style={{marginRight:'5px', paddingLeft:'30px', paddingRight:'30px',}}>{type.type.name}</Button>
                        ))}
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    );
}