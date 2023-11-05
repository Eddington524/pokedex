import { useState, useEffect } from 'react';
import { getPokemonData } from '../api/index';

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

export type Error = {
	message: string;
};

export const usePokemons = (pagination: number) => {
	const [results, setResults] = useState<Pokemon[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [error, setError] = useState<Error>({ message: '' });
	const [hasNextPage, setHasNextPage] = useState(false);
	useEffect(() => {
		setIsLoading(true);
		setIsError(false);
		setError({ message: '' });

		const controller = new AbortController();
		const { signal } = controller;

		getPokemonData(signal, pagination)
			.then((data: GetPokemonsResponse) => {
				setResults((prev) => [...prev, ...data.results]);
				setIsLoading(false);
				setHasNextPage(data.next !== null);
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
	}, [pagination]);

	return { isLoading, results, isError, error, hasNextPage };
};
