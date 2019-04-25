import { HomeFile } from "../config"
import express from 'express';
export function defaultRoute(_request: express.Request, reply: express.Response) {
    reply.sendFile(HomeFile)
}
