import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { red } from '../../constants';
import { monthTranslations } from '../../constants/monthTranslations';

const ArchiveMonthsContainer = styled.div`
  padding-left: 1em;
  padding-bottom: 1em;
  background-color: #F9F7F7;
  border-radius: 6px;
`;

const StyledLink = styled.a`
  display: block;
  padding-bottom: 0.2em;
  color: ${props => (props.isSelected ? red : '#333')};  
  &:hover {
    color: darkgray;
  }
`;

const StyledLinkOlder = styled.a`
  padding-bottom: 0.2em;
  display: block;
  font-weight: bold;
  &:hover {
    color: darkgray;
  }
`;

export const Sidebar = ({ archives, social, showAllArchives, onShowAllArchives, onArchiveClick, onSeeAllClick, selectedMonthClick }) => {
  const maxArchivesToShow = showAllArchives ? archives.length : 12;
  const displayedArchives = archives.slice(0, maxArchivesToShow);
  const [selectedMonth, setSelectedMonth] = useState(null);

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
      <ArchiveMonthsContainer>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Archives
        </Typography>
        {displayedArchives.map((archive) => (
          <StyledLink
            key={archive.title}
            href="#"
            isSelected={archive.title === selectedMonthClick}
            onClick={() => {
              onArchiveClick(archive.title);
              setSelectedMonth(archive.title);
            }}
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
        { archives.length > 1 && selectedMonth &&
          <StyledLinkOlder
            href="#"
            onClick={() => {
              onSeeAllClick();
              setSelectedMonth(null);
            }}
          >
            Volver
          </StyledLinkOlder>
        }
      </ArchiveMonthsContainer>
    </Grid>
  );
};
