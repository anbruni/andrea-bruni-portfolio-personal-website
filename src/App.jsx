import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom';
import Starfield from './components/Starfield';
import HomePage from './pages/HomePage';
import ContactsPage from './pages/ContactsPage';
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <Starfield />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Routes>
    </div>
  );
}

export default App;
