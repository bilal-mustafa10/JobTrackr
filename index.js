import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import { register } from "./controllers/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import {verifyToken} from "./middleware/auth.js";
import {addApplicationDocument, updateApplicationDocument} from "./controllers/users.js";


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({storage});

/* ROUTES WITH FILES */
// app.put("/users/:id/application/:applicationId/document/:documentId", verifyToken, upload.single('file'), updateApplicationDocument);
app.post("/users/:id/application/:applicationId/document", verifyToken, upload.single('file'), addApplicationDocument);


/* ROUTES */
app.post("/auth/register", register);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {app.listen(PORT, () => console.log(`Server Port: ${PORT}`))})
    .catch((error) => console.log(`${error} did not connect`))





