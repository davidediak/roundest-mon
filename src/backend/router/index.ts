import * as trpc from '@trpc/server';
import {PokemonClient} from 'pokenode-ts';
import {z} from 'zod';

export const appRouter = trpc.router().query('get-pokemon-by-id', {
    input: z.object({
        id: z.number(),
    }),
    resolve({input}) {
        const api = new PokemonClient();

        const pokemon = api.getPokemonById(input.id);
        return pokemon;
    },
});

// export type definition of API
export type AppRouter = typeof appRouter;
