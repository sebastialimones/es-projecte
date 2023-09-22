import * as React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { red } from '../../constants';
import { monthTranslations } from '../../constants/monthTranslations';

const StyledLink = styled.a`
  display: block;
  color: ${props => (props.isSelected ? red : '#333')};  
  &:hover {
    color: darkgray;
  }
`;

const StyledLinkOlder = styled.a`
  display: block;
  text-decoration: underline;
  &:hover {
    color: darkgray;
  }
`;

export const Sidebar = ({ archives, social, showAllArchives, onShowAllArchives, onArchiveClick, onSeeAllClick, selectedMonthClick }) => {
  // Determine the number of archives to display based on showAllArchives
  const maxArchivesToShow = showAllArchives ? archives.length : 12;
  const displayedArchives = archives.slice(0, maxArchivesToShow);
  
  return (
    <Grid item xs={12} md={4}>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
          </Stack>
        </Link>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>
      { archives.length > 1 &&
        <StyledLinkOlder
          href="#"
          onClick={() => onSeeAllClick()}
        >
          Ver todos
        </StyledLinkOlder>
      }
      {displayedArchives.map((archive) => (
        <StyledLink
          key={archive.title}
          href="#"
          isSelected={archive.title === selectedMonthClick}
          onClick={() => onArchiveClick(archive.title)}
        >
          {monthTranslations[archive.title.split(' ')[0]]} {archive.title.split(' ')[1]}       
        </StyledLink>
      ))}
      {!showAllArchives && archives.length > 12 && (
        <StyledLinkOlder
          href="#"
          onClick={() => {
            onShowAllArchives(); // Call onShowAllArchives when clicking "Más antiguos"
          }}
          >
          Más antiguos
        </StyledLinkOlder>
      )}
    </Grid>
  );
};