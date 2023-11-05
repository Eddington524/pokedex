import { useRecoilState } from 'recoil';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import { pokemonSearchNumState } from '../recoil/pokemon';
import SearchResult from '../components/SearchResult';

const MainPage = () => {
	const [pokemonSearchNum, setPokemonSearchNum] = useRecoilState(
		pokemonSearchNumState
	);

	return (
		<>
			<SearchBar />
			{pokemonSearchNum ? <SearchResult /> : <PokemonList />}
		</>
	);
};

export default MainPage;
