const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3001;
let db = "";

mongoose
  .connect(
    "mongodb+srv://Betoben09:rodelo2409@cluster0.pvht08c.mongodb.net/sample_training?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Mongo DB connected");
    db = mongoose.connection.db;
    //console.log("conectado")
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//Respuesta: A

app.get("/api/A", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ email_address: { $regex: "@twitter.com" } })
      .limit(5)
      .toArray();

    res.status(200).json({
      ok: true,
      data: result
    })
  } catch (error) {
    console.log(error);
    res.send(400).json({
      ok: false,
      message: error.message,
    });
  }
});

//Respuesta: B
app.get("/api/B", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        founded_year: { $gte: 2005, $lte: 2008 },
      })
      .limit(10)
      .toArray();

    res.send(result);
  } catch (error) {
    console.log(error);
    res.send(400).json({
      ok: false,
      message: error.message,
    });
  }
});

//Respuesta: C
app.get("/api/C", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({ name: { $regex: "Technorati" } })
      .limit(50)
      .toArray();

    res.status(200).json({
      ok: true,
      data:result
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

//Respuesta: D

app.get("/api/D", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $or:[
          {category_code:{$regex: "advertising"}},
          {founded_year:{$gte: 2002,}}
            
        ]
      })
       
      .limit(10)
      .toArray()
      
    res.send(result);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});

//respuesta E

app.get("/api/E", async (req, res) => {
  try {
    const result = await db
      .collection("companies")
      .find({
        $or:[
          {caregory_code:{ $regex: "messaging"}},
          {caregory_code: {$regex: "games_video"}},
        ],
      })
      .limit(10)
      .toArray();
    res.send(result)
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      message: error.message,
    });
  }
});
