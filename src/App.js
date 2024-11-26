import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import './App.css';

const App = () => {
  const pageSize = 5;
  const apiKey = '5e98a536ae584173913cb231c10a6dd4'; // Use environment variable

  const [progress, setProgress] = useState(0);
  const [country, setCountry] = useState('us'); // Default country

  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
  };

  return (
    <div>
      <Router>
        <NavBar onCountryChange={handleCountryChange} /> {/* Pass the country change handler */}
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<Home setProgress={setProgress} pageSize={pageSize} country={country} category="Home" />} />
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country={country} category="business" />} />
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment" />} />
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country={country} category="general" />} />
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country={country} category="health" />} />
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country={country} category="science" />} />
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country={country} category="sports" />} />
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country={country} category="technology" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
