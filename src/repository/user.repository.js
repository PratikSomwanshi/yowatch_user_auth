const bcrypt = require("bcrypt");

const CrudRepository = require("./crud.repository");
const { User } = require("../models");

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async signIn(data) {
        try {
            const user = await User.findOne({ email: data.email });
            if (!user) throw Error("user not found");

            const validPass = bcrypt.compareSync(data.password, user.password);

            if (validPass) {
                return user;
            } else {
                throw Error("password does not match");
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

module.exports = UserRepository;
