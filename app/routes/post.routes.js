const controller = require("../controllers/post.controller");
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.get("/api/posts/all", controller.obtainPost);
    app.post("/api/posts/all", controller.obtainPostPaginate)
    app.post("/api/posts/save", controller.savePost);
    app.post("/api/posts/edit", controller.editPost);
    app.post("/api/posts/deactivate", controller.deactivatePost);
    app.post("/api/posts/delete", controller.deletePost);
    app.get("/api/posts/deactivate",(req, res) => {
        console.log(req.body);
        res.json({message: "incorrect petition!!."});
    });
    app.post("/api/posts/activate", controller.activatePost);
    app.get("/api/posts/activate",(req, res) => {
        console.log(req.body);
        res.json({message: "incorrect petition!!."});
    });
    
};