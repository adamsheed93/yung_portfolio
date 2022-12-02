const express = require("express");
const router = express.Router();
const ExperienceSchema = require("../models/experienceSchema");
router.get("/", async (req, res) => {
  ExperienceSchema.find().then((data) => res.send(data));
});

router.post("/", (req, res) => {
  let newExperience = new ExperienceSchema({
    company: req.body.company,
    info: req.body.info,
    role: req.body.role,
    date: req.body.date,
  });
  try {
    newExperience.save().then(async (data) => {
      res.status(200).send({
        data,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  ExperienceSchema.findByIdAndDelete(req.params.id).then(async (data) => {
    res.status(200).send({
      data,
    });
  });
});

router.put("/:id", async (req, res) => {
  let experience = await ExperienceSchema.findById(req.params.id);
  experience.company = req.body.company;
  experience.info = req.body.info;
  experience.role = req.body.role;
  experience.date = req.body.date;
  try {
    experience.save().then(data => res.send(data));
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
