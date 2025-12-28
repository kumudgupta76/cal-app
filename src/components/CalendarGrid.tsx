import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CaretLeft, CaretRight, CalendarBlank, Spinner } from '@phosphor-icons/react';
import { CalendarDay } from './CalendarDay';
import { getCalendarDays, formatMonthYear, WEEKDAY_LABELS } from '@/lib/calendar';
import { fetchHolidaysForYear, type Holiday } from '@/lib/api';
import { toast } from 'sonner';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animationDirection, setAnimationDirection] = useState<'left' | 'right'>('right');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const today = new Date();

  const calendarDays = getCalendarDays(currentYear, currentMonth);

  useEffect(() => {
    async function loadHolidays() {
      setLoading(true);
      try {
        const fetchedHolidays = await fetchHolidaysForYear(currentYear);
        setHolidays(fetchedHolidays);
      } catch (error) {
        toast.error('Failed to load holidays');
        console.error('Error loading holidays:', error);
      } finally {
        setLoading(false);
      }
    }

    loadHolidays();
  }, [currentYear]);

  const goToPreviousMonth = () => {
    setAnimationDirection('left');
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  };

  const goToNextMonth = () => {
    setAnimationDirection('right');
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-xl border-2">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CalendarBlank size={32} weight="duotone" className="text-primary" />
            <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight">
              {formatMonthYear(currentDate)}
            </CardTitle>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToToday}
              className="font-medium"
            >
              Today
            </Button>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousMonth}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <CaretLeft size={20} weight="bold" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextMonth}
                className="hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <CaretRight size={20} weight="bold" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Spinner size={40} className="text-primary animate-spin" />
          </div>
        ) : (
          <div 
            key={`${currentYear}-${currentMonth}`}
            className={animationDirection === 'right' ? 'slide-in-right' : 'slide-in-left'}
          >
            <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
              {WEEKDAY_LABELS.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-wider py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {calendarDays.map((day, index) => (
                <CalendarDay
                  key={`${day.toISOString()}-${index}`}
                  date={day}
                  currentMonth={currentMonth}
                  today={today}
                  holidays={holidays}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-accent/10 border border-accent"></div>
            <span>Public Holiday</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
