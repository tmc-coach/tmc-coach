import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [link, setLink] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/techdemo')
      .then(res => res.json())
      .then(data => setLink(data.link));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <a href={link}>Backend says hi!</a>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
