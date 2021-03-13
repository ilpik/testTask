import React, { Component } from 'react';
import { Link} from 'react-router-dom';
export class Employees extends Component {
	static displayName = Employees.name;

	constructor(props) {
		super(props);
		this.state = { employees: [], loading: true };
	}

	componentDidMount() {
		this.loadData();
	}
	loadData() {
		var id = window.location.pathname.slice(10);

		var url = "https://localhost:44324/api/employee";

		fetch(url)
			.then((res) => {
				return res.json()
			})
			.then((result) => {
				console.log(result)
				this.setState(
					{
						employees: result,
						loading: false
					}
				);
			});
	}


	render() {
		const { loading, employees } = this.state
	
	if(loading) {
		return (<p>Загрузка</p>)
		}
		return (<div>
			<table className='table table-striped' aria-labelledby="tabelLabel">
			<thead>
			<tr>
			<th>Имя</th>
			<th>зарплата</th>
			<th>отдел</th> 
			</tr>
			</thead>
			<tbody>
			{employees && employees.map(item =>
				<tr key={item.id}>
			<td><Link to={`/employee/${item.id}`}>{item.name} </Link></td>
					<td>{item.salary}</td>
					<td>{item.departmentId}</td>

			
			</tr>
	)}
</tbody>
	</table>
			</div>)
}


}