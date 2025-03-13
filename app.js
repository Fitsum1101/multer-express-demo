const express = require("express");
const multer = require("multer");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    const randoum = Math.random();
    cb(null, randoum + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpag"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// app.use(multer({ storage: storage, fileFilter }).single("file"));

const upload = multer({ storage, fileFilter });

// const upload = multer({ dest: "images/" });

app.get("/", (req, res, next) => {
  res.status(200).json({
    successfuly: "created",
  });
  //   next();
});

app.post("/onefile", upload.array("file", 2), (req, res, next) => {
  res.status(201).json({
    ...req.files,
  });
});

app.listen(8081);
