//OFFICIAL
// import FutureRoadMap from "./components/FutureRoadMap";
// import HeroSection from "./components/Hero";
// import HowItAllBeganSection from "./components/HowItAllBegan";
// import LearninGoals from "./components/LearningGoals";
// import ToolsOfMyTrade from "./components/ToolsOfTrade";

// function App() {
//   return (
//     <section className="bg-[#E5E5DD] font-intertight flex flex-col">
//       <HeroSection />
//       <HowItAllBeganSection />
//       <ToolsOfMyTrade/>
//       <LearninGoals />
//       <FutureRoadMap />
//     </section>
   
//   );
// }

// export default App;





// GEMINI
import FutureRoadMap from "./components/FutureRoadMap";
import HeroSection from "./components/Hero";
import HowItAllBeganSection from "./components/HowItAllBegan";
import LearninGoals from "./components/LearningGoals";
import ToolsOfMyTrade from "./components/ToolsOfTrade";
import ContactSection from "./components/Contact"; // New contact section

function App() {
  return (
    <section className="bg-[#E5E5DD] font-intertight flex flex-col overflow-x-hidden">
      <HeroSection />
      <HowItAllBeganSection />
      <ToolsOfMyTrade />
      <LearninGoals />
      <FutureRoadMap />
      <ContactSection /> {/* Added new contact section */}
    </section>
  );
}

export default App;