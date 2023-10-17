import React, { useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { mainColor } from '../../constants';
import { monthTranslations } from '../../constants/monthTranslations';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const ArchiveMonthsContainer = styled.div`
  padding-left: 1em;
  padding-bottom: 1em;
  background-color: #F6EDDD;
  border-radius: 6px;
  padding-bottom: 0.5em;
  margin-bottom: 1em;
`;

const StyledLink = styled.a`
  display: block;
  padding-bottom: 0.2em;
  color: ${props => (props.isSelected ? mainColor : '#333')};  
  &:hover {
    color: darkgray;
  }
`;

const StyledLinkOlder = styled.a`
  padding-bottom: 0.2em;
  display: block;
  font-weight: bold;
  &:hover {
    color: darkgray ;
  }
`;


export const Sidebar = ({ archives, social, showAllArchives, onShowAllArchives, onArchiveClick, onSeeAllClick, selectedMonthClick, isLoadingArchives }) => {
  const maxArchivesToShow = showAllArchives ? archives.length : 12;
  const displayedArchives = archives.slice(0, maxArchivesToShow);
  const [selectedMonth, setSelectedMonth] = useState(null);

  return (
    <Grid item xs={12} md={4}>
      <ArchiveMonthsContainer>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Archivo
        </Typography>
        {isLoadingArchives ? (
          <Box sx={{ width: 100 }}>
            {[...Array(12)].map((_, index) => (
              <Skeleton animation="wave" key={index} />
            ))}
          </Box>
        ) : (
          displayedArchives.map((archive) => (
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
          ))
        )}
        {!showAllArchives && archives.length > 12 && (
          <StyledLinkOlder
            href="#"
            onClick={() => {
              onShowAllArchives(); 
            }}
          >
            Más antiguos
          </StyledLinkOlder>
        )}
        {archives.length > 1 && selectedMonth && (
          <StyledLinkOlder
            href="#"
            onClick={() => {
              onSeeAllClick();
              setSelectedMonth(null);
            }}
          >
            Volver
          </StyledLinkOlder>
        )}
      </ArchiveMonthsContainer>
      {/* {social.map((network) => (
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
      ))} */}
    </Grid>
    );
    };
