import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(CustomEase);

const PreviewModal = ({projectList = [], activeIndex = 0, displayModal}) => {
  const previewsRef = useRef();
  const containerRef = useRef();
  const myEase1 = CustomEase.create("custom", "0.76, 0, 0.24, 1");
  const myEase2 = CustomEase.create("custom", "0.40, 0, 0.24, 1");

  // move modal
  useGSAP(() => {
    const con = containerRef.current;
    if (!con) return;

    const moveX = gsap.quickTo(con, "left", {duration: .8, ease: "power3.out"});
    const moveY = gsap.quickTo(con, "top", {duration: .8, ease: "power3.out"});

    window.addEventListener('mousemove', (e) => {
      const {clientX, clientY} = e;

      moveX(clientX);
      moveY(clientY);
    });

  }, [])

  // display, hide, and move previews
  useGSAP(() => {
    const previews = previewsRef.current;
    const con = containerRef.current;
    if (!(previews || con)) return;

    // move previews
    const translateFactor = -100/projectList.length;
    gsap.to(previews, {
      yPercent: (translateFactor * activeIndex),
      duration: .6,
      ease: myEase1
    })

    // hide and display modal
    if (displayModal) {
      gsap.to(con, {scale: 1, opacity: 1, duration: .6, ease: myEase2});
    } else {
      gsap.to(con, {scale: 0, duration: .6, ease: myEase2});
    }

  }, [activeIndex, displayModal])

  return (
    <div ref={containerRef} className="fixed opacity-0 scale-0 translate-x-[-50%] translate-y-[-50%] pointer-events-none top-0 left-0 w-[250px] aspect-square overflow-hidden">
      <div ref={previewsRef}>
        {
          projectList.map(({preview, color}, i) => (
            <div key={i} className="w-[250px] aspect-square flex justify-center items-center"
            style={{backgroundColor: color}}>
              <img className="object-cover w-[90%] rounded-[4px]" src={preview} alt={`image-${activeIndex}`} />
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default PreviewModal;