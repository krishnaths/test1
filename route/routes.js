const productRoute = require("./productRoutes");
const categoryRoute = require("./categoryRoutes");
const bannerRoute = require("./bannerRoutes");
const path = require("path");

const appRouter = (app, fs) => {
  //default route to serve the main server api
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist/home.html"));
  });

  productRoute(app, fs);
  categoryRoute(app, fs);
  bannerRoute(app, fs);
};

module.exports = appRouter;
