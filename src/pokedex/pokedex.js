import React, { useState, useEffect } from 'react';
import Card from '../card/card';
import SearchBar from '../searchBar/searchBar';
import axios from 'axios';
import { Link } from 'react-router-dom';

import styles from './pokedex.module.scss';

export const Pokedex = () => {
	const [pokemonData, setPokemonData] = useState({});
	const [filter, setFilter] = useState('');
	const [pokemonNumber, setPokemonNumber] = useState(1);

	const [api, setApi] = useState(`https://pokeapi.co/api/v2/pokemon?limit=151`);

	function capitalize(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		axios.get(api).then((res) => {
			const { data } = res;
			const { results } = data;
			const newPokemonData = {};
			results.forEach((pokemon, i) => {
				newPokemonData[i + 1] = {
					id: i + pokemonNumber,
					name: capitalize(pokemon.name),
					sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${
						i + pokemonNumber
					}.png`,
				};
			});
			setPokemonData(newPokemonData);
		});
	}, [api, pokemonNumber]);
	const handleChange = (event) => {
		setFilter(event.target.value);
	};

	const handleKanto = () => {
		setPokemonNumber(1);

		setApi('https://pokeapi.co/api/v2/pokemon?limit=151');
	};
	const handleJohto = () => {
		setPokemonNumber(152);
		setApi('https://pokeapi.co/api/v2/pokemon?limit=100&offset=151');
	};

	const handleHoenn = () => {
		setPokemonNumber(252);
		setApi('https://pokeapi.co/api/v2/pokemon?limit=135&offset=251');
	};

	const handleSinnoh = () => {
		setPokemonNumber(387);
		setApi('https://pokeapi.co/api/v2/pokemon?limit=108&offset=386');
	};

	const handleUnova = () => {
		setPokemonNumber(495);
		setApi('https://pokeapi.co/api/v2/pokemon?limit=155&offset=494');
	};

	const handleKalos = () => {
		setPokemonNumber(650);
		setApi('https://pokeapi.co/api/v2/pokemon?limit=72&offset=649');
	};

	const handleAlola = () => {
		setPokemonNumber(722);
		setApi('https://pokeapi.co/api/v2/pokemon?limit=88&offset=721');
	};

	const handleGalar = () => {
		setPokemonNumber(810);
		setApi('https://pokeapi.co/api/v2/pokemon?limit=84&offset=809');
	};

	return (
		<div className={styles.container}>
			<SearchBar handleChange={handleChange} />

			<div className={styles.buttonContainer}>
				<Link onClick={handleKanto}>Kanto</Link>
				<Link onClick={handleJohto}>Johto</Link>
				<Link onClick={handleHoenn}>Hoenn</Link>
				<Link onClick={handleSinnoh}>Sinnoh</Link>
				<Link onClick={handleUnova}>Unova</Link>
				<Link onClick={handleKalos}>Kalos</Link>
				<Link onClick={handleAlola}>Alola</Link>
				<Link onClick={handleGalar}>Galar</Link>
			</div>

			{pokemonData ? (
				<div className={styles.pokemonList}>
					{Object.keys(pokemonData).map(
						(pokemonId) =>
							pokemonData[pokemonId].name.includes(filter) && (
								<Card
									key={pokemonId}
									pokemonData={pokemonData}
									pokemonId={pokemonId}
								/>
							)
					)}
				</div>
			) : (
				'LOADING'
			)}
		</div>
	);
};
