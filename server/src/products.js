const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'public/images')
    },
    filename: (req, file, callBack) => {
        callBack(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

function createRouter(db) {
    const router = express.Router();
    router.post('/product', (req, res, next) => {
        db.query(
            'INSERT INTO products (title, description, imagePath, date) VALUES (?,?,?,?)',
            [req.body.title, req.body.description, req.body.imagePath, new Date(req.body.date)],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.get('/product', function (req, res, next) {
        db.query(
            'SELECT id, title, description, imagePath FROM products ORDER BY id',
            [],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.get('/product/:id', function (req, res, next) {
        db.query(
            'SELECT id, title, description, imagePath FROM products WHERE id=?',
            [req.params.id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.put('/product/:id', function (req, res, next) {
        db.query(
            'UPDATE products SET title=?, description=?, date=? WHERE id=?',
            [req.body.title, req.body.description, new Date(req.body.date), req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.delete('/product/:id', function (req, res, next) {
        db.query(
            'DELETE FROM products WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({ status: 'error' });
                } else {
                    res.status(200).json({ status: 'ok' });
                }
            }
        );
    });

    router.post('/file', upload.single('image'), function (req, res, next) {
        console.log(req.file);
        const file = req.file;
        if (!file) {
            const error = new Error('No File')
            error.httpStatusCode = 400
            return next(error)
        }
        res.send(file);
    });


    return router;

}

module.exports = createRouter;