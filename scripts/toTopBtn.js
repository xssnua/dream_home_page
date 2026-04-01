const toTopBtn = document.getElementById("toTopBtn");

window.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 200) {
    toTopBtn.classList.add("show");
  } else {
    toTopBtn.classList.remove("show");
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
