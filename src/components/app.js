import 'preact/debug';
import { h } from 'preact';
// import {
// 	BrowserRouter as Router,
// 	Route,
// 	Switch
// } from 'react-router-dom';

import Header from './header';
import Home from '../routes/home';

import { Level1 } from './levels/level1/level1';

import 'normalize.css/normalize.css';
import style from './app.scss';
import { LevelStateProvider } from "./levels/level-state-provider";


export const App = () => {
	return (
		<div class={style.app}>
			{/*<Router>*/}
				<Header />
				{/*<Switch>*/}
					<LevelStateProvider>
						{/*<Route path="/">*/}
							<Level1 />
						{/*</Route>*/}
						{/*<Route path="/">*/}
						{/*	<Home />*/}
						{/*</Route>*/}
					</LevelStateProvider>
				{/*</Switch>*/}
			{/*</Router>*/}
		</div>
	);
}

export default App;
