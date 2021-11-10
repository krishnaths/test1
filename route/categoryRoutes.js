const categoryRoute = (app, fs) => {
  const dataPath = "./data/categories/categories.json";

  app.get("/category", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) throw err;

      res.send(JSON.parse(data));
    });
  });
};

module.exports = categoryRoute;
