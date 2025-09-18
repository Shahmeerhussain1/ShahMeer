//OFFICIAL

// import { useState, useEffect, useRef } from "react"
// import Modal from "../ReliableComponents/Modal"
// import { gsap } from "gsap"
// import {
//     FaReact, FaHtml5, FaCss3Alt, FaSass, FaJs, FaNodeJs, FaDatabase, FaDocker, FaAws
// } from "react-icons/fa"
// import {
//     SiTailwindcss, SiNextdotjs, SiTypescript, SiRedux, SiBootstrap, SiVite, SiWebpack, SiNpm, SiYarn, SiFigma, SiExpress, SiMongodb, SiPostgresql, SiMysql,
//     SiFirebase,
//     SiTerraform,
//     SiDocker,
//     SiJenkins,
//     SiLinux,
//     SiGit,
//     SiGithub,
//     SiGnubash,
//     SiApache,
//     SiKubernetes,
//     SiNginx,
//     SiPostman,
// } from "react-icons/si"

// const IconSection = ({ title, description, icons }) => {
//     const iconsRef = useRef([])

//     useEffect(() => {
//         iconsRef.current.forEach((el, i) => {
//             gsap.to(el, {
//                 keyframes: [
//                     { y: -20, rotation: 10, scale: 1.1, duration: 1 },
//                     { y: 0, rotation: -10, scale: 0.9, duration: 1 },
//                     { y: -15, rotation: 5, scale: 1.05, duration: 1 },
//                     { y: 0, rotation: 0, scale: 1, duration: 1 },
//                 ],
//                 ease: "sine.inOut",
//                 repeat: -1,
//                 delay: i * 0.2,
//             })
//         })
//     }, [])

//     return (
//         <section className="py-20 px-6 md:px-12 text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
//             <p className="text-md sm:text-md md:text-xl text-center max-w-2xl mx-auto mb-12">{description}</p>
//             <div className="flex flex-wrap justify-center gap-8">
//                 {icons.map((item, i) => (
//                     <div
//                         key={i}
//                         ref={el => iconsRef.current[i] = el}
//                         className="text-6xl relative group"
//                         style={{ color: item.color }}
//                     >
//                         {item.icon}
//                         <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-sm bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
//                             {item.label}
//                         </span>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }
// const sections = {
//     "Front End": {
//         title: "FRONT END",
//         description: "I build beautiful and performant interfaces using React, Next.js, Tailwind CSS, SCSS, and more.",
//         icons: [
//             { icon: <FaHtml5 />, color: "#E34F26", label: "HTML5" },
//             { icon: <FaCss3Alt />, color: "#1572B6", label: "CSS3" },
//             { icon: <SiTailwindcss />, color: "#38B2AC", label: "TailwindCSS" },
//             { icon: <FaSass />, color: "#CC6699", label: "SCSS" },
//             { icon: <FaReact />, color: "#61DAFB", label: "React" },
//             { icon: <SiNextdotjs />, color: "#000000", label: "Next.js" },
//             { icon: <FaJs />, color: "#F7DF1E", label: "JavaScript" },
//             { icon: <SiTypescript />, color: "#3178C6", label: "TypeScript" },
//             { icon: <SiRedux />, color: "#764ABC", label: "Redux" },
//             { icon: <SiBootstrap />, color: "#7952B3", label: "Bootstrap" },
//             { icon: <SiVite />, color: "#646CFF", label: "Vite" },
//             { icon: <SiWebpack />, color: "#8DD6F9", label: "Webpack" },
//             { icon: <SiNpm />, color: "#CB3837", label: "NPM" },
//             { icon: <SiYarn />, color: "#2C8EBB", label: "Yarn" },
//             { icon: <SiFigma />, color: "#F24E1E", label: "Figma" },
//         ]
//     },
//     "Backend": {
//         title: "BACKEND",
//         description: "I design scalable and secure backend systems with Node.js, Express, databases, and cloud services.",
//         icons: [
//             { icon: <FaNodeJs />, color: "#68A063", label: "Node.js" },
//             { icon: <SiExpress />, color: "#000000", label: "Express.js" },
//             { icon: <SiMongodb />, color: "#4DB33D", label: "MongoDB" },
//             { icon: <SiFirebase />, color: "#FFCA28", label: "Firebase" },
//             { icon: <FaDocker />, color: "#2496ED", label: "Docker" },
//             { icon: <FaAws />, color: "#FF9900", label: "AWS" },
//         ]
//     },
//     "Database": {
//         title: "DATABASES",
//         description: "I specialize in NoSQL databases like MongoDB and Firebase for real-time, scalable apps.",
//         icons: [
//             { icon: <SiMongodb />, color: "#4DB33D", label: "MongoDB" },
//             { icon: <SiFirebase />, color: "#FFCA28", label: "Firebase" },
//         ]
//     },
//     "DevOps & Tools": {
//         title: "DEVOPS TOOLS",
//         description: "I use modern DevOps practices, CI/CD, and automation tools to build and deploy applications.",
//         icons: [
//             { icon: <FaAws />, color: "#FF9900", label: "AWS" },
//             { icon: <SiTerraform />, color: "#7B42BC", label: "Terraform" },
//             { icon: <SiDocker />, color: "#2496ED", label: "Docker" },
//             { icon: <SiJenkins />, color: "#D33833", label: "Jenkins" },
//             { icon: <SiKubernetes />, color: "#326CE5", label: "Kubernetes" },
//             { icon: <SiLinux />, color: "#FCC624", label: "Linux" },
//             { icon: <SiGit />, color: "#F05032", label: "Git" },
//             { icon: <SiGithub />, color: "#181717", label: "GitHub" },
//             { icon: <SiGnubash />, color: "#4EAA25", label: "Bash Scripting" },
//             { icon: <SiApache />, color: "#D22128", label: "Apache" },
//             { icon: <SiNginx />, color: "#009639", label: "NGINX" },
//             { icon: <SiPostman />, color: "#FF6C37", label: "Postman" },
//         ]
//     }
// }

