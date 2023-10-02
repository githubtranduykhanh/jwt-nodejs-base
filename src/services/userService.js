import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models';
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
    try {
        const resData = await db.User.create({ username,email,password:hashPassword });
        console.log(">>> check resData",resData);  
        return true;
    } catch (error) {
        console.log(">>> check resData error",error);   
        return false; 
    }
}

const getListUser = async () => {
    try {
        const users = await db.User.findAll();
        console.log(">>> check users",users);
        return users;
    } catch (error) {
        console.log(">>> check rows error",error);
        return [];
    }
}
const deleteUser = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id
            }
        });
        console.log(">>> check id delete",id);
        return true;
    } catch (error) {
        console.log(">>> check delete error",error);
        return false;
    }  
}
const getUserById = async (id) => {
    try {
        const user = await db.User.findOne({where: { id }});
        console.log(">>> check user by id ",user.get({ plain:true}));
        return user.get({ plain:true});
    } catch (error) {
        console.log(">>> check user by id error",error);
        return {};
    }  
}
const updateUser = async (email,username,id) => {
    console.log(">>> check email",email); 
    console.log(">>> check username",username); 
    console.log(">>> check id",id); 
    try {
        await db.User.update({ email,username }, { where: { id }});
        console.log(">>> check update");
        return true;
    } catch (error) {
        console.log(">>> check update error",error);
        return false;
    }
}


module.exports = {
    createUser,
    deleteUser,
    getListUser,
    getUserById,
    updateUser
}
