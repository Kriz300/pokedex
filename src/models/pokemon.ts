//Structure that stores the state of the pokedex
export interface PokemonPage {
    results: { name: string }[]
}

//Structure that stores information of pokemons
export interface Pokemon {
    id: number,
    name: string | "",
    weight: number,
    height: number,
    types: {
        type: {
            name:string,
        }
    }[],
    sprites: {
        other: {
            "official-artwork": {
                front_default: string
            }
        }
    }
}