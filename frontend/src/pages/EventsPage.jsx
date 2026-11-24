import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard.jsx";
import Footer from "../components/Layout/Footer.jsx";
import Header from "../components/Layout/Header.jsx";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      <Header activeHeading={4} />
      <div className="mx-auto my-8 w-11/12">
        {allEvents?.length > 0 ? (
          allEvents.map((event) => (
            <EventCard active data={event} key={event._id} />
          ))
        ) : isLoading ? (
          <p>Loading events...</p>
        ) : (
          <p>No events available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
