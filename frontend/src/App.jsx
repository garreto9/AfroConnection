import './styles/App.css'
import Navbar from './components/navbar';
import Hero from './components/hero';
import Features from './components/features';
import Community from './components/community';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Community />
      <Footer />
    </>
  );
}

export default App;

