import React, { useState } from "react";

const useTimeStamp = (date: Date) => {
  let ampm, hours, minutes;

  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();

  ampm = currentHours > 11 ? "오후" : "오전";
  hours = currentHours > 12 ? `${currentHours - 12}` : `${currentHours}`;
  minutes = currentMinutes < 10 ? `0${currentMinutes}` : `${currentMinutes}`;

  return { ampm, hours, minutes };
};

export default useTimeStamp;
