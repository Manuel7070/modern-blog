import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Blogs from "./Pages/Blogs";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const clerkFrontendApi = process.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
