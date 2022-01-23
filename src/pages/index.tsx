import {getOptionsForVote} from '@/utils/getRandomPokemon';
import {trpc} from '@/utils/trpc';
import type {NextPage} from 'next';
import {useMemo, useState} from 'react';

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
    const [[firstId, secondId], updateIds] = useState(() => getOptionsForVote());
    const firstPokemon = trpc.useQuery(['get-pokemon-by-id', {id: firstId}]);
    const secondPokemon = trpc.useQuery(['get-pokemon-by-id', {id: secondId}]);

    if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

    const voteForRoundest = (selected: number) => {
        updateIds(getOptionsForVote());
    };

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
            <div className="p-2"></div>
            <div className="border rounded p-8 flex justify-between">
                <div className="w-64 h-64 flex flex-col items-center">
                    <img
                        src={firstPokemon.data?.sprites.front_default ?? undefined}
                        className="w-full"
                    />
                    <div className="text-xl text-center capitalize mt-[-2rem]">
                        {firstPokemon.data?.name}
                    </div>
                    <button type="button" className={btn} onClick={() => voteForRoundest(firstId)}>
                        Rounder
                    </button>
                </div>
                <div className="p-8">VS</div>
                <div className="w-64 h-64 flex flex-col items-center">
                    <img
                        src={secondPokemon.data?.sprites.front_default ?? undefined}
                        className="w-full"
                    />
                    <div className="text-xl text-center capitalize mt-[-2rem]">
                        {secondPokemon.data?.name}
                    </div>
                    <button type="button" className={btn} onClick={() => voteForRoundest(secondId)}>
                        Rounder
                    </button>
                </div>
                <div className="p-2"></div>
            </div>
        </div>
    );
};

export default Home;
