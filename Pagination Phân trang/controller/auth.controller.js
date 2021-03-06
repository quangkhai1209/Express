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
    const { uname, pass } = req.body;

    const inforLogin = {
        uname,
        pass
    }
    const errs = [];
    let accWithPhone = db.get('users').value().find((item) => {
        return item.phone == uname;
    });


    if (accWithPhone) {
        if (bcrypt.compareSync(pass, accWithPhone.pass)) {
            res.cookie("cookies", accWithPhone.id, {
                signed: true
            });
            if (accWithPhone.lv == 1) {
                res.redirect('/transaction');
                return;
            }
            if (accWithPhone.lv == 0) {
                db.get('users').find({ phone: uname })
                    .assign({
                        wrongLoginCount: 0
                    }).write();
                res.redirect('/auth/' + accWithPhone.id);
                return;
            }
        } else {
            db.get('users').find({ phone: uname })
                .assign({
                    wrongLoginCount: accWithPhone.wrongLoginCount += 1
                }).write();
            errs.push("Account information or password is incorrect " + accWithPhone.wrongLoginCount + " times");
            res.render('auth/auth', {
                values: inforLogin,
                errs: errs
            });
            if (accWithPhone.wrongLoginCount == 3) {
                const msg = {
                    to: 'tunabhbf180202@fpt.edu.vn',
                    from: 'chuongcnbhaf180208@fpt.edu.vn', // Use the email address or domain you verified above
                    subject: 'Send mail  for problem ',
                    text: 'Enter Wrong facenook password 3 times',
                    html: "<a href='https://www.facebook.com/chuongcnbhaf180208'> Facebook Admin </a>"
                };
                sgMail
                    .send(msg)
                    .then(() => {
                        console.log('Send Email Success !! ')
                    })
                    .catch(e => {
                        console.log(e);
                    }); // event queue
            }
            if (accWithPhone.wrongLoginCount >= 5) {
                errs.push("Account information or password is incorrect, over 5 times. Inbox to manager to open Account")
                res.render('auth/auth', {
                    values: inforLogin,
                    errs: errs
                });
            }
        }
    }
};
module.exports.getIdPage = (req, res, next) => {
    let { id } = req.params;
    let users = db.get('transaction').filter({ userId: id }).value();
    res.render('transaction/userTransaction', {
        transactions: users
    })
};

module.exports.listBooks = (req, res, next) => {
    const user = res.locals.user;
    let page = parseInt(req.query.page) || 1;
    let perPage = 8;
    const start = (page - 1) * perPage;
    const end = page * perPage;
    const numberPage = Math.ceil(db.get('books').value().length / perPage);
    const link = [];
    if (page == 1) {
        for (let index = 1; index <= 3; index++) {
            link.push("http://localhost:98/auth/" + user.id + "/listBooks?page=" + index);
        }
    } else {
        for (let index = page - 1; index <= page + 1; index++) {
            link.push("http://localhost:98/auth/" + user.id + "/listBooks?page=" + index);
        };
    }
    const books = db.get('books').value().slice(start, end);
    res.render('transaction/listBooks', {
        books: books,
        links: link
    })
};