document.documentElement.classList.add("js");
const menuButton = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Abrir menu" : "Fechar menu");
    menu.classList.toggle("is-open", !open);
  });
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menu");
  }));
}
const revealItems = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else revealItems.forEach(item => item.classList.add("is-visible"));
const imageDialog = document.querySelector(".gallery-dialog");
if (imageDialog) {
  const galleryPhoto = imageDialog.querySelector("[data-gallery-photo]");
  const galleryCaption = imageDialog.querySelector("[data-gallery-caption]");
  document.querySelectorAll("[data-gallery-open]").forEach(button => {
    button.addEventListener("click", () => {
      const source = button.dataset.gallerySrc;
      const position = button.dataset.galleryPosition || "center";
      const title = button.querySelector("span")?.textContent?.trim() || "Imagem ilustrativa";
      galleryPhoto.style.backgroundImage = 'url("' + source + '")';
      galleryPhoto.style.backgroundPosition = position;
      galleryPhoto.setAttribute("aria-label", "Imagem ilustrativa ampliada: " + title);
      galleryCaption.textContent = title + " · imagem ilustrativa";
      imageDialog.showModal();
    });
  });
  imageDialog.querySelector("[data-gallery-close]")?.addEventListener("click", () => imageDialog.close());
  imageDialog.addEventListener("click", event => {
    if (event.target === imageDialog) imageDialog.close();
  });
}
