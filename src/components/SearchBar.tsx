import React from 'react';
import styles from '../styles/SearchBar.module.css';
import { useRecoilState } from 'recoil';
import { pokemonSearchNumState } from '../recoil/pokemon';

const SearchBar = () => {
	const [pokemonSearchNum, setPokemonSearchNum] = useRecoilState(
		pokemonSearchNumState
	);

	const handleSearch = () => {
		if (pokemonSearchNum) {
			setPokemonSearchNum('');
		}
	};

	return (
		<div className={styles.container}>
			<h4>search</h4>
			<input
				type="number"
				value={pokemonSearchNum}
				onChange={(e) => setPokemonSearchNum(e.target.value)}
			></input>
			<button onClick={handleSearch}>reset</button>
		</div>
	);
};

export default SearchBar;
