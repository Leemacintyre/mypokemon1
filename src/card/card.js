import React from 'react';
import { withRouter } from 'react-router';
import styles from './card.module.scss';

const Card = (props) => {
	const { pokemonData, pokemonId, history } = props;
	const { id, name, sprite } = pokemonData[pokemonId];
	return (
		<div>
			<div
				className={styles.container}
				onClick={() => {
					history.push(`/${id}`);
				}}>
				<div className={styles.header}>
					<div className={styles.id}>#{id}. </div>
					<div className={styles.name}>{name} </div>
				</div>
				<div className={styles.imageDiv}>
					<img src={sprite} alt='type' />
				</div>
			</div>
		</div>
	);
};

export default withRouter(Card);
