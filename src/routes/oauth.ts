import express from 'express';
import reqlib from 'request'
import { clientID, codeChallengeBase } from "../config"


export function oauth(request: express.Request, _reply: express.Response) {
  console.log("Oauth Callback Hit")
  reqlib.post('https://login.eveonline.com/v2/oauth/token', {
    form: {
      grant_type: "authorization_code",
      code: request.query.code,
      client_id: clientID,
      code_verifier: codeChallengeBase
    }
  }, parseIncomingToken)

}
function parseIncomingToken(_err: any, _httpResponse: reqlib.Response, body: any) {
  console.log("Parsing Token...")
  console.log(`Server Response: ${body}`)
}

