import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRefs = useRef([]);
  const detailRefs = useRef([]);

  useEffect(() => {
    const headings = headingRefs.current;
    const details = detailRefs.current;

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

    // Similar animation for details/paragraphs: slide in from right with stagger
    gsap.fromTo(
      details,
      { x: 200, opacity: 0, rotation: 5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        stagger: 0.3,
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

    // Background waving lines
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

    // No idle animation on headings/details, only background moves
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-[90vw] mx-auto md:py-8 py-4 flex flex-col justify-between md:flex-row relative"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" />
      <div className="md:w-[50%] w-full relative z-10">
        <h1 ref={(el) => (headingRefs.current[0] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">LET'S</h1>
        <h1 ref={(el) => (headingRefs.current[1] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">CONNECT</h1>
        <h1 ref={(el) => (headingRefs.current[2] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">AND BUILD</h1>
      </div>

      <div className="md:w-[50%] w-full md:h-fit h-full flex flex-col justify-center items-end relative z-10">
        <p ref={(el) => (detailRefs.current[0] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right mb-4">
           hussainshahmeer99@gmail.com
        </p>
        {/* <p ref={(el) => (detailRefs.current[1] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right mb-4">
          Phone: +92-123-4567890
        </p>
        <p ref={(el) => (detailRefs.current[2] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right mb-4">
          LinkedIn: linkedin.com/in/shahmeer-hussain
        </p>
        <p ref={(el) => (detailRefs.current[3] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right mb-4">
          GitHub: github.com/shahmeer-hussain
        </p> */}
        <p ref={(el) => (detailRefs.current[4] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
           Karachi, Pakistan
        </p>
      </div>
    </section>
  );
};

export default ContactSection;