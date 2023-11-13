import * as vscode from "vscode";

import { BookmarkTreeProvider } from "./provider/BookmarkTreeProvider";

export function activate(context: vscode.ExtensionContext) {
  const bookmarkTree = new BookmarkTreeProvider();

  context.subscriptions.push(
    ...[
      vscode.window.registerTreeDataProvider("markCode", bookmarkTree),
      vscode.commands.registerCommand("markCode.refreshEntry", () => {}),
      vscode.commands.registerCommand("markCode.addItem", (args) => {}),
      vscode.commands.registerCommand("markCode.removeItem", (args) => {}),
      vscode.commands.registerCommand("markCode.removeAllItems", () => {}),

      vscode.commands.registerCommand("markCode.openFile", (file) => {
        vscode.commands.executeCommand(
          "vscode.open",
          vscode.Uri.parse(file.resourceUri.path)
        );
      }),
    ]
  );
}

export function deactivate() {}
