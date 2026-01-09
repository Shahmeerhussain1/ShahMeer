import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  MapPin,
  MessageCircle
} from "lucide-react";

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

 const DockIcon = ({ children, href, label, accent }) => (
  <a
    href={href}
    target="_blank"
    className={`
      relative w-12 h-12
      flex items-center justify-center
      rounded-full
      bg-black/90 text-white
      active:scale-95 transition
      ${accent === "green" && "bg-green-500"}
      ${accent === "blue" && "bg-blue-500"}
    `}
  >
    {children}
  </a>
);

const RailIcon = ({ children, href, label, accent }) => (
  <a
    href={href}
    target="_blank"
    className={`
      group relative w-14 h-14
      flex items-center justify-center
      rounded-full
      border border-black/10
      hover:scale-125 transition-all duration-300
      hover:shadow-xl
      ${accent === "green" && "hover:text-green-500 hover:border-green-500"}
      ${accent === "blue" && "hover:text-blue-500 hover:border-blue-500"}
    `}
  >
    {children}

    <span className="
      absolute right-16 opacity-0
      group-hover:opacity-100
      transition bg-black text-white text-sm px-3 py-1 rounded
      whitespace-nowrap
    ">
      {label}
    </span>
  </a>
);

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

  <div className="md:w-[50%] w-full relative z-10">

  {/* Mobile Floating Dock */}
  <div className="
    block
    md:hidden
    flex gap-4 px-6 py-3 justify-center
  ">
    <DockIcon href="mailto:hussainshahmeer99@gmail.com" label="Email">
      <Mail />
    </DockIcon>

    <DockIcon href="https://wa.me/921234567890" label="WhatsApp" accent="green">
      <MessageCircle />
    </DockIcon>

    <DockIcon href="https://linkedin.com/in/shahmeer-hussain" label="LinkedIn" accent="blue">
      <Linkedin />
    </DockIcon>

    <DockIcon href="https://github.com/shahmeer-hussain" label="GitHub">
      <Github />
    </DockIcon>
  </div>

  {/* Desktop Side Rail */}
  <div className="
    hidden md:flex flex-col gap-6 items-end
    absolute right-0 top-5
  ">
    <RailIcon href="mailto:hussainshahmeer99@gmail.com" label="Email">
      <Mail />
    </RailIcon>

    <RailIcon href="https://wa.me/921234567890" label="WhatsApp" accent="green">
      <MessageCircle />
    </RailIcon>

    <RailIcon href="https://linkedin.com/in/shahmeer-hussain" label="LinkedIn" accent="blue">
      <Linkedin />
    </RailIcon>

    <RailIcon href="https://github.com/shahmeer-hussain" label="GitHub">
      <Github />
    </RailIcon>
  </div>

</div>


    </section>
  );
};

export default ContactSection;