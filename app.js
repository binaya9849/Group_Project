import express from "express";
import {config} from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();

config({path:"./config/config.env"});

app.use(cors)(({
    origin:[process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET","PSOT","PUT","DELETE"],
    credentials:true,
})
);

app.listen(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(fileUpload({
    tempFileDir:"./uploads",
    useTempFiles : true,
    
})
);

export default app;
