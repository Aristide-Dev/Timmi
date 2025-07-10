import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CalendarEvent {
    id: string | number;
    title: string;
    date: Date;
    startTime: string;
    endTime: string;
    status: string;
    type?: string;
}

interface CalendarViewProps {
    events: CalendarEvent[];
    onEventClick?: (event: CalendarEvent) => void;
    onDateClick?: (date: Date) => void;
}

export function CalendarView({ events, onEventClick, onDateClick }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth });

    const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

    const getEventsForDate = (date: Date) => {
        return events.filter(event => isSameDay(new Date(event.date), date));
    };

    const renderEvent = (event: CalendarEvent) => {
        const statusColors = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
            confirmed: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300',
            completed: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
            cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
        };

        return (
            <button
                key={event.id}
                onClick={() => onEventClick?.(event)}
                className={cn(
                    'w-full text-left px-2 py-1 rounded text-xs mb-1 truncate',
                    statusColors[event.status as keyof typeof statusColors]
                )}
            >
                <span className="font-medium">{event.startTime}</span> {event.title}
            </button>
        );
    };

    return (
        <Card className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">
                    {format(currentDate, 'MMMM yyyy', { locale: fr })}
                </h2>
                <div className="flex gap-1">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentDate(new Date())}
                    >
                        Aujourd'hui
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
                {/* Week days */}
                {weekDays.map((day) => (
                    <div
                        key={day}
                        className="bg-muted-foreground/5 p-2 text-center text-sm font-medium"
                    >
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {days.map((day) => {
                    const dayEvents = getEventsForDate(day);
                    const isCurrentMonth = isSameMonth(day, currentDate);
                    
                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                'min-h-[120px] bg-card p-1 relative',
                                !isCurrentMonth && 'bg-muted/50 text-muted-foreground',
                                isToday(day) && 'ring-2 ring-primary ring-inset'
                            )}
                            onClick={() => onDateClick?.(day)}
                        >
                            <div className="flex items-center justify-between p-1">
                                <span className={cn(
                                    'text-sm',
                                    isToday(day) && 'font-bold text-primary'
                                )}>
                                    {format(day, 'd')}
                                </span>
                                {dayEvents.length > 0 && (
                                    <span className="text-xs text-muted-foreground">
                                        {dayEvents.length} cours
                                    </span>
                                )}
                            </div>
                            <div className="space-y-1 mt-1">
                                {dayEvents.slice(0, 3).map(renderEvent)}
                                {dayEvents.length > 3 && (
                                    <div className="text-xs text-center text-muted-foreground">
                                        +{dayEvents.length - 3} autres
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
} 