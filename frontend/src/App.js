import logo from './logo.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then(response => {
        setMessage(response.data.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {message}
        </p>
      </header>
    </div>
  );
}

export default App;
