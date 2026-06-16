import { useState } from "react";

import "./App.css";




function App() {
  const [message, setMessage] = useState();



  async function fetchData() {
  try {
    const response = await fetch('http://127.0.0.1:8000/home/');

    if (!response.ok) {
      throw new Error('Failed to fetch data!')
    }
    const data = await response.json();
    setMessage(data.message);
  } catch (error) {
    console.log('Failed to get data', error)
  }
}




  return (
    <>
      <button onClick={fetchData}>Ckick me!</button>
      {message && <p className="text-8xl text-stone-900 bg-stone-200">{message}</p>}
    </>
  );
}

export default App;


