import { h } from 'preact';
import { NavLink } from 'react-router-dom';
import style from './style.scss';

const Header = () => (
	<header class={style.header}>
		<h1>CogFun</h1>
		<nav>
			{/*<NavLink activeClassName={style.active} to="/">Home</NavLink>*/}
			{/*<NavLink activeClassName={style.active} to="/profile">Me</NavLink>*/}
			<NavLink activeClassName={style.active} to="/">About</NavLink>
		</nav>
	</header>
);

export default Header;
