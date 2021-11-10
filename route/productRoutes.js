const productRoute = (app, fs) => {
  const dataPath = "./data/products/products.json";

  app.get("/product", (req, res) => {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) throw err;

      res.send(JSON.parse(data));
    });
  });
};

module.exports = productRoute;
