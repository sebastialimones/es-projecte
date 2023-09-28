import React from 'react';
import styled from 'styled-components';

import { Container } from '../../components/Container';
import { Footer, height as footerHeight } from '../../components/Footer';
import { Header, height as headerHeight } from '../../components/Header';
import { CookiesConsent } from '../../components/CookiesConsent';

const InnerContainer = styled.section`
  height: calc(100% - ${headerHeight} - ${footerHeight});
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  overflow: auto;
`

export const Layout = ({ children }) => (
  <React.Fragment>
  <Container>
    <Header />
    <CookiesConsent />
    <InnerContainer>
      { children }
    </InnerContainer>
  </Container>
  <Footer />
  </React.Fragment>
);
