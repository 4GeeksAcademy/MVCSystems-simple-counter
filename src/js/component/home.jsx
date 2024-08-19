import React, { useState, useEffect, useRef } from "react";

// Create your first component
const Home = () => {
  const [inputHours, setInputHours] = useState(0);
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0); // Inicializar en 0 segundos
  const [isRunning, setIsRunning] = useState(false);
  const [targetTime, setTargetTime] = useState(0); // Tiempo objetivo
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => {
          if (prev < targetTime) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            alert("Tiempo concluido");
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, targetTime]);

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
    setElapsedTime(0); // Reiniciar el tiempo transcurrido
    setIsRunning(false); // Detener el temporizador
    clearInterval(intervalRef.current); // Limpiar el intervalo
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleResume = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleRestart = () => {
    setElapsedTime(0); // Reiniciar a 0 segundos
    setIsRunning(true);
  };

  return (
    <div
      className="container text-center vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}
    >
      <h1 className="mb-4 text-white">A Simple React Timer</h1>
      <div
        className="d-flex justify-content-center align-items-center bg-dark text-white p-4 rounded shadow-lg mb-4"
        style={{ width: "350px", borderRadius: "15px" }}
      >
        <div
          className="fs-1 mx-2"
          style={{ fontSize: "3rem", fontWeight: "bold" }}
        >
          {Math.floor(elapsedTime / 3600)
            .toString()
            .padStart(2, "0")}
          :
        </div>
        <div
          className="fs-1 mx-2"
          style={{ fontSize: "3rem", fontWeight: "bold" }}
        >
          {Math.floor((elapsedTime % 3600) / 60)
            .toString()
            .padStart(2, "0")}
          :
        </div>
        <div
          className="fs-1 mx-2"
          style={{ fontSize: "3rem", fontWeight: "bold" }}
        >
          {(elapsedTime % 60).toString().padStart(2, "0")}
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-center mb-4">
        <button
          className="btn btn-outline-light mx-2 px-4 py-2"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="btn btn-outline-light mx-2 px-4 py-2"
          onClick={handleStop}
        >
          Stop
        </button>
        <button
          className="btn btn-outline-light mx-2 px-4 py-2"
          onClick={handleResume}
        >
          Resume
        </button>
        <button
          className="btn btn-outline-light mx-2 px-4 py-2"
          onClick={handleRestart}
        >
          Restart
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-white">Set Timer</h3>
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
