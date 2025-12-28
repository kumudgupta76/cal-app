import type { Holiday } from './api';

export function getHolidayForDate(date: Date, holidays: Holiday[]): Holiday | undefined {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  return holidays.find(h => h.date === dateString);
}

export function isHoliday(date: Date, holidays: Holiday[]): boolean {
  return getHolidayForDate(date, holidays) !== undefined;
}
