const {even} = require("./2_var");
console.log("require doesn't need to be on the top of the code")

module.exports = "find me";

require('./2_var');

console.log('require cache:');
console.log(require.cache);
console.log('require main:');
console.log(require.main === module);
console.log(require.main.filename);
