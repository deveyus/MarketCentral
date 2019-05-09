import express from 'express';
import path from 'path';
import { defaultRoute } from './routes/defaultRoute';
import { oauth } from './routes/oauth'
import { getSSOURL } from './routes/getSSOURL'
const app = express();
const port = 2424; // Why not? I don't think anything uses this port.


// List all routes
app.use(express.static(path.join(__dirname, 'ui')))
app.get("/", defaultRoute)
app.get("/eve/callback", oauth)
app.get("/GetSSOURL", getSSOURL)
// Start Server
app.listen (port, () => console.log(`Now listening on port: ${port}; Started at: ${Date.now()}`))