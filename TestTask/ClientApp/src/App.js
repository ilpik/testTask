import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Employees } from './components/employees/Employees';
import { EmployeeForm } from './components/employees/EmployeeForm';
import { Departments } from './components/department/Departments';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
	    <Route exact path='/' component={Home} /> 
	    <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
	    <Route path='/employees' component={Employees} />
	    <Route path='/employee/:employeeId' component={EmployeeForm} />
		<Route path='/departments' component={Departments} />
	    </Layout>
    );
  }
}
