/**
 * Converts a time string to a grid row index.
 * Supports:
 * - "HH:mm" (24-hour format) ✅
 * - "HH:mm AM/PM" ✅
 *
 * Grid assumption:
 * - 15 min per row
 * - 96 rows (24 hours)
 */

export const timeToRowIndex = (timeStr) => {
  if (!timeStr) return 0;

  let hours = 0;
  let minutes = 0;

  try {
    // ✅ Case 1: "HH:mm" (your mock data)
    if (
      timeStr.includes(':') &&
      !timeStr.includes('AM') &&
      !timeStr.includes('PM')
    ) {
      const [h, m] = timeStr.split(':');
      hours = parseInt(h, 10);
      minutes = parseInt(m, 10);
    }

    // ✅ Case 2: "HH:mm AM/PM"
    else {
      const [time, modifier] = timeStr.split(' ');
      const [h, m] = time.split(':');

      hours = parseInt(h, 10);
      minutes = parseInt(m, 10);

      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
    }

    // ✅ Convert to 15-min slots
    return Math.floor((hours * 60 + minutes) / 15);

  } catch (error) {
    console.error('❌ Invalid time format:', timeStr);
    return 0;
  }
};