const fetch = require("node-fetch")
const model = require("../models/index")
const shortLink = model.short_link
module.exports = {
    index: async (req, res) => {
      const error = req.flash("error")
      const short_link = req.flash("short_link")
      res.render("short_link/index", {error, short_link});
    },
    handleShortLink: async (req, res) => {
      const url = new URL(
        "https://t.ly/api/v1/link/shorten"
    );
    
    const headers = {
        "Authorization": process.env.TOKEN_SHORT_LINK,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    let body = {
        "long_url": req.body.original_link,
        "domain": "https:\/\/t.ly\/",
        "expire_at_datetime": "2035-01-17 15:00:00",
        "public_stats": true,
    };
    
    let data = fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    }).then(async(response) => response.json());
    data = await data
      if(data.message){
        req.flash("error", data.message)
        res.redirect("/short-link")
      }
      else{
        req.flash("short_link", data.short_url)
        await shortLink.create({
          original_link: data.long_url,
          shortened_link: data.short_url,

        })
        res.redirect("/short-link")
        
      }
      
    },
    manage: async (req, res) => {
      const error = req.flash("error")
      const success = req.flash("success")
      const data = await shortLink.findAll()
      const url = new URL(
        "https://t.ly/api/v1/link/stats"
      );
      const headers = {
        "Authorization": process.env.TOKEN_SHORT_LINK,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
      if(data){

        data.forEach(async (element) => {

        const params = {
            "short_url": element.shortened_link,
        };
        Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]));

        let views = fetch(url, {
            method: "GET",
            headers,
        }).then(response => response.json());
        views = await views
     
        await shortLink.update({views: views.clicks},{
          where: {
            id: element.id
          }
        })
        });
      
      }
      
      res.render("short_link/manage", {data, error, success})
    },
    delete: async (req, res) => {
      const id = await shortLink.findByPk(req.params.id)
      if(id){
        const url = new URL(
          "https://t.ly/api/v1/link"
        );
      
        const headers = {
          "Authorization": process.env.TOKEN_SHORT_LINK,
          "Content-Type": "application/json",
          "Accept": "application/json",
        };
    
        let body = {
          "short_url": id.shortened_link
        };
   
        let data = fetch(url, {
          method: "DELETE",
          headers,
          body: JSON.stringify(body),
        }).then(response => response.text());
        data = await data
       
          await shortLink.destroy({
            where: {
              id: id.id
            }
          })
          req.flash("success", "Delete success")
          res.redirect("/short-link/manage")
        
       
      }
    
     
    },
    edit: async (req, res) => {
      const error = req.flash("error")
      const id = await shortLink.findByPk(req.params.id)
      res.render("short_link/edit", {id, error})
    },
    handleEdit: async(req, res) => {
      
      const id = await shortLink.findByPk(req.params.id)
     
      const url = new URL(
        "https://t.ly/api/v1/link"
    );
    
    const headers = {
        "Authorization": process.env.TOKEN_SHORT_LINK,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    let body = {
        "short_url": "https://t.ly/dTYA2",
        "long_url": req.body.original_link,
        "expire_at_datetime": "2035-01-17 15:00:00",
        "public_stats": true,
    };
    
    let data = fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
    }).then(response => response.json());
    data = await data
    if(data.message){
      req.flash("error", data.message)
      res.redirect("/short-link/edit/"+id.id)
    }
    else{
        await shortLink.update({
          original_link: data.long_url,
        },
        {
        where: {
          id: id.id
        }
      })
      req.flash("success", "Update success")
      res.redirect("/short-link/manage")
        
    }
    
  }
}
