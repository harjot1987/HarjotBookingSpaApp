import { gql } from '@apollo/client';

/**
 * Requirement #2 & #3: Main data fetch for the 15-minute grid.
 * Fetches 200 therapists and 2,000+ bookings in a single request.
 */
export const GET_SCHEDULE = gql`
  query GetSchedule($date: String!) {
    # Fetch all therapists for columns
    therapists {
      id
      name
      gender # Requirement #4: For Pink/Blue color coding
    }

    # Fetch all bookings for the specific date
    bookings(date: $date) {
      id
      therapistId # Required to map booking to correct column
      customerName # Field 1
      email        # Field 2
      phone        # Field 3
      serviceId    # Field 5
      serviceName  # For display on the grid block
      date         # Field 6
      startTime    # Field 7: Used for row calculation
      duration     # Field 8: For block height
      roomNumber   # Field 9
      notes        # Field 10
      status       # To show 'Confirmed' or 'Cancelled'
    }
  }
`;

/**
 * Optional: Fetch specific therapist details if needed for the sidebar
 */
export const GET_THERAPIST_DETAILS = gql`
  query GetTherapist($id: ID!) {
    therapist(id: $id) {
      id
      name
      gender
      specialties
    }
  }
`;