const { WebSocket } = require("ws");
const Web3 = require("web3");
const { Kafka } = require("kafkajs");
require("dotenv").config();

const contactsABI = require("./src/smartContract/build/contracts/Contacts.json");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["103.106.72.182:9092"],
});

const port = 8123;
const uri = "103.106.72.182";
const socketUri = `ws://${uri}:${port}/api/websocket`;
const socket = new WebSocket(socketUri);

const authRequest = {
  type: "auth",
  access_token: process.env.JWT_USER,
};

const subsEvent = {
  id: 1,
  type: "subscribe_events",
  event_type: "state_changed",
};

socket.addEventListener("open", () => {
  // send a message to the server
  socket.send(JSON.stringify(authRequest));
  //   socket.send(JSON.stringify(subsTrigger));
  socket.send(JSON.stringify(subsEvent));
});

// receive a message from the server
socket.addEventListener("message", async ({ data }) => {
  const packet = JSON.parse(data);
  const state = {
    newState: null,
    oldState: null,
  };
  console.log(packet)
  if (packet.result !== null) {
    state.newState = packet?.event?.data?.new_state;
    state.oldState = packet?.event?.data?.old_state;

    console.log(state);

    // kafka producer send to kafka broker
    const producer = kafka.producer({
      allowAutoTopicCreation: false,
      transactionTimeout: 30000,
    });

    await producer.connect();
    await producer.send({
      topic: subsEvent.type,
      messages: [{ value: JSON.stringify(state) }],
    });

    await producer.disconnect();
  }
});
