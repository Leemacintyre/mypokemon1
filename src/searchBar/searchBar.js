import React from 'react';
import styles from './searchBar.module.scss';

export default function SearchBar(props) {
	const { handleChange } = props;
	return (
		<div className={styles.container}>
			<input onChange={handleChange} />
		</div>
	);
}
