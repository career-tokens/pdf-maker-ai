import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { transform } from "@babel/standalone";
import { NodeVM } from "vm2";

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://app.onedoclabs.com",
      "https://www.onedoclabs.com",
      "https://onedoclabs.com",
    ],
  })
);

app.post("/api/playground", async (req, res) => {
  try {
    const body = req.body;
    const codeString = body.code;

    const transpiledCode = transform(`${codeString}`, {
      presets: ["env", "react"],
    }).code;

    const vm = new NodeVM({
      require: {
        external: true,
        root: "./",
      },
    });

    const result = vm.run(
      `const compile = require('@onedoc/react-print').compile;

      ${transpiledCode}

      module.exports = async function() {
        return await compile(_default());
      }`,
      "index.js"
    );

    const html = await result();

    res.json({
      html,
    });
  } catch (e) {
    res.json({
      error: e.message,
    });

    console.error(e);
  }
});

app.get("/api/", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
