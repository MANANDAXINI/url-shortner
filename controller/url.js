const shortid = require('shortid');
const Url = require('../models/url');

async function handleUrlGenerator(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const shortId = shortid.generate();  // Generate a short ID with shortid

    try {
        const newUrl = await Url.create({
            shortId: shortId,
            urldirect: body.url,
            visithistory: []
        });

        return res.json({ id: shortId });
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { handleUrlGenerator };
