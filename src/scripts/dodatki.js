import zenscroll from './zenscroll-min.js';
'use strict';
document.addEventListener('DOMContentLoaded', initializeAddings);
function initializeAddings(){
    buttonInFirstSection();
}
function buttonInFirstSection(){
    document.querySelector('.s1_bar_button-to-go').addEventListener('click', function(){
        let goToNext = document.querySelector('.scroll-to-about').offsetTop - document.querySelector('nav').offsetHeight;
        zenscroll.toY(goToNext);
    });
}