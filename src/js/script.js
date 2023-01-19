// Some useful functions
const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

function fromPxVw(s) {return Number(s.slice(0, s.length - 2))};
function units(n) {return String("calc(var(--unit) *" + n + ")")}

function fromPercent (s) {return Number(s.slice(0, s.length - 1))};
function toPercent(n) {return String(n) + '%'};

// ------------------------------------------------------------------------
let UIMultiplier = 1;
if (isMobile) UIMultiplier = 3.1;

document.documentElement.style.setProperty("--unit", UIMultiplier + 'vw');
document.documentElement.style.setProperty("--mobile", Number(isMobile));
// ------------------------------------------------------------------------

const header = document.getElementById("header");
const headerContainer = document.getElementById("header-container")
const headerDragger = document.getElementById("header-dragger");
const headerDraggerArrow = document.getElementById("header-dragger-arrow");

const menuBackgrounds = document.getElementsByClassName("menu-icon-white-bg");
const menuIcons = document.getElementsByClassName("menu-icon");
const menuLinks = document.getElementsByClassName("menu-link");
const iconLines = document.getElementsByClassName("icon-line");

const showHeader = () => {
    header.style.top = 0;
    headerDraggerArrow.style.transform = "rotate(180deg)"
}

const hideHeader = () => {
    header.style.top = units(-4);
    headerDraggerArrow.style.transform = "rotate(0deg)"
}

// Header arrow animations
if (isMobile) {
    headerDraggerArrow.style.transition = "";
    headerDragger.style.transition = "";
    headerDragger.style.height = 0;
    headerDraggerArrow.style.height = 0;
    header.style.top = 0;
} else {
    headerDragger.onmouseover = () => showHeader();
    headerDragger.onmouseout = () => hideHeader();
    header.onmouseover = headerDragger.onmouseover;
    header.onmouseout = headerDragger.onmouseout;
}

const activateLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = units(4);
    menuBackgrounds[linkNo].style.marginTop = units(-4.74);
    menuIcons[linkNo].style.filter = "invert(0%)";
    iconLines[linkNo].style.width = units(2);
    iconLines[linkNo].style.marginLeft = 0;
}

const deactivateLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = 0;
    menuBackgrounds[linkNo].style.marginTop = units(-0.74);
    menuIcons[linkNo].style.filter = "invert(100%)";
    iconLines[linkNo].style.width = 0;
    iconLines[linkNo].style.marginLeft = units(1);
}

// Menu links animation
for (let i = 0; i < menuLinks.length; i++) {
    if (isMobile) {
        menuLinks[i].onclick = () => {
            activateLink(i);
            deactivateLink(i);
        }
    } else {
        menuLinks[i].onmouseover = () => activateLink(i);
        menuLinks[i].onmouseout = () => deactivateLink(i);
    }
}