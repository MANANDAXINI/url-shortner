const express = require("express");
const { handleUrlGenerator } = require('../controller/url');
const router = express.Router();

router.post('/', handleUrlGenerator);  // POST request to handle URL shortening

module.exports = router;
