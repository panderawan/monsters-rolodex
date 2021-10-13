import { Component } from 'react';

import { CardList } from './components/card-list/card-list.component.jsx';

import { Card } from './components/card/card.component.jsx';

import { SearchBox } from './components/search-box/search-box.component.jsx';

import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			monsters: [],
			searchField: ''
		};
	}

	componentDidMount() {
		const getUsers = async () => {
			try {
				const userResponse = await fetch(
					'https://jsonplaceholder.typicode.com/users'
				);
				const users = await userResponse.json();
				this.setState({ monsters: users });
			} catch (error) {
				console.log(`Here is your error ${error}`);
			}
		};

		getUsers();
	}

	// 	fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
	// 		response.json().then((users) => this.setState({ monsters: users }))
	// 	);
	// }

	handleChange = (e) => {
		this.setState({ searchField: e.target.value });
	};

	render() {
		const { monsters, searchField } = this.state;
		const filteredMonsters = monsters.filter((monster) =>
			monster.name.toLowerCase().includes(searchField.toLowerCase())
		);
		return (
			<div className='App'>
				<h1>Monsters Rolodex</h1>
				<SearchBox
					placeholder='search Monster'
					handleChange={this.handleChange}
				/>
				<CardList monsters={filteredMonsters} />
			</div>
		);
	}
}

export default App;
