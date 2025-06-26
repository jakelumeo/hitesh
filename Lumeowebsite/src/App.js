import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Homepage from './pages/Homepage';
import Products from './pages/Products';
import Product2 from './pages/Product2';
import Team from './pages/Team';
import TheStory from './pages/TheStory';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/team" element={<Team />} />
          <Route path="/story" element={<TheStory />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
