let db = require('../db');
const { find } = require('../db');

module.exports.Login = (req,res,next)=>{
    const errs = [];
    res.render('auth/auth',{
        errs : errs
    });
}
module.exports.postLogin = (req,res,next)=>{
    let acc = db.get('users').value().find((item)=>{
        return item.phone == req.body.uname && item.pass == req.body.pass;
    });
    const errs =[];
    if(acc){
        if(acc.lv == 1){
            res.cookie("cookies", acc.id);
            res.redirect('/');
        }
        else if(acc.lv == 0){
            res.cookie("cookies", acc.id);
            res.redirect('/auth/'+ acc.id)
        }
    }else{
        errs.push("Account information or password is incorrect")
        res.render('auth/auth', {
            values : req.body,
            errs : errs
        })
    }
    
};
module.exports.getIdPage = (req,res,next)=>{
    let id = req.params.id;
    let users = db.get('transaction').filter({userId : id}).value();
    res.render('transaction/userTransaction',{
        transactions : users
    })
}