import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import WelcomeBanner from "./components/WelcomeBanner";

function App() {
  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <h2>Welcome to the Blogging Page</h2>
    </>
  );
}

export default App;
