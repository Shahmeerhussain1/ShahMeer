// //OFFICIAL
// import { useState } from "react"
// import Modal from "../ReliableComponents/Modal"


// const IconSection = ({ selectedSection }) => {

//     return (
//         <section className="py-10 px-4 md:px-8 text-center">
//             <h1 className="text-4xl md:text-5xl font-bold mb-6">{selectedSection.name}</h1>
//             <p className="text-md sm:text-md md:text-xl text-center max-w-2xl mx-auto mb-12">{`( ${selectedSection.org} )`}</p>
//             <p className="text-xs sm:text-sm md:text-md text-center max-w-2xl mx-auto mb-12">{`${selectedSection.description}`}</p>
//             <a
//                 href={selectedSection.href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-4 py-2 border-[1.5px] border-black rounded-[32px] hover:text-[#E5E5DD] hover:bg-black cursor-pointer">
//                 View Certificate
//             </a>
//         </section>
//     )
// }

// const LearninGoals = () => {
//     const [open, setOpen] = useState(false)
//     const [selectedSection, setSelectedSection] = useState(null)
//     const [certifications, setCertifications] = useState([
//         {
//             name: "Responsive Web Design",
//             org: "freecodecamp",
//             href: "https://www.freecodecamp.org/certification/shahmeer-hussain/responsive-web-design",
//             description: "The Responsive Web Design Certification from freeCodeCamp is a 300-hour program focused on mastering front-end web development fundamentals. It covers HTML5, CSS3, and Responsive Design principles, emphasizing the creation of websites that adapt seamlessly to any device or screen size."
//         },
//         {
//             name: "Introduction to Cybersecurity",
//             org: "cisco",
//             href: "https://www.credly.com/badges/6a465e03-b48a-4fe9-b6cd-e1d82d5b31f8/linked_in_profile",
//             description: "The Introduction to Cybersecurity certification from Cisco provides foundational knowledge of cybersecurity concepts, including types of threats, attacks, and vulnerabilities. It emphasizes the importance of data protection, security laws, and best practices to safeguard individuals and organizations in a digital-first world."
//         },
//         {
//             name: "Networking Basic",
//             org: "cisco",
//             href: "https://media.licdn.com/dms/image/v2/D562DAQE6uBuyAJyuhg/profile-treasury-document-images_800/B56ZT.Rs.qHoAk-/1/1739432843048?e=1757548800&v=beta&t=KBgLme88V9jq2zw4ZzCjMCpi8xY0s_EiHAz1i1zD7uM",
//             description: "The Networking Basics certification from Cisco covers the core principles of computer networking, including IP addressing, network protocols, and data transmission. It equips learners with practical knowledge of how networks operate and lays the groundwork for pursuing more advanced networking and cybersecurity studies."
//         },
//         {
//             name: "Introduction to MongoDB",
//             org: "mongoDB",
//             href: "https://learn.mongodb.com/c/1yO4wTMyS0ObOCJctXJqiA",
//             description: "The Introduction to MongoDB certification demonstrates proficiency in understanding NoSQL databases and the core features of MongoDB. It covers CRUD operations, data modeling, and query techniques, providing the skills to efficiently store, manage, and retrieve data in document-oriented databases."
//         },
//         {
//             name: "NDG Linux Unhatched",
//             org: "cisco",
//             href: "https://media.licdn.com/dms/image/v2/D4D2DAQHkVc73kpM2lA/profile-treasury-document-images_800/profile-treasury-document-images_800/1/1714919673755?e=1757548800&v=beta&t=VHLKzm4Qb7UFI5e9kWCou0Xueje-AyR5tEfbpUcaipY",
//             description: "The NDG Linux Unhatched certification provides a beginner-friendly introduction to the Linux operating system. It covers essential Linux commands, file system navigation, and basic shell scripting, giving learners practical exposure to one of the most widely used operating systems in enterprise environments."
//         },
//         {
//             name: "Getting Started with MongoDB Atlas",
//             org: "mongoDB",
//             href: "https://learn.mongodb.com/c/SC3-cZHKQU-1OuuFiOhLOg",
//             description: "The Getting Started with MongoDB Atlas certification focuses on managing cloud-hosted databases using MongoDB Atlas. It covers deploying clusters, connecting applications, managing security, and monitoring performance, equipping learners with the skills to build scalable and cloud-native applications."
//         },
//         {
//             name: "MongoDB Node.js Developer Path",
//             org: "mongoDB",
//             href: "https://learn.mongodb.com/c/kPmNiBVaTGyCMWaPRfImMw",
//             description: "The MongoDB Node.js Developer Path certification validates expertise in integrating MongoDB with Node.js applications. It covers schema design, aggregation pipelines, indexing, and performance optimization, preparing developers to build robust, data-driven applications using modern JavaScript technologies."
//         }
//     ]
//     )
//     return (
//         <section className="h-screen w-[90vw] mx-auto  md:py-8 py-4 flex flex-col justify-between md:flex-row">
//             <div className="md:w-[50%] w-full">
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">STILL A</h1>
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">STUDENT</h1>
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">FOREVER</h1>
//                 <h1 className="text-fluid-dynamic font-black leading-[100%] text-left">LEARNER</h1>

