import express from "express";
import { Router, type Request, type Response } from "express";

const app = express();
const port = 3000;

const route = Router();

app.use(express.json());

route.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(route);
app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});
