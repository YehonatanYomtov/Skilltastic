import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

import courseRoutes from "./routes/courseRouter";
import userRoutes from "./routes/userRouter";

const app = express();

app.use(cors());
app.use(express.json());

const _path = path.resolve(__dirname, "..", "..", "frontend", "dist");

if (process.env.MODE === "production") {
  app.use(express.static(_path));
}
// else {
//   app.use(
//     "/",
//     createProxyMiddleware({
//       target: `http://localhost:5173`,
//       changeOrigin: true,
//     })
//   );
// }

if (process.env.MODE === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(_path, "index.html"));
  });
}

app.use("/api/courses", courseRoutes);
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
