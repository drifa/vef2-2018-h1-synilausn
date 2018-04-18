const express = require('express');
const { requireAuth } = require('../auth');
const cors = () -> { return require('cors')({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}) };

const router = express.Router();

const {
  categoriesRoute,
  categoriesPostRoute,
  booksRoute,
  booksPostRoute,
  bookRoute,
  bookPatchRoute,
} = require('./books');

const {
  usersRoute,
  userRoute,
  meRoute,
  mePatchRoute,
  meProfileRouteWithMulter,
} = require('./users');

const {
  userReadRoute,
  meReadRoute,
  meReadPostRoute,
  meReadDeleteRoute,
} = require('./read');

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

function indexRoute(req, res) {
  return res.json({
    authentication: {
      register: '/register',
      login: '/login',
    },
    books: {
      books: '/books',
      book: '/book/{id}',
    },
    categories: '/categories',
    users: {
      users: '/users',
      user: '/users/{id}',
      read: '/users/{id}/read',
    },
    me: {
      me: '/users/me',
      profile: '/users/me/profile',
      read: '/users/me/read',
    },
  });
}

router.get('/', indexRoute);

router.get('/users', [cors(), requireAuth], catchErrors(usersRoute));
router.get('/users/me', [cors(), requireAuth], catchErrors(meRoute));
router.get('/users/:id', [cors(), requireAuth], catchErrors(userRoute));
router.put('/users/me', [cors(), requireAuth], catchErrors(mePatchRoute));
router.post('/users/me/profile', [cors(), requireAuth], catchErrors(meProfileRouteWithMulter));
router.get('/categories', cors(), catchErrors(categoriesRoute));
router.post('/categories', [cors(), requireAuth], catchErrors(categoriesPostRoute));
router.get('/books', catchErrors(booksRoute));
router.post('/books', [cors(), requireAuth], catchErrors(booksPostRoute));
router.get('/books/:id', catchErrors(bookRoute));
router.put('/books/:id', [cors(), requireAuth], catchErrors(bookPatchRoute));
router.get('/users/me/read', [cors(), requireAuth], catchErrors(meReadRoute));
router.get('/users/:id/read', [cors(), requireAuth], catchErrors(userReadRoute));
router.post('/users/me/read', [cors(), requireAuth], catchErrors(meReadPostRoute));
router.delete('/users/me/read/:id', [cors(), requireAuth], catchErrors(meReadDeleteRoute));

module.exports = router;
