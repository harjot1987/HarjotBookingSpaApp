import { gql } from '@apollo/client';

/**
 * Requirement #5: Create Booking with 10 fields
 */
export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      id
      customerName
      email
      phone
      therapistId
      serviceId
      date
      startTime
      duration
      roomNumber
      notes
      status
    }
  }
`;

/**
 * Requirement #5: Update existing booking details
 */
export const UPDATE_BOOKING = gql`
  mutation UpdateBooking($id: ID!, $input: BookingInput!) {
    updateBooking(id: $id, input: $input) {
      id
      startTime
      duration
      serviceId
      notes
    }
  }
`;

/**
 * Requirement #5 & #6: Cancel/Delete a booking
 * Returns the ID to allow Apollo to automatically remove it from the local cache
 */
export const CANCEL_BOOKING = gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id) {
      id
      status
    }
  }
`;