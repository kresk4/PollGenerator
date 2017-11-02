const expressRouter = require('express').Router;
const router = expressRouter();

require('./users')(router);
require('./survey')(router);

router.get('/', (req, res) => {
    res.json({
        status: 'ok',
    });
});

module.exports = router;
