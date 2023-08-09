const Base = require("./Base");
const fs = require("fs");
const account = require("./account");
class Home extends Base {
  index = (req, res, path) => {
    if (req.method === "POST") {
      req.on("data", (buffer) => {
        const body = buffer.toString();
        let phone = "";
        const errors = {};
        if (body) {
          const bodyObj = new URLSearchParams(body);
          phone = bodyObj.get("phone");
          if (!phone) {
            errors.phone = "Vui lòng nhập số điện thoại";
          }
          if (phone.toString().length < 9) {
            errors.phone = "Số điện thoại phải từ 9 tới 11 số";
          }
          if (phone.toString().length > 11) {
            errors.phone = "Số điện thoại phải từ 9 tới 11 số";
          }
          console.log(phone.toString());
          if (phone) {
            const data = fs.readFileSync("./data/data.json");

            const jsonData = JSON.parse(data);
            jsonData.focus.phone = `${phone}`;
            fs.writeFileSync("./data/data.json", JSON.stringify(jsonData));
          }
          this.render(req, res, "index", {
            "errors.e": errors.phone ?? "",
          });
        }
      });
    } else {
      this.render(req, res, path);
    }
  };
}
module.exports = new Home();
