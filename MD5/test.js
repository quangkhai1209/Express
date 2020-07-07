const bcrypt = require('bcrypt');
const myPlaintextPassword = 'Chuong';
const someOtherPlaintextPassword = '123';

const hash = bcrypt.hashSync(myPlaintextPassword, 5);

console.log(hash);

bcrypt.compareSync(someOtherPlaintextPassword, hash);
