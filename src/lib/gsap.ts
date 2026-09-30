import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registering plugins touches `window`, so guard for the server. Module
// evaluation only happens once per bundle, so this effectively registers
// ScrollTrigger exactly once for the whole app.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
