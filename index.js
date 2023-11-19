import express from "express";
import morgan from "morgan";

import router from "./files-router.js";

const app = express();

app.use(morgan("short"));

app.use(express.json());
app.use("/files", router);
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
