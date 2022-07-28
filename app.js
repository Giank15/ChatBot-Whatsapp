// Supports ES6
//import { create, Whatsapp } from 'venom-bot';

const venom = require('venom-bot');
const dialogflow=require("./dialogflow");
const mongoose = require('mongoose');
//import {Axios} from 'axios'

venom
  .create({
  session: 'session-name',
  multidevice: true 
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async(message) => {
    //console.log(message);
    let payload=await dialogflow.sendToDialogFlow(message.body,"123123") 
    let responses = payload.fulfillmentMessages;
    for (const response of responses){
       await sendMessagetoWhatsapp(client, message, response);
    }
  });
}

function sendMessagetoWhatsapp(client, message, response) {
 return new Promise ((resolve, reject) => {
    client
        .sendText(message.from, response.text.text[0])
        .then((result) => {
            console.log("Result: ", result); //return object success
            resolve(result);
        })
        .catch((erro) => {
            console.error('Error when sending: ', erro);
            reject(erro);
        });
 })
}

// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues 'use strict';



/*const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
 
//process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
 
  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  function Opcion2(agent) {
    agent.add(`El trabajo por entregar es el siguiente: `);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('Opcion2', Opcion2);


  agent.handleRequest(intentMap);
});*/