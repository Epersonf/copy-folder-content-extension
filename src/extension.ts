import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

function getAllFiles(dir: string, baseDir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  return entries.flatMap(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return getAllFiles(fullPath, baseDir);
    } else {
      const relative = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      const content = fs.readFileSync(fullPath, 'utf8');
      return [`// ${relative}`, content];
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('copyFolderContent.copy', async (uri: vscode.Uri | undefined) => {
    let folderUri = uri;

    if (!folderUri) {
      const selected = await vscode.window.showOpenDialog({ canSelectFolders: true, openLabel: 'Select Folder' });
      if (!selected?.[0]) return;
      folderUri = selected[0];
    }

    const baseDir = folderUri.fsPath;
    const content = getAllFiles(baseDir, baseDir).join('\n\n');

    await vscode.env.clipboard.writeText(content);
    vscode.window.showInformationMessage('Folder contents copied to clipboard.');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
