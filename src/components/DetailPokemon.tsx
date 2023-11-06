import React from 'react';
import { useLocation } from 'react-router-dom';
import { usePokeDetail } from '../hooks/usePokeDetail';
import EvolutionTree from './EvolutionTree';

const DetailPokemon: React.FC = () => {
	const location = useLocation();
	const name = location.pathname.substring(1);

	const { isLoading, results, isError, error } = usePokeDetail(name);

	const getAbility = results.abilities
		.map((ab) => {
			return ab.ability.name;
		})
		.join(',');

	const getPokeTypes = results.types
		.map((el) => {
			return el.type.name;
		})
		.join(',');

	if (isLoading) {
		return <p>loading...</p>;
	}
	const fixKgFormat = (results.weight * 0.1).toFixed(1);

	return (
		<div>
			<p>name:{results.name}</p>
			<p>weight:{fixKgFormat}kg</p>
			<p>height:{results.height * 10}cm</p>
			<p>abilities:{getAbility}</p>
			<p>types:{getPokeTypes}</p>
			<div>
				<span>evolutionchain</span>
				<EvolutionTree chain={results.evolutionChain} />
			</div>
		</div>
	);
};

export default DetailPokemon;
