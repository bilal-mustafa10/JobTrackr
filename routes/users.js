import express from "express";
import {
    getUser,
    updateUser,
    deleteUser,
    getUserApplications,
    getUserApplication,
    addUserApplication,
    updateUserApplication,
    deleteUserApplication,
    getApplicationDocuments,
    getApplicationDocument,
    deleteApplicationDocument
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/application", verifyToken, getUserApplications);
router.get("/:id/application/:applicationId", verifyToken, getUserApplication);
router.get("/:id/application/:applicationId/document", verifyToken, getApplicationDocuments);
router.get("/:id/application/:applicationId/document/:documentId", verifyToken, getApplicationDocument);

/* UPDATE */
router.put("/:id", verifyToken, updateUser);
router.put("/:id/application/:applicationId", verifyToken, updateUserApplication);

/* CREATE */
router.post("/:id/application", verifyToken, addUserApplication);

/* DELETE */
router.delete("/:id", verifyToken, deleteUser);
router.delete("/:id/application/:applicationId", verifyToken, deleteUserApplication);
router.delete("/:id/application/:applicationId/document/:documentId", verifyToken, deleteApplicationDocument);

export default router;
