const _ = require("lodash");
const express = require("express");
const path = require('path');
const cors = require('cors')

const services = require('./services');

const PORT = process.env.PORT || 3001;

const app = express();

// Have Node serve the files for the client app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {

    res.json({ message: "Hello from server!" });
  });

app.get("/getProviderList", async (req, res) => {
    const params = _.get(req,"query",'');
    const response = await services.getProviderList(params);
    res.json(response);
  });

app.get("/getProviderDetails", async (req, res) => {
    const strSearchTerm = _.get(req,"query",'');
    const response = await services.getProviderDetails(strSearchTerm);
    res.json(response);
  });

  //osim ako sa frontenda ne saljemo nesto kaoi nput sve moze da ostane get
  //al to cemo da vidimo da li treba nesto da se salje 
app.get("/getSpecialties", async (req, res) => {
    const strSearchTerm = _.get(req,"query",'');
    const response = await services.getSpecialties(strSearchTerm);
    res.json(response);
  });


  //cors() je obavezan uz svaki zahtev
  //promeni get pera u getproviderdata 
  app.get("/getPera", cors(), async (req, res) => {
    // const strSearchTerm = _.get(req,"query",'');
    const response = await services.getPera();
    console.log("jel radi ovo?");
    console.log(response);

    // res.json(JSON.stringify("OK"));
    res.json(response);
  });

    //cors() je obavezan uz svaki zahtev
  //promeni get pera u getproviderdata 
  app.get("/getProviderData", cors(), async (req, res) => {

    const query = _.get(req,"query",'');

    
    console.log('query=', query);

    const strSearchTerm = req.query.contactId
    
    console.log('strSearchTerm=', strSearchTerm);

    // const response = ""
    const response = await services.getProviderDataTestOldWay2(strSearchTerm);//strSearchTerm);

    console.log("jel radi ovo?");
    console.log(response);

    // res.json(JSON.stringify("OK"));
    res.json(response);
  });





  //sad ja pravim ovo 
  app.get("/getProviderContactList", cors(), async (req,res) => {
     const querty = _.get(req,"query",'');
     const searchTerm = querty.searchTerm;
    //  /users/:userId/books/:bookId
    console.log('searchTerm', searchTerm );
     const response = await services.getProviderContactList(searchTerm);
    //  "/getProviderContactList/:searchTerm"
     // console.log(response);
 
     // res.json(JSON.stringify("OK"));
     res.json(response);

  });

   //sad ja pravim ovo 
   app.get("/getProviderSpecialty", cors(), async (req,res) => {
    // const strSearchTerm = _.get(req,"query",'');

    const query = _.get(req,"query",'');


    console.log('query=', query);

    const strSearchTerm = req.query.strSearchTerm;
    
    console.log('strSearchTerm=', strSearchTerm);

    const response = await services.getProviderSpecialty(strSearchTerm);

    // console.log(response);

    // res.json(JSON.stringify("OK"));
    res.json(response);

 });


  //sad ja pravim ovo 
  app.get("/getRecordsCheck", cors(), async (req,res) => {
    // const strSearchTerm = _.get(req,"query",'');

    const response = await services.getRecordsCheck();

    // console.log(response);

    // res.json(JSON.stringify("OK"));
    res.json(response);

 });


  //sad ja pravim ovo 
  app.get("/createReferralLog", cors(), async (req,res) => {
    // const strSearchTerm = _.get(req,"query",'');

    const response = await services.getRecordsCheck();

    // console.log(response);

    // res.json(JSON.stringify("OK"));
    res.json(response);

 });
 


  


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});