const userInfo = document.querySelector(".nav__user");
const dropdownMenu = document.querySelector(".dropdown-menu");
const toggleDropdownMenu = function () {
    if (dropdownMenu.classList.contains("hidden")) {
        dropdownMenu.classList.remove("hidden");
    } else {
        dropdownMenu.classList.add("hidden");
    }
};

userInfo.addEventListener("click", toggleDropdownMenu);
