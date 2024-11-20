import {useEffect} from "react";

export function useWindowResize(cb: () => void): void {
  useEffect(() => {
    function onResize() {
      window.requestAnimationFrame(cb);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [cb]);
}
