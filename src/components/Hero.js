// //OFFICIAL
// const HeroSection = () => {
//     return (
//         <section className="h-screen w-[90vw] mx-auto  md:py-8 py-4 flex flex-col justify-between">
//             <div className="flex justify-between flex-col h-full sm:flex-row">
//                 <div>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">HI</h1>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">I AM</h1>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">SHAH</h1>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">MEER</h1>
//                 </div>
//                 <div>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-right">A</h1>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-right">DEV</h1>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-right">CRAFTER</h1>
//                     <h1 className="text-fluid-dynamic font-black leading-[100%] text-right">LEARNER</h1>
//                 </div>
//             </div>

//             {/* <div className="w-full">
//                 <div className="absolute bottom-0 w-[90%]">
//                     <img src="./shah.png" className="w-[70%] md:w-[35%]" />
//                 </div>
//             </div> */}
//         </section>
//     )
// }

// export default HeroSection




// GEMINI
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const leftHeadingRefs = useRef([]);
  const rightHeadingRefs = useRef([]);

  useEffect(() => {
    const leftHeadings = leftHeadingRefs.current;
    const rightHeadings = rightHeadingRefs.current;

    // Similar animation for left headings: slide in from left with stagger
    gsap.fromTo(
      leftHeadings,
      { x: -200, opacity: 0, rotation: -5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power4.out",
      }
    );

    // Similar animation for right headings: slide in from right with stagger
    gsap.fromTo(
      rightHeadings,
      { x: 200, opacity: 0, rotation: 5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5,
      }
    );

    // Background waving lines
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#D1D1C9";
      ctx.lineWidth = 2;

      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2 + i * 50);
        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * 0.01 + time + i) * 20 + canvas.height / 2 + i * 50;
          ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.05;
      requestAnimationFrame(draw);
    };
    draw();

    // Parallax on canvas
    gsap.to(canvas, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // No idle animation on headings, only background moves
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-[90vw] mx-auto md:py-8 py-4 flex flex-col justify-between relative">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" />
      <div className="flex justify-between flex-col h-full sm:flex-row relative z-10">
        <div>
          <h1 ref={(el) => (leftHeadingRefs.current[0] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">HI</h1>
          <h1 ref={(el) => (leftHeadingRefs.current[1] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">I AM</h1>
          <h1 ref={(el) => (leftHeadingRefs.current[2] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">SHAH</h1>
          <h1 ref={(el) => (leftHeadingRefs.current[3] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">MEER</h1>
        </div>
        <div>
          <h1 ref={(el) => (rightHeadingRefs.current[0] = el)} className="text-fluid-dynamic font-black leading-[100%] text-right">A</h1>
          <h1 ref={(el) => (rightHeadingRefs.current[1] = el)} className="text-fluid-dynamic font-black leading-[100%] text-right">DEV</h1>
          <h1 ref={(el) => (rightHeadingRefs.current[2] = el)} className="text-fluid-dynamic font-black leading-[100%] text-right">CRAFTER</h1>
          <h1 ref={(el) => (rightHeadingRefs.current[3] = el)} className="text-fluid-dynamic font-black leading-[100%] text-right">LEARNER</h1>
        </div>
      </div>
      {/* <div className="w-full absolute bottom-0 w-[90%] relative z-10">
        <img
          src="./shah.png"
          className="w-[70%] md:w-[35%]"
          onLoad={(e) => {
            gsap.fromTo(
              e.target,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 1 }
            );
          }}
        />
      </div> */}
    </section>
  );
};

export default HeroSection;