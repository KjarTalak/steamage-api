import express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Application } from 'express';

export default class App
{
    public app: Application;
    public port: number;

    constructor(port: number)
    {
        this.port = port;
        this.app = express();

        this.app.use(cors.default());
        this.app.use(bodyParser.json());
    }

    public use(path: string, middleware: any): void
    {
        this.app.use(path, middleware);
    }

    public listen(): void
    {
        this.app.listen(this.port);
    }
}