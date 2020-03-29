const handleRegister = (knex, bcrypt) => (req, res) => {
    const { email, name, password } = req.body;

    if(!email || !name || !password)
        return res.status(400).json("Incorrect details entered.");

    const hash = bcrypt.hashSync(password);

    knex.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                // console.log(loginEmail[0]);
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(error => res.status(400).json("User already registered with entered email"));
}

module.exports = {
    handleRegister: handleRegister
};