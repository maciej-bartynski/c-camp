//------------------------------------------------------------------- section 2

'use strict';
document.addEventListener('DOMContentLoaded', function () {
    var s2 = document.querySelectorAll(".s2-origin-skills");
    var sn2 = document.querySelector('.scroll-to-about');
    var s2_triggerBouncing = function () {
        var nav = (document.querySelector(".page_main-nav nav").offsetHeight)+100;
        if (window.scrollY >= (/*s2[0]*/sn2.offsetTop - nav) && window.innerWidth >= 768) {
            for (var i = 0; i < s2.length; i++) {
                s2[i].classList.add("s2-bouncingAnimation");
                window.removeEventListener("scroll", s2_triggerBouncing, false);
            }
        }
    }
    window.addEventListener("scroll", s2_triggerBouncing, false);
});