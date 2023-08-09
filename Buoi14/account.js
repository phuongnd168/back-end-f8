const Base = require("./Base");
const fs = require("fs");

class Account extends Base {
  index = (req, res, path) => {
    if (req.method === "POST") {
      req.on("data", (buffer) => {
        const body = buffer.toString();
        let id = "";

        if (body) {
          const bodyObj = new URLSearchParams(body);
          otp = bodyObj.get("otp");

          if (otp) {
            const data = fs.readFileSync("./data/data.json");

            const jsonData = JSON.parse(data);

            jsonData.otp.push(`${otp}`);
            fs.writeFileSync("./data/data.json", JSON.stringify(jsonData));

            this.render(req, res, "index");
          }
        }
      });
    } else {
      this.render(req, res, path);
    }
  };
}
module.exports = new Account();
