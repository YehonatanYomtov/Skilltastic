import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createProxyMiddleware } from "http-proxy-middleware";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.get("/api/bob", (req, res) =>
  res.send("bob likes foodand drink OY VEY asdfadsf")
);

const _path = path.resolve(__dirname, "..", "..", "frontend", "dist");
if (process.env.MODE === "production") {
  app.use(express.static(_path));
} else {
  app.use(
    "/",
    createProxyMiddleware({
      target: `http://localhost:5173`,
      changeOrigin: true,
    })
  );
}

if (process.env.MODE === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(_path, "index.html"));
  });
}

app.listen(3000, () => {
  console.log("howdy doody bob");
});
