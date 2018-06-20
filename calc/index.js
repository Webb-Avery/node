var url = require('url')

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  //.get('/', (req, res) => res.render('form'))
    .get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/public/form.html'));
  })
  .get('/math', (req, res)=> math(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function math(req, res){
    var newUrl = url.parse(req.url, true);
    var lhs = Number(newUrl.query.lhs.toString())
    var rhs = Number(newUrl.query.rhs.toString())
    var operation = newUrl.query.operator.toString()
    var total;

    if(operation == "add")
    {
      total = lhs + rhs;
    }
    else if(operation == "subtract")
    {
      total = lhs - rhs;
    }
    else if(operation == "multiply")
    {
      total = lhs * rhs;
    }
    else if(operation == "divide")
    {
      total = lhs / rhs;
    }

    res.render('pages/total', {data:total})
  }