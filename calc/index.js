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
    var total = "";
    var message = "";

    if(mail == "stamped")
    {
      if(weight <= 1){
        total = "0.50";
      }
      else if(weight <= 2){
        total = "0.71";
      }
      else if(weight <= 3){
        total = "0.92";
      }
      else if(weight <= 3.5){
        total = "1.13";
      }
      else {
        total = "---";
        message = "The letter is to heavy to be placed in this section, please try large envelopes"
      }
      
    }
    else if(mail == "metered")
    {
      if(weight <= 1){
        total = "0.47";
      }
      else if(weight <= 2){
        total = "0.68";
      }
      else if(weight <= 3){
        total = "0.89";
      }
      else if(weight <= 3.5){
        total = "1.10";
      }
      else {
        total = "---";
        message = "The letter is to heavy to be placed in this section, please try large envelopes"
      }
      
    }
    else if(mail == "flats")
    {
      if(weight <= 1){
        total = "1.00";
      }
      else if(weight <= 2){
        total = "1.21";
      }
      else if(weight <= 3){
        total = "1.42";
      }
      else if(weight <= 4){
        total = "1.63";
      }
      else if(weight <= 5){
        total = "1.84";
      }
      else if(weight <= 6){
        total = "2.05";
      }
      else if(weight <= 7){
        total = "2.26";
      }
      else if(weight <= 8){
        total = "2.47";
      }
      else if(weight <= 9){
        total = "2.68";
      }
      else if(weight <= 10){
        total = "2.89";
      }
      else if(weight <= 11){
        total = "3.10";
      }
      else if(weight <= 12){
        total = "3.31";
      }
      else if(weight <= 13){
        total = "3.52";
      }
      else {
        total = "6.70";
        message = "Use a Flat Rate Envelope!"
      }
      
    }
    else if(mail == "package")
    {
      if(weight <= 4){
        total = "3.50";
      }
      else if(weight <= 8){
        total = "3.75";
      }
      else if(weight <= 9){
        total = "4.10";
      }
      else if(weight <= 10){
        total = "4.45";
      }
      else if(weight <= 11){
        total = "4.80";
      }
      else if(weight <= 12){
        total = "5.15";
      }
      else if(weight <= 13){
        total = "5.50";
      }
      else {
        total = "7.20";
        message = "Use a Flate Rate Box!";
      }
      
    }

    res.render('pages/total', {data:total, mailtype:mail, weight:weight, message:message})
  }
