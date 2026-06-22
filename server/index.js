import express, {response} from "express";
import path from "path";

const app = express();

app.use("/static", express.static(path.resolve( "client", "static")));

app.get("/*", (req,res) => {
    res.sendFile(path.resolve( "client", "index.html"));
});

app.listen(process.env.PORT || 5050, () => console.log("server running ..."));
