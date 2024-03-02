import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Informations from './pages/Informations.jsx';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informations" element={<Informations />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
