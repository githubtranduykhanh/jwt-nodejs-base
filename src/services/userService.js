import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
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
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt_nodejs_reactjs_mysql', Promise: bluebird});
    try {
        const [rows, fields] = await connection.execute('INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, hashPassword , username]);
        console.log(">>> check rows",rows);  
        return true;
    } catch (error) {
        console.log(">>> check rows error",error);   
        return false; 
    }  
}

const getListUser = async () => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt_nodejs_reactjs_mysql', Promise: bluebird});
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM user');
        console.log(">>> check rows",rows);
        return rows;
    } catch (error) {
        console.log(">>> check rows error",error);
        return [];
    }    
}
const deleteUser = async (id) => {
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt_nodejs_reactjs_mysql', Promise: bluebird});
    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?',[id]);
        console.log(">>> check rows",id);
        return true;
    } catch (error) {
        console.log(">>> check rows error",error);
        return false;
    }    
}

module.exports = {
    createUser,
    deleteUser,
    getListUser
}
