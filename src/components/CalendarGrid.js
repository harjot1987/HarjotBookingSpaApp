import React, { Component } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  TextField,
  InputAdornment,
  Drawer,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { FixedSizeGrid as Grid } from 'react-window';

import { timeToRowIndex } from '../utils/timeHelpers';
import { generateMockData } from '../utils/mockData';

import BookingForm from './BookingForm';
import BookingPanel from './BookingPanel';

/*
🔌 GRAPHQL (COMMENTED FOR NOW)

import { client } from '../services/apolloClient';
import { GET_SCHEDULE } from '../graphql/queries';
*/

class CalendarGrid extends Component {
  state = {
    searchTerm: '',
    selectedBooking: null,
    isPanelOpen: false,
    isFormOpen: false,
    selectedTherapist: null,
    loading: true,
    therapists: [],
    bookings: []
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const data = generateMockData();

      this.setState({
        therapists: data.therapists,
        bookings: data.bookings,
        loading: false
      });

      /*
      const { data } = await client.query({
        query: GET_SCHEDULE,
        variables: { date: '2026-03-19' }
      });

      this.setState({
        therapists: data.therapists,
        bookings: data.bookings,
        loading: false
      });
      */
    } catch (error) {
      console.error('Load error:', error);
    }
  };

  // ✅ PERFORMANCE FIX: O(1) lookup map
  createBookingMap = (bookings) => {
    const map = {};
    bookings.forEach((b) => {
      const key = `${b.therapistId}_${timeToRowIndex(b.startTime)}`;
      map[key] = b;
    });
    return map;
  };

  renderCell = ({ columnIndex, rowIndex, style, data }) => {
    const { therapists, bookingMap } = data;

    if (rowIndex === 0 && columnIndex === 0) {
      return <Box style={{ ...style, background: '#fff' }} />;
    }

    if (rowIndex === 0) {
      const therapist = therapists[columnIndex - 1];
      if (!therapist) return null;

      return (
        <Box
          style={{
            ...style,
            background: '#fff',
            borderBottom: '1px solid #f1f5f9',
            display: 'flex',
            alignItems: 'center',
            padding: 8
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor:
                therapist.gender === 'Female' ? '#F472B6' : '#60A5FA',
              color: '#fff',
              fontSize: 13,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1.5
            }}
          >
            {therapist.name[0]}
          </Box>

          <Box>
            <Typography fontSize="12px" fontWeight="600">
              {therapist.name}
            </Typography>
            <Typography fontSize="10px" color="#94A3B8">
              {therapist.gender}
            </Typography>
          </Box>
        </Box>
      );
    }

    if (columnIndex === 0) {
      const totalMinutes = (rowIndex - 1) * 15;
      const h = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
      const m = String(totalMinutes % 60).padStart(2, '0');

      return (
        <Box
          style={{
            ...style,
            background: '#fafafa',
            borderRight: '1px solid #f1f5f9',
            fontSize: 11,
            color: '#64748b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {`${h}:${m}`}
        </Box>
      );
    }

    const therapist = therapists[columnIndex - 1];
    if (!therapist) return null;

    // ✅ FAST LOOKUP
    const key = `${therapist.id}_${rowIndex - 1}`;
    const booking = bookingMap[key];

    if (!booking) {
      return (
        <Box
          style={{
            ...style,
            border: '1px solid #f1f5f9',
            background: '#fff'
          }}
          onClick={() =>
            this.setState({
              isFormOpen: true,
              selectedTherapist: therapist.id
            })
          }
        />
      );
    }

    return (
      <Box style={{ ...style, padding: 2 }}>
        <Paper
          onClick={() =>
            this.setState({
              selectedBooking: booking,
              isPanelOpen: true
            })
          }
          sx={{
            height: '100%',
            px: 1,
            py: 0.5,
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            bgcolor:
              therapist.gender === 'Female' ? '#FCE7F3' : '#DBEAFE',
            borderLeft: `4px solid ${
              therapist.gender === 'Female'
                ? '#EC4899'
                : '#3B82F6'
            }`,
            cursor: 'pointer'
          }}
        >
          <Typography fontSize="11px" fontWeight="600">
            {booking.serviceName}
          </Typography>

          <Typography fontSize="10px" color="#475569">
            {booking.customerName}
          </Typography>
        </Paper>
      </Box>
    );
  };

  render() {
    const { loading, therapists, bookings, searchTerm } = this.state;

    if (loading) return <CircularProgress />;

    const filtered = therapists.filter((t) =>
      t.name.toLowerCase().includes(searchTerm)
    );

    // ✅ CREATE MAP ONCE PER RENDER
    const bookingMap = this.createBookingMap(bookings);

    return (
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            size="small"
            placeholder="Search Therapists..."
            onChange={(e) =>
              this.setState({ searchTerm: e.target.value.toLowerCase() })
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <Grid
            columnCount={filtered.length + 1}
            columnWidth={160}
            height={window.innerHeight - 100}
            rowCount={97}
            rowHeight={60}
          width={window.innerWidth - 20}
            itemData={{ therapists: filtered, bookingMap }}
            overscanRowCount={5}
            overscanColumnCount={2}
          >
            {this.renderCell}
          </Grid>
        </Box>

        <Drawer
          anchor="right"
          open={this.state.isFormOpen}
          onClose={() => this.setState({ isFormOpen: false })}
        >
          <BookingForm
            therapists={this.state.therapists}
            therapistId={this.state.selectedTherapist}
            onSuccess={(newBooking) => {
              this.setState((prev) => ({
                bookings: [...prev.bookings, newBooking],
                isFormOpen: false
              }));
            }}
          />
        </Drawer>

        <Drawer
          anchor="right"
          open={this.state.isPanelOpen}
          onClose={() => this.setState({ isPanelOpen: false })}
        >
          <BookingPanel
            booking={this.state.selectedBooking}
            onClose={() => this.setState({ isPanelOpen: false })}
            onCancelSuccess={(updated) => {
              this.setState((prev) => ({
                bookings: prev.bookings.map((b) =>
                  b.id === updated.id ? updated : b
                )
              }));
            }}
          />
        </Drawer>
      </Box>
    );
  }
}

export default CalendarGrid;