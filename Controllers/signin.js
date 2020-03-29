const handleSignin = (knex, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if(!email || !password)
        return res.status(400).json("Incorrect details entered.");

    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            if (bcrypt.compareSync(password, data[0].hash)) {
                return knex.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0]);
                    })
                    .catch(err => res.status(400).json("Error logging in."));
            }
            res.status(400).json("Wrong Credentials.");
        })
        .catch(err => res.status(400).json("Wrong Credentials."));
}

module.exports = {
    handleSignin: handleSignin
};