import React from 'react';
import { Pokemon } from '../hooks/usePokemons';
import { Link } from 'react-router-dom';

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
		<div ref={ref}>{cardContent}</div>
	) : (
		<div>{cardContent}</div>
	);
	return <Link to={`/${pokemon.name}`}>{content}</Link>;
});

export default Card;
