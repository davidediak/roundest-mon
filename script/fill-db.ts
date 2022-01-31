import {MAX_POKEMON} from '../src/utils/getRandomPokemon';
import {NamedAPIResource, PokemonClient} from 'pokenode-ts';

import {prisma} from '../src/backend/utils/prisma';

const doBackfill = async () => {
    const pokeApi = new PokemonClient();

    const allPokemon = await pokeApi.listPokemons(0, MAX_POKEMON);

    const formattedPokemon = allPokemon.results.map((p, index) => ({
        id: index + 1,
        name: (p as NamedAPIResource).name,
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
        }.png`,
    }));

    await prisma.pokemon.createMany({
        data: formattedPokemon,
    });
};

doBackfill();