// const ToolsOfMyTrade = () => {
//     const [open, setOpen] = useState(false)
//     const [selectedSection, setSelectedSection] = useState(null)
//     return (
//         <section className="h-screen w-[90vw] mx-auto  md:py-8 py-4 flex flex-col justify-between md:flex-row">
//             <div className="md:w-[50%] w-full">
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">TOOLS</h1>
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">OF MY</h1>
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">TRADE</h1>
//             </div>

//             <div className="md:w-[50%] w-full md:h-fit h-full flex flex-col justify-center">
//                 <p className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
//                     As a MERN stack developer and DevOps enthusiast, I specialize in creating full-stack web applications that are not only functional but scalable and engaging.
//                 </p>
//                 <p className="text-md sm:text-md md:text-xl lg:text-2xl text-right my-6">
//                     Here’s what powers my work:
//                     <p className="text-[10px] ">
//                         CLICK EACH FOR FURTHER DESCRIPTION
//                     </p>
//                 </p>
//                 <div className="flex gap-4 flex-wrap justify-end mb-6">
//                     {
//                         Object.keys(sections).map((name) => (
//                             <div
//                                 key={name}
//                                 onClick={() => {
//                                     setSelectedSection(name)
//                                     setOpen(true)
//                                 }}
//                                 className="px-4 py-2 border-[1.5px] border-black rounded-[32px] hover:text-[#E5E5DD] hover:bg-black cursor-pointer"
//                             >
//                                 {name}
//                             </div>
//                         ))
//                     }
//                 </div>
//                 <p className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
//                     I don’t just write code — I think about performance, user experience, and how to make systems work smoothly together.
//                 </p>
//             </div>
//             <Modal isOpen={open} onClose={() => setOpen(false)}>
//                 {selectedSection && (
//                     <IconSection
//                         title={sections[selectedSection].title}
//                         description={sections[selectedSection].description}
//                         icons={sections[selectedSection].icons}
//                     />
//                 )}
//             </Modal>
//         </section>
//     )
// }

