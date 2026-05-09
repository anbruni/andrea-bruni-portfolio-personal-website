import Navbar from './components/Navbar'
import Hero from './components/Hero'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <Navbar />
      
      {/* Hero section - lo creiamo dopo */}
      <div className="flex items-center justify-center h-screen">
        <Hero />
      </div>
    </div>
  );
}

export default App;
