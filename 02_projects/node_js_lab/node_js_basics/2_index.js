const {odd, even} = require('2_var');
const checkNumber = require('2_func');

function checkStringOddOrEven(str) {
    if(str.length % 2){
        return odd;
    }
    return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello'));