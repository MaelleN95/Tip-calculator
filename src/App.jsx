import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Home from './pages/Home.jsx';
import Informations from './pages/Informations.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Loader from './components/loader/Loader.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Create a function called handleLoad that sets the loading state to false.
    const handleLoad = () => setLoading(false);
    // 2. Add an event listener to the window object that listens for the load event and calls the handleLoad function.
    window.addEventListener('load', handleLoad);

    return () => {
      // 3. Remove the event listener when the component unmounts.
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  return (
    <Router>
      <Header />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/informations" element={<Informations />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      )}

      <Footer />
    </Router>
  );
}

export default App;
