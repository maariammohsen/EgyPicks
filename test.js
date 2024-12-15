const cc = require('currency-converter-lt');

new cc({ from: 'EGP', to: 'AED', amount: 200 }).convert().then((value) => {
  console.log(value);
});
