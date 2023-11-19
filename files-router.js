import express from "express";
import { createFile, getFiles, getFileInfo } from "./files.js";

const router = express.Router();

router.post("/", createFile);
router.get("/", getFiles);
router.get("/:fileName", getFileInfo);

export default router;
