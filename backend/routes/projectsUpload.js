const { S3Client } = require("@aws-sdk/client-s3");
const express = require("express");
const multer = require("multer");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const uuid = require("uuid");
const config = require("../config/config");
const ProjectSchema = require("../models/projectsSchema");

const s3 = new aws.S3(config.awsConfig);
const bucket = "olamide-portfolio-bucket";

const upload = multer({
  storage: multerS3({
    s3,
    bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname, type: file.mimetype });
    },
    key: function (req, file, cb) {
      cb(null, req.s3Key + "-" + file.originalname);
      // cb(null, req.s3Key);
    },
  }),
});

const singleFieldUpload = upload.single("image");

const uploadToS3 = (req, res) => {
  req.s3Key = uuid();
  return new Promise((resolve, reject) => {
    return singleFieldUpload(req, res, (err) => {
      if (err) return reject("err " + err);
      return resolve();
    });
  });
};

module.exports = {
  uploadImgToS3: (req, res) => {
    // save to s3
    uploadToS3(req, res)
      .then(() => {
        //TODO can update monogodb here
        let newProject = new ProjectSchema({
          projectName: req.body.projectName,
          image: req.file.location,
          link: req.body.projectLink,
          key: req.file.key,
        });
        try {
          newProject.save().then(async (data) => console.log(data));
          return res.status(200).send({
            file: req.file,
            downloadUrl: req.file.location,
            imgLink: req.body.projectLink,
            projectName: req.body.projectName,
            key: req.file.key,
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => console.log("error " + error));
  },

  // edit project
  uploadUpdatedImgToS3: async (req, res) => {
    let project = await ProjectSchema.findById(req.params.id);
    var params = {
      Bucket: bucket,
      Key: project.key,
    };

    uploadToS3(req, res)
      .then(() => {
        project.projectName = req.body.projectName;
        project.image = req.file.location;
        project.link = req.body.projectLink;
        project.key = req.file.key;

        try {
          project.save().then(async (data) => {
            // delete image from s3
            s3.deleteObject(params, function (err, data) {
              if (err) console.log(err, err);
              else console.log("data on delete from s3", data);
            });

            return res.status(200).send(data);
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => console.log("error " + error));
  },
};
