const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

const fromPx = (s) => {return Number(s.slice(0, s.length - 2))};
const toPx = (n) => {return String(n) + 'px'};

const fromPercent = (s) => {return Number(s.slice(0, s.length - 1))};
const toPercent = (n) => {return String(n) + '%'};

// ------------------------------------------------------------------------

const header = document.getElementById("header");
const headerContainer = document.getElementById("header-container")
const menuItems = document.getElementsByClassName("menu-icon-square");
const menuIcons = document.getElementsByClassName("menu-icon");
const iconLines = document.getElementsByClassName("icon-line");
const headerDragger = document.getElementById("header-dragger");
const headerDraggerArrow = document.getElementById("header-dragger-arrow");

if (isMobile) {
    header.style.backgroundColor = "var(--alt-black)"
} else {
    header.style.width = "auto";
    headerContainer.style.borderBottomLeftRadius = "1.5vw";

    headerDragger.onmouseover = () => {
        header.style.top = "0vw";
        headerDraggerArrow.style.transform = "rotate(180deg)";
    };
    headerDragger.onmouseout = () => {
        header.style.top = "-4vw";
        headerDraggerArrow.style.transform = "rotate(0deg)";
    };
    header.onmouseover = headerDragger.onmouseover;
    header.onmouseout = headerDragger.onmouseout;
}


for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].onmouseover = () => {
        menuItems[i].style.backgroundColor = "var(--alt-white)";
        menuIcons[i].style.filter = "invert(0%)";
        iconLines[i].style.width = "2vw";
        iconLines[i].style.marginLeft = "0vw";
    };
    menuItems[i].onmouseout = () => {
        menuItems[i].style.backgroundColor = "var(--alt-black)";
        menuIcons[i].style.filter = "invert(100%)";
        iconLines[i].style.width = "0vw";
        iconLines[i].style.marginLeft = "1vw"
    }
}