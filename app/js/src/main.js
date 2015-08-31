var $     = require('jquery');
// var React = require('react');
var WebFont = require('webfontloader');
var buddy = require('./buddy.js');

$('.haters').fadeOut();

console.log($(window).height());

console.log("gulp stest");

console.log("it works again 2");

// alert("jaws is bad movie");

// console.log(buddy("mason"));

buddy();

WebFont.load({
    google: {
        families: ['Droid Sans', 'Droid Serif']
    },
    custom: {
        families: ['My Font', 'My Other Font:n4,i4,n7']
    }
});