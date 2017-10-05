// 91962890-BE07-4D52-B7CB-A92B537F6249

const mqtt = require('mqtt')

const {USER, PASS, MQTT} = process.env
const client = mqtt.connect(MQTT, {
  username: USER,
  password: PASS,
  clean: false,
  clientId: `logger`
})

client.on('connect', () => client.subscribe("#", {qos: 2}, (err, granted) => console.log(err, granted)))

client.on('message', (topic, message, rawMessage) => {
  try {
    rawMessage.payload = JSON.parse(rawMessage.payload.toString())
  }
  catch (e) {
    rawMessage.payload = rawMessage.payload.toString()
  }
  process.stdout.write(JSON.stringify(rawMessage) + '\n')
})