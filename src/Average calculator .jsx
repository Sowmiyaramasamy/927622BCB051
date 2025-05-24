import React, { useState, useEffect } from "react";

// Simulated Responses for Each Type of Number
const generateNumbers = (type) => {
  switch (type) {
    case "p":
      return [2, 3, 5, 7, 11]; // Simulating prime numbers
    case "f":
      return [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]; // Simulating Fibonacci numbers
    case "e":
      return [2, 4, 6, 8, 10, 12, 14, 16]; // Simulating even numbers
    case "r":
      return [5, 13, 9, 6, 17, 2]; // Simulating random numbers
    default:
      return [];
  }
};

const windowSize = 10;

const AverageCalculator = () => {
  const [windowPrevState, setWindowPrevState] = useState([]);
  const [windowCurrState, setWindowCurrState] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [avg, setAvg] = useState(0.00);
  const [selectedType, setSelectedType] = useState("e"); // Default to "even" numbers

  // Handle the change event from the select dropdown
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    fetchNumbersFromServer(selectedValue);
  };

  // This function simulates fetching data from the server based on the selected type
  const fetchNumbersFromServer = (type) => {
    // Simulate the response based on the selected type
    const newNumbers = generateNumbers(type);

    // Check for uniqueness and update the numbers
    const updatedNumbers = [...new Set([...numbers, ...newNumbers])];

    // Calculate the window based on the new numbers, ensuring it doesn't exceed the window size
    const updatedWindow = updatedNumbers.slice(-windowSize); // Limit to `windowSize` numbers

    // Calculate the average of the current window
    const newAvg = updatedWindow.reduce((sum, num) => sum + num, 0) / updatedWindow.length;

    // Set the states accordingly
    setWindowPrevState(windowCurrState);  // Update previous window to current
    setWindowCurrState(updatedWindow);    // Update current window
    setNumbers(updatedNumbers);           // Update the numbers list
    setAvg(parseFloat(newAvg.toFixed(2))); // Set the average, rounded to 2 decimal places
  };

  // Simulate fetching new numbers on initial load and every 2 seconds after that
  useEffect(() => {
    fetchNumbersFromServer(selectedType); // Initial fetch based on selected type

    const intervalId = setInterval(() => {
      fetchNumbersFromServer(selectedType); // Fetch new numbers based on selected type
    }, 2000);

    return () => clearInterval(intervalId);  // Clean up when component is unmounted
  }, [selectedType, numbers, windowCurrState]);  // Depend on `selectedType` and `windowCurrState`

  return (
    <div>
      <h3>
        Qualified IDs include 'p' for prime, 'f' for Fibonacci, 'e' for even, and 'r' for random numbers.
      </h3>

      <h2>Sliding Window Average Calculator</h2>

      <div>
        <label htmlFor="numberType">Select Number Type: </label>
        <select
          id="numberType"
          value={selectedType}
          onChange={handleSelectChange}
        >
          <option value="e">Even Numbers (e)</option>
          <option value="p">Prime Numbers (p)</option>
          <option value="f">Fibonacci Numbers (f)</option>
          <option value="r">Random Numbers (r)</option>
        </select>
      </div>

      <div>
        <strong>Previous Window:</strong> {JSON.stringify(windowPrevState)}
        <br />
        <strong>Current Window:</strong> {JSON.stringify(windowCurrState)}
        <br />
        <strong>All Numbers (Unique):</strong> {JSON.stringify(numbers)}
        <br />
        <strong>Average:</strong> {avg}
      </div>

      <button onClick={() => fetchNumbersFromServer(selectedType)}>Simulate New Numbers</button>
    </div>
  );
};

export default AverageCalculator;

