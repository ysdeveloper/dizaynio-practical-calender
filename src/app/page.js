import Calender from "@/components/Calender";
import EventDetails from "@/components/EventDetails";
import SlotTimeList from "@/components/SlotTimeList";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="container bg-white p-8 flex">
        <EventDetails />
        <Calender />
        <SlotTimeList />
      </div>
    </main>
  );
}
