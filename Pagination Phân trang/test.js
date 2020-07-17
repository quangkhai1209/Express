const bcrypt = require('bcrypt');
const myPlaintextPassword = 'Chuong';
const someOtherPlaintextPassword = '123';


const hash = bcrypt.hashSync(myPlaintextPassword, 10);

console.log(hash);

bcrypt.compareSync(someOtherPlaintextPassword, hash);

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log(process.env.SENDGRID_API_KEY);

const msg = {
    to: 'chunguyenchuong2014bg@gmail.com',
    from: 'chuongcnbhaf180208@fpt.edu.vn', // Use the email address or domain you verified above
    subject: 'Send mail  for problem ',
    text: 'Enter Wrong password 3 times'
};
sgMail
    .send(msg)
    .then(() => console.log('send mail success'))
    .catch(console.log);