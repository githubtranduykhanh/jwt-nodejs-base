import {createUser,deleteUser,getListUser,getListUserPageLimit,getUserById,updateUser} from '../services/apiUserService'
const readApi = async (req, res) =>{
    try {

        const {page,limit} = req.query

        if(page && limit){
            console.log(">>>check listUser page limit")
            const data = await getListUserPageLimit(+page,+limit);
            return res.status(200).json({
                EM:data.EM,
                EC:data.EC,
                DT:data.DT
            })
        }

        console.log(">>>check listUser")
        const data = await getListUser();
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM:"error from server",
            EC:"-1",
            DT:''
        })
    } 
}



const createApi = async (req, res) =>{
    try {
        console.log(">>>check createApi")
        const data = await createUser(req.body);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM:"error from server",
            EC:"-1",
            DT:''
        })
    } 
}

const updateApi = async (req, res) =>{
    try {
        console.log(">>>check updateApi")
        const data = await getListUser(req.body);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM:"error from server",
            EC:"-1",
            DT:''
        })
    } 
}

const deleteApi = async (req, res) =>{
    try {
        console.log(">>>check deleteApi")
        const data = await deleteUser(req.body.id);
        return res.status(200).json({
            EM:data.EM,
            EC:data.EC,
            DT:data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EM:"error from server",
            EC:"-1",
            DT:''
        })
    } 
}

export default {
    readApi,createApi,updateApi,deleteApi
}