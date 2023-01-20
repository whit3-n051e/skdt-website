// Some useful functions
const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

function fromPxVw(s) {return Number(s.slice(0, s.length - 2))};
function headerUnits(n) {return String("calc(var(--header-unit) *" + n + ")")}

function fromPercent (s) {return Number(s.slice(0, s.length - 1))};
function toPercent(n) {return String(n) + '%'};

// Use different measurements for mobile and desktop

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.01;
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) * 0.01;

let unit = Math.max(vw, vh);

const min_unit = 14;
const max_unit = 30;

const headerLinksNo = 8;

if (isMobile) {
    unit = vw * 25 / headerLinksNo;
} else {
    if (unit < min_unit) unit = min_unit;
    if (unit > max_unit) unit = max_unit;
}

document.documentElement.style.setProperty("--header-unit", unit + 'px');
document.documentElement.style.setProperty("--header-links-no", headerLinksNo)
document.documentElement.style.setProperty("--mobile", Number(isMobile));
// ------------------------------------------------------------------------

// Defining animations

const header = document.getElementById("header");
const headerContainer = document.getElementById("header-container");
const headerDragger = document.getElementById("header-dragger");
const headerDraggerArrow = document.getElementById("header-dragger-arrow");
const headerEnder = document.getElementById("header-ender");

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
    header.style.top = headerUnits(-4);
    headerDraggerArrow.style.transform = "rotate(0deg)"
}

// Main properties for mobile and desktop
if (isMobile) {
    headerEnder.style.display = "none";
    headerDragger.style.display = "none";
    for (let i = 0; i < headerLinksNo; i++) {
        linkDescription[i].style.display = "none";
        iconLines[i].style.scale = "1 2";
    };
    header.style.top = 0;
} else {
    headerDragger.onmouseover = () => showHeader();
    headerDragger.onmouseout = () => hideHeader();
    header.onmouseover = headerDragger.onmouseover;
    header.onmouseout = headerDragger.onmouseout;
}

const activateLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = headerUnits(4);
    menuBackgrounds[linkNo].style.marginTop = headerUnits(-4.74);
    menuIcons[linkNo].style.filter = "invert(0%)";
    menuIcons[linkNo].style.scale = '1.2';
    iconLines[linkNo].style.width = headerUnits(2);
    iconLines[linkNo].style.marginLeft = 0;
    if (isMobile) {iconLines[linkNo].style.scale = "1.25 2"} else {iconLines[linkNo].style.scale = '1.25 1'};
    linkDescription[linkNo].style.top = headerUnits(4);
}

const deactivateLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = 0;
    menuBackgrounds[linkNo].style.marginTop = headerUnits(-0.74);
    menuIcons[linkNo].style.scale = '1';
    menuIcons[linkNo].style.filter = "invert(100%)";
    iconLines[linkNo].style.width = 0;
    iconLines[linkNo].style.marginLeft = headerUnits(1);
    if (isMobile) {iconLines[linkNo].style.scale = "1 2"} else {iconLines[linkNo].style.scale = '1'};
    linkDescription[linkNo].style.top = headerUnits(2);
}

let activeLinkNo = headerLinksNo - 1;
if (isMobile) {activateLink(activeLinkNo)}

// Menu links animation
for (let i = 0; i < menuLinks.length; i++) {
    if (isMobile) {
        menuLinks[i].onclick = () => {
            if (activeLinkNo != -1) {
                deactivateLink(activeLinkNo);
            }
            activeLinkNo = i;
            activateLink(i);
        }
    } else {
        menuLinks[i].onmouseover = () => activateLink(i);
        menuLinks[i].onmouseout = () => deactivateLink(i);
    }
}