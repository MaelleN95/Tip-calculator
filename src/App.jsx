import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Informations from './pages/Informations.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/informations" element={<Informations />} />
      </Routes>
    </Router>
  );
}

export default App;
