import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export class Departments extends Component {
	static displayName = Departments.name;

	constructor(props) {
		super(props);
		this.state = { departments: [], loading: true };
	}

	componentDidMount() {
		console.log('привет')
		this.loadData();
	}
	loadData() {
		var id = window.location.pathname.slice(10);

		var url = "https://localhost:44324/api/department";

		fetch(url)
			.then((res) => {
				console.log('123123123', res);
				return res.json()
			})
			.then((result) => {
				console.log(result)
				this.setState(
					{
						departments: result,
						loading: false
					}
				);
			});
	}


	render() {
		const { loading, departments } = this.state

		if (loading) {
			return (<p>Загрузка</p>)
		}
		return (<div>
			<table className='table table-striped' aria-labelledby="tabelLabel">
			<thead>
			<tr>
			<th>Название</th>
			<th>Зарплата</th>
			</tr>
			</thead>
			<tbody>
					{departments && departments.map(item =>
				<tr key={item.id}>
			<td>{item.name}</td>
			<td>{item.averagesalary}</td>


			</tr>
	)}
</tbody>
	</table>
	</div>)
}


}