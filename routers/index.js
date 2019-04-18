'use strict';

module.exports = (app) => {
  app.router.get("/",
    (req, res) => {
      const data = {
        title: "Коллекция нижнего белья!",
      };
      req.vueOptions.head.title = "Коллекция нижнего белья";

      app.db.query('SELECT * FROM `products`', function (error, results, fields) {
        if (error) throw error;
        data.collection = results;
        data.sub_title = results.length+" линеек в коллекции";
        res.renderVue("main.vue", data, req.vueOptions);
      });

    },
  );
};