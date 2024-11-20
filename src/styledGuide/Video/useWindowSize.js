import React from "react";

export function useWindowResize(cb) {
  React.useEffect(() => {
    function onResize() {
      window.requestAnimationFrame(cb);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [cb]);
}
