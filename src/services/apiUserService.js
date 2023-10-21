
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models';
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

const createUser = async ({username,email,password}) => {
    let hashPassword = await hashUserPassword(password);
    try {
        const resData = await db.User.create({ username,email,password:hashPassword });
        console.log(">>> check resData",resData);  
        if(resData){
            return {
                EM:"A create user successfully !",
                EC:"0",
                DT:''
            }
        }
        return {
            EM:"The create user exist",
            EC:"1",
            DT:''
        };
    } catch (error) {
        console.log(">>> check create error",error);   
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
            DT:''
        }
    }
}

const getListUser = async () => {
    try {
        const users = await db.User.findAll({attributes: ['id','email', 'username']});
        console.log(">>> check users",users);
        if(users){
            return {
                EM:"A get list user successfully !",
                EC:"0",
                DT:users
            }
        }
        return {
            EM:"The get list user exist",
            EC:"1",
            DT:''
        };
    } catch (error) {
        console(">>>Error loginUser:",error)
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
            DT:''
        }
    }
}

const getListUserPageLimit = async (page,limit) => {
    try {
        const offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            attributes: ['id','email', 'username'],
            offset,
            limit
        });
        console.log(">>> check count ",rows);
        console.log(">>> check rows ",rows);
        const totalPages = Math.ceil(count/limit)
        const data = {
            totalRows:count,
            totalPages,
            users:rows
        }
        
        return {
            EM:"A get list user successfully !",
            EC:"0",
            DT:data
        }
        
    } catch (error) {
        console(">>>Error loginUser:",error)
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
            DT:''
        }
    }
}

const deleteUser = async (id) => {
    try {
        const user = await db.User.destroy({
            where: {
                id
            }
        });
        console.log(">>> check id delete",user);
        if(user === 1){
            return {
                EM:"A delete user successfully !",
                EC:"0",
                DT:''
            }
        }
        return {
            EM:"The delete user exist",
            EC:"1",
            DT:''
        };
    } catch (error) {
        console.log(">>> check delete error",error);
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
            DT:''
        }
    }  
}
const getUserById = async (id) => {
    try {
        const user = await db.User.findOne({where: { id }});
        console.log(">>> check user by id ",user.get({ plain:true}));
        if(user){
            return {
                EM:"A get user by id successfully !",
                EC:"0",
                DT:user.get({ plain:true})
            }
        }
        return {
            EM:"The get user by id  exist",
            EC:"1",
            DT:{}
        };
    } catch (error) {
        console.log(">>> check user by id error",error);
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
            DT:''
        }
    }  
}
const updateUser = async ({email,username,id}) => {
    console.log(">>> check email",email); 
    console.log(">>> check username",username); 
    console.log(">>> check id",id); 
    try {
        const user = await db.User.update({ email,username }, { where: { id }});
        console.log(">>> check update",user);
        if(user){
            return {
                EM:"A update user successfully !",
                EC:"0",
                DT:''
            }
        }
        return {
            EM:"The update user  exist",
            EC:"1",
            DT:''
        };
    } catch (error) {
        console.log(">>> check update error",error);
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
            DT:''
        }
    }
}


module.exports = {
    createUser,
    deleteUser,
    getListUser,
    getUserById,
    updateUser,
    getListUserPageLimit
}
