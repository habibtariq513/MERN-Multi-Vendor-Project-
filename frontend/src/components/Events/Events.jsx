import React from "react";
import { useSelector } from "react-redux";
import styles from "../../styles/styles.js";
import EventCard from "./EventCard.jsx";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <div>
      <div className={styles.section}>
        <div className={styles.heading}>
          <h1>Popular Events</h1>
        </div>

        <div className="grid w-full">
          {allEvents?.length > 0 ? (
            <EventCard data={allEvents[0]} />
          ) : isLoading ? (
            <p>Loading events...</p>
          ) : (
            <p>No events available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
