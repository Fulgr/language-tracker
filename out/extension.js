"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const fs = require('fs');
function activate(context) {
    console.log('Congratulations, your extension "helloworld" is now active!');
    let languages = {};
    if (fs.existsSync('languages.json')) {
        languages = JSON.parse(fs.readFileSync('languages.json'));
    }
    setInterval(() => {
        const currentLanguage = vscode.window.activeTextEditor?.document.languageId ?? '';
        if (languages[currentLanguage]) {
            languages[currentLanguage] += 5;
        }
        else {
            languages[currentLanguage] = 5;
        }
        const calculateTime = (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            return { minutes, hours, days };
        };
        const time = calculateTime(languages[currentLanguage]);
        vscode.window.showInformationMessage(`Current language: ${currentLanguage}, Time spent: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes`);
        fs.writeFileSync('languages.json', JSON.stringify(languages));
    }, 5000);
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map