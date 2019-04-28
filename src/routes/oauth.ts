import express from 'express';
import http from 'http'
import https from 'https'
import querystring from 'querystring';
import { clientID, codeChallengeBase } from "../config"
let JWTrequest: http.ClientRequest
let settings: { eveJWT: string; }
let postData = {}

export function oauth(request: express.Request, _reply: express.Response) {
  postData = {
    grant_type: "authorization_code",
    code: request.query.code,
    client_id: clientID,
    code_verifier: codeChallengeBase
    }
  let options = {
    host: "login.eveonline.com",
    port: "443",
    path: `/v2/oauth/token`,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "login.eveonline.com"
    }
  }
  console.log("Making return request...")
  console.log(options)
  JWTrequest = https.request(options, parseIncomingToken)
  console.log(querystring.stringify(postData))
  JWTrequest.write(querystring.stringify(postData))
  JWTrequest.end()
}
function parseIncomingToken(reply: http.IncomingMessage) {
  console.log("Dealing with response...")
    reply.on("data", (data) => {
      settings.eveJWT += data;
      console.log("Logging Data...")
    })

    reply.on("end", () => {
      settings.eveJWT = JSON.parse(settings.eveJWT)
    })

    reply.on("error", (err) => {
      console.log(`An error occured while sending our response to CCP: ${err}`)
    })


    console.log(`CCP Responded with ${reply.statusCode}`)
    console.log(reply.statusMessage)
    reply.on("error", (err) => {

      console.log(`An error occured while sending our response to CCP: ${err}`)
    })
  }

// console.log(settings.eveJWT)
