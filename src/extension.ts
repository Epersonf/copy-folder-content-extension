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
      const relative = path.relative(baseDir, fullPath);
      const content = fs.readFileSync(fullPath, 'utf8');
      return [`// ${relative}`, content];
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand('copyFolderContent.copy', async () => {
    const folder = await vscode.window.showOpenDialog({ canSelectFolders: true, openLabel: 'Select Folder' });
    if (!folder?.[0]) return;

    const baseDir = folder[0].fsPath;
    const content = getAllFiles(baseDir, baseDir).join('\n\n');

    await vscode.env.clipboard.writeText(content);
    vscode.window.showInformationMessage('Conteúdo copiado para o clipboard.');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
