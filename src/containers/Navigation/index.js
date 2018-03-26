import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Icon } from '../../components/Icon';
import { MobileNavigation } from '../../components/MobileNavigation';
import { Navigation as DesktopNavigation } from '../../components/Navigation';
import media from '../../constants/media';

const SmallScreen = styled.div`
  display: none;
  margin-right: 1em;
  ${media.smallScreen`display: block;`}
`;

const LargeScreen = styled.div`
  display: block;
  ${media.smallScreen`display: none;`}
`;

class Nav extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match !== prevProps.match) {
      this.setState({ isVisible: false });
    }
  }

  render() {
    return [
      <SmallScreen key="small">
        <div>
          {
            !this.state.isVisible && <Icon onClick={ this.toggleVisibility } type="bars" />
          }
          <MobileNavigation
            isVisible={ this.state.isVisible }
            toggleVisibility={ this.toggleVisibility }
          />
        </div>
      </SmallScreen>,
      <LargeScreen key="large">
        <DesktopNavigation />
      </LargeScreen>
    ];
  }

  toggleVisibility = () => {
    this.setState({ isVisible: !this.state.isVisible });
  }
}

export const Navigation = withRouter(Nav);

