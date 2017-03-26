let router = require("express").Router();

router.get('/nonExistingRoute', (req, res) => {
    res.status(404).end();
});

module.exports = router;