//             </div>

//             <div className="md:w-[50%] w-full md:h-fit h-full flex flex-col justify-center">
//                 <p className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
//                     Even though I’m already working professionally, I’m still completing my Bachelor’s in Computer Science — graduating in March 2024. But I’ve never believed that learning stops in the classroom.
//                 </p>
//                 <p className="text-md sm:text-md md:text-xl lg:text-2xl text-right my-6">
//                     I’ve earned certifications in:
//                     <p className="text-[10px] ">
//                         CLICK EACH FOR FURTHER DESCRIPTION
//                     </p>
//                 </p>
//                 <div className="flex gap-4 flex-wrap justify-end mb-6">
//                     {
//                         certifications.map((certi, idx) => (
//                             <div
//                                 key={idx}
//                                 onClick={() => {
//                                     setSelectedSection(certi)
//                                     setOpen(true)
//                                 }}
//                                 className="px-4 py-2 border-[1.5px] border-black rounded-[32px] hover:text-[#E5E5DD] hover:bg-black cursor-pointer"
//                             >
//                                 {certi.name}
//                             </div>
//                         ))
//                     }
//                 </div>
//             </div>

//             <Modal isOpen={open} onClose={() => setOpen(false)}>
//                 {selectedSection && (
//                     <IconSection
//                         selectedSection={selectedSection}
//                     />
//                 )}
//             </Modal>
//         </section>
//     )
// }

// export default LearninGoals


// GEMINI
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "../ReliableComponents/Modal";

gsap.registerPlugin(ScrollTrigger);

