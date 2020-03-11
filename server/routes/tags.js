const express = require("express");

const router = express();

router.get('/', (req, res) => {
    res.status(200).json([
        { name: 'c#', description: 'A good language. Used by the finest kittens.' },
        { name: 'ts', description: 'Another good language. Used by fine kittens.' },
        { name: 'angular', description: 'A great framework. Used by this lol' },
        { name: 'js', description: 'Use TypeScript instead for webapps.' }
      ]);
});

module.exports = router;