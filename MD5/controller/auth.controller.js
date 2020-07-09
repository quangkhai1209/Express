const bcrypt = require('bcrypt');
let db = require('../db');

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
                signed : true
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
            if (accWithPhone.wrongLoginCount > 5) {
                errs.push("Account information or password is incorrect, over 5 times. Inbox to manager to open Account")
                res.render('auth/auth', {
                    values: req.body,
                    errs: errs
                })
            } else {
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