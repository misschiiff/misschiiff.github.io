/*$("toggle-bars").click(function() {
$("navMenu").toggleClass("show");
}); */

const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});