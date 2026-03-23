import React, { Component } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography
} from '@mui/material';

// ❌ GRAPHQL (DISABLED FOR NOW)
// import { CREATE_BOOKING } from '../graphql/mutations';
// import { client } from '../services/apolloClient';

class BookingForm extends Component {
  state = {
    customerName: '',
    email: '',
    phone: '',
    therapistId: this.props.therapistId || '',
    serviceId: '',
    date: '2026-03-19',
    startTime: '09:00',
    duration: 60,
    notes: '',
    roomNumber: '',
    errors: {}
  };

  // ✅ VALIDATION
  validate = () => {
    const errors = {};
    const { customerName, email, phone, serviceId, therapistId, duration } = this.state;

    if (!customerName) errors.customerName = 'Name is required';

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email';
    }

    if (!phone) {
      errors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(phone)) {
      errors.phone = 'Enter valid 10-digit phone';
    }

    if (!therapistId) errors.therapistId = 'Select therapist';
    if (!serviceId) errors.serviceId = 'Select service';

    if (!duration || duration <= 0) {
      errors.duration = 'Enter valid duration';
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState((prev) => ({
      ...prev,
      [name]: value,
      errors: { ...prev.errors, [name]: '' }
    }));
  };

  handleSubmit = async () => {
    if (!this.validate()) return;

    try {
      const {
        customerName, email, phone, therapistId,
        serviceId, date, startTime, duration,
        roomNumber, notes
      } = this.state;

      /*
      const { data } = await client.mutate({
        mutation: CREATE_BOOKING,
        variables: {
          input: {
            customerName,
            email,
            phone,
            therapistId,
            serviceId,
            date,
            startTime,
            duration: Number(duration),
            roomNumber,
            notes,
            status: 'CONFIRMED'
          }
        }
      });

      this.props.onSuccess(data.createBooking);
      */

      const newBooking = {
        id: `b-${Date.now()}`,
        therapistId: String(therapistId),
        customerName,
        email,
        phone,
        serviceId,
        serviceName:
          serviceId === '1' ? 'Massage' :
          serviceId === '2' ? 'Facial' : 'Service',
        date,
        startTime,
        duration: Number(duration),
        roomNumber,
        notes,
        status: 'CONFIRMED'
      };

      this.props.onSuccess(newBooking);

    } catch (error) {
      console.error('Create booking error:', error);
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <Box sx={{ p: 3, width: 380 }}>
        {/* HEADER */}
        <Typography variant="h6" fontWeight="600" mb={2}>
          Create Booking
        </Typography>

        <Grid container spacing={2}>
          {/* CUSTOMER INFO */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Customer Name"
              name="customerName"
              value={this.state.customerName}
              onChange={this.handleChange}
              error={!!errors.customerName}
              helperText={errors.customerName}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={this.state.phone}
              onChange={this.handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>

          {/* BOOKING DETAILS */}
          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Therapist"
              name="therapistId"
              value={this.state.therapistId}
              onChange={this.handleChange}
              error={!!errors.therapistId}
              helperText={errors.therapistId}
            >
              {this.props.therapists.map((t) => (
                <MenuItem key={t.id} value={t.id}>
                  {t.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Service"
              name="serviceId"
              value={this.state.serviceId}
              onChange={this.handleChange}
              error={!!errors.serviceId}
              helperText={errors.serviceId}
            >
              <MenuItem value="1">Massage</MenuItem>
              <MenuItem value="2">Facial</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="date"
              fullWidth
              name="date"
              value={this.state.date}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              type="time"
              fullWidth
              name="startTime"
              value={this.state.startTime}
              onChange={this.handleChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              type="number"
              label="Duration (mins)"
              name="duration"
              value={this.state.duration}
              onChange={this.handleChange}
              error={!!errors.duration}
              helperText={errors.duration}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Room"
              name="roomNumber"
              value={this.state.roomNumber}
              onChange={this.handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Notes"
              name="notes"
              value={this.state.notes}
              onChange={this.handleChange}
            />
          </Grid>
        </Grid>

        {/* ACTION BUTTON */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3, height: 44, fontWeight: 600 }}
          onClick={this.handleSubmit}
        >
          Create Booking
        </Button>
      </Box>
    );
  }
}

export default BookingForm;