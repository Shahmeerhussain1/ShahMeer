// "use client"
// import { useEffect, useRef, useState } from "react"
// import { gsap } from "gsap"
// import { X } from "lucide-react"

// const Modal = ({ isOpen, onClose, children }) => {
//     const backdropRef = useRef(null)
//     const modalRef = useRef(null)
//     const [visible, setVisible] = useState(isOpen)

//     useEffect(() => {
//         if (isOpen) {
//             setVisible(true)
//             // Animate backdrop in
//             gsap.fromTo(
//                 backdropRef.current,
//                 { opacity: 0 },
//                 { opacity: 1, duration: 0.5, ease: "power2.out" }
//             )
//             // Animate modal in
//             gsap.fromTo(
//                 modalRef.current,
//                 { opacity: 0, y: 80, scale: 0.9 },
//                 { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "power3.in" }
//             )
//         } else {
//             // Animate exit
//             gsap.to(modalRef.current, {
//                 opacity: 0,
//                 y: 80,
//                 scale: 0.9,
//                 duration: 0.5,
//                 ease: "power3.in",
//             })
//             gsap.to(backdropRef.current, {
//                 opacity: 0,
//                 duration: 0.4,
//                 ease: "power2.in",
//                 onComplete: () => setVisible(false),
//             })
//         }
//     }, [isOpen])

//     // Close on outside click
//     const handleClickOutside = (e) => {
//         if (e.target === backdropRef.current) {
//             onClose?.()
//         }
//     }

//     // Close on ESC
//     useEffect(() => {
//         const handleEsc = (e) => {
//             if (e.key === "Escape") onClose?.()
//         }
//         if (isOpen) document.addEventListener("keydown", handleEsc)
//         return () => document.removeEventListener("keydown", handleEsc)
//     }, [isOpen, onClose])

//     if (!visible) return null

//     return (
//         <div
//             ref={backdropRef}
//             onClick={handleClickOutside}
//             className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
//         >
//             <div
//                 ref={modalRef}
//                 className="bg-[#E5E5DD] md:p-6 p-4 rounded-xl shadow-2xl max-w-[90%] md:max-w-lg w-full relative"
//             >
//                 <button
//                     onClick={onClose}
//                     className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
//                 >
//                     <X className="w-6 h-6" />
//                 </button>
//                 {children}
//             </div>
//         </div>
//     )
// }

// export default Modal





// GEMINI

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Modal = ({ isOpen, onClose, children }) => {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const [visible, setVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5, ease: "elastic.out(1, 0.5)" }
      );
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.5,
        ease: "power3.in",
      });
      gsap.to(backdropRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => setVisible(false),
      });
    }
  }, [isOpen]);

  const handleClickOutside = (e) => {
    if (e.target === backdropRef.current) {
      onClose?.();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!visible) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
    >
      <div
        ref={modalRef}
        className="bg-[#E5E5DD] md:p-6 p-4 rounded-xl shadow-2xl max-w-[90%] md:max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black transition"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;