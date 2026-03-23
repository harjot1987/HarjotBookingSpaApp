// Generates ~2000 bookings across 200 therapists
export const generateMockData = () => {
  const therapists = Array.from({ length: 200 }, (_, i) => ({
    id: `${i + 1}`,
    name: `Therapist ${i + 1}`,
    gender: i % 2 === 0 ? 'Female' : 'Male', // Requirement #4
    __typename: 'Therapist'
  }));

  const bookings = Array.from({ length: 2000 }, (_, i) => {
    // const randomHour = Math.floor(Math.random() * (20 - 8) + 8); // 8 AM to 8 PM
    const randomHour = Math.floor(Math.random() * (20 - 1) + 1); // 8 AM to 8 PM
    const randomMin = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
    
    return {
      id: `b-${i}`,
      therapistId: `${Math.floor(Math.random() * 200) + 1}`,
      startTime: `${randomHour.toString().padStart(2, '0')}:${randomMin.toString().padStart(2, '0')}`,
      duration: 60,
      serviceName: ['Thai Massage', 'Oil Massage', 'Facial'][Math.floor(Math.random() * 3)],
      customerName: `Customer ${i + 1}`,
      status: 'Confirmed',
      __typename: 'Booking'
    };
  });

  return { therapists, bookings };
};