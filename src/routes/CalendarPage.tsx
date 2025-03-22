
import SchedulerWrapper from "@/components/schedule/_components/view/schedular-view-filteration";
import { SchedulerProvider } from "@/providers/schedular-provider";

export default function CalendarPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Calendar</h1>
      
      <div className="bg-white rounded-lg shadow-md">
        <SchedulerProvider weekStartsOn="monday">
          <SchedulerWrapper 
            stopDayEventSummary={true}
            classNames={{
              tabs: {
                panel: "p-0",
              },
            }}
          />
        </SchedulerProvider>
      </div>
    </div>
  );
}