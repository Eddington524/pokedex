import axios from 'axios';

export const POKE_API = 'https://pokeapi.co/api/v2/pokemon';

export const getPokemonData = async (signal: AbortSignal, offset: number) => {
	const response = await axios.get(POKE_API, {
		params: { limit: 20, offset: offset },
	});
	return response.data;
};
