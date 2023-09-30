import bcrypt from 'bcryptjs';
const saltRounds = 10;

const hashUserPassword = (myPlaintextPassword) => {
    return new Promise(async (resolve, reject) => {
        try {
            await bcrypt.genSalt(saltRounds, function (err, salt) {
                bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
                    resolve(hash)
                });
            });
        } catch (e) {
            reject(e)
        }
    })
}

const createUser = async (username,email,password) => {
    let hashPassword = await hashUserPassword(password);
    console.log(hashPassword);
}

module.exports = {
    createUser
}
