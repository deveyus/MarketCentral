import path from 'path'
import crypto from "crypto"
export const HomeFile = path.join(__dirname, "ui", "index.html")
export const clientID: string = "9c64d1ffaeab4585af975e77d035c9b4"
export const codeChallengeBase: string = crypto.randomBytes(32).toString("base64")

