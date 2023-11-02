import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState<string>("0");
  const [streak, setStreak] = useState<string>("0");


  const updateStreak = useCallback(async () => {
    const requestBody = {
      message: message
    }
    if (message.length) {
      try {
        const response = await fetch("http://localhost:4400/streak", {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(requestBody)
        })
        const streak = await response.json();
        console.log(streak)
        setStreak(streak)
      } catch (error) {
        console.log(error)
      }
    }
  }, [message])
  useEffect(() => {
    const debounce = setTimeout(() => {
      updateStreak()
    }, 1000);
    return () => clearTimeout(debounce);
  }, [message, updateStreak])


  const handleStreak = (e: any) => {
    e.preventDefault();
    setMessage(e.target.value)
  }
  return (
    <div className="App">
      <h1>Even and Odd Streak</h1>
      <p>A is even, B is odd...etc... enter a message to see the longest even or odd streak</p>
      <form>
        <label htmlFor="streak-input">Enter Text</label>
        <br />
        <input id="streak-input" type="text" onChange={e => handleStreak(e)} />
      </form>
      <div>Longest Streak: {streak}</div>
    </div>
  );
}

export default App;
