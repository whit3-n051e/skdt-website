// Check if using a mobile device

const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);

// Some useful functions

function fromPxVw(s) {return Number(s.slice(0, s.length - 2))};
function headerUnits(n) {return String("calc(var(--header-unit) *" + n + ")")}

function fromPercent (s) {return Number(s.slice(0, s.length - 1))};
function toPercent(n) {return String(n) + '%'};

// Using different header measurements for mobile and desktop
// (Being a genious in responsive web design)

const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.01;
let headerUnit = vw;

const min_hunit = 14;
const max_hunit = 30;

const headerLinksNo = 8;

if (isMobile) {
    headerUnit = vw * 25 / headerLinksNo;
} else {
    if (headerUnit < min_hunit) headerUnit = min_hunit;
    if (headerUnit > max_hunit) headerUnit = max_hunit;
}

document.documentElement.style.setProperty("--header-unit", headerUnit + 'px');
document.documentElement.style.setProperty("--header-links-no", headerLinksNo)
document.documentElement.style.setProperty("--mobile", Number(isMobile));
// ------------------------------------------------------------------------

// Defining header elements

const header = document.getElementById("header");
const headerContainer = document.getElementById("header-container");
const headerDragger = document.getElementById("header-dragger");
const headerDraggerArrow = document.getElementById("header-dragger-arrow");
const headerEnder = document.getElementById("header-ender");

const linkDescription = document.getElementsByClassName("link-description");
const menuBackgrounds = document.getElementsByClassName("menu-icon-bg");
const menuIcons = document.getElementsByClassName("menu-icon");
const menuLinks = document.getElementsByClassName("menu-link");
const iconLines = document.getElementsByClassName("icon-line");

// Some animation functions

const showHeader = () => {
    header.style.top = 0;
    headerDraggerArrow.style.transform = "rotate(180deg)"
}

const hideHeader = () => {
    header.style.top = headerUnits(-4);
    headerDraggerArrow.style.transform = "rotate(0deg)"
}

const highlightLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = headerUnits(4);
    menuBackgrounds[linkNo].style.marginTop = headerUnits(-4.74);
    menuIcons[linkNo].style.filter = "invert(0%)";
    menuIcons[linkNo].style.scale = '1.2';
    iconLines[linkNo].style.width = headerUnits(2);
    iconLines[linkNo].style.marginLeft = 0;
    if (isMobile) {iconLines[linkNo].style.scale = "1.25 2"} else {iconLines[linkNo].style.scale = '1.25 1'};
    linkDescription[linkNo].style.top = headerUnits(4);
}

const unhighlightLink = (linkNo) => {
    menuBackgrounds[linkNo].style.height = 0;
    menuBackgrounds[linkNo].style.marginTop = headerUnits(-0.74);
    menuIcons[linkNo].style.scale = '1';
    menuIcons[linkNo].style.filter = "invert(100%)";
    iconLines[linkNo].style.width = 0;
    iconLines[linkNo].style.marginLeft = headerUnits(1);
    if (isMobile) {iconLines[linkNo].style.scale = "1 2"} else {iconLines[linkNo].style.scale = '1'};
    linkDescription[linkNo].style.top = headerUnits(2);
}

// Header properties and animations for mobile and desktop
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

// This is needed only for mobile:
let activeLinkNo = headerLinksNo - 1;
if (isMobile) {highlightLink(activeLinkNo)}


// Animating the header links
for (let i = 0; i < menuLinks.length; i++) {
    if (isMobile) {
        menuLinks[i].onclick = () => {
            if (activeLinkNo != -1) {
                unhighlightLink(activeLinkNo);
            }
            activeLinkNo = i;
            highlightLink(i);
        }
    } else {
        menuLinks[i].onmouseover = () => highlightLink(i);
        menuLinks[i].onmouseout = () => unhighlightLink(i);
    }
}