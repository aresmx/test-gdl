import React, {Component} from 'react';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import AppNavbar from './AppNavbar';
import {Link} from 'react-router-dom';

class Employee extends Component {

    constructor(props) {
        super(props);
        this.state = {employees: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/employees')
            .then(response => response.json())
            .then(data => this.setState({employees: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/employees/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'true'
            }
        }).then(() => {
            let updatedEmployees = [...this.state.employees].filter(i => i.id !== id);
            this.setState({employees: updatedEmployees});
        });
    }

    render() {
        const {employees, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const employeeList = employees.map(employee => {
            return <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.middleInitial}</td>
                <td>{employee.lastName}</td>
                <td>{new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(employee.dateOfBirth))}</td>
                <td>{new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                }).format(new Date(employee.dateOfEmployment))}</td>
                <td>{employee.status}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/employees/" + employee.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(employee.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/employees/new">Add Employee</Button>
                    </div>
                    <h3>Employees</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Middle Initial</th>
                            <th>Last Name</th>
                            <th>Date Of Birth</th>
                            <th>Date Of Employment</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>{employeeList}</tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default Employee;
