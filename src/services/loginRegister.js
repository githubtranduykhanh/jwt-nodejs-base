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

