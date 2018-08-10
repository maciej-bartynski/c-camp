import zenscroll from './zenscroll-min.js';
import {fit} from './fitsizing.js';
import './zenscroll-min.js';
'use strict';
document.addEventListener('DOMContentLoaded', initializeGallerySection);

function initializeGallerySection() {
    initGalleryNavBtns();
    initGalleryMobileNavBar();
    initBigGallery();
}

function initGalleryNavBtns() {
    let btns = objectToArray(document.querySelectorAll('.sn4_nav_dot-btn'));
    let wrapper = document.querySelector('.sn4_gallery-wrapper');
    btns.forEach(function (btn, idx) {
        btn.addEventListener('click', function () {
            btns.forEach(btn => btn.classList.remove('sn4_clicked'));
            btn.classList.add('sn4_clicked');
            wrapper.style.left = (idx * 100) * -1 + '%';
            initGelleryMobileNavBtns(wrapper, btns, idx);
        })
    })
}

function initGelleryMobileNavBtns(wrapper, btns, idx) {
    if (wrapper.parentNode.offsetWidth <= 620) {
        zenscroll.to(wrapper.parentNode);
    }
}

function initGalleryMobileNavBar() {
    let bar = document.querySelector('.sn4_nav');
    let lastPosition = window.pageYOffset;
    window.addEventListener('scroll', function () {
        if (bar.parentNode.offsetWidth <= 620) {
            let newPosition = window.pageYOffset;
            if (lastPosition < newPosition === true) {
                stickyGalleryMobileNavScrollingDown(newPosition);
            } else if (lastPosition > newPosition === true) {
                stickyGalleryMobileNavScrollingUp(newPosition);
            }
            lastPosition = newPosition;
        }
    })
}

function stickyGalleryMobileNavScrollingDown(newPosition) {
    let gallery = document.querySelector('.sn4_gallery-wrapper');
    let roof = gallery.offsetTop;
    let floor = roof + gallery.offsetHeight;
    let perimeter = (window.innerHeight / 3) * 3;
    if (newPosition > roof && (newPosition + perimeter) < floor) {
        document.querySelector('.sn4_nav').classList.add('sn4_nav_fixed');
    } else {
        document.querySelector('.sn4_nav').classList.remove('sn4_nav_fixed');
    }
}

function stickyGalleryMobileNavScrollingUp(newPosition) {
    let gallery = document.querySelector('.sn4_gallery-wrapper');
    let roof = gallery.offsetTop;
    let floor = roof + gallery.offsetHeight;
    let perimeter = window.innerHeight / 3;
    if (newPosition < roof /*- perimeter*/) {
        document.querySelector('.sn4_nav').classList.remove('sn4_nav_fixed');
    } else if (newPosition < floor - (perimeter * 3/*2*/) && newPosition > roof /*- perimeter - 1*/) {
        document.querySelector('.sn4_nav').classList.add('sn4_nav_fixed');
    }
}

function initBigGallery() {
    let tilts = objectToArray(document.querySelectorAll('.sn4_container_gallery_img-positioner'));
    let IDletters = getBackgroundImageNames(tilts);
    tilts.forEach(function (tilt, idx) {
        tilt.addEventListener('click', function () {
            createBigGallery(IDletters, idx);
        })
    });
}

function getBackgroundImageNames(bgs) {
    let allPhotosIDLetters = [];
    bgs.forEach(function (bg) {
        let bgURL = window.getComputedStyle(bg.querySelector('.sn4_gallery-image')).getPropertyValue('background-image');
        let searchFor = (bgURL.indexOf('.jpg')) - 1;
        allPhotosIDLetters.push(bgURL.charAt(searchFor));
    });
    return allPhotosIDLetters;
}

function createBigGallery(ids, idx) {
    //console.log(thisPhoto, photoIdx);
    let id = ids[idx];
    let bigBG = document.createElement('div');
    bigBG.classList.add('sn4_bigBG');
    let positioner = document.createElement('div');
    positioner.classList.add('sn4_bigBG_positioner');
    let IMG = document.createElement('img');
    IMG.setAttribute('src', './build/gallery/photo-' + id + '.jpg');
    bigBG.appendChild(positioner);
    positioner.appendChild(IMG);
    document.body.appendChild(bigBG);
    fit.cover(IMG, positioner);
    createBigGalleryNav(bigBG, idx, IMG);
}
let bigGallerySwapCounter;
function createBigGalleryNav(bg, idx, IMG) {
    bigGallerySwapCounter=idx;
    let nav = document.createElement('nav');
    nav.classList.add('sn4_bigBG_nav');
    bg.appendChild(nav);
    let a = document.createElement('div');
    a.classList.add('sn4_bigBG_nav_positioner');
    nav.appendChild(a);
    let btns = [undefined, undefined, undefined];
    let icons = ['<i class="fas fa-arrow-left"></i>', '<i class="fas fa-times"></i>', '<i class="fas fa-arrow-right"></i >'];
    btns.forEach(function (btn, i) {
        btn = document.createElement('div');
        btn.classList.add('sn4_bigBG_nav_positioned-btn');
        a.appendChild(btn);
        btn.innerHTML = icons[i];
        let images = objectToArray(document.querySelectorAll('.sn4_container_gallery_img-positioner'));
        let idLetters = getBackgroundImageNames(images);
        if (i === 0) {
            letThisWork(btn, IMG, idLetters, (-1));
        } else if (i === 1) {
            btn.addEventListener('click', function () {
                document.querySelector('.sn4_bigBG').classList.add('sn4_fade-out');
                setTimeout(function(){
                    document.body.removeChild(document.querySelector('.sn4_bigBG'));
                },300);
            });
        } else if (i === 2) {
            letThisWork(btn, IMG, idLetters, 1);
        }
    });
}
function letThisWork(btn, img, ids, dir) {
    btn.addEventListener('click', function () {
        bigGallerySwapCounter=bigGallerySwapCounter+dir;
        if (bigGallerySwapCounter === ids.length) {
            bigGallerySwapCounter = 0;
        } else if (bigGallerySwapCounter<0){
            bigGallerySwapCounter = ids.length - 1
        };
        img.classList.remove('sn4_fade-out-in');
        setTimeout(function () {img.classList.add('sn4_fade-out-in')},0);
        setTimeout(function () {
            img.setAttribute('src', './build/gallery/photo-' + ids[bigGallerySwapCounter] + '.jpg')
        }, 0);
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