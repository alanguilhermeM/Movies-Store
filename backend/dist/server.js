"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserController_1 = __importDefault(require("./controllers/UserController"));
var express = require('express');
var app = express();
app.use(express.json());
app.get("/health", function (req, res) { return res.send('ok'); });
app.post("/createUser", UserController_1.default.createUser);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Servidor Express rodando na porta ".concat(PORT));
});
//# sourceMappingURL=server.js.map