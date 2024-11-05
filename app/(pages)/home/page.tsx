import EducationalResources from "@/app/components/layout/EducationalResources/EducationalResources";
import FAQ from "@/app/components/layout/FAQ/FAQ";
import Footer from "@/app/components/layout/Footer/Footer";
import Header from "@/app/components/layout/Header/Header";
import HeroSection from "@/app/components/layout/HeroSection/HeroSection";
import NewsSection from "@/app/components/layout/NewsSection/NewsSection";
import PrayerTimes from "@/app/components/layout/PrayerTimes/PrayerTimes";
import ReservationSection from "@/app/components/layout/ReservationSection/ReservationSection";

function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <NewsSection />
      <ReservationSection />
      <EducationalResources />
      <PrayerTimes />
      <FAQ />
      <Footer />
    </>
  );
}

export default Home;
