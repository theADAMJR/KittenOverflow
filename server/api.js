const express = require('express');

const authRoutes = require('./routes/auth'),
      postsRoutes = require('./routes/posts'),
      tagsRoutes = require('./routes/tags');
      usersRoutes = require('./routes/users');

const router = express();

router.use('/', authRoutes);
router.use('/posts', postsRoutes);
router.use('/users', usersRoutes);
router.use('/tags', tagsRoutes);

router.get('/', (req, res) => res.json({ hello: 'world' }));
router.all('/*', (req, res) => res.status(404).send('Not Found'));

module.exports = router;