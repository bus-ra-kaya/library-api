import type {ServerResponse } from "node:http";

export default function sendJson<T>(res: ServerResponse, statusCode: number, data: T){
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
}