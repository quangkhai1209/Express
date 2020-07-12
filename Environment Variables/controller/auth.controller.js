require('dotenv').config();
const bcrypt = require('bcrypt');
let db = require('../db');
const sgMail = require('@sendgrid/mail');

module.exports.Login = (req, res, next) => {
    const errs = [];
    res.render('auth/auth', {
        errs: errs
    });
}
module.exports.postLogin = (req, res, next) => {
    const errs = [];
    let accWithPhone = db.get('users').value().find((item) => {
        return item.phone == req.body.uname;
    });
    if (accWithPhone) {
        if (bcrypt.compareSync(req.body.pass, accWithPhone.pass)) {
            res.cookie("cookies", accWithPhone.id, {
                signed: true
            });
            if (accWithPhone.lv == 1) {
                res.redirect('/transaction');
            }
            else if (accWithPhone.lv == 0) {
                db.get('users').find({ phone: req.body.uname })
                    .assign({
                        wrongLoginCount: 0
                    }).write();
                res.redirect('/auth/' + accWithPhone.id);
            }
        } else {
            if (accWithPhone.wrongLoginCount == 3) {
                const msg = {
                    to: 'chunguyenchuong2014bg@gmail.com',
                    from: 'chuongcnbhaf180208@fpt.edu.vn', // Use the email address or domain you verified above
                    subject: 'Send mail  for problem ',
                    text: 'Enter Wrong password 3 times',
                    html: "<a href='https://www.facebook.com/chuongcnbhaf180208'> Facebook Admin </a>"
                };
                sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Send Email Success !! ')
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
            if (accWithPhone.wrongLoginCount > 5) {
                errs.push("Account information or password is incorrect, over 5 times. Inbox to manager to open Account")
                res.render('auth/auth', {
                    values: req.body,
                    errs: errs
                });
            }
            else {
                db.get('users').find({ phone: req.body.uname })
                    .assign({
                        wrongLoginCount: accWithPhone.wrongLoginCount += 1
                    }).write();
                errs.push("Account information or password is incorrect");
                res.render('auth/auth', {
                    values: req.body,
                    errs: errs
                });
            }
        }
    }
};
module.exports.getIdPage = (req, res, next) => {
    let id = req.params.id;
    let users = db.get('transaction').filter({ userId: id }).value();
    res.render('transaction/userTransaction', {
        transactions: users
    })
}