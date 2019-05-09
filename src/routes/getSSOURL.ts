import base64url from "base64url";
import crypto from "crypto";
import { clientID, codeChallengeBase } from "../config"
import express from "express"

const callbackURL: string = "http://localhost:2424/eve/callback"
const responseType: string = "code"
const scope: string = "esi-skills.read_skills.v1 esi-wallet.read_character_wallet.v1 esi-assets.read_assets.v1 esi-ui.open_window.v1 esi-markets.structure_markets.v1 esi-characters.read_loyalty.v1 esi-characters.read_standings.v1 esi-markets.read_character_orders.v1 esi-contracts.read_character_contracts.v1"
const codeChallenge = base64url.encode(crypto.createHash('sha256').update(codeChallengeBase).digest());
const codeChallengeMethod: string = "S256"
const state: string = crypto.randomBytes(32).toString("hex");

export function getSSOURL(_request: express.Request, reply: express.Response) {
    console.log("Hit the SSO URL endpoint")
    console.log(`App.ts CodeBase: ${codeChallengeBase}`)
    console.log(`SHA256?: ${codeChallenge}`)
    reply.send(encodeURI(`https://login.eveonline.com/v2/oauth/authorize/?response_type=${responseType}&redirect_uri=${callbackURL}&client_id=${clientID}&scope=${scope}&code_challenge=${codeChallenge}&code_challenge_method=${codeChallengeMethod}&state=${state}`))
}