const IconSection = ({ selectedSection }) => {
  return (
    <section className="py-10 px-4 md:px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">{selectedSection.name}</h1>
      <p className="text-md sm:text-md md:text-xl text-center max-w-2xl mx-auto mb-12">{`( ${selectedSection.org} )`}</p>
      <p className="text-xs sm:text-sm md:text-md text-center max-w-2xl mx-auto mb-12">{`${selectedSection.description}`}</p>
      <a
        href={selectedSection.href}
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 border-[1.5px] border-black rounded-[32px] hover:text-[#E5E5DD] hover:bg-black cursor-pointer"
      >
        View Certificate
      </a>
    </section>
  );
};

const LearninGoals = () => {
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const headingRefs = useRef([]);
  const paragraphRefs = useRef([]);
  const buttonContainerRef = useRef(null);
  const [certifications, setCertifications] = useState([
    {
      name: "Responsive Web Design",
      org: "freecodecamp",
      href: "https://www.freecodecamp.org/certification/shahmeer-hussain/responsive-web-design",
      description: "The Responsive Web Design Certification from freeCodeCamp is a 300-hour program focused on mastering front-end web development fundamentals. It covers HTML5, CSS3, and Responsive Design principles, emphasizing the creation of websites that adapt seamlessly to any device or screen size."
    },
    {
      name: "Introduction to Cybersecurity",
      org: "cisco",
      href: "https://www.credly.com/badges/6a465e03-b48a-4fe9-b6cd-e1d82d5b31f8/linked_in_profile",
      description: "The Introduction to Cybersecurity certification from Cisco provides foundational knowledge of cybersecurity concepts, including types of threats, attacks, and vulnerabilities. It emphasizes the importance of data protection, security laws, and best practices to safeguard individuals and organizations in a digital-first world."
    },
    {
      name: "Networking Basic",
      org: "cisco",
      href: "https://media.licdn.com/dms/image/v2/D562DAQE6uBuyAJyuhg/profile-treasury-document-images_800/B56ZT.Rs.qHoAk-/1/1739432843048?e=1757548800&v=beta&t=KBgLme88V9jq2zw4ZzCjMCpi8xY0s_EiHAz1i1zD7uM",
      description: "The Networking Basics certification from Cisco covers the core principles of computer networking, including IP addressing, network protocols, and data transmission. It equips learners with practical knowledge of how networks operate and lays the groundwork for pursuing more advanced networking and cybersecurity studies."
    },
    {
      name: "Introduction to MongoDB",
      org: "mongoDB",
      href: "https://learn.mongodb.com/c/1yO4wTMyS0ObOCJctXJqiA",
      description: "The Introduction to MongoDB certification demonstrates proficiency in understanding NoSQL databases and the core features of MongoDB. It covers CRUD operations, data modeling, and query techniques, providing the skills to efficiently store, manage, and retrieve data in document-oriented databases."
    },
    {
      name: "NDG Linux Unhatched",
      org: "cisco",
      href: "https://media.licdn.com/dms/image/v2/D4D2DAQHkVc73kpM2lA/profile-treasury-document-images_800/profile-treasury-document-images_800/1/1714919673755?e=1757548800&v=beta&t=VHLKzm4Qb7UFI5e9kWCou0Xueje-AyR5tEfbpUcaipY",
      description: "The NDG Linux Unhatched certification provides a beginner-friendly introduction to the Linux operating system. It covers essential Linux commands, file system navigation, and basic shell scripting, giving learners practical exposure to one of the most widely used operating systems in enterprise environments."
    },
    {
      name: "Getting Started with MongoDB Atlas",
      org: "mongoDB",
      href: "https://learn.mongodb.com/c/SC3-cZHKQU-1OuuFiOhLOg",
      description: "The Getting Started with MongoDB Atlas certification focuses on managing cloud-hosted databases using MongoDB Atlas. It covers deploying clusters, connecting applications, managing security, and monitoring performance, equipping learners with the skills to build scalable and cloud-native applications."
    },
    {
      name: "MongoDB Node.js Developer Path",
      org: "mongoDB",
      href: "https://learn.mongodb.com/c/kPmNiBVaTGyCMWaPRfImMw",
      description: "The MongoDB Node.js Developer Path certification validates expertise in integrating MongoDB with Node.js applications. It covers schema design, aggregation pipelines, indexing, and performance optimization, preparing developers to build robust, data-driven applications using modern JavaScript technologies."
    }
  ]);

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

    // Different animation for options/buttons: pop in with scale and rotation
    gsap.fromTo(
      buttonContainerRef.current.children,
      { scale: 0, rotation: 180, opacity: 0 },
      {
        scale: 1,
        rotation: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
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
        <h1 ref={(el) => (headingRefs.current[0] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">STILL A</h1>
        <h1 ref={(el) => (headingRefs.current[1] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">STUDENT</h1>
        <h1 ref={(el) => (headingRefs.current[2] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">FOREVER</h1>
        <h1 ref={(el) => (headingRefs.current[3] = el)} className="text-fluid-dynamic font-black leading-[100%] text-left">LEARNER</h1>
      </div>

      <div className="md:w-[50%] w-full md:h-fit h-full flex flex-col justify-center relative z-10">
        <p ref={(el) => (paragraphRefs.current[0] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right">
          Even though I’m already working professionally, I’m still completing my Bachelor’s in Computer Science — graduating in March 2024. But I’ve never believed that learning stops in the classroom.
        </p>
        <p ref={(el) => (paragraphRefs.current[1] = el)} className="text-md sm:text-md md:text-xl lg:text-2xl text-right my-6">
          I’ve earned certifications in:
          <p className="text-[10px]">CLICK EACH FOR FURTHER DESCRIPTION</p>
        </p>
        <div ref={buttonContainerRef} className="flex gap-4 flex-wrap justify-end mb-6">
          {certifications.map((certi, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedSection(certi);
                setOpen(true);
              }}
              className="px-4 py-2 border-[1.5px] border-black rounded-[32px] hover:text-[#E5E5DD] hover:bg-black cursor-pointer"
            >
              {certi.name}
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={open} onClose={() => setOpen(false)}>
        {selectedSection && <IconSection selectedSection={selectedSection} />}
      </Modal>
    </section>
  );
};

export default LearninGoals;