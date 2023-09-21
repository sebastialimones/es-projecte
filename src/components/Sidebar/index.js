import * as React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const Sidebar = ({ archives, social, showAllArchives, onShowAllArchives, onArchiveClick, selectedMonth }) => {
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
      {displayedArchives.map((archive) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={archive.title}
          onClick={() => onArchiveClick(archive.title)} // Call onArchiveClick with the selected month
          sx={{
            textDecoration: archive.title === selectedMonth ? 'underline' : 'none',
          }}
        >
          {archive.title}
        </Link>
      ))}
      {!showAllArchives && archives.length > 12 && (
        <Link
          display="block"
          variant="body1"
          href="#"
          onClick={(archive) => {
            onShowAllArchives(); // Call onShowAllArchives when clicking "Más antiguos"
          }}
          >
          Más antiguos
        </Link>
      )}
    </Grid>
  );
};