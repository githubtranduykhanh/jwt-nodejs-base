import db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (myPlaintextPassword) => {
    return bcrypt.hashSync(myPlaintextPassword,salt);
}


const checkEmail = async (email) => {
    const user = await db.User.findOne({ where: { email } })
    console.log(">>>checkEmail",user)
    if(user){
        return true
    }
    return false
}

const checkPhone = async (phone) => {
    const user = await db.User.findOne({ where: { phone } })
    console.log(">>>checkPhone",user)
    if(user){
        return true
    }
    return false
}

export const registerNewUser = async ({ username, email, phone, password }) => {

    try {
        const isEmail = await checkEmail(email)
        const isPhone = await checkPhone(phone)
        console.log(">>>checkEmailRegisterNewUser",isEmail)
        console.log(">>>checkPhoneRegisterNewUser",isPhone)

        if(isEmail || isPhone){
            return {
                EM:"The phone or email is already exist",
                EC:"1",
            }
        }
        console.log(">>>check isEmail isPhone")
        const hashPassword = hashUserPassword(password)
        console.log(">>>check hash Password")
        await db.User.create({ username,email,phone,password:hashPassword });
        console.log(">>>check create successfully")
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

