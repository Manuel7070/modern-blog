import React from "react";
import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import Features from "../components/Features";
import Newsletter from "../components/NewsLetter";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <WelcomeBanner />
      <Features />
      <Newsletter />
    </>
  );
}
