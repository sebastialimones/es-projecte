import React, { Component } from 'react';

import { Subscriute as SubscriuteComponent } from '../../components/Subscriute';

export class Subscriute extends Component {

  constructor(props) {
    super(props);

    this.state = {
      contact: {
        email: '',
        firstName: '',
        lastName: '',
      },
      status: 'editing',
    };
  }
  render() {
    return (
      <SubscriuteComponent
        email={ this.state.contact.email }
        firstName={ this.state.contact.firstName }
        lastName={ this.state.contact.lastName }
        status={ this.state.status }
        handleEmailChange={ this.handleEmailChange }
        handleFirstNameChange={ this.handleFirstNameChange }
        handleLastNameChange={ this.handleLastNameChange }
        handleSubmit={ this.handleSubmit }
      />
    );
  }

  handleEmailChange = (e) => {
    const contact = {
      ...this.state.contact,
      email: e.currentTarget.value,
    };
    this.setState({ contact });
  }

  handleFirstNameChange = (e) => {
    const contact = {
      ...this.state.contact,
      firstName: e.currentTarget.value,
    };
    this.setState({ contact });
  }

  handleLastNameChange = (e) => {
    const contact = {
      ...this.state.contact,
      lastName: e.currentTarget.value,
    };
    this.setState({ contact });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      body: JSON.stringify(this.state.contact),
      method: 'POST',
    };
    fetch('https://hooks.zapier.com/hooks/catch/3113594/k0li3h/', config)
      .then(() => {
        this.setState({
          contact: {
            email: '',
            firstName: '',
            lastName: '',
          },
          status: 'success',
        });
      })
      .catch((e) => {
        this.setState({
          contact: {
            email: '',
            firstName: '',
            lastName: '',
          },
          status: 'error',
        });
      })
  }
}
