import styled from 'styled-components';

import media from '../../constants/media';

export const Container = styled.div`
  margin: 0 auto;
  width: 90%;
  ${media.mediumScreen`width: 90%;`}
  ${media.smallScreen`width: 95%;`}
  min-height: 100vh;
`;
