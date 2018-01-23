const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const users = require("./routes/users");
const token = require("./routes/token");

const app = express();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", index)

const router = express.Router();

// router.route("/users")
//     .post(token.isBearerAuthenticated, users.postUser)
router.route("/users")
    .post(users.postUser)
    .get(users.getUserByEmail);

router.route("/")
    .get(index);

router.route("/verifyEmail")
    .get(token.isBearerAuthenticated, users.getUserByEmail);

router.route("/token")
    .post(token.getToken);

app.use("/api", router);

//catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error("Invalid api");
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
