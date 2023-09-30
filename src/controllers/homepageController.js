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

module.exports = {
    getHomepage,
    postUsersCreate,
    postUsersDelete
}