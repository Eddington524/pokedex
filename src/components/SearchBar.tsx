import { useRecoilState } from 'recoil';
import { pokemonSearchNumState } from '../recoil/pokemon';

const SearchBar = () => {
	const [pokemonSearchNum, setPokemonSearchNum] = useRecoilState(
		pokemonSearchNumState
	);

	const resetSearch = () => {
		if (pokemonSearchNum) {
			setPokemonSearchNum('');
		}
	};

	return (
		<div>
			<h4>search</h4>
			<input
				type="number"
				value={pokemonSearchNum}
				onChange={(e) => setPokemonSearchNum(e.target.value)}
			></input>
			<button onClick={resetSearch}>reset</button>
		</div>
	);
};

export default SearchBar;
