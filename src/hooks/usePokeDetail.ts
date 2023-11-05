import { useState, useEffect } from 'react';
import {
	getEvolutionData,
	getPokemonDetailData,
	getSpeciesData,
} from '../api/index';
import { Error } from '../types';
import { useRecoilState } from 'recoil';
import {
	Ability,
	Chain,
	IPokeInfo,
	PokeType,
	pokemonDetailInfoState,
} from '../recoil/pokemon';

export type GetPokemonDetailResponse = {
	id: number;
	name: string;
	weight: number;
	height: number;
	abilities: Ability[];
	types: PokeType[];
};

export type GetSpeciesDataResponse = {
	evolution_chain: {
		url: string;
	};
	name: string;
};

export type PokemonDetailInfo = IPokeInfo & {
	evolutionChain: Chain;
};

export const usePokeDetail = (name: string) => {
	const [results, setResults] = useRecoilState<PokemonDetailInfo>(
		pokemonDetailInfoState
	);
	// const [evolutionResults, setEvolutionResults] = useRecoilState<Pokem>();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<Error>({ message: '' });

	const callDetailApi = async () => {
		setIsLoading(true);

		try {
			const res1: GetPokemonDetailResponse = await getPokemonDetailData(name);

			const res2: string = await getSpeciesData(res1.id.toString());

			const arr: string[] = res2.split('/');
			const chainNum = arr[arr.length - 2];

			const res3: Chain = await getEvolutionData(chainNum);

			setResults({
				id: res1.id,
				name: res1.name,
				weight: res1.weight,
				height: res1.height,
				abilities: res1.abilities,
				types: res1.types,
				evolutionChain: res3,
			});
		} catch (e: any) {
			setIsError(true);
			setError({ message: e.message ?? '' });
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		setError({ message: '' });

		const controller = new AbortController();

		/// 1. 포켓몬 이름으로 api 호출.
		/// 2. 1의 결과에 species api 호출.
		/// 3. 2의 결과에서 진화체인 api 호출.
		/// 4. 1,2,3 결과를 포켓몬 상세 정보에 넣음.

		/// API call..
		callDetailApi();

		return () => controller.abort();
	}, [setResults]);

	return { isLoading, results, isError, error };
};
