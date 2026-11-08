import React from "react";
import EventCard from "../components/Events/EventCard.jsx";
import Footer from "../components/Layout/Footer.jsx";
import Header from "../components/Layout/Header.jsx";

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <div className="mx-auto my-8 w-11/12">
        <EventCard active />
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
