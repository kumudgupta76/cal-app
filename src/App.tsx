import { Calendar } from './components/CalendarGrid';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-secondary/20 to-muted py-8 px-4 md:py-12">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">Kalendar</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            View monthly calendar with all major Indian festivals and holidays
          </p>
        </div>
        
        <Calendar />
      </div>
      <Toaster />
    </div>
  );
}

export default App;