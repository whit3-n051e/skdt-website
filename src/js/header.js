// Using different header measurements for mobile and desktop
// (Being a genious in responsive web design)

let headerUnit = vw;

const min_hunit = 14;
const max_hunit = 30;

if (isMobile) {
    headerUnit = vw * 25 / headerLinksNo;
} else {
    if (headerUnit < min_hunit) headerUnit = min_hunit;
    if (headerUnit > max_hunit) headerUnit = max_hunit;
}

document.documentElement.style.setProperty("--header-unit", headerUnit + 'px');
document.documentElement.style.setProperty("--header-links-no", headerLinksNo);
// ------------------------------------------------------------------------
// Some animation functions

// Header animation
const showHeader = () => {
    header.style.top = 0;
    headerDraggerArrow.style.transform = "rotate(180deg)";
    headerContainer.style.boxShadow = "0px 0px 5px black";
};

const hideHeader = () => {
    header.style.top = headerUnits(-4);
    headerDraggerArrow.style.transform = "rotate(0deg)";
    headerContainer.style.boxShadow = "";
};
//========================================
// Link background animation
const liftLinkBg = (linkNo) => {
    menuBackgrounds[linkNo].style.height = headerUnits(4);
    menuBackgrounds[linkNo].style.marginTop = headerUnits(-4.74);
};

const releaseLinkBg = (linkNo) => {
    menuBackgrounds[linkNo].style.height = 0;
    menuBackgrounds[linkNo].style.marginTop = headerUnits(-0.74);
};
//========================================
// Link icon line animation
const retractIconLine = (linkNo) => {
    iconLines[linkNo].style.width = headerUnits(2);
    iconLines[linkNo].style.marginLeft = 0;
    if (isMobile) {
        iconLines[linkNo].style.scale = "1.25 2"
    } else {
        iconLines[linkNo].style.scale = '1.5'
    };
};

const shrinkIconLine = (linkNo) => {
    iconLines[linkNo].style.width = 0;
    iconLines[linkNo].style.marginLeft = headerUnits(1);
    if (isMobile) {
        iconLines[linkNo].style.scale = "1 2"
    } else {
        iconLines[linkNo].style.scale = '1.5'
    };
};
//========================================
// Link description animation
const revealLinkDescription = (linkNo) => {
    linkDescription[linkNo].style.top = headerUnits(4);
};

const hideLinkDescription = (linkNo) => {
    linkDescription[linkNo].style.top = headerUnits(2);
};
//========================================
// Menu icon animation
const enlargenMenuIcon = (linkNo) => {
    menuIcons[linkNo].style.scale = '1.2';
};

const shrinkMenuIcon = (linkNo) => {
    menuIcons[linkNo].style.scale = '1';
};
//========================================
// -----
// Composite animation functions:

const linkHoverAnimation = (linkNo) => {
    liftLinkBg(linkNo);
    retractIconLine(linkNo);
    revealLinkDescription(linkNo);
    enlargenMenuIcon(linkNo);

    // Make icons and their lines turn black:
    menuIcons[linkNo].style.filter = "invert(0%)";
    iconLines[linkNo].style.filter = "invert(0%)";

    // Alter the line's transition pattern so it
    // turns black as the link background starts covering it:
    iconLines[linkNo].style.transition = "filter .5s cubic-bezier(0, 1, 0, 1), margin .5s var(--transition-gradual), width .5s var(--transition-gradual)";
};

const linkMouseOutAnimation = (linkNo) => {
    releaseLinkBg(linkNo);
    if (linkNo != activeLinkNo) shrinkIconLine(linkNo);
    hideLinkDescription(linkNo);
    shrinkMenuIcon(linkNo);

    // Make icons and their lines turn white:
    menuIcons[linkNo].style.filter = "invert(100%)";
    iconLines[linkNo].style.filter = "invert(100%)";

    // Alter the line's transition pattern so it
    // turns white as the link background stops covering it:
    iconLines[linkNo].style.transition = "filter .5s cubic-bezier(1, 0, 0, 0), margin .5s var(--transition-gradual), width .5s var(--transition-gradual)"
};

const deselectLink = (linkNo) => {
    shrinkIconLine(linkNo);
}

const selectLink = (linkNo) => {
    deselectLink(activeLinkNo);
    activeLinkNo = linkNo;
    //=====================
    retractIconLine(linkNo);
}
//========================================
// Actually animating stuff

// Animating header
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

// Animating link selection
selectLink(activeLinkNo);
for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].onclick = () => selectLink(i);
    menuLinks[i].onmouseover = () => linkHoverAnimation(i);
    menuLinks[i].onmouseout = () => linkMouseOutAnimation(i);
}