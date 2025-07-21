document.addEventListener("DOMContentLoaded", function () {
  // --- VÁLTOZÓK DEFINIÁLÁSA ---
  const bodyElement = document.body;
  const rootElement = document.documentElement;
  const content = document.getElementById("content");
  const tocContainer = document.getElementById("toc");
  const readerHeader = document.querySelector(".reader-header");
  const mainContent = document.getElementById("content");
  const toggleTocButton = document.getElementById("toggle-toc");
  const increaseFontBtn = document.getElementById("increase-font");
  const decreaseFontBtn = document.getElementById("decrease-font");
  const themeLightBtn = document.getElementById("theme-light-btn");
  const themeDarkBtn = document.getElementById("theme-dark-btn");
  let currentScale = 1.0;

  // --- TARTALOMJEGYZÉK GENERÁLÁSA ---
  if (content && tocContainer) {
    const headers = content.querySelectorAll("h1, h2, h3");
    if (headers.length > 0) {
      headers.forEach((h) => {
        const link = document.createElement("a");
        const id = h.textContent
          .trim()
          .replace(/\s+/g, "-")
          .toLowerCase()
          .replace(/[^a-z0-9-]/g, "");
        h.id = id;
        link.href = "#" + id;
        link.textContent = h.textContent;

        if (h.tagName === "H2") {
          link.classList.add("level-h2");
        }
        if (h.tagName === "H3") {
          link.classList.add("level-h3");
        }

        tocContainer.appendChild(link);
      });
    } else {
      if (toggleTocButton) {
        toggleTocButton.style.display = "none";
      }
      tocContainer.innerHTML = "<p>Nincsenek fejezetcímek.</p>";
    }
  }

  // --- BECSÚSZÓ MENÜ (TOC) VEZÉRLÉSE ---
  if (toggleTocButton) {
    toggleTocButton.addEventListener("click", function () {
      tocContainer.classList.toggle("open");
    });
  }
  if (tocContainer) {
    tocContainer.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        tocContainer.classList.remove("open");
      }
    });
  }

  // --- BETŰMÉRET ÁLLÍTÁSA ---
  if (increaseFontBtn && decreaseFontBtn) {
    increaseFontBtn.addEventListener("click", function () {
      if (currentScale < 1.8) {
        currentScale += 0.1;
        rootElement.style.fontSize = currentScale * 100 + "%";
      }
    });
    decreaseFontBtn.addEventListener("click", function () {
      if (currentScale > 0.7) {
        currentScale -= 0.1;
        rootElement.style.fontSize = currentScale * 100 + "%";
      }
    });
  }

  // --- TÉMAVÁLTÁS ÉS MENTÉS ---
  function applyTheme(theme) {
    if (theme === "dark") {
      bodyElement.classList.add("dark-theme");
      themeDarkBtn.classList.add("active");
      themeLightBtn.classList.remove("active");
    } else {
      bodyElement.classList.remove("dark-theme");
      themeLightBtn.classList.add("active");
      themeDarkBtn.classList.remove("active");
    }
  }

  function setThemeAndSave(theme) {
    applyTheme(theme);
    localStorage.setItem("readerTheme", theme); // Egyedi név a mentésnek
  }

  if (themeLightBtn && themeDarkBtn) {
    themeLightBtn.addEventListener("click", () => setThemeAndSave("light"));
    themeDarkBtn.addEventListener("click", () => setThemeAndSave("dark"));

    // Oldalbetöltéskor ellenőrizzük a mentett témát
    const savedTheme = localStorage.getItem("readerTheme");
    if (savedTheme) {
      applyTheme(savedTheme);
    }
    // Ha nincs mentett téma, a rendszerbeállítást vesszük alapul
    else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      applyTheme("dark");
    } else {
      applyTheme("light"); // Alapértelmezett
    }
  }

  // --- FEJLÉC ÉS TOC KEZELÉSE KATTINTÁSRA ---
  if (readerHeader && mainContent && tocContainer) {
    mainContent.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        return;
      }

      const isHeaderVisible = readerHeader.classList.contains("is-visible");
      const isTocOpen = tocContainer.classList.contains("open");

      if (isHeaderVisible || isTocOpen) {
        readerHeader.classList.remove("is-visible");
        tocContainer.classList.remove("open");
      } else {
        readerHeader.classList.add("is-visible");
      }
    });

    readerHeader.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    tocContainer.addEventListener("click", (event) => {
      if (event.target.tagName !== "A") {
        event.stopPropagation();
      }
    });
  }
});
