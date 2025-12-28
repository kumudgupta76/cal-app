import { cn } from '@/lib/utils';
import { getHolidayForDate } from '@/lib/holidays';
import { isSameDay } from '@/lib/calendar';
import type { Holiday } from '@/lib/api';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface CalendarDayProps {
  date: Date;
  currentMonth: number;
  today: Date;
  holidays: Holiday[];
}

export function CalendarDay({ date, currentMonth, today, holidays }: CalendarDayProps) {
  const isCurrentMonth = date.getMonth() === currentMonth;
  const isToday = isSameDay(date, today);
  const holiday = getHolidayForDate(date, holidays);
  const isHolidayDate = !!holiday;

  const dayContent = (
    <div
      className={cn(
        'relative h-full min-h-[80px] md:min-h-[100px] p-2 md:p-3 rounded-md transition-all duration-200',
        'flex flex-col items-start',
        isCurrentMonth ? 'bg-card' : 'bg-muted/30',
        isToday && 'ring-2 ring-primary shadow-lg',
        isHolidayDate && isCurrentMonth && 'bg-accent/10',
        !isCurrentMonth && 'text-muted-foreground',
        isCurrentMonth && 'hover:bg-secondary/50 hover:shadow-md cursor-pointer'
      )}
    >
      <div className="flex items-start justify-between w-full">
        <span
          className={cn(
            'text-sm md:text-base font-medium',
            isToday && 'bg-primary text-primary-foreground w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center font-bold animate-breathe'
          )}
        >
          {date.getDate()}
        </span>
      </div>
      
      {isHolidayDate && isCurrentMonth && (
        <div className="mt-1 md:mt-2 w-full">
          <Badge 
            variant="outline" 
            className="bg-accent text-accent-foreground border-accent text-[10px] md:text-xs px-1.5 py-0.5 leading-tight line-clamp-2 w-full justify-start"
          >
            {holiday.name}
          </Badge>
        </div>
      )}
    </div>
  );

  if (isHolidayDate && holiday.description && isCurrentMonth) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild className="h-full">
            {dayContent}
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-semibold">{holiday.name}</p>
              <p className="text-xs text-muted-foreground">{holiday.description}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return dayContent;
}
