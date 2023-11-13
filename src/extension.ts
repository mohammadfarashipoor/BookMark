import * as vscode from "vscode";
import { BookmarkTreeProvider } from "./provider/BookmarkTreeProvider";
import { readdir, statSync } from "fs";

function activate(context: vscode.ExtensionContext) {
  const bookmarkTree = new BookmarkTreeProvider(context);

  context.subscriptions.push(
    ...[
      vscode.window.registerTreeDataProvider("markCode", bookmarkTree),
      vscode.commands.registerCommand("markCode.refreshEntry", () => {
        bookmarkTree.refresh();
      }),
      vscode.commands.registerCommand("markCode.addItem", (args) => {
        if (args) {
          //if Right Click and select add to Bookmark tree
          bookmarkTree.addItem(vscode.Uri.parse(args.path));
        } else {
          //if Command Palette (Ctrl + Shift + p ) and select  add to Bookmark tree
          if (vscode?.window?.activeTextEditor?.document?.uri) {
            bookmarkTree.addItem(
              vscode?.window?.activeTextEditor?.document?.uri
            );
          }
        }
      }),
      vscode.commands.registerCommand("markCode.removeItem", (args) => {
        bookmarkTree.deleteItem(args.resourceUri.path);
      }),
      vscode.commands.registerCommand("markCode.removeAllItems", () => {
        bookmarkTree.deleteAll();
      }),

      vscode.commands.registerCommand("markCode.openFile", (file) => {
        vscode.commands.executeCommand(
          "vscode.open",
          vscode.Uri.parse(file.resourceUri.path)
        );
      }),
    ]
  );
}

function deactivate() {}

export { activate, deactivate };
