import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import { NotificationProvider } from "./context/NotificationContext";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import FlightSearch from "./pages/FlightSearch";
import FlightResults from "./pages/FlightResults";
import FlightDetails from "./pages/FlightDetails";
import PassengerDetails from "./pages/PassengerDetails";
import SeatSelection from "./pages/SeatSelection";
import BaggageSelection from "./pages/BaggageSelection";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import BoardingPass from "./pages/BoardingPass";
import MyTrips from "./pages/MyTrips";
import AirportAssistant from "./pages/AirportAssistant";
import AirportNavigation from "./pages/AirportNavigation";
import BaggageTracking from "./pages/BaggageTracking";
import Notifications from "./pages/Notifications";
import FlyBot from "./pages/FlyBot";
import Profile from "./pages/Profile";
import UXLab from "./pages/UXLab";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BookingProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<FlightSearch />} />
              <Route path="/results" element={<FlightResults />} />
              <Route path="/flights/:id" element={<FlightDetails />} />
              <Route path="/passenger-details" element={<PassengerDetails />} />
              <Route path="/seat-selection" element={<SeatSelection />} />
              <Route path="/baggage" element={<BaggageSelection />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation/:id" element={<Confirmation />} />
              <Route path="/boarding-pass/:id" element={<BoardingPass />} />
              <Route path="/my-trips" element={<MyTrips />} />
              <Route path="/airport" element={<AirportNavigation />} />
              <Route path="/airport-assistant" element={<AirportAssistant />} />
              <Route path="/baggage-tracking" element={<BaggageTracking />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/flybot" element={<FlyBot />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/ux-lab" element={<UXLab />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </BookingProvider>
  );
}
