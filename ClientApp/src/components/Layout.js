import React, { Component } from 'react';
import { Container } from 'reactstrap';
import  Navbar  from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div>
        <Navbar />

          {this.props.children}

      </div>
    );
  }
}
