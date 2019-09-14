import * as vscode from 'vscode';

export async function DoSearchFassHumans() {
    console.log('Opening FASS Allmänhet');
    let userType = 2;
    let queryWord = GetSelectedText();
    let url = BuildFASSUrl(queryWord, userType);
    vscode.env.openExternal(vscode.Uri.parse(url));
}

export async function DoSearchFassAnimals() {
    console.log('Opening FASS Djurläkemedel');
    let userType = 1;
    let queryWord = GetSelectedText();
    let url = BuildFASSUrl(queryWord, userType);
    vscode.env.openExternal(vscode.Uri.parse(url));
}

function GetSelectedText(): string {
    let editor = vscode.window.activeTextEditor;
    let selectedText: string = '';
    if (editor) {
        let document = editor.document;
        let selection = editor.selection;
        selectedText = document.getText(selection);
    }
    if (selectedText) {
        vscode.window.showInformationMessage('Searching for ' + selectedText);
        return selectedText;
    }
    vscode.window.showErrorMessage('Nothing was selected');
    return '';
}

function BuildFASSUrl(queryWord: string, userType:number): string {
    let url: string = 'https://www.fass.se/LIF/result?';
    url = url.concat('query=', queryWord);
    url = url.concat('&userType=', userType.toString());
    console.log(url);
    return url;
}