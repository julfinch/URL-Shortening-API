const hamburgerBtn = document.getElementById("hamburger-btn");
const closeBtn = document.getElementById("close-btn");
const navMenu = document.getElementById("nav-menu");

hamburgerBtn.addEventListener("click", () => {
    navMenu.style.display = "flex";
    hamburgerBtn.style.display = "none";
    closeBtn.style.display = "flex";
});

const closeNav = () => {
    navMenu.style.display = "none";
    hamburgerBtn.style.display = "flex";
    closeBtn.style.display = "none";
}
closeBtn.addEventListener("click", closeNav);