export const MAX_POKEMON = 493;

export const getRandomPokemon = (notThisOne?: number): number => {
    const pokedexNumber = Math.floor(Math.random() * MAX_POKEMON) +1;

    if (pokedexNumber !== notThisOne) return pokedexNumber;
    return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
    const firstId = getRandomPokemon();
    const secondId = getRandomPokemon(firstId);

    return [firstId, secondId];
};
