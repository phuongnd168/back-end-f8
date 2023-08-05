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
            let str = "";
            for (let key in data[itemKey]) {
              str += `<li>${key}: ${data[itemKey][key]}</li>`;
            }

            viewContent = viewContent.replaceAll(item, str);
          } else {
            viewContent = viewContent.replaceAll(item, data[itemKey]);
          }
        }
      }
      res.end(viewContent);
    });
  };
}

module.exports = new LoadData();
