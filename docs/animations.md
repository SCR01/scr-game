# 🎞️ Animations with GSAP

SCR Gaming uses [GSAP (GreenSock Animation Platform)](https://gsap.com/) to deliver high-performance, smooth scroll-triggered animations that enhance the visual appeal of the project.

---

## 🚀 Why GSAP?

* High performance, even on low-end devices
* Scroll-based triggers using **GSAP ScrollTrigger**
* Clean animation timelines and precise control
* Used by top-tier creative agencies and brands

---

## 📦 Installed GSAP Plugins

The following GSAP tools are used:

* `gsap` – Core GSAP animation library
* `ScrollTrigger` – Adds scroll-based animation control

Installed via:

```bash
npm install gsap
```

---

## 💡 How Animations Are Used

Here’s how animations are implemented in various parts of the app:

### 🧠 Component-Based Animations

Each major component (like Hero, About, etc.) uses `useEffect()` and `gsap.to()` or `gsap.from()` to define animations.

```js
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

useEffect(() => {
  gsap.from(".hero-text", {
    scrollTrigger: {
      trigger: ".hero-text",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
  });
}, []);
```

> Animations are tied to scroll position using `ScrollTrigger`.

---

### 🔄 Types of Animations Used

* Fade-ins and slide-ups
* Scale and zoom effects
* Pinning and parallax scroll effects (optional/future)
* Section entrance animations

---

## 📁 Where to Find Animation Code

You’ll find animation logic:

* Inside component `.jsx` files (like `Hero.jsx`, `About.jsx`)
* Triggered within `useEffect()` hooks
* Targeting class names or refs for specific elements

---

## 📌 Tips for Editing Animations

* Use `.from()` for entrance animations
* Add `markers: true` in `ScrollTrigger` for debugging
* Use timeline (`gsap.timeline()`) for chaining multiple animations

```js
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section",
    start: "top center",
  },
});
tl.from(".heading", { y: 50, opacity: 0 }).from(".content", { y: 30, opacity: 0 });
```

---

## 🧪 Want to Add More?

You can easily add new animations to any section. Just:

1. Assign a `className` or `ref` to the target element
2. Use `gsap.from()` or `.to()` inside a `useEffect`
3. Register `ScrollTrigger` if needed

---

Ready to fix animation bugs or explore common issues? See [Troubleshooting](./troubleshooting.md)
