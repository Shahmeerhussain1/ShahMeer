// //OFFICIAL
// const FutureRoadMap = () => {
//     return (
//         <section className="h-screen w-[90vw] mx-auto  md:py-8 py-4 flex flex-col justify-between md:flex-row">
//             <div className="md:w-[50%] w-full">
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">THE</h1>
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">ROAD</h1>
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">AHEAD</h1>

//             </div>

//             <div className="md:w-[50%] w-full md:h-fit h-full flex items-center md:items-start">
//                 <p className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
//                     I’m not here just to write code — I’m here to solve problems, learn relentlessly, and build digital experiences that matter.
//                     Whether it’s a startup looking for a skilled developer, a team needing MERN expertise, or a mentor who sees potential — I’m ready to grow, contribute, and innovate.
//                     Let’s build something great together.
//                 </p>
//             </div>
//         </section>
//     )
// }

// export default FutureRoadMap




// GEMINI
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FutureRoadMap = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRefs = useRef([]);
  const paragraphRef = useRef(null);

  useEffect(() => {
    const headings = headingRefs.current;

    // Similar animation for headings: slide in from left with stagger
    gsap.fromTo(
      headings,
      { x: -200, opacity: 0, rotation: -5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Similar animation for paragraph: slide in from right with stagger
    gsap.fromTo(
      paragraphRef.current,
      { x: 200, opacity: 0, rotation: 5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Background waving lines animation
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

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

    // No idle animation on headings/paragraphs, only background moves
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-[90vw] mx-auto md:py-8 py-4 flex flex-col justify-between md:flex-row relative"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" />
      <div className="md:w-[50%] w-full relative z-10">
        <h1 ref={(el) => (headingRefs.current[0] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">THE</h1>
        <h1 ref={(el) => (headingRefs.current[1] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">ROAD</h1>
        <h1 ref={(el) => (headingRefs.current[2] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">AHEAD</h1>
      </div>

      <div className="md:w-[50%] w-full md:h-fit h-full flex items-center md:items-start relative z-10">
        <p ref={paragraphRef} className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
          I’m not here just to write code — I’m here to solve problems, learn relentlessly, and build digital experiences that matter.
          Whether it’s a startup looking for a skilled developer, a team needing MERN expertise, or a mentor who sees potential — I’m ready to grow, contribute, and innovate.
          Let’s build something great together.
        </p>
      </div>
    </section>
  );
};

export default FutureRoadMap;