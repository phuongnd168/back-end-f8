//Cần xử lý: Đẩy job vào Database
/*
- Data của queue: {name, email}
- Tên queue -> SendMail
*/
const { v4: uuid } = require("uuid");
const model = require("../models/index");
const QueueJob = model.QueueJob;
class Event {
  constructor(job) {
    this.job = job;
    
  }

  store = async () => {
    
    const job = await QueueJob.create({
      key: uuid(),
      value: JSON.stringify({
        data: this.job,
        name: this.job.constructor.name,
      }),
    });
   
  };
}

module.exports = Event;
