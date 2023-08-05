const fs = require("fs");
class LoadData {
  index = (req, res, path, data) => {
    fs.readFile(`./${path}.html`, "utf8", (err, viewContent) => {
      const result = viewContent.match(/{.+?}/g);
      if (result.length) {
        for (let i = 0; i < result.length; i++) {
          const item = result[i];
          const itemKey = item.replaceAll("{", "").replaceAll("}", "");
          if (
            typeof data[itemKey] === "object" &&
            !Array.isArray(data[itemKey]) &&
            data[itemKey] !== null
          ) {
            viewContent = viewContent.replaceAll(item, "Contact");
            for (let key in data[itemKey]) {
              viewContent = viewContent
                .replaceAll(`${itemKey}.${key}`, data[itemKey][key])
                .replaceAll("{", "")
                .replaceAll("}", "");
            }
          }
          viewContent = viewContent.replaceAll(item, data[itemKey]);
        }
      }

      res.end(viewContent);
    });
  };
}

module.exports = new LoadData();
