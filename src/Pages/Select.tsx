import React, { useState } from "react";
import Modal from "./Modal";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const SelectApp: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(-1);
  const [timeSlots, setTimeSlots] = useState([
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
    [{ open: "", close: "" }],
  ]);

  const handleOnSave = (
    times: { open: string; close: string }[],
    selectedDay: number
  ) => {
    const selectedTimeSlots = [...timeSlots];
    selectedTimeSlots[selectedDay] = [...times];
    setTimeSlots(selectedTimeSlots);
    setModal(false);
  };

  const handleDayClick = (index: number) => {
    setSelectedDayIndex(index);
    setModal(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="mb-2">Select availability for time</p>
        <div>
          {days.map((day, index) => (
            <div className="flex justify-between gap-2" key={index}>
              <p>{day}</p>
              <div></div>
              <p
                className="cursor-pointer"
                onClick={() => handleDayClick(index)}
              >
                {timeSlots[index].map((slot, idx) => (
                  <span key={idx}>
                    {slot.open} - {slot.close}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <Modal
          day={selectedDayIndex}
          onClose={() => setModal(false)}
          onTimeSave={handleOnSave}
          initialTime={timeSlots[selectedDayIndex]}
        />
      )}
    </>
  );
};

export default SelectApp;
