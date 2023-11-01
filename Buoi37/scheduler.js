var cron = require("node-cron");
const model = require("./models/index")
const QueueJob = model.QueueJob
const black_lists = model.black_lists
const jwt = require("./utils/jwt");
const SendMail = require("./jobs/SendMail");
const { Op } = require("sequelize");


cron.schedule("*/20 * * * * *", async () => {
  //delete black_lists
  const list = await model.black_lists.findAll({})
 
  if(typeof list === 'object'){
    list.filter(async(black_list) => {
      if(!jwt.decode(black_list.accessToken)){
        await black_lists.destroy({
          where:{
            id: black_list.id
          }
        })
      }
  });
  }
  //delete jobs
    const job = await QueueJob.findOne({
      where: {
        createdAt: await QueueJob.min("createdAt")
      }
    })
    
    const data = JSON.parse(job.value)
  
    try {
      const send = await new SendMail(data.data.job).handle()
     
      if(send){
        await QueueJob.destroy({
          where: {
            id: job.id
          }
        })
      
      }
    } catch (error) {
      console.log(error)
    }
  
});

