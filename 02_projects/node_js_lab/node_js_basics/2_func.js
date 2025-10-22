const { odd, even } = require('2_var');

function checkOddOrEven(num) {
    if (num % 2 ) {
        return odd;
    }
    return even;
}