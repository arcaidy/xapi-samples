/**
 * Post messages to a Hue Bridge
 *
 */

//
// Philipps Hue library
//

const xapi = require('xapi');

function updateLight(bridgeip, username, light, payload, cb) {

  // Post message
  xapi.command(
    'HttpClient Put',
    {
      Header: ["Content-Type: application/json"],
      Url: `http://${bridgeip}/api/${username}/lights/${light}/state`
    },
    JSON.stringify(payload))
    .then((response) => {
      if (response.StatusCode == 200) {
        console.log("message pushed to bridge")
        if (cb) cb(null, response.StatusCode)
        return
      }
            
      console.log("failed with status code: " + response.StatusCode)
      if (cb) cb("failed with status code: " + response.StatusCode, response.StatusCode)
    })
    .catch((err) => {
      console.log("failed with err: " + err.message)
      if (cb) cb("Could not contact the bridge")
    })
}

// Your Philips Hue deployment
const HUE_BRIDGE = '192.168.1.33'
const HUE_USERNAME = 'SECRET'

// Change color
const HUE_LIGHT = 4 // number of the light in your deployment
const color = 25500 
updateLight(HUE_BRIDGE, HUE_USERNAME, HUE_LIGHT, { "hue": color }, console.log)
