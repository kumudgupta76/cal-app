export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
}

export function getCalendarDays(year: number, month: number): Date[] {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days: Date[] = [];
  
  for (let i = 0; i < firstDay; i++) {
    const prevMonth = month - 1;
    const prevYear = prevMonth < 0 ? year - 1 : year;
    const actualPrevMonth = prevMonth < 0 ? 11 : prevMonth;
    const daysInPrevMonth = getDaysInMonth(prevYear, actualPrevMonth);
    days.push(new Date(prevYear, actualPrevMonth, daysInPrevMonth - firstDay + i + 1));
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    const nextMonth = month + 1;
    const nextYear = nextMonth > 11 ? year + 1 : year;
    const actualNextMonth = nextMonth > 11 ? 0 : nextMonth;
    days.push(new Date(nextYear, actualNextMonth, i));
  }
  
  return days;
}

export const WEEKDAY_LABELS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
