import React from 'react';
import styled from 'styled-components';

import { Container } from '../../components/Container';
import { Footer, height as footerHeight } from '../../components/Footer';
import { Header, height as headerHeight } from '../../components/Header';
import { CookiesContent } from '../../components/CookiesConsent/CookiesContent';

const InnerContainer = styled.section`
  height: calc(100% - ${headerHeight} - ${footerHeight});
  min-height: calc(100vh - ${headerHeight} - ${footerHeight});
  overflow: auto;
`

export const Layout = ({ children }) => (
  <Container>
    <Header />
    <CookiesContent />
    <InnerContainer>
      { children }
    </InnerContainer>
    <Footer />
  </Container>
);
