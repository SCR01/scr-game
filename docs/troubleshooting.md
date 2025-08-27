# 🧩 Troubleshooting

Here are some common issues you might encounter while working with the SCR Gaming project, along with suggested fixes and debugging tips.

---

## 🐞 Scroll Animations Not Triggering

**Cause:**

* ScrollTrigger not properly registered
* Incorrect element class or ref used
* Component not mounted before animation triggers

**Fix:**

* Ensure `ScrollTrigger` is registered:

  ```js
  gsap.registerPlugin(ScrollTrigger);
  ```
* Double-check the className or ref matches the target element
* Wrap animation code inside `useEffect()` to ensure DOM is ready

---

## 🚫 Animations Running Only Once or Not at All

**Cause:** ScrollTrigger start/end values might be misconfigured.

**Fix:**

* Use debugging markers to fine-tune trigger points:

  ```js
  scrollTrigger: {
    trigger: ".your-element",
    start: "top 80%",
    markers: true,
  }
  ```
* Try adjusting `start`, `end`, or `toggleActions` values

---

## 📱 Layout Issues on Mobile

**Cause:** Some animations or styles may not be optimized for mobile.

**Fix:**

* Use Tailwind’s responsive classes (e.g., `md:text-xl`, `lg:flex`)
* Avoid fixed units (like `px`) in favor of relative ones (`vw`, `vh`, `%`)
* Test in responsive dev tools

---

## ❌ Build Fails / App Crashes

**Fix:**

* Ensure you’ve run `npm install` before `npm run dev`
* Delete `node_modules` and lock files, then reinstall:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
* Check if Node.js version is compatible (Node 16+ recommended)

---

## 🎯 General Debugging Tips

* Use browser dev tools console for errors
* Log values or DOM nodes before animating them
* Use `ScrollTrigger.refresh()` in some cases where layout changes dynamically
* Read [GSAP ScrollTrigger Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)

---

Still need help? Check the [Contact](./contact.md) section to reach out or open an issue on [GitHub](https://github.com/SCR01/scr-game/issues).