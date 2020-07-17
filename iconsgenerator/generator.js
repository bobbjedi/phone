const { svg2Font, Font, writeToFile } = require('svg-to-fonts');
const path = require('path');
const fs = require('fs');

svg2Font({
    src: './svgicon/*.svg', // svg path  support patterns
    dist: './',
    fontFamily: 'svg2font', // fontFamily name
    fontName: 'svg2font', // font name
    startCodePoint: 57344, // unicode start code point
    ascent: 924,
    descent: -100,
    css: true,
    symbol: true,
    html: true,
}).then(() => {
    console.log('svg2Font done !');
});