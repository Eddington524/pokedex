import { useState, useEffect } from 'react';
import { getPokemonSearchData } from '../api/index';
import { Error } from '../types';
import { useRecoilValue } from 'recoil';
import { pokemonSearchNumState } from '../recoil/pokemon';

export type GetPokemonsResponse = {
	count: number;
	next: string | null;
	previous: string | null;
	results: Pokemon[];
};

export type Pokemon = {
	name: string;
	url: string;
};

export const usePokeSearch = () => {
	const searchPokeNum = useRecoilValue(pokemonSearchNumState);
	const [results, setResults] = useState<Pokemon>();
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<Error>({ message: '' });
	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		setError({ message: '' });

		const controller = new AbortController();
		const { signal } = controller;

		getPokemonSearchData(signal, searchPokeNum)
			.then((data: Pokemon) => {
				setResults(data);
				setIsLoading(false);
			})
			.catch((e) => {
				setIsLoading(false);
				if (signal.aborted) return;
				setIsError(true);
				setError({
					message: e.message,
				});
			});

		return () => controller.abort();
	}, [searchPokeNum]);

	return { isLoading, results, isError, error };
};
