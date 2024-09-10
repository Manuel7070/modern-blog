import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import WelcomeBanner from "./components/WelcomeBanner";
import Features from "./components/Features";

function App() {
  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <Features />
    </>
  );
}

export default App;
