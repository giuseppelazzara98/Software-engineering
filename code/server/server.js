'use strict';
// import './modules/DB'
// import DB from './modules/DB';
const express = require('express');
// init express
const app = new express();
const port = 3001;

app.use(express.json());
// const db=new DB;

const IOManager = require('./modules/IOManager'); //for managing Internal Orders

//SKUITEM
app.get('/api/skuitems', async (req,res) => {
  try {
    const skuitems = await db.getSKUItems();
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
  }
});
app.get('/api/skuitems:id', async (req,res) => {
  try {
    const id= req.params.id;
    const skuitems = await db.getSKUItemsID(id);
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
  }
});
app.get('/api/skuitems:rfid', async (req,res) => {
  try {
    const rfid= req.params.rfid;
    const skuitems = await db.getSKUItemsRFID(rfid);
    res.status(200).json(skuitems);
  } catch (err) {
    res.status(404).end();
  }
});

app.post('/api/skuitem', async (req,res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(422).json({error: `Empty body request`});
  }
  let skuitem = req.body.skuitem;
  if (skuitem === undefined || skuitem.RFID === undefined || skuitem.SKUId === undefined ) {
    return res.status(422).json({error: `Invalid user data`});//ADD CHECK FOR DATA
  }
  await db.newTableName();//MODIFY THIS FUNCTION 
  db.postSkuItem(skuitem);
  return res.status(201).end();
});

app.delete('/api/skuitems/:rfid', (req,res) => {
  try {
    const rfid= req.params.rfid;
    db.deleteSKUItem(rfid);
    res.status(204).end();
  } catch (err) {
    res.status(503).end();
  }
});

// INTERNAL ORDERS
const ioManager = new IOManager();

// GET
app.get('/api/internalOrders', async (req, res) =>{
  const list = await ioManager.getAllIO();
  // console.log(list);
  return res.status(200).json(list);
});

app.get('/api/internalOrdersIssued', async (req, res) =>{
  const list = await ioManager.getAllIOIssued();
  // console.log(list);
  return res.status(200).json(list);
});

app.get('/api/internalOrdersAccepted', async (req, res) =>{
  const list = await ioManager.getAllIOAccepted();
  return res.status(200).json(list);
});

app.get('/api/internalOrders/:id', async(req, res) =>{
  const io = await ioManager.getIO(req.params.id);
  return res.status(200).json(io);
});

// POST
app.post('/api/internalOrders', async (req, res) => {
  const result = await ioManager.addIO(req.body);
  if(result===true){
    return res.status(201).json('Success');
  }
  return res.status(422).json('Error');
});

// PUT
app.put('/api/internalOrders/:id', async (req, res)=>{
  // console.log("ID:" + req.params.id);
  // console.log("Body: " + req.body.newState);
  const result = await ioManager.updateStateIO(req.params.id, req.body);
  if (result === 200){
    return res.status(200).json('SUCCESS');
  } else if(result === 404){
    return res.status(404).json("404 Not Found");
  } else if(result === 422){
    return res.status(422).json('422 Unprocessable Entity');
  } else {
    return res.status(503).json('Service Unavailable');
  }
  
});

// DELETE
app.delete('/api/internalOrders/:id', async(req, res) => {
  const result = await ioManager.deleteIO(req.params.id);
  if(result){
    return res.status(204).json('SUCCESS');
  }
  return res.status(503).json('ERROR');
})


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;