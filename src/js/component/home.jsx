import React, { useState, useEffect, useRef } from "react";

// Create your first component
const Home = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [targetTime, setTargetTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            alert("Time's up!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setter(value);
    }
  };

  const handleSetTime = () => {
    const totalSeconds =
      parseInt(inputHours) * 3600 +
      parseInt(inputMinutes) * 60 +
      parseInt(inputSeconds);
    setTargetTime(totalSeconds);
    setRemainingTime(totalSeconds);
    if (!isRunning && totalSeconds > 0) {
      setIsRunning(true);
    }
  };

  const handleStart = () => {
    if (!isRunning && remainingTime > 0) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleResume = () => {
    if (!isRunning && remainingTime > 0) {
      setIsRunning(true);
    }
  };

  const handleRestart = () => {
    setRemainingTime(targetTime);
    setIsRunning(true);
  };

  return (
    <div className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center bg-light">
      <h1 className="mb-4">A simple React timer</h1>
      <div className="d-flex bg-dark text-white p-4 rounded shadow-lg mb-4">
        <div className="fs-1 mx-2">
          {Math.floor(remainingTime / 3600)
            .toString()
            .padStart(2, "0")}
          :
        </div>
        <div className="fs-1 mx-2">
          {Math.floor((remainingTime % 3600) / 60)
            .toString()
            .padStart(2, "0")}
          :
        </div>
        <div className="fs-1 mx-2">
          {(remainingTime % 60).toString().padStart(2, "0")}
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center mb-4">
        <button
          className="btn btn-success mx-2 px-4 py-2"
          onClick={handleStart}
        >
          Start
        </button>
        <button className="btn btn-danger mx-2 px-4 py-2" onClick={handleStop}>
          Stop
        </button>
        <button
          className="btn btn-warning mx-2 px-4 py-2"
          onClick={handleResume}
        >
          Resume
        </button>
        <button className="btn btn-info mx-2 px-4 py-2" onClick={handleRestart}>
          Restart
        </button>
      </div>

      <div className="mt-4">
        <h3>Set Timer</h3>
        <div className="d-flex justify-content-center mb-2">
          <input
            type="number"
            className="form-control mx-2"
            value={inputHours}
            onChange={(e) => handleInputChange(e, setInputHours)}
            placeholder="Hours"
          />
          <input
            type="number"
            className="form-control mx-2"
            value={inputMinutes}
            onChange={(e) => handleInputChange(e, setInputMinutes)}
            placeholder="Minutes"
          />
          <input
            type="number"
            className="form-control mx-2"
            value={inputSeconds}
            onChange={(e) => handleInputChange(e, setInputSeconds)}
            placeholder="Seconds"
          />
        </div>
        <button className="btn btn-primary mt-2" onClick={handleSetTime}>
          Set Time
        </button>
      </div>
    </div>
  );
};

export default Home;
