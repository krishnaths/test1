const bannerRoutes = (app, fs) => {
  const dataPath = "./data/banners/banners.json";

  app.get("/banner", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) throw err;

      res.send(JSON.parse(data));
    });
  });
};

module.exports = bannerRoutes;
