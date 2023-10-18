import { Op } from 'sequelize';
import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (myPlaintextPassword) => {
    return bcrypt.hashSync(myPlaintextPassword,salt);
}


const checkEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } })
    if(user){
        return true
    }
    return false
}

const checkPhone = async (phone) => {
    const user = await db.User.findOne({ where: { phone } })
    if(user){
        return true
    }
    return false
}


export const checkPassWord = (passwordClient,passwordData) =>{
    return bcrypt.compareSync(passwordClient, passwordData); // true
}

export const registerNewUser = async ({ username, email, phone, password }) => {

    try {
        const isEmail = await checkEmail(email)
        const isPhone = await checkPhone(phone)

        if(isEmail){
            return {
                EM:"The email is already exist",
                EC:"1",
            }
        }

        if(isPhone){
            return {
                EM:"The phone is already exist",
                EC:"1",
            }
        }

        
        const hashPassword = hashUserPassword(password)
        
        await db.User.create({ username,email,phone,password:hashPassword });
        
        return {
            EM:"A user is created successfully !",
            EC:"0",
        }

    } catch (error) {
        console(">>>Error registerNewUser:",error)
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
        }
    }   
}

export const loginUser =  async ({emailPhone,password}) => {
    try {
        let user = await db.User.findOne({
            where:{
                [Op.or]:[
                    {email:emailPhone},
                    {phone:emailPhone}
                ]
            }
        });
        
        

        if(!user){
            return {
                EM:"The email or phone is already exist",
                EC:"1",
            }
        }else{
            console.log(">>>check user login", user.get({plain:true}).password)
            const isPassWord = checkPassWord(password,user.get({plain:true}).password)
            console.log(">>>check isPassWord", isPassWord)
            if(isPassWord){
                return {
                    EM:"A user is login successfully !",
                    EC:"0",
                }
            }else{
                return {
                    EM:"The password is already exist",
                    EC:"1",
                }
            }
        }
    } catch (error) {
        console(">>>Error loginUser:",error)
        return {
            EM:"Somthing wrongs in service...",
            EC:"-2",
        }
    }
}
