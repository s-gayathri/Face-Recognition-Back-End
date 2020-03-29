const Clarifai = require("clarifai");

const app = new Clarifai.App({
    apiKey: '83417e3f970146a491dcdf8a4abbaac7'
});

const handleAPICall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(error => res.status(400).json("Unable to connect with API."))
}

const handleImage = (knex) => (req, res) => {
    const { id } = req.body;

    knex('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            if (entries.length)
                res.json(entries[0]);
            else
                res.status(400).json("Unable to get entries");
        });
}

module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
};