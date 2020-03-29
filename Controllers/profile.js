const handleProfile = (knex) => (req, res) => {
    const { id } = req.params;
    knex.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length)
            res.json(user[0]);
        else
            res.status(400).json("No such user");
    });
}

module.exports = {
    handleProfile: handleProfile
};