import React from 'react';
import './app.css';
import { Route, Switch } from 'react-router-dom';
import { Pokedex } from './pokedex/pokedex';
import { Pokemon } from './pokemon/pokemon';

function App() {
	return (
		<div className='appContainer'>
			<Switch>
				<Route exact path='/' render={(props) => <Pokedex {...props} />} />
				<Route
					exact
					path='/:pokemonId'
					render={(props) => <Pokemon {...props} />}
				/>
			</Switch>
		</div>
	);
}

export default App;
