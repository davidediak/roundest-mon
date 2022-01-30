import {inferQueryResponse} from '@/pages/api/trpc/[trpc]';
import {getOptionsForVote} from '@/utils/getRandomPokemon';
import {trpc} from '@/utils/trpc';
import type {NextPage} from 'next';
import {useState} from 'react';
import Image from 'next/image';

const btn =
    'inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';

const Home: NextPage = () => {
    const [[firstId, secondId], updateIds] = useState(() => getOptionsForVote());
    const firstPokemon = trpc.useQuery(['get-pokemon-by-id', {id: firstId}]);
    const secondPokemon = trpc.useQuery(['get-pokemon-by-id', {id: secondId}]);

    const voteMutation = trpc.useMutation(['cast-vote']);

    if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

    const voteForRoundest = (selected: number) => {
        if (selected === firstId) {
            voteMutation.mutate({votedFor: firstId, votedAgainst: secondId});
        }
        updateIds(getOptionsForVote());
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
            <div className="p-2"></div>
            <div className="border rounded p-8 flex justify-between">
                {!firstPokemon.isLoading && !secondPokemon.isLoading && (
                    <>
                        <PokemonListing
                            pokemon={firstPokemon.data as any}
                            vote={() => voteForRoundest(firstId)}
                        />
                        <div className="p-8">VS</div>
                        <PokemonListing
                            pokemon={secondPokemon.data as any}
                            vote={() => voteForRoundest(secondId)}
                        />
                    </>
                )}

                <div className="p-2"></div>
            </div>
        </div>
    );
};

type PokemonFromServer = inferQueryResponse<'get-pokemon-by-id'>;

const PokemonListing: React.FC<{
    pokemon: PokemonFromServer;
    vote: () => void;
}> = (props) => {
    return (
        <div className={` flex flex-col items-center transition-opacity`}>
            <div className="text-xl text-center capitalize mt-[-0.5rem]">{props.pokemon.name}</div>
            <Image
                src={props.pokemon.sprites.front_default ?? ''}
                width={256}
                height={256}
                layout="fixed"
            />
            <button className={btn} onClick={() => props.vote()}>
                Rounder
            </button>
        </div>
    );
};

export default Home;
