import express from 'express';
import path from 'path';
import { defaultRoute } from './routes/defaultRoute';
import { oauth } from './routes/oauth'
import crypto from 'crypto';
import { clientID, codeChallengeBase } from "./config"

const app = express();
const port = 2424; // Why not? I don't think anything uses this port.

// building up the SSO sign on data.
const callbackURL: string = "http://localhost:2424/eve/callback"
const responseType: string = "code"
const scope: string = "esi-skills.read_skills.v1 esi-wallet.read_character_wallet.v1 esi-assets.read_assets.v1 esi-ui.open_window.v1 esi-markets.structure_markets.v1 esi-characters.read_loyalty.v1 esi-characters.read_standings.v1 esi-markets.read_character_orders.v1 esi-contracts.read_character_contracts.v1"
//@ts-ignore
const hex = crypto.createHash('sha256').update(codeChallengeBase).digest('hex');
console.log(`Hex Value: ${hex}`)
const newCodeChallenge = Buffer.from(hex).toString('base64');
const codeChallengeMethod: string = "S256"
const state: string = crypto.randomBytes(32).toString("hex");
// List all routes
app.use(express.static(path.join(__dirname, 'ui')))
app.get("/", defaultRoute)
app.get("/eve/callback", oauth)
app.get("/GetSSOURL", function (_request, reply) {
    console.log("Hit the SSO URL endpoint")
    console.log(`App.ts CodeBase: ${codeChallengeBase}`)
    console.log(`SHA256?: ${newCodeChallenge}`)
    reply.send(encodeURI(`https://login.eveonline.com/v2/oauth/authorize/?response_type=${responseType}&redirect_uri=${callbackURL}&client_id=${clientID}&scope=${scope}&code_challenge=${newCodeChallenge}&code_challenge_method=${codeChallengeMethod}&state=${state}`))
})
// Start Server
app.listen (port, () => console.log(`Now listening on port: ${port}; Started at: ${Date.now()}`))