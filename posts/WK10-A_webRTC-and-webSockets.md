---
title: "Week 10a: WebRTC and webSockets"
published_at: 2025-05-15
snippet: I explore websockets and webRTC for peer-to-peer connections
disable_html_sanitization: true
allow_math: true
---
# How will i use WebRTC
I already have a rudimentary working example of my project, that receives data over a UDP connection and transforms that data to a webSocket that the browser can read and access

I had to learn about the differences in connection types and communication protocols, and that browsers dont like to read dircetly from UDP
https://stackoverflow.com/questions/68285886/how-is-it-possible-to-send-udp-packets-to-browser
I opted to use node.js since i know there is a lot of documentation surrounding it, and created a simple UDP > webSocket connection bridge
```js
/* \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
------------------------------------------------------------------------
        Written by Travis Lizio | Creative Coding A3
------------------------------------------------------------------------
        server.js: 
          Main server that receives UDP telemetry data from Forza
          and broadcasts it to clients via WebSocket
------------------------------------------------------------------------
\\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ */

import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create a require function to use CommonJS modules in ES modules
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Import required modules
const dgram     = require('dgram');
const http      = require('http');
const fs        = require('fs');
const WebSocket = require('ws');

// Server configuration
const UDP_PORT  = 1555;  // Port to receive telemetry data from Forza
const HTTP_PORT = 8000;  // Port for the web server
const WS_PORT   = 8765;  // Port for WebSocket server
const publicDir = path.join(__dirname, 'public');

// Import field definitions from fields.js
const fieldsURL = pathToFileURL(path.join(__dirname, 'public', 'fields.js')).href;
const { default: fields } = await import(fieldsURL);


// Reader functions for parsing binary data from UDP packets
// Each function takes a buffer and an offset and returns the appropriate data type
const readers = {
  Boolean:      (buf, off) => buf.readFloatLE(off) > 0,  // Convert float to boolean
  readFloatLE:  (buf, off) => buf.readFloatLE(off),      // Read 32-bit float
  readUInt8:    (buf, off) => buf.readUInt8(off),        // Read 8-bit unsigned int
  readInt8:     (buf, off) => buf.readInt8(off),         // Read 8-bit signed int
  readUInt16LE: (buf, off) => buf.readUInt16LE(off),     // Read 16-bit unsigned int
  readUInt32LE: (buf, off) => buf.readUInt32LE(off),     // Read 32-bit unsigned int
};

// WebSocket Server Setup
// Create WebSocket server to broadcast telemetry data to clients
const wss = new WebSocket.Server({ port: WS_PORT }, () =>
  console.log(`WS on ws://localhost:${WS_PORT}`));

/**
 * Broadcasts a message to all connected WebSocket clients
 * @param {string} msg - The message to broadcast
 */
function broadcast(msg) {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) ws.send(msg);
  });
}

// UDP Server Setup
// Create UDP server to receive telemetry data from Forza Horizon 5
const udp = dgram.createSocket('udp4');

// Process incoming UDP packets
udp.on('message', data => {
  // Parse the binary data into a structured packet object
  const packet = {}
  for (let f of fields) {
    const fn = readers[f.type]
    packet[f.name] = fn
      ? fn(data, f.offset) : null;
  }
  // Broadcast the parsed data to all connected clients
  broadcast(JSON.stringify(packet));
});

/**
 * Gets the local IP address to display in console
 * @returns {string} The local IP address or 'localhost' if none found
 */
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const interfaceInfo = interfaces[interfaceName];
    for (const info of interfaceInfo) {
      // Skip internal and non-IPv4 addresses
      if (!info.internal && info.family === 'IPv4') {
        return info.address;
      }
    }
  }
  return 'localhost'; // Fallback to localhost if no external IP is found
}

// Get the local IP address for display in console
const localIp = getLocalIpAddress();

// Start the UDP server and listen for incoming packets
udp.bind(UDP_PORT, () => {
  console.log(`UDP on port ${UDP_PORT}`);
  console.log(`Send telemetry data to: ${localIp}:${UDP_PORT}`);
});

