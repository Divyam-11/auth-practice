import "dotenv/config"
import connectDb from "../db/connectDb.js";
import {app} from "./app.js";
const port = process.env.PORT || 4001;

connectDb().then(()=> {
        app.listen(port, () => {
            console.log("Server Started At", port);
        })
    }
);