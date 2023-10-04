import React from 'react';
import styled from 'styled-components';

import { Container } from '../../components/Container';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { CookiesConsent } from '../../components/CookiesConsent';
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '../../constants';

const InnerContainer = styled.section`
  height: calc(100% - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${FOOTER_HEIGHT});
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
