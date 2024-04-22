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
			languages[currentLanguage] += 5;
		} else {
			languages[currentLanguage] = 5;
		}

		const calculateTime = (seconds: number) => {
			const minutes = Math.floor(seconds / 60);
			const hours = Math.floor(minutes / 60);
			const days = Math.floor(hours / 24);

			return { minutes, hours, days };
		};

		const time = calculateTime(languages[currentLanguage]);
		newText = `Current language: ${currentLanguage}, Time spent: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes`
		if (oldText !== newText) {
			oldText = `Current language: ${currentLanguage}, Time spent: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes`
			vscode.window.showInformationMessage(oldText);
		}
		fs.writeFileSync('languages.json', JSON.stringify(languages));
	}, 5000);
}

export function deactivate() {}
