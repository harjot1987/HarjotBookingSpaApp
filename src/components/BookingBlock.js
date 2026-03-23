import React, { PureComponent } from 'react';
import { Paper, Typography, Box } from '@mui/material';

/**
 * Requirement #2: Use PureComponent to avoid unnecessary re-renders.
 * Requirement #4: Color-coding based on Therapist Gender.
 */
class BookingBlock extends PureComponent {
  render() {
    const { booking, therapistGender, onClick } = this.props;

    // Requirement #4: Pink (#EC4899) for Female, Blue (#3B82F6) for Male
    const bgColor = therapistGender === 'Female' ? '#EC4899' : '#3B82F6';

    return (
      <Paper
        elevation={2}
        onClick={() => onClick(booking)}
        sx={{
          backgroundColor: bgColor,
          color: 'white',
          height: '100%',
          width: '100%',
          padding: '4px',
          cursor: 'pointer',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.1s',
          '&:hover': {
            transform: 'scale(0.98)',
            filter: 'brightness(0.9)',
          },
        }}
      >
        <Typography 
          variant="caption" 
          sx={{ fontWeight: 'bold', lineHeight: 1.1, fontSize: '0.7rem' }}
          noWrap
        >
          {booking.serviceName}
        </Typography>
        
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.9 }}>
            {booking.startTime}
          </Typography>
          <Typography variant="caption" sx={{ fontSize: '0.6rem', opacity: 0.9 }}>
            {booking.duration}m
          </Typography>
        </Box>
      </Paper>
    );
  }
}

export default BookingBlock;