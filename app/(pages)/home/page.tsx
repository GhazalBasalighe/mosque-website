import Footer from "@/app/components/layout/Footer/Footer";
import Header from "@/app/components/layout/Header/Header";
import HeroSection from "@/app/components/layout/HeroSection/HeroSection";
import NewsSection from "@/app/components/layout/NewsSection/NewsSection";
import React from "react";

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <NewsSection />
      <Footer />
    </>
  );
}

export default Home;
