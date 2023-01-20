// Some useful functions
const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

function fromPxVw(s) {return Number(s.slice(0, s.length - 2))};
function units(n) {return String("calc(var(--unit) *" + n + ")")}
function unith(n) {return String("calc(var(--unith) *" + n + ")")}

function fromPercent (s) {return Number(s.slice(0, s.length - 1))};
function toPercent(n) {return String(n) + '%'};

// Use different css files and measurements for mobile and desktop

const themeSheet = document.getElementById("stylesheetlink-theme");
const scalesSheet = document.getElementById("stylesheetlink-scales");
const propertiesSheet = document.getElementById("stylesheetlink-properties");

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.01;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.01;

let unit = Math.max(vw, vh);

const min_unit = 14;
const max_unit = 30;

if (isMobile) {
    themeSheet.href = "src/css/mobile/theme-m.css";
    scalesSheet.href = "src/css/mobile/scales-m.css";
    propertiesSheet.href = "src/css/mobile/properties-m.css";
} else {
    if (unit < min_unit) unit = min_vw;
    if (unit > max_unit) unit = max_vw;
}

document.documentElement.style.setProperty("--unit", unit + 'px');
document.documentElement.style.setProperty("--mobile", Number(isMobile));
// ------------------------------------------------------------------------

// Defining animations

const header = document.getElementById("header");
const headerContainer = document.getElementById("header-container");
const headerDragger = document.getElementById("header-dragger");
const headerDraggerArrow = document.getElementById("header-dragger-arrow");
const linkDescription = document.getElementsByClassName("link-description");

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
if (!isMobile) {
    headerDragger.onmouseover = () => showHeader();
    headerDragger.onmouseout = () => hideHeader();
    header.onmouseover = headerDragger.onmouseover;
    header.onmouseout = headerDragger.onmouseout;
}

const activateLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = units(4);
    menuBackgrounds[linkNo].style.marginTop = units(-4.74);
    menuIcons[linkNo].style.filter = "invert(0%)";
    menuIcons[linkNo].style.scale = '1.15';
    iconLines[linkNo].style.width = units(2);
    iconLines[linkNo].style.marginLeft = 0;
    iconLines[linkNo].style.scale = '1.25';
    linkDescription[linkNo].style.top = units(4);
}

const deactivateLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = 0;
    menuBackgrounds[linkNo].style.marginTop = units(-0.74);
    menuIcons[linkNo].style.scale = '1';
    menuIcons[linkNo].style.filter = "invert(100%)";
    iconLines[linkNo].style.width = 0;
    iconLines[linkNo].style.marginLeft = units(1);
    iconLines[linkNo].style.scale = '1';
    linkDescription[linkNo].style.top = units(2);
}

// Menu links animation
for (let i = 0; i < menuLinks.length; i++) {
    if (!isMobile) {
        menuLinks[i].onmouseover = () => activateLink(i);
        menuLinks[i].onmouseout = () => deactivateLink(i);
    }
}