import express, { Application } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import indexRoutes from './routes/api.route'

export class Server {
    app: Application = express();

    port = process.env.PORT

    constructor() {
        this.settings()
        this.middlewares()
        this.routes()
    }

    //server settings
    settings(): void {
        this.app.set("port", this.port);
        this.app.set("json spaces", 2);

    }

    listen(): void {
        this.app.listen(this.port);
        console.log(`server on port ${this.app.get("port")}`);
    }


    //server middlewares
    middlewares(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    //server routes
    routes() {
        this.app.use('/api', indexRoutes)
    }
}