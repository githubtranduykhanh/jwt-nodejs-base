import userService from "../services/userService";
const getHomepage = async (req, res) => {
    let userList = await userService.getListUser();
    console.log(userList)
    return res.render('homepage.ejs',{userList})
}
const postUsersCreate = async (req, res) => {
    console.log(">>>> check user create:",req.body);
    const isCreateUser = await userService.createUser(req.body.name,req.body.email,req.body.password);
    if(isCreateUser){
        return res.redirect("/");
    }else{
        return res.redirect("/");
    }  
}
const postUsersDelete = async (req, res) => {
    console.log(">>>> check delete id:",req.params);
    const isDeteteUser = await userService.deleteUser(req.params.id);
    if(isDeteteUser){
        return res.redirect("/");
    }else{
        return res.redirect("/");
    }  
}
const getUsersUpdateById = async (req, res) => {
    console.log(">>>> check user by id:",req.params);
    let userUptade = {};
    const arrUser = await userService.getUserById(req.params.id);
    if(arrUser && arrUser.length > 0){
        userUptade  = arrUser[0];
        return res.render('user-update.ejs',{userUptade})
    }else{
        return res.render('user-update.ejs',{userUptade})
    } 
}

const postUsersUpdate = async (req, res) => {
    console.log(">>>> check update body:",req.body);
    const isUpdateUser = await userService.updateUser(req.body.email,req.body.name,req.body.id);
    if(isUpdateUser){
        return res.redirect("/");
    }else{
        return res.redirect("/");
    }  
}
module.exports = {
    getHomepage,
    postUsersCreate,
    postUsersDelete,
    getUsersUpdateById,
    postUsersUpdate
}