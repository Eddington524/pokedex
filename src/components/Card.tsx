import React from 'react';
import { Pokemon } from '../hooks/usePokemons';
import { useRecoilState } from 'recoil';
import { IPokeInfo, pokemonInfoState } from '../recoil/pokemon';
import { Link } from 'react-router-dom';

interface CardProps {
	pokemon: Pokemon;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ pokemon }, ref) => {
	const [info, setInfo] = useRecoilState<IPokeInfo>(pokemonInfoState);

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
