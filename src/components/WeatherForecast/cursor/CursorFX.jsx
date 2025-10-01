// src/components/CursorFX.jsx
import React, { useEffect, useRef } from "react";

export default function CursorFX() {
  const fxRef = useRef(null);

  useEffect(() => {
    const fxLayer = fxRef.current;
    if (!fxLayer) return;

    let last = 0;
    const maxParticles = 40;

    const spawn = (cls, x, y) => {
      const el = document.createElement("div");
      el.className = cls;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      fxLayer.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
      while (fxLayer.childNodes.length > maxParticles) {
        fxLayer.removeChild(fxLayer.firstChild);
      }
    };

    const onMove = (e) => {
      const now = performance.now();
      if (now - last < 60) return;
      last = now;
      spawn(Math.random() < 0.35 ? "fx-drop" : "fx-mist", e.clientX, e.clientY);
    };

    const onClick = (e) => {
      spawn("fx-ripple", e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return <div className="fx-layer" ref={fxRef} aria-hidden="true" />;
}
