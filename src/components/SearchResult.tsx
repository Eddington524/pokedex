import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { usePokeSearch } from '../hooks/usePokeSearch';
import { useRecoilValue } from 'recoil';
import { pokemonSearchNumState } from '../recoil/pokemon';

const SearchResult = () => {
	const { isLoading, results, isError, error } = usePokeSearch();

	if (isLoading) {
		return <p>loading...</p>;
	}
	return (
		<>
			{results ? (
				<Card key={results?.name} pokemon={results} />
			) : (
				<p>'검색 결과 없음'</p>
			)}
		</>
	);
};

export default SearchResult;
