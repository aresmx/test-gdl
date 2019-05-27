import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import {Calendar} from 'primereact/calendar';

class EmployeeEdit extends Component {

    emptyItem = {
        firstName: '',
        middleInitial: '',
        lastName: '',
        dateOfBirth: '',
        dateOfEmployment: '',
        status: 'ACTIVE'
    };

    constructor(props) {
        super(props);
        this.state = {
            dateBirth: null,
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const employee = await (await fetch(`/api/employees/${this.props.match.params.id}`)).json();
            this.setState({item: employee});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        item.dateOfBirth = this.state.dateBirth || item.dateOfBirth;

        await fetch('/api/employees', {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/employees');
    }

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Employee' : 'Add Employee'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}

                <Form onSubmit={this.handleSubmit}>
                    <div className="row">
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="firstName">First Name</Label>
                            <Input type="text" name="firstName" id="firstName" value={item.firstName || ''}
                                   onChange={this.handleChange} autoComplete="firstName"/>
                        </FormGroup>
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="middleInitial">Middle Initial</Label>
                            <Input type="text" name="middleInitial" id="middleInitial" value={item.middleInitial || ''}
                                   onChange={this.handleChange} autoComplete="middleInitial"/>
                        </FormGroup>
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="lastName">Last Name</Label>
                            <Input type="text" name="lastName" id="lastName" value={item.lastName || ''}
                                   onChange={this.handleChange} autoComplete="lastName"/>
                        </FormGroup>
                        <FormGroup className="col-md-4 mb-3">
                            <Label for="dateOfBirth">Date Of Birth</Label>
                            <Calendar value={this.state.dateBirth || item.dateOfBirth} showTime={true} onChange={(e) => this.setState({dateBirth: e.value})} />
                        </FormGroup>
                    </div>
                    <div className="row" hidden={!item.id}>
                        <FormGroup className="col-md-5 mb-3">
                            <Label for="dateOfEmployment">Date Of Employment </Label>
                            <Input disabled type="text" name="dateOfEmployment" id="dateOfEmployment" value={item.dateOfEmployment || ''}
                                   onChange={this.handleChange} autoComplete="dateOfEmployment"/>
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="status">Status</Label>
                            <Input type="text" name="status" id="status" value={item.status || ''}
                                   onChange={this.handleChange} autoComplete="status" disabled/>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/employees">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(EmployeeEdit);
