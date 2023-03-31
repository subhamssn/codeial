module.exports.home = function(req, res){
    res.cookie('User_Id', 25);
    console.log(req.cookies);
    return res.render('home', {
        title: "Home"
    });
}