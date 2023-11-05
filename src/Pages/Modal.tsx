import React, { useState } from "react";

interface ModalProps {
  day: number;
  onClose: () => void;
  onTimeSave: (
    times: { open: string; close: string }[],
    selectedDay: number
  ) => void;
  initialTime: { open: string; close: string }[];
}

const days = ["S", "M", "T", "W", "T", "F", "S"];

const Modal: React.FC<ModalProps> = ({
  day,
  onClose,
  onTimeSave,
  initialTime,
}) => {
  const [times, setTimes] = useState([...initialTime]);
  const [selectedDays, setSelectedDays] = useState<number[]>([day]);

  const handleAddClick = () => {
    setTimes([...times, { open: "", close: "" }]);
  };

  const handleRemoveClick = (index: number) => {
    const updatedTimes = [...times];
    updatedTimes.splice(index, 1);
    setTimes(updatedTimes);
  };

  const handleDayClick = (index: number) => {
    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(index)) {
        return prevSelectedDays.filter((day) => day !== index);
      } else {
        return [...prevSelectedDays, index];
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-25 flex justify-center items-center">
      <div className="bg-white p-4">
        <p className="text-center">
          Select Open and Close time for {days[day]}
        </p>
        <div className="flex gap-2">
          {days.map((_, index) => (
            <p
              key={index}
              className={`${
                selectedDays.includes(index)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } py-2 px-4 my-2 cursor-pointer`}
              onClick={() => handleDayClick(index)}
            >
              {days[index]}
            </p>
          ))}
        </div>
        {times.map((time, index) => (
          <div className="flex flex-col" key={index}>
            <div className="flex gap-2 my-2">
              <input
                type="time"
                className="border-black/20 border-2 p-2 w-1/2"
                value={time.open}
                onChange={(e) => {
                  const updatedTimes = [...times];
                  updatedTimes[index].open = e.target.value;
                  setTimes(updatedTimes);
                }}
              />
              <input
                type="time"
                className="border-black/20 border-2 p-2 w-1/2"
                value={time.close}
                onChange={(e) => {
                  const updatedTimes = [...times];
                  updatedTimes[index].close = e.target.value;
                  setTimes(updatedTimes);
                }}
              />
            </div>
            {index > 0 && (
              <p
                className="my-1 cursor-pointer"
                onClick={() => handleRemoveClick(index)}
              >
                Remove
              </p>
            )}
          </div>
        ))}
        <p className="my-4 cursor-pointer" onClick={handleAddClick}>
          Add hours
        </p>
        <div className="flex justify-between gap-2">
          <button className="bg-black/25 py-2 px-4 w-1/2" onClick={onClose}>
            Cancel
          </button>
          <button
            className="bg-black/25 py-2 px-4 w-1/2"
            onClick={() => onTimeSave(times, day)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
