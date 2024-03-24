"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shorten = void 0;
var STRINGSIZE = 6;
function shorten(inputField) {
    var shortenText = '';
    for (var i = 0; i < STRINGSIZE; i++) {
        shortenText += getRandomCharacter();
    }
    return shortenText;
}
exports.shorten = shorten;
function getRandomCharacter() {
    var upper = Math.floor(Math.random() * (90 - 65) + 65); //randomize ASCII code for uppercase characters
    var lower = Math.floor(Math.random() * (122 - 97) + 97); //randomize ASCII code for lowercase characters 
    var number = Math.floor(Math.random() * 9) + 1; // randomize digits
    var chartypes = [String.fromCharCode(upper), String.fromCharCode(lower), number.toString()];
    var index = Math.floor(Math.random() * 3); //randomize either lower, upper or digit
    return chartypes[index];
}
