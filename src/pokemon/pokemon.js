import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './pokemon.module.scss';

export const Pokemon = (props) => {
	const { match } = props;
	const { params } = match;
	const { pokemonId } = params;
	const [pokemon, setPokemon] = useState(undefined);

	function capitalize(string) {
		return string[0].toUpperCase() + string.slice(1);
	}

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
			.then((res) => {
				const { data } = res;
				setPokemon(data);
			})
			.catch((error) => {
				setPokemon(false);
			});
	}, [pokemonId]);

	const clickedPokemon = () => {
		const { id, name, height, types, sprites, weight, moves } = pokemon;
		const { front_default, back_default, front_shiny, back_shiny } = sprites;

		return (
			<div className={styles.container}>
				<Link className={styles.home} to='./'>
					Back to Pokedex
				</Link>
				<div className={styles.title}>
					<div className={styles.id}># {id}. </div>
					<div className={styles.name}>{capitalize(name)}</div>
				</div>
				<div className={styles.imgContainer}>
					<img src={front_default} alt={name} />
					<img src={back_default} alt={name} />
					<img src={front_shiny} alt={name} />
					<img src={back_shiny} alt={name} />
				</div>
				<div className={styles.dataContainer}>
					<div>Hight:{height}</div>
					<div>Weigh:{weight}</div>

					<div className={styles.types}>
						<div>Type:</div>
						{types.map((typeInfo, i) => {
							const { type } = typeInfo;
							const { name } = type;
							return (
								<div className={styles.individualTypes} key={i}>
									{capitalize(name)}
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.moves}>
					<div className={styles.movesTitle}>MOVES</div>
					{moves.map((moveHolder, i) => {
						const { move } = moveHolder;
						const { name } = move;
						return (
							<p className={styles.individualMove} key={i}>
								-> {capitalize(name)}
							</p>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<>
			{pokemon === undefined && 'loading'}
			{pokemon !== undefined && pokemon && clickedPokemon()}
			{pokemon === false && 'pokemon not found'}
		</>
	);
};
