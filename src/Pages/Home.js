import React from "react";
import Navbar from "../components/Navbar";
import WelcomeBanner from "../components/WelcomeBanner";
import Features from "../components/Features";

export default function Home() {
  return (
    <>
      <WelcomeBanner />
      <Features />
    </>
  );
}
