const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

const fromPx = (s) => {return Number(s.slice(0, s.length - 2))};
const toPx = (n) => {return String(n) + 'px'};

const fromPercent = (s) => {return Number(s.slice(0, s.length - 1))};
const toPercent = (n) => {return String(n) + '%'};

const header = document.getElementById("header");

if (isMobile) {

} else {
    header.style.width = "auto";
    // header.style.borderBottomLeftRadius = "1.5vw";
    header.style.backgroundColor = "transparent";
}

const menuItems = document.getElementsByClassName("menu-item");
const menuIcons = document.getElementsByClassName("menu-icon");

for (let i = 0; i < menuItems.length; i++) {
    if (!isMobile) {
        menuItems[i].style.backgroundColor = "var(--alt-black)";
    }
    menuItems[i].onmouseover = () => {
        menuItems[i].style.backgroundColor = "var(--alt-white)";
        menuIcons[i].style.filter = "invert(0%)"
    };
    menuItems[i].onmouseout = () => {
        if (isMobile) {
            menuItems[i].style.backgroundColor = "transparent";
        } else {
            menuItems[i].style.backgroundColor = "var(--alt-black)";
        }
        menuIcons[i].style.filter = "invert(100%)";
    }
}