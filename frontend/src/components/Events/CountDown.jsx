import React, { useEffect, useState } from "react";

const calculateTimeLeft = (finishDate) => {
  const targetDate = finishDate ? new Date(finishDate) : null;
  const difference = targetDate ? targetDate.getTime() - Date.now() : 0;

  if (!targetDate || Number.isNaN(targetDate.getTime()) || difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const CountDown = ({ data }) => {
  const finishDate = data?.Finish_Date;
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeLeft(finishDate)
  );

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(finishDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(finishDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [finishDate]);

  const timerComponents = Object.entries(timeLeft).map(([interval, value]) => (
    <span
      className="text-[20px] text-[#475ad2] sm:text-[25px]"
      key={interval}
    >
      {value} {interval}{" "}
    </span>
  ));

  return (
    <div aria-label="Event ends in">
      {timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0 ? (
        <span className="text-[25px] text-[red]">Time&apos;s Up</span>
      ) : (
        timerComponents
      )}
    </div>
  );
};

export default CountDown;
