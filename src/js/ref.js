// Global constants

function fromPxVw(s) {return Number(s.slice(0, s.length - 2))};
function headerUnits(n) {return String("calc(var(--header-unit) *" + n + ")")}

function fromPercent (s) {return Number(s.slice(0, s.length - 1))};
function toPercent(n) {return String(n) + '%'};

const isMobile = /iphone|ipad|ipod|android/i.test(navigator.userAgent);
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) * 0.01;

// Header constants and vars
const headerLinksNo = 8;
let activeLinkNo = headerLinksNo - 1;

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

// Content constants and vars
const content = document.getElementById("content");