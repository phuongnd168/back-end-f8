var cron = require("node-cron");
const model = require("./models/index")
const QueueJob = model.QueueJob
const SendMail = require("./jobs/SendMail");



const task = cron.schedule("*/20 * * * * *", async () => {

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
