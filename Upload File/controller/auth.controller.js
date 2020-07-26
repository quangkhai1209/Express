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
    const { userName, password } = req.body;

    const inforLogin = {
        userName,
        password
    }

    const errs = [];

    let account = db.get('users').value().find((item) => {
        return item.email == userName;
    });


    if (account) {
        if (bcrypt.compareSync(password, account.password)) {
            res.cookie("cookies", account.id, {
                signed: true
            });
            if (account.level == 1) {
                res.redirect('/admin/manage');
                return;
            }
            if (account.level == 0) {
                const user = db.get('users').find({ email: userName })
                    .assign({
                        wrongLoginCount: 0
                    }).write();
                res.redirect('/auth/user/' + user.id);
                return;
            }
        } else {
            db.get('users').find({ email: userName })
                .assign({
                    wrongLoginCount: account.wrongLoginCount += 1
                }).write();
            errs.push("Account information or password is incorrect " + account.wrongLoginCount + " times");
            res.render('auth/auth', {
                values: inforLogin,
                errs: errs
            });
            if (account.wrongLoginCount == 3) {
                const msg = {
                    to: account.email,
                    from: 'chuongcnbhaf180208@fpt.edu.vn', // Use the email address or domain you verified above
                    subject: 'Send mail  for problem',
                    text: 'Enter Wrong facebook password 3 times, continue with over 2 times, count would be blocked.',
                    html: "<a href='https://www.facebook.com/chuongcnbhaf180208'> Facebook Admin </a>"
                };
                sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Send Email Success !!! ')
                    })
                    .catch(e => {
                        console.log(e);
                    }); // event queue
            }
            if (account.wrongLoginCount >= 5) {
                errs.push("Account information or password is incorrect, over 5 times. Inbox to manager to open Account.")
                res.render('auth/auth', {
                    values: inforLogin,
                    errs: errs
                });
            };
        };
    };
};

module.exports.getPageForUser = function (req, res) {
    const user = res.locals.user;
    res.render('auth/userPage', {
        user: user
    })
};

