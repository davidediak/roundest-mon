import { getOptionsForVote } from '@/utils/getRandomPokemon';
import {trpc} from '@/utils/trpc';
import type {NextPage} from 'next';

const Home: NextPage = () => {
    const [first, second] = getOptionsForVote();

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <div className="text-2xl text-center">Which Pokemon is Rounder?</div>
            <div className="p-2"></div>
            <div className="border rounded p-8 flex justify-between">
                <div className="w-16 h-16 ">{first}</div>
                <div className="p-8">VS</div>
                <div className="w-16 h-16 ">{second}</div>
            </div>
        </div>
    );
};

export default Home;
