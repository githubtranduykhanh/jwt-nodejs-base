const testApi = (req, res) => {
    return res.status(200).json({
        message:"ok",
        data:"test api"
    })
}

const handlRegister = (req, res) => {
    console.log(">>>>check data server:",req.body)
    return res.status(200).json({
        message:"Register",
        data:"test api"
    })
}

export default {
    testApi,
    handlRegister
};