var express = require('express');
var router = express.Router();
let data = require('../data.js');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile("/views/index.html", { root: "./public" })
});


router.get("/getchartdata", (req, res) => {
  res.json(data).status(200);
})

router.post("/updatechartdata", (req, res) => {
  try {
    let { temp, humi, dust, aqi } = req.body;
    if (temp && humi && aqi) {
      data.push({
        "id": data.length + 1,
        "time": new Date().toLocaleString('vi-VN'),
        "data": {
          "temp": Number(temp).toFixed(2),
          "humi": Number(humi).toFixed(2),
          "dust": Number(dust).toFixed(2),
          "aqi": Number(aqi).toFixed(2)
        }
      })
      res.json({ "message": "update data successfully" }).status(200);
    } else {
      throw new Error("/updatechartdata::  check data")
    }
  }
  catch (err) {
    console.log(err);
    res.send("err").status(400)
  }
})

module.exports = router;
