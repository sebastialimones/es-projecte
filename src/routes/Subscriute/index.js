import React, { Component } from 'react';

import { Subscriute as SubscriuteComponent } from '../../components/Subscriute';

export class Subscriute extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };
  }
  render() {
    return (
      <SubscriuteComponent />
    );
  }
}
