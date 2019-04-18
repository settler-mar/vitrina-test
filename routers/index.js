'use strict';

module.exports = (app) => {
  app.router.get("/",
    (req, res) => {
      const data = {
        title: "Коллекция нижнего белья!",
      };
      req.vueOptions.head.title = "Коллекция нижнего белья";
      console.log(data);

      app.db.query('SELECT * FROM `products`', function (error, results, fields) {
        console.log(results);
        if (error) throw error;
        data.collection = results;
        req.vueOptions.head.sub_title = results.length+" линеек в коллекции";
        res.renderVue("main.vue", data, req.vueOptions);
      });

    },
  );
};