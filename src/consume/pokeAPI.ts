//Components Imports
import { Pokemon, PokemonPage } from "@/models/pokemon";
import pokeapi from "@/config/pokeAxios";

//Send a request for specific pokemon by name or id
//Need handle errors
export async function getPokemon(search: string | number){
    //await new Promise(r => setTimeout(r, 10000));// -> Delay para ver el spinner

    const response = await pokeapi.get<Pokemon>("/pokemon/" + search);
    return response.data;
}

//Send a request for various pokemons in function of "current page"
export async function getPokemonPage(currentPage: number){
    const pageSize = 12;
    const response = await pokeapi.get<PokemonPage>(`/pokemon?limit=${pageSize*currentPage}&offset=${0}`);
    return response.data;
}