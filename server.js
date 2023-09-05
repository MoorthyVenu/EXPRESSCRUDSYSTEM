const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const app = express();
const router=  require('./server/routes/router')

const connectDB = require('./server/database/connection')




dotenv.config({ path: "config.env" });





const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan("tiny"));

//load database
connectDB();



// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set viewengine
app.set("view engine", "ejs");
// app.set('views',path.resolve(__dirname,"views/include"))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
//                  ------    >               css/styles.css
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// app.get("/", (req, res) => {
//   res.send("crud");
// });

//load router
app.use("/",router)




app.listen(PORT, () => {
  console.log(`server run on http://localhost:${PORT} `);
});
