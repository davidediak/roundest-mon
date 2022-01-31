import {AsyncReturnType} from '@/utils/utility-types';
import {GetStaticProps} from 'next';
import Image from 'next/image';
import {prisma} from '@/backend/utils/prisma';

const getPokemonOrdered = async () => {
    return await prisma.pokemon.findMany({
        orderBy: {
            VoteFor: {_count: 'desc'},
        },
        select: {
            id: true,
            name: true,
            spriteUrl: true,
            _count: {
                select: {
                    VoteFor: true,
                    VoteAgainst: true,
                },
            },
        },
    });
};

const PokemonListing: React.FC<{pokemon: AsyncReturnType<typeof getPokemonOrdered>[number]}> = (
    props
) => {
    return (
        <div className="flex border-b p-2 items-center">
            <Image src={props.pokemon.spriteUrl} width={64} height={64} layout="fixed" />
            <div className="capitalize">{props.pokemon.name}</div>
        </div>
    );
};

export const ResultsPage: React.FC<{pokemon: AsyncReturnType<typeof getPokemonOrdered>}> = (
    props
) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl p-4">Results</h2>
            <div className="flex flex-col w-full max-w-2xl border">
                {props.pokemon?.map((currentPokemon, index) => {
                    return <PokemonListing pokemon={currentPokemon} key={index} />;
                })}
            </div>
        </div>
    );
};

export default ResultsPage;

export const getStaticProps: GetStaticProps = async () => {
    const pokemonOrdered = await getPokemonOrdered();
    return {props: {pokemon: pokemonOrdered}, revalidate: 60};
};
