import React, { useRef, useState, useCallback } from 'react';
import { usePokemons } from '../hooks/usePokemons';
import Card from './Card';

const PokemonList: React.FC = () => {
	const [pagination, setPagination] = useState(0);
	const { isLoading, results, isError, error, hasNextPage } =
		usePokemons(pagination);

	const intObserver = useRef<IntersectionObserver | null>(null);
	const lastCardRef = useCallback(
		(node: HTMLElement | null) => {
			if (isLoading || !node) return;

			if (intObserver.current) intObserver.current.disconnect();

			intObserver.current = new IntersectionObserver((pokemons) => {
				if (pokemons[0].isIntersecting && hasNextPage) {
					setPagination((prev) => prev + 20);
				}
			});

			intObserver.current.observe(node);
		},
		[isLoading, hasNextPage]
	);

	if (isError) return <p>Error: {error.message}</p>;

	const content = results.map((pokemon, i) => {
		if (results.length === i + 1) {
			return <Card ref={lastCardRef} key={pokemon.name} pokemon={pokemon} />;
		}
		return <Card key={pokemon.name} pokemon={pokemon} />;
	});

	return (
		<>
			{isLoading && <p>Loading...</p>}
			{content}
		</>
	);
};

export default PokemonList;
