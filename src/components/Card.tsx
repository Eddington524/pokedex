import React from 'react';
import { Pokemon } from '../hooks/usePokemons';

interface CardProps {
	pokemon: Pokemon;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ pokemon }, ref) => {
	const cardContent = (
		<>
			<h2>{pokemon.name}</h2>
		</>
	);

	const content = ref ? (
		<article ref={ref}>{cardContent}</article>
	) : (
		<article>{cardContent}</article>
	);
	return content;
});

export default Card;
