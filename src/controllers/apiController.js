import { registerNewUser,loginUser } from "../services/loginRegister"
const testApi = (req, res) => {
    return res.status(200).json({
        message:"ok",
        data:"test api"
    })
}

const handlRegister = async (req, res) => {
    try {
        if(!req.body.username || !req.body.email || !req.body.phone || !req.body.password ){
            return res.status(500).json({
                EM:"missing required parameters",
                EC:"1",
            })
        }

        if(req.body.password  && req.body.password.length < 4){
            return res.status(500).json({
                EM:"your password must have more then 4 letters",
                EC:"1",
            })
        }
        const data = await registerNewUser(req.body);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
        })

    } catch (error) {
        return res.status(500).json({
            EM:"error from server",
            EC:"-1",
        })
    }
}
const handlLogin = async (req, res) =>{
    try {
        console.log(">>>check handlLogin:",req.body)
        const data = await loginUser(req.body);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
        })
    } catch (error) {
        return res.status(500).json({
            EM:"error from server",
            EC:"-1",
        })
    }
    
}
export default {
    testApi,
    handlRegister,
    handlLogin
};