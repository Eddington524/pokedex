import { atom } from 'recoil';
import { PokemonDetailInfo } from '../hooks/usePokeDetail';

export interface IPokeInfo {
	id: number;
	name: string;
	weight: number;
	height: number;
	abilities: Ability[];
	types: PokeType[];
}

export type PokeType = {
	slot: number;
	type: {
		name: string;
		url: string;
	};
};

export type Ability = {
	ability: {
		name: string;
		url: string;
	};
	is_hidden: boolean;
	slot: number;
};

export type Chain = {
	evolution_details: [];
	evolves_to: Chain[];
	is_baby: boolean;
	species: Species;
};

type Species = {
	name: string;
	url: string;
};

export const pokemonInfoState = atom<IPokeInfo>({
	key: 'pokemon',

	default: { id: 0, name: '', weight: 0, height: 0, abilities: [], types: [] },
});

export const pokemonEvolutionChainState = atom<Chain>({
	key: 'evolutionState',
	default: {
		evolution_details: [],
		evolves_to: [],
		is_baby: false,
		species: {
			name: '',
			url: '',
		},
	},
});

export const pokemonDetailInfoState = atom<PokemonDetailInfo>({
	key: 'pokemonDetailState',
	default: {
		id: 0,
		name: '',
		weight: 0,
		height: 0,
		abilities: [],
		types: [],
		evolutionChain: {
			evolution_details: [],
			evolves_to: [],
			is_baby: false,
			species: {
				name: '',
				url: '',
			},
		},
	},
});

export const pokemonSearchNumState = atom<string>({
	key: 'pokemonSearchNumState',

	default: '',
});
