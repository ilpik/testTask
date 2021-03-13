import React, { Component } from "react";

export class EmployeeForm extends Component {

	constructor(props) {
		super(props);

		this.state = {
			employeeName: "",
			employeeSalary: "",
            employeeDepartments: [],
			select: {},
			name: '',
			salary: ''
		}

	}
	
	componentDidMount()
    {
	    this.loadData();
    }
   loadData()
      {
       var id = window.location.pathname.slice(10);

       var url = "https://localhost:44324/api/department";

       fetch(url)
        .then((res) => {
	        return res.json()
        })
          .then((result) => {
              console.log(result)
              const {id, name} = result[0]
          this.setState(
            {
	            employeeDepartments: result.map(item => {
                    return { name: item.name, id: item.id} 
                }),
	            select: {
		            id, name
	            }
            }
          );
        });
    }


    onFieldsChange(e) {
        const { value, name } = e.target;
        if (name === 'select') {
	        const selectId = this.state.employeeDepartments.find(item => item.name === value).id;
	        this.setState({
			        [name]: {
				        id: selectId,
				        value
			        }
		        },
		        () => console.log(this.state));
        } else {
	        this.setState({
			        [name]: value
		        },
		        () => console.log(this.state));
        }

    }

    onSubmit(e) {
		e.preventDefault();
		const {select, name , salary} = this.state
		const data = {
			name, salary, departmentId: select.id, department: { name: select.name }
		}
		console.log(data)
		fetch('https://localhost:44324/api/employee', {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json' },
		}).then(res => this.loadData());
		//console.log(JSON.stringify(data));
		//console.log(data);
	    this.setState({ description: '' });
    }

	render()
    {
		return (

			<form onSubmit={this.onSubmit.bind(this)}>
				<div className="col-6 "> 
			<label>Name</label>
						<input name='name' type='text' onChange={this.onFieldsChange.bind(this)} />
					</div>
			<div className="col-6">

					<label>Salary</label>
						<input name='salary' type='number' onChange={this.onFieldsChange.bind(this)} />
					</div>
			<div className="col-6">
                    <select name='select' onChange={this.onFieldsChange.bind(this)}>
                      {this.state.employeeDepartments && this.state.employeeDepartments.map((item) => <option key={item.id}>{item.name}</option>)}}
                  </select>
			</div>
					<input type="submit" value="Отправить" />
			</form>
	);
    }
  }
    
