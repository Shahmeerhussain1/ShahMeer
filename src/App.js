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
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeroSection from "./components/Hero";
import HowItAllBeganSection from "./components/HowItAllBegan";
import ToolsOfMyTrade from "./components/ToolsOfTrade";
import LearninGoals from "./components/LearningGoals";
import FutureRoadMap from "./components/FutureRoadMap";
import ContactSection from "./components/Contact";
import SharedCommentBox from "./components/SharedCommentBox"; // Import the new component

function HomePage() {
  return (
    <section className="bg-[#E5E5DD] font-intertight flex flex-col overflow-x-hidden">
      <HeroSection />
      <HowItAllBeganSection />
      <ToolsOfMyTrade />
      <LearninGoals />
      <FutureRoadMap />
      <ContactSection />
    </section>
  );
}

function App() {
  console.log("KEY",process.env.REACT_APP_SUPABASE_URL);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/st" element={<SharedCommentBox />} />
        {/* Optional: 404 fallback */}
        <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;