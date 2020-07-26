const shortid = require("shortid");
const db = require("../db");

module.exports.getAddBooksPage = function (req, res) {
    res.render("books/addNewBook");
};

module.exports.getEditBook = function (req, res) {
    const { id } = req.params;
    const values = db.get('books').find({ id }).value();
    res.render("books/editBook", {
        values: values
    });
};

module.exports.getDeleteBook = function (req, res) {
    const { id } = req.params;
    const values = db.get('books').find({ id }).value();
    res.render("books/deleteBook", {
        values: values
    });
};

module.exports.postDeleteBook = function (req, res) {
    const { id } = req.params;
    db.get("books").remove({ id }).write();
    res.redirect("/admin/manage/books/viewBooks");
};

module.exports.postEditBook = function (req, res) {
    const { id } = req.params;
    const { nameBook, publisher, cost, quantity, description } = req.body;
    const postData = {
        nameBook, publisher, cost, quantity, description, id: shortid.generate()
    };
    if (req.file) {
        const images = req.file.path.split("\\").slice(1).join("/");
        postData.images = images;
        db.get("books").find({ id }).assign(postData).write();
        res.redirect("/admin/manage/books/viewBooks");
    } else {
        db.get("books").find({ id }).assign(postData).write();
        res.redirect("/admin/manage/books/viewBooks");
    }
};

module.exports.postAddBooksPage = function (req, res) {
    const { nameBook, publisher, cost, quantity, description } = req.body;
    const postData = {
        nameBook, publisher, cost, quantity, description, id: shortid.generate()
    };
    if (req.file) {
        const images = req.file.path.split("\\").slice(1).join("/");
        postData.images = images;
        let errs = [];
        let temp = db
            .get("books")
            .value()
            .find((item) => {
                return item.nameBook == nameBook;
            });
        if (!temp) {
            db.get("books").push(postData).write();
            res.redirect("/admin/manage/books/viewBooks");
        } else {
            errs.push("warning : namesake !!!");
            res.render("books/addNewBook", {
                errs: errs,
                values: postData,
            });
        }
    } else {
        let errs = [];
        errs.push("Imgs is require !!!");
        res.render("books/addNewBook", {
            errs: errs,
            values: postData,
        });
    }
};

module.exports.getViewBooks = function (req, res) {
    const { name } = req.query;
    if (name) {
        let page = parseInt(req.query.page) || 1;
        let perPage = 8;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const books = db
            .get("books")
            .value()
            .filter((book) => {
                return book.nameBook.toLowerCase().indexOf(name.toLowerCase()) !== -1;
            }).slice(start, end);

        const link = [];
        if (page == 1) {
            for (let index = 1; index <= 3; index++) {
                link.push("http://localhost:98/admin/manage/books/viewBooks?page=" + index);
            }
        } else {
            for (let index = page - 1; index <= page + 1; index++) {
                link.push("http://localhost:98/admin/manage/books/viewBooks?page=" + index);
            };
        }
        
        res.render("books/viewBooks", {
            books: books,
            links: link,
            query : name
        });
    }
    else {
        let page = parseInt(req.query.page) || 1;
        let perPage = 8;
        const start = (page - 1) * perPage;
        const end = page * perPage;
        const books = db.get('books').value().slice(start, end);

        const link = [];
        if (page == 1) {
            for (let index = 1; index <= 3; index++) {
                link.push("http://localhost:98/admin/manage/books/viewBooks?page=" + index);
            }
        } else {
            for (let index = page - 1; index <= page + 1; index++) {
                link.push("http://localhost:98/admin/manage/books/viewBooks?page=" + index);
            };
        }
        
        res.render('books/viewBooks', {
            books: books,
            links: link
        })
    }
};

module.exports.validatePostNewBooks = (req, res, next) => {
    let errs = [];
    const { nameBook, publisher, cost, quantity, description } = req.body;
    const postData = {
        nameBook, publisher, cost, quantity, description
    };
    if (!nameBook) {
        errs.push('Name is require !!! ');
    }
    if (!publisher) {
        errs.push('publisher is require !!!')
    }
    if (!cost) {
        errs.push('cost is require !!! ');
    }
    if (!quantity) {
        errs.push('quantity is require !!! ');
    }
    if (!description) {
        errs.push('description is require !!! ');
    }
    if (errs.length) {
        res.render('books/addNewBook', {
            errs: errs,
            values: postData,
        })
        return;
    }
    next();
}
