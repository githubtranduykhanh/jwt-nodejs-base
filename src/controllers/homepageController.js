import userService from "../services/userService";
const getHomepage = async (req, res) => {
    return res.render('homepage.ejs')
}
const postUsersCreate = async (req, res) => {
    console.log(">>>> check user create:",req.body);
    userService.createUser(req.body.name,req.body.email,req.body.password);
    return res.render('homepage.ejs')
}

module.exports = {
    getHomepage,
    postUsersCreate
}