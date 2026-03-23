import React, { Component } from 'react';
import { Button, Box, Typography } from '@mui/material';

// ❌ GRAPHQL (DISABLED FOR NOW)
// import { CANCEL_BOOKING } from '../graphql/mutations';
// import { client } from '../services/apolloClient';

class BookingPanel extends Component {

  handleCancel = async () => {
    try {

      // ==============================
      // ❌ GRAPHQL VERSION (COMMENTED)
      // ==============================
      /*
      const { data } = await client.mutate({
        mutation: CANCEL_BOOKING,
        variables: { id: this.props.booking.id }
      });

      this.props.onCancelSuccess(data.cancelBooking);
      this.props.onClose();
      */

      // ==============================
      // ✅ MOCK VERSION (ACTIVE)
      // ==============================
      const updatedBooking = {
        ...this.props.booking,
        status: 'CANCELLED'
      };

      this.props.onCancelSuccess(updatedBooking);
      this.props.onClose();

    } catch (error) {
      console.error('Cancel error:', error);
    }
  };

  render() {
    const { booking } = this.props;

    if (!booking) return null;

    return (
      <Box sx={{ p: 3, width: 320 }}>
        <Typography variant="h6">
          Booking #{booking.id}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Customer: {booking.customerName}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Service: {booking.serviceName}
        </Typography>

        <Typography sx={{ mt: 1 }}>
          Time: {booking.startTime}
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Status: {booking.status}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={this.handleCancel}
        >
          Cancel Booking
        </Button>
      </Box>
    );
  }
}

export default BookingPanel;