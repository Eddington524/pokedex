import axios from 'axios';

export const POKE_API = 'https://pokeapi.co/api/v2/pokemon';

const axiosInstance = axios.create({
	baseURL: 'https://pokeapi.co/api/v2',
});

export const getPokemonListData = async (
	signal: AbortSignal,
	offset: number
) => {
	const response = await axiosInstance.get('/pokemon', {
		params: { limit: 20, offset: offset },
	});
	return response.data;
};

export const getPokemonDetailData = async (pokemonName: string) => {
	const response = await axiosInstance.get(`/pokemon/${pokemonName}`);
	return response.data;
};

export const getSpeciesData = async (speciesNum: string) => {
	const response = await axiosInstance.get(`/pokemon-species/${speciesNum}`);

	return response.data.evolution_chain.url;
};

export const getEvolutionData = async (evChainNum: string) => {
	const response = await axiosInstance.get(`/evolution-chain/${evChainNum}`);
	return response.data.chain;
};
