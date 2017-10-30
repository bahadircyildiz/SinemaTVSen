module.exports = function(app){
    require("./directives/wpContentDirective/WPContentDirective.js")(app);
    require("./directives/imageScrollDirective/imageScrollDirective.js")(app);
}