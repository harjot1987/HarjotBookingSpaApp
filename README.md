Booking System UI

## 📌 Overview
This project is a **React-based Booking System UI** that allows users to manage therapist bookings through a calendar interface.

### ✨ Features
- 📅 Calendar-based scheduling (therapists vs time slots)
- ➕ Create booking
- ❌ Cancel booking
- 🔍 Search therapists
- ⚡ High-performance rendering (virtualized grid)
- 🔌 Supports GraphQL (Apollo Client) + Mock Data fallback

---

## 🏗️ Tech Stack

- React (Class Components)
- Material UI (MUI)
- react-window (Virtualization)
- Apollo Client (GraphQL - currently disabled)
- Mock Data (used due to CORS issues)

---

## 📂 Project Structure


src/
├── components/
│ ├── CalendarGrid.js
│ ├── BookingForm.js
│ ├── BookingPanel.js
│
├── services/
│ ├── apolloClient.js
│ ├── authService.js
│
├── graphql/
│ ├── queries.js
│ ├── mutations.js
│
├── utils/
│ ├── mockData.js
│ ├── timeHelpers.js


---

## 📅 CalendarGrid

### 🔹 Description
Displays bookings in a grid format:
- Rows → Time slots (15 min intervals)
- Columns → Therapists

---

### ⚡ Performance Optimizations

#### ❌ Problem
Lag due to:
- Large DOM rendering
- `.find()` inside each cell

#### ✅ Solution

**1. Virtualization using react-window**

import { FixedSizeGrid as Grid } from 'react-window';


**2. Optimized lookup using bookingMap**

const key = ${therapistId}_${rowIndex};
const booking = bookingMap[key];


**3. Fixed grid width**

width={window.innerWidth - 20}


**4. Overscan for smooth scrolling**

overscanRowCount={2}
overscanColumnCount={1}


---

## 🧾 BookingForm

### 🔹 Description
Form to create a new booking.

---

### ✅ Fields
- Customer Name
- Email
- Phone
- Therapist
- Service
- Date
- Time
- Duration
- Room
- Notes

---

### ✅ Validation

| Field | Rule |
|------|------|
| Name | Required |
| Email | Valid format |
| Phone | 10-digit |
| Therapist | Required |
| Service | Required |
| Duration | > 0 |

---

### 🧠 UX Improvements
- Inline error messages
- Better spacing (Figma-aligned)
- Disabled invalid submission

---

### 🔄 Data Handling

#### Mock Mode (Active)

this.props.onSuccess(newBooking);


#### GraphQL Mode (Commented)

client.mutate({
mutation: CREATE_BOOKING,
variables: { input }
});


---

## ❌ BookingPanel

### 🔹 Description
Displays booking details and allows cancellation.

### Features
- View booking info
- Cancel booking
- Prevent duplicate cancellation

---

## 🔌 GraphQL + Apollo Client

### 📍 Apollo Setup

import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
uri: 'https://your-api-url
',
cache: new InMemoryCache(),
credentials: 'include'
});


---

### 📥 Example Query

query GET_SCHEDULE {
therapists {
id
name
}
bookings {
id
startTime
}
}


---

### 📤 Example Mutation

mutation CREATE_BOOKING($input: BookingInput!) {
createBooking(input: $input) {
id
status
}
}


---

## ⚠️ CORS Issue & Mock Data

### ❗ Problem
Frontend API calls failed due to:
- CORS restrictions
- Missing credentials
- No CSRF token

---

### ✅ Solution: Mock Data


export const generateMockData = () => ({
therapists: [...],
bookings: [...]
});


---

### 🔄 Switching Modes

#### Mock Mode

const data = generateMockData();


#### GraphQL Mode

const { data } = await client.query({...});


---

## 🔐 Backend Requirements (for real APIs)

Backend must:

- Enable CORS for `localhost:3000`
- Allow credentials
- Return CSRF cookie

---

## 🚀 Performance Summary

| Optimization | Impact |
|-------------|--------|
| react-window | High |
| bookingMap | Eliminates lag |
| Fixed width | Smooth scrolling |
| Overscan tuning | Better UX |

---

## 🎯 Current Status

| Feature | Status |
|--------|--------|
| Calendar Grid | ✅ Done |
| Create Booking | ✅ Done |
| Cancel Booking | ✅ Done |
| GraphQL Integration | ⚠️ Blocked by backend |
| Mock Data | ✅ Active |
| Performance | ✅ Optimized |

---

## 🔮 Future Improvements

- Drag & drop bookings
- Resize booking duration
- Sticky headers
- Real-time updates
- Backend integration

---

## 📌 Conclusion

This project demonstrates:
- Scalable UI architecture
- Performance optimization using virtualization
- Flexible API handling (GraphQL + Mock)
- Real-world issue handling (CORS)

---

## 💡 How to Run


npm install
npm start


---

## 👨‍💻 Author
Your Booking System UI Implementation