// HTTP Server Setup
// MIME types for serving static files
const mime = { 
  '.html': 'text/html', 
  '.js': 'application/javascript', 
  '.css': 'text/css' 
};

// Create HTTP server to serve static files from the public directory
http.createServer((req, res) => {
  // Default to index.html for root requests
  let urlPath = req.url === '/' ? '/index.html' : req.url;
  let file = path.join(publicDir, urlPath);
  let ext = path.extname(file);

  // Read and serve the requested file
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found');
    }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(HTTP_PORT, () =>
  console.log(`HTTP on http://localhost:${HTTP_PORT}`));
```

This allowed me to list each packet and it's parameters in a file called fields.js, listed in json with some arbitrary transforms to make life a bit easier for myself

```js
/* \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\
------------------------------------------------------------------------
        Written by Travis Lizio | Creative Coding A3
------------------------------------------------------------------------
        fields.js: 
          Defines the telemetry data fields received from Forza
------------------------------------------------------------------------
\\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ // \\ */

const bufferOffset = 12

/**
 * Field definitions for Forza Horizon 5 telemetry data
 * Each field has:
 * - name: The name of the telemetry value
 * - min/max: The expected value range (used for debug visualization)
 * - offset: The byte offset in the UDP packet
 * - type: The data type/reader function to use
 * - transform (optional): Function to transform the raw value
 */
export default [
    // Game State
    {"name": "IsRaceOn",
    "min": -10,
    "max": 10,
    "offset": 0,
    "type": "Boolean",
},

    // Engine Data
    {"name": "EngineMaxRpm",
    "min": -10,
    "max": 10,
    "offset": 8,
    "type": "readFloatLE"
},

    {"name": "EngineIdleRpm",
    "min": -10,
    "max": 10,
    "offset": 12,
    "type": "readFloatLE"
},

    {"name": "CurrentEngineRpm",
    "min": -10,
    "max": 10,
    "offset": 16,
    "type": "readFloatLE"
},

    // Vehicle Dynamics
    {"name": "AccelerationX",
    "min": -10,
    "max": 10,
    "offset": 20,
    "type": "readFloatLE"
},

    {"name": "AccelerationY",
    "min": -10,
    "max": 10,
    "offset": 24,
    "type": "readFloatLE"
},

    {"name": "AccelerationZ",
    "min": -10,
    "max": 10,
    "offset": 28,
    "type": "readFloatLE"
},

    {"name": "VelocityX",
    "min": -10,
    "max": 10,
    "offset": 32,
    "type": "readFloatLE"
},

    {"name": "VelocityY",
    "min": -10,
    "max": 10,
    "offset": 36,
    "type": "readFloatLE"
},

    {"name": "VelocityZ",
    "min": -10,
    "max": 10,
    "offset": 40,
    "type": "readFloatLE"
},

    {"name": "AngularVelocityX",
    "min": -10,
    "max": 10,
    "offset": 44,
    "type": "readFloatLE"
},

    {"name": "AngularVelocityY",
    "min": -10,
    "max": 10,
    "offset": 48,
    "type": "readFloatLE"
},

    {"name": "AngularVelocityZ",
    "min": -10,
    "max": 10,
    "offset": 52,
    "type": "readFloatLE"
},

    // Vehicle Orientation
    {"name": "Yaw",
    "min": -10,
    "max": 10,
    "offset": 56,
    "type": "readFloatLE"
},

    {"name": "Pitch",
    "min": -10,
    "max": 10,
    "offset": 60,
    "type": "readFloatLE"
},

    {"name": "Roll",
    "min": -10,
    "max": 10,
    "offset": 64,
    "type": "readFloatLE"
},

    // Suspension Data
    {"name": "NormSuspensionTravelFl",
    "min": -10,
    "max": 10,
    "offset": 68,
    "type": "readFloatLE"
},

    {"name": "NormSuspensionTravelFr",
    "min": -10,
    "max": 10,
    "offset": 72,
    "type": "readFloatLE"
},

    {"name": "NormSuspensionTravelRl",
    "min": -10,
    "max": 10,
    "offset": 76,
    "type": "readFloatLE"
},

    {"name": "NormSuspensionTravelRr",
    "min": -10,
    "max": 10,
    "offset": 80,
    "type": "readFloatLE"
},

    {"name": "SuspensionTravelMetersFl",
	"min": -10,
	"max": 10,
	"offset": 196,
	"type": "readFloatLE",
	"transform": value => (value * 10)
},

    {"name": "SuspensionTravelMetersFr",
	"min": -10,
	"max": 10,
	"offset": 200,
	"type": "readFloatLE",
	"transform": value => (value * 10)
},

    {"name": "SuspensionTravelMetersRl",
	"min": -10,
	"max": 10,
	"offset": 204,
	"type": "readFloatLE",
	"transform": value => (value * 10)
},

    {"name": "SuspensionTravelMetersRr",
	"min": -10,
	"max": 10,
	"offset": 208,
	"type": "readFloatLE",
	"transform": value => (value * 10)
},

    // Tire Data
    {"name": "TireSlipRatioFl",
    "min": -10,
    "max": 10,
    "offset": 84,
    "type": "readFloatLE"
},

    {"name": "TireCombinedSlipFl",
    "min": -10,
    "max": 10,
    "offset": 180,
    "type": "readFloatLE"
},

    {"name": "TireSlipRatioFr",
    "min": -10,
    "max": 10,
    "offset": 88,
    "type": "readFloatLE"
},

    {"name": "TireCombinedSlipFr",
    "min": -10,
    "max": 10,
    "offset": 184,
    "type": "readFloatLE"
},

    {"name": "TireSlipRatioRl",
    "min": -10,
    "max": 10,
    "offset": 92,
    "type": "readFloatLE"
},

    {"name": "TireCombinedSlipRl",
    "min": -10,
    "max": 10,
    "offset": 188,
    "type": "readFloatLE"
},

    {"name": "TireSlipRatioRr",
    "min": -10,
    "max": 10,
    "offset": 96,
    "type": "readFloatLE"
},

    {"name": "TireCombinedSlipRr",
    "min": -10,
    "max": 10,
    "offset": 192,
    "type": "readFloatLE"
},

    {"name": "WheelRotationSpeedFl",
    "min": -10,
    "max": 10,
    "offset": 100,
    "type": "readFloatLE"
},

    {"name": "WheelRotationSpeedFr",
    "min": -10,
    "max": 10,
    "offset": 104,
    "type": "readFloatLE"
},

    {"name": "WheelRotationSpeedRl",
    "min": -10,
    "max": 10,
    "offset": 108,
    "type": "readFloatLE"
},

    {"name": "WheelRotationSpeedRr",
    "min": -10,
    "max": 10,
    "offset": 112,
    "type": "readFloatLE"
},

    {"name": "TireSlipAngleFl",
    "min": -10,
    "max": 10,
    "offset": 164,
    "type": "readFloatLE"
},

    {"name": "TireSlipAngleFr",
    "min": -10,
    "max": 10,
    "offset": 168,
    "type": "readFloatLE"
},

    {"name": "TireSlipAngleRl",
    "min": -10,
    "max": 10,
    "offset": 172,
    "type": "readFloatLE"
},

    {"name": "TireSlipAngleRr",
    "min": -10,
    "max": 10,
    "offset": 176,
    "type": "readFloatLE"
},

    {"name": "TireTempFl",
	"min": -10,
	"max": 10,
	"offset": 256 + bufferOffset,
	"type": "readFloatLE",
	"transform": value => (value - 32) * (5/9)
},

	{"name": "TireTempFr",
	"min": -10,
	"max": 10,
	"offset": 260 + bufferOffset,
	"type": "readFloatLE",
	"transform": value => (value - 32) * (5/9)
},

    {"name": "TireTempRl",
	"min": -10,
	"max": 10,
	"offset": 264 + bufferOffset,
	"type": "readFloatLE",
	"transform": value => (value - 32) * (5/9)
},

    {"name": "TireTempRr",
	"min": -10,
	"max": 10,
	"offset": 268 + bufferOffset,
	"type": "readFloatLE",
	"transform": value => (value - 32) * (5/9)
},

    // Car Information
    {"name": "CarOrdinal",
    "min": -10,
    "max": 10,
    "offset": 212,
    "type": "readUInt16LE"
},

    {"name": "CarClass",
    "min": -10,
    "max": 10,
    "offset": 216,
    "type": "readUInt8"
},

    {"name": "CarPerformanceIndex",
    "min": -10,
    "max": 10,
    "offset": 220,
    "type": "readUInt16LE"
},

    {"name": "DriveTrain",
    "min": -10,
    "max": 10,
    "offset": 224,
    "type": "readUInt8"
},

    {"name": "NumCylinders",
    "min": -10,
    "max": 10,
    "offset": 228,
    "type": "readUInt8"
},

    // Position and Speed
    {"name": "PositionX",
    "min": -10,
    "max": 10,
    "offset": 232 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "PositionY",
    "min": -10,
    "max": 10,
    "offset": 236 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "PositionZ",
    "min": -10,
    "max": 10,
    "offset": 240 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "Speed",
    "min": -10,
    "max": 10,
    "offset": 244 + bufferOffset,
    "type": "readFloatLE",
    "transform": value => value * 3.6
},

    {"name": "Power",
    "min": -10,
    "max": 10,
    "offset": 248 + bufferOffset,
    "type": "readFloatLE",
    "transform": value => value / 745.699872, // Convert from Watts to horsepower
},

    {"name": "Torque",
    "min": -10,
    "max": 10,
    "offset": 252 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "Boost",
    "min": -10,
    "max": 10,
    "offset": 272 + bufferOffset,
    "type": "readFloatLE",
    "transform": value => value / 14.504 // Convert from PSI to Bar
},

    {"name": "Fuel",
    "min": -10,
    "max": 10,
    "offset": 276 + bufferOffset,
    "type": "readFloatLE"
},

    // Race Information
    {"name": "Distance",
    "min": -10,
    "max": 10,
    "offset": 280 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "BestLapTime",
    "min": -10,
    "max": 10,
    "offset": 284 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "LastLapTime",
    "min": -10,
    "max": 10,
    "offset": 288 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "CurrentLapTime",
    "min": -10,
    "max": 10,
    "offset": 292 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "CurrentRaceTime",
    "min": -10,
    "max": 10,
    "offset": 296 + bufferOffset,
    "type": "readFloatLE"
},

    {"name": "Lap",
    "min": -10,
    "max": 10,
    "offset": 300 + bufferOffset,
    "type": "readUInt16LE"
},

    {"name": "RacePosition",
    "min": -10,
    "max": 10,
    "offset": 302 + bufferOffset,
    "type": "readUInt8"
},

    // Input Information
    {"name": "Throttle",
    "min": 0,
    "max": 255,
    "offset": 303 + bufferOffset,
    "type": "readUInt8"
},

    {"name": "Brake",
    "min": 0,
    "max": 255,
    "offset": 304 + bufferOffset,
    "type": "readUInt8"
},

    {"name": "Clutch",
    "min": 0,
    "max": 255,
    "offset": 305 + bufferOffset,
    "type": "readUInt8"
},

    {"name": "Handbrake",
    "min": 0,
    "max": 255,
    "offset": 306 + bufferOffset,
    "type": "readUInt8"
},

    {"name": "Gear",
    "min": 0,
    "max": 10,
    "offset": 307 + bufferOffset,
    "type": "readUInt8"
},

    {"name": "Steer",
    "min": -127,
    "max": 127,
    "offset": 308 + bufferOffset,
    "type": "readInt8"
},

    // AI Information
    {"name": "NormalDrivingLine",
    "min": -10,
    "max": 10,
    "offset": 309 + bufferOffset,
    "type": "readUInt8"
},

    {"name": "NormalAiBrakeDifference",
    "min": -10,
    "max": 10,
    "offset": 310 + bufferOffset,
    "type": "readUInt8"
}
]

```

Which allowed me to create a rudimentary display to make sure the connection was working

![fh5-telemetry](Wk-10A/fh5-telemetry-01.png)