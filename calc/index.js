var url = require('url')

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res)
    { res.sendFile(path.join(__dirname+'/public/form.html')); })
  .get('/price', (req, res)=> price(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function price(req, res){
    var newUrl = url.parse(req.url, true);
    var weight = Number(newUrl.query.weight.toString())
    var mail = newUrl.query.mailtype.toString()
    var total = 0;

    if(mail == "stamped")
    {
      total = weight;
    }
    else if(mail == "metered")
    {
      total = weight;
    }
    else if(mail == "flats")
    {
      total = weight;
    }
    else if(mail == "package")
    {
      total = weight;
    }

    res.render('pages/total', {data:total, mailtype:mail, weight:weight})
  }
