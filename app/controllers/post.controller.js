const db = require("../models");
const Posts = db.post;
const Op = db.Sequelize.Op;

exports.obtainPost = (req, res) => {
    Posts.findAll({
        order:[
            ['id','DESC']
        ]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "an error has been ocurred to get the information."
            });
        });
};

exports.obtainPostPaginate = (req, res) => {
    limit = 5
    offset = 0 + (req.body.offset - 1) * limit;
    Posts.findAndCountAll({
        offset:offset,
        limit: limit,
        where: {
          isactive: 1
        }
      })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "an error has been ocurred to get the information."
            });
        });
};

exports.savePost = async (req, res) => {
    try{
    let imagename = '';
    if(req.files) {
        let image = req.files.image;
        let uploadedname = image.name;
        imagename = Date.now() + uploadedname;
        image.mv('./uploads/' + imagename);
    }
    await Posts.create({
        title: req.body.title,
        content: req.body.content,
        image: imagename,
        postedby: req.body.postedby,
        assigness: req.body.assigness,
        workflow: req.body.workflow,
        reviewscore: req.body.reviewscore,
        isactive: 1,
    })
        .then(post => {
            res.send({status: true,message: "Post Registered"});
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


exports.editPost = async(req, res) => {
    try{
        let imagename = '';
        if(req.files) {
            let image = req.files.image;
            let uploadedname = image.name;
            imagename = Date.now() + uploadedname;
            image.mv('./uploads/' + imagename);
        }
        await Posts.update({
            title: req.body.title,
            content: req.body.content,
            image: imagename,
            postedby: req.body.postedby,
            assigness: req.body.assigness,
            workflow: req.body.workflow,
            reviewscore: req.body.reviewscore,
            isactive: req.body.isactive,
        },{where: {id: req.body.id}})
            .then(updatedpost => {
                res.send({status: true,message: "Post updated", data: updatedpost});
            })
            .catch(err => {
                res.status(500).send({message: err.message});
            });
        } catch (err) {
            res.status(500).send(err);
        }
};
exports.deactivatePost = (req, res) => {
    try {
        Posts.update(
            {
                isactive: 0,
            },
            {where: {id: req.body.id}}).then(update => {

            res.status(200).send({
                status: true, message: "post deactivated"
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
exports.activatePost = (req, res) => {
    try {
        Posts.update(
            {
                isactive: 1,
            },
            {where: {id: req.body.id}}).then(update => {

            res.status(200).send({
                status: true, message: "post activated"
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deletePost = (req, res) => {
    try {
        Posts.destroy({where: {id: req.body.id}}).then(update => {
            res.status(200).send({
                status: true, message: "post deleted"
            });
        });
    } catch (err) {
        res.status(500).send(err);
    }
};