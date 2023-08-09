const fs = require("fs");
class Base {
  render = (req, res, path, data = {}) => {
    fs.readFile(`./view/${path}.html`, "utf8", (err, viewContent) => {
      const result = viewContent.match(/{.+?}/g);

      if (result?.length) {
        for (let i = 0; i < result.length; i++) {
          const item = result[i];
          const itemKey = item.replaceAll("{", "").replaceAll("}", "");

          viewContent = viewContent.replaceAll(item, data[itemKey] ?? "");
        }
      }
      res.end(viewContent);
    });
  };
}

module.exports = Base;
