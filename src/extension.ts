import * as vscode from 'vscode';
const fs = require('fs');

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld" is now active!');

	let languages: { [key: string]: number } = {};
	if (fs.existsSync('languages.json')) {
		languages = JSON.parse(fs.readFileSync('languages.json'));
	}
	var oldText = "";
	var newText = "";

	setInterval(() => {
		const currentLanguage = vscode.window.activeTextEditor?.document.languageId ?? '';

		if (languages[currentLanguage]) {
			languages[currentLanguage] += 1;
		} else {
			languages[currentLanguage] = 1;
		}

		const hours = Math.round(languages[currentLanguage] / 3600);
		newText = `${currentLanguage}: ${hours}h`
		if (oldText !== newText) {
			oldText = `${currentLanguage}: ${hours}h`
			vscode.window.showInformationMessage(oldText);
		}
		fs.writeFileSync('languages.json', JSON.stringify(languages));
	}, 1000);
}

export function deactivate() {}
