import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";


const ProjectListItem = ({project: {name, services, duration, year}, index, setActiveIndex}) => {
  const containerRef = useRef();
  const overlayRef = useRef();
  const linesRef = useRef([]);

  useGSAP(() => {
    // hide overlays to top (default)
    gsap.set(overlayRef.current, {clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'});
    
    const lines = linesRef.current;
    const con = containerRef.current;
    // hide lines
    gsap.set(lines, {clipPath: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)"});

    
    // animate lines
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        gsap.to(lines, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "power2.out"
        })

        observer.disconnect();
      })
    }, {threshold: 0.1})

    // init observer
    observer.observe(con);

  }, {scope: containerRef})

    const detectEntryPoint = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseY = e.clientY;
      const midPoint = rect.top + rect.height / 2;

      const direction = mouseY < midPoint ? "top" : "bottom";

      return direction;
    }

    const handleMouseEnter = (e) => {
      setActiveIndex(index);
      const direction = detectEntryPoint(e);
      const overlay = overlayRef.current;

      if (direction === "top") {
        gsap.fromTo(overlay, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
        }, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: .25,
          ease: "power2.out"
        })
      } else {
        gsap.fromTo(overlay, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)'
        }, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: .25,
          ease: "power2.out"
        })
      }

    }

    const handleMouseLeave = (e) => {
      const direction = detectEntryPoint(e);
      const overlay = overlayRef.current;

      if (direction === "bottom") {
        gsap.fromTo(overlay, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }, {
          clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
          duration: .25,
          ease: "power2.out"
        })
      } else {
        gsap.fromTo(overlay, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
        }, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: .25,
          ease: "power2.out"
        })
      }
    }

  return (
    <div 
      ref={containerRef}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={(e) => handleMouseLeave(e)}
      className="group relative w-full h-[42px] flex items-center justify-between cursor-pointer project-list-con">

      {/* overlay */}
      <span ref={overlayRef} className="absolute top-0 left-0 w-full h-full bg-myBlack z-[-1]" />

      {/* line 1 */}
      <span ref={(el) => linesRef.current[0] = el} className="absolute left-0 top-0 w-full h-[1px] bg-myBlack" />

      <span className="w-[20%] list-first-item">{name}</span>
      <div className="flex w-[46%] justify-between">
        <span>{services}</span>
        <span>{duration}</span>
      </div>
      <span className="w-[20%] text-right list-last-item">{year}</span>

      {/* line 2 */}
      <span ref={(el) => linesRef.current[1] = el} className="absolute left-0 bottom-0 w-full h-[1px] bg-myBlack hidden group-last:block" />
    </div>
  )
}
 
export default ProjectListItem;