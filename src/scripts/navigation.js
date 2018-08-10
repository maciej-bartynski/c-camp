import zenscroll from './zenscroll-min.js';
'use strict';
document.addEventListener('DOMContentLoaded', initializeNavBar);
//let secs = ['.scroll-to-start', '.scroll-to-about', '.scroll-to-offer', '.scroll-to-gallery', '.scroll-to-contact'];

function initializeNavBar() {
    initializeNavContainerHeight();
    initializeNavigation();
    initializeNavButtons();
    initializeBtnTitlesOnScrolling();
}

function initializeNavContainerHeight() {
    let navheight = (document.querySelector('.page_main-nav nav')).offsetHeight;
    document.querySelector('.page_main-nav').style.height = navheight + 5 + 'px';
    window.addEventListener('resize', function () {
        let naviheight = (document.querySelector('.page_main-nav nav')).offsetHeight;
        document.querySelector('.page_main-nav').style.height = naviheight + 5 + 'px';
    });
}

function initializeNavigation() {
    let navbar = document.querySelector('.page_main-nav nav');
    let navbarContainer = document.querySelector('div.page_main-nav')
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > navbarContainer.offsetHeight) {
            setTimeout(function () {
                navbar.classList.add('page_main-nav_nav-sticky')
            }, 0);
            navbar.classList.add('page_main-nav_pretend-to-be-sticky');
        } else {
            navbar.classList.remove('page_main-nav_nav-sticky');
            navbar.classList.remove('page_main-nav_pretend-to-be-sticky');
        }
    })
}

function initializeNavButtons() {
    let btns = objectToArray(document.querySelectorAll('.page_main-nav nav ul li'));
    let sections = ['.scroll-to-start', '.scroll-to-about', '.scroll-to-offer', '.scroll-to-gallery', '.scroll-to-contact'];
    btns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () {
            let navheight = (document.querySelector('.page_main-nav nav')).offsetHeight;
            let ytarg = document.querySelector(sections[idx]).offsetTop;
            zenscroll.toY(ytarg - navheight);
        })
    });
}

function initializeBtnTitlesOnScrolling() {
    let lastPosition = window.pageYOffset;
    window.addEventListener('scroll', function () {
        let newPosition = window.pageYOffset;
        if (lastPosition < newPosition === true) {
            firstWayToLightTheButton();
        } else if (lastPosition > newPosition === true) {
            secondWayToLightTheButton(newPosition);
        }
        lastPosition = newPosition;
    });
}

function firstWayToLightTheButton() {
    let btns = objectToArray(document.querySelectorAll('.page_main-nav nav ul li'));
    let navHeight = document.querySelector('.page_main-nav nav').offsetHeight;
    let secCSSclasses = ['.scroll-to-start', '.scroll-to-about', '.scroll-to-offer', '.scroll-to-gallery', '.scroll-to-contact'];
    secCSSclasses.forEach(function (secClass, idx) {
        let sec = document.querySelector(secClass);
        if (window.pageYOffset >= (sec.offsetTop - navHeight - 1) &&
            window.pageYOffset < (sec.offsetTop + sec.offsetHeight - navHeight)) {
            btns[idx].classList.add('setonscroll');
        } else {
            btns[idx].classList.remove('setonscroll');
        }
    });
}

function secondWayToLightTheButton() {
    let btns = objectToArray(document.querySelectorAll('.page_main-nav nav ul li'));
    let navHeight = document.querySelector('.page_main-nav nav').offsetHeight;
    let secCSSclasses = ['.scroll-to-start', '.scroll-to-about', '.scroll-to-offer', '.scroll-to-gallery', '.scroll-to-contact'];
    secCSSclasses.forEach(function (secClass, idx) {
        let sec = document.querySelector(secClass);
        if (window.pageYOffset < (sec.offsetTop + sec.offsetHeight - navHeight - 300) &&
            window.pageYOffset > (sec.offsetTop - navHeight - 299)) {
            btns[idx].classList.add('setonscroll');
        } else {
            btns[idx].classList.remove('setonscroll');
        }
    });
}

function objectToArray(objectToIterate) {
    let x = objectToIterate.length;
    let newArray = [];
    for (let i = 0; i < x; i++) {
        newArray.push(objectToIterate[i]);
    }
    return newArray;
}