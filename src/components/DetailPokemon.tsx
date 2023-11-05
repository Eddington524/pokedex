import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Chain, IPokeInfo, pokemonInfoState } from '../recoil/pokemon';
import { getPokemonDetailData } from '../api';
import { useLocation } from 'react-router-dom';
import { PokemonDetailInfo, usePokeDetail } from '../hooks/usePokeDetail';
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

	return (
		<div>
			<p>name:{results.name}</p>
			<p>weight:{results.weight * 0.1}kg</p>
			<p>height:{results.height * 10}cm</p>
			<p>abilities:{getAbility}</p>
			<p>types:{getPokeTypes}</p>
			<EvolutionTree chain={results.evolutionChain} />
		</div>
	);
};

export default DetailPokemon;
