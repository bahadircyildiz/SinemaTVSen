module.exports = function(app){
    require("./services/API.js")(app);
    require("./services/AuthService.js")(app);
}