// export default ToolsOfMyTrade



// GEMINI
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "../ReliableComponents/Modal";
import {
  FaReact, FaHtml5, FaCss3Alt, FaSass, FaJs, FaNodeJs, FaDatabase, FaDocker, FaAws
} from "react-icons/fa";
import {
  SiTailwindcss, SiNextdotjs, SiTypescript, SiRedux, SiBootstrap, SiVite, SiWebpack, SiNpm, SiYarn, SiFigma, SiExpress, SiMongodb, SiPostgresql, SiMysql,
  SiFirebase, SiTerraform, SiDocker, SiJenkins, SiLinux, SiGit, SiGithub, SiGnubash, SiApache, SiKubernetes, SiNginx, SiPostman,
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const IconSection = ({ title, description, icons }) => {
  const iconsRef = useRef([]);

  useEffect(() => {
    iconsRef.current.forEach((el, i) => {
      gsap.to(el, {
        keyframes: [
          { y: -20, rotation: 10, scale: 1.1, duration: 1 },
          { y: 0, rotation: -10, scale: 0.9, duration: 1 },
          { y: -15, rotation: 5, scale: 1.05, duration: 1 },
          { y: 0, rotation: 0, scale: 1, duration: 1 },
        ],
        ease: "sine.inOut",
        repeat: -1,
        delay: i * 0.2,
      });
    });
  }, []);

  return (
    <section className="py-20 px-6 md:px-12 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{title}</h1>
      <p className="text-md sm:text-md md:text-xl text-center max-w-2xl mx-auto mb-12">{description}</p>
      <div className="flex flex-wrap justify-center gap-8">
        {icons.map((item, i) => (
          <div
            key={i}
            ref={(el) => (iconsRef.current[i] = el)}
            className="text-6xl relative group"
            style={{ color: item.color }}
          >
            {item.icon}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition text-sm bg-black text-white px-2 py-1 rounded-md whitespace-nowrap">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

const sections = {
  "Front End": {
    title: "FRONT END",
    description: "I build beautiful and performant interfaces using React, Next.js, Tailwind CSS, SCSS, and more.",
    icons: [
      { icon: <FaHtml5 />, color: "#E34F26", label: "HTML5" },
      { icon: <FaCss3Alt />, color: "#1572B6", label: "CSS3" },
      { icon: <SiTailwindcss />, color: "#38B2AC", label: "TailwindCSS" },
      { icon: <FaSass />, color: "#CC6699", label: "SCSS" },
      { icon: <FaReact />, color: "#61DAFB", label: "React" },
      { icon: <SiNextdotjs />, color: "#000000", label: "Next.js" },
      { icon: <FaJs />, color: "#F7DF1E", label: "JavaScript" },
      { icon: <SiTypescript />, color: "#3178C6", label: "TypeScript" },
      { icon: <SiRedux />, color: "#764ABC", label: "Redux" },
      { icon: <SiBootstrap />, color: "#7952B3", label: "Bootstrap" },
      { icon: <SiVite />, color: "#646CFF", label: "Vite" },
      { icon: <SiWebpack />, color: "#8DD6F9", label: "Webpack" },
      { icon: <SiNpm />, color: "#CB3837", label: "NPM" },
      { icon: <SiYarn />, color: "#2C8EBB", label: "Yarn" },
      { icon: <SiFigma />, color: "#F24E1E", label: "Figma" },
    ]
  },
  "Backend": {
    title: "BACKEND",
    description: "I design scalable and secure backend systems with Node.js, Express, databases, and cloud services.",
    icons: [
      { icon: <FaNodeJs />, color: "#68A063", label: "Node.js" },
      { icon: <SiExpress />, color: "#000000", label: "Express.js" },
      { icon: <SiMongodb />, color: "#4DB33D", label: "MongoDB" },
      { icon: <SiFirebase />, color: "#FFCA28", label: "Firebase" },
      { icon: <FaDocker />, color: "#2496ED", label: "Docker" },
      { icon: <FaAws />, color: "#FF9900", label: "AWS" },
    ]
  },
  "Database": {
    title: "DATABASES",
    description: "I specialize in NoSQL databases like MongoDB and Firebase for real-time, scalable apps.",
    icons: [
      { icon: <SiMongodb />, color: "#4DB33D", label: "MongoDB" },
      { icon: <SiFirebase />, color: "#FFCA28", label: "Firebase" },
    ]
  },
  "DevOps & Tools": {
    title: "DEVOPS TOOLS",
    description: "I use modern DevOps practices, CI/CD, and automation tools to build and deploy applications.",
    icons: [
      { icon: <FaAws />, color: "#FF9900", label: "AWS" },
      { icon: <SiTerraform />, color: "#7B42BC", label: "Terraform" },
      { icon: <SiDocker />, color: "#2496ED", label: "Docker" },
      { icon: <SiJenkins />, color: "#D33833", label: "Jenkins" },
      { icon: <SiKubernetes />, color: "#326CE5", label: "Kubernetes" },
      { icon: <SiLinux />, color: "#FCC624", label: "Linux" },
      { icon: <SiGit />, color: "#F05032", label: "Git" },
      { icon: <SiGithub />, color: "#181717", label: "GitHub" },
      { icon: <SiGnubash />, color: "#4EAA25", label: "Bash Scripting" },
      { icon: <SiApache />, color: "#D22128", label: "Apache" },
      { icon: <SiNginx />, color: "#009639", label: "NGINX" },
      { icon: <SiPostman />, color: "#FF6C37", label: "Postman" },
    ]
  }
};

const ToolsOfMyTrade = () => {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRefs = useRef([]);
  const paragraphRefs = useRef([]);
  const buttonContainerRef = useRef(null);

  useEffect(() => {
    const headings = headingRefs.current;
    const paragraphs = paragraphRefs.current;

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

    // Similar animation for paragraphs: slide in from right with stagger
    gsap.fromTo(
      paragraphs,
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

    // Different animation for options/buttons: flip in with rotationX
    gsap.fromTo(
      buttonContainerRef.current.children,
      { rotationX: 90, opacity: 0 },
      {
        rotationX: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
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

    // No idle animation on headings/paragraphs/buttons, only background moves
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen w-[90vw] mx-auto md:py-8 py-4 flex flex-col justify-between md:flex-row relative"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none" />
      <div className="md:w-[50%] w-full relative z-10">
        <h1 ref={(el) => (headingRefs.current[0] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">TOOLS</h1>
        <h1 ref={(el) => (headingRefs.current[1] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">OF MY</h1>
        <h1 ref={(el) => (headingRefs.current[2] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">TRADE</h1>
      </div>

      <div className="md:w-[50%] w-full md:h-fit h-full flex flex-col justify-center relative z-10">
        <p ref={(el) => (paragraphRefs.current[0] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
          As a MERN stack developer and DevOps enthusiast, I specialize in creating full-stack web applications that are not only functional but scalable and engaging.
        </p>
        <p ref={(el) => (paragraphRefs.current[1] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right my-6">
          Here’s what powers my work:
          <p className="text-[10px]">CLICK EACH FOR FURTHER DESCRIPTION</p>
        </p>
        <div ref={buttonContainerRef} className="flex gap-4 flex-wrap justify-end mb-6">
          {Object.keys(sections).map((name) => (
            <div
              key={name}
              onClick={() => {
                setSelectedSection(name);
                setOpen(true);
              }}
              className="px-4 py-2 border-[1.5px] border-black rounded-[32px] hover:text-[#E5E5DD] hover:bg-black cursor-pointer"
            >
              {name}
            </div>
          ))}
        </div>
        <p ref={(el) => (paragraphRefs.current[2] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
          I don’t just write code — I think about performance, user experience, and how to make systems work smoothly together.
        </p>
      </div>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        {selectedSection && (
          <IconSection
            title={sections[selectedSection].title}
            description={sections[selectedSection].description}
            icons={sections[selectedSection].icons}
          />
        )}
      </Modal>
    </section>
  );
};

export default ToolsOfMyTrade;