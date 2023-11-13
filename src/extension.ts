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
          const activeTextEditor = vscode?.window?.activeTextEditor?.document;
          if (activeTextEditor?.uri) {
            bookmarkTree.addItem(activeTextEditor?.uri);
          }
        }
      }),
      vscode.commands.registerCommand("markCode.removeItem", (args) => {
        if (args) {
          //if Right Click and select remove of Bookmark tree
          bookmarkTree.deleteItem(args.resourceUri.path);
        } else {
          //if Command Palette (Ctrl + Shift + p ) and select  remove of Bookmark tree
          const activeTextEditor = vscode?.window?.activeTextEditor?.document;
          if (activeTextEditor?.uri) {
            bookmarkTree.deleteItem(activeTextEditor?.uri?.path);
          }
        }
      }),
      vscode.commands.registerCommand("markCode.removeAllItems", () => {
        bookmarkTree.deleteAll();
      }),
      vscode.commands.registerCommand("markCode.open1", () => {
        bookmarkTree.openBookmark(1);
      }),
      vscode.commands.registerCommand("markCode.open2", () => {
        bookmarkTree.openBookmark(2);
      }),
      vscode.commands.registerCommand("markCode.open3", () => {
        bookmarkTree.openBookmark(3);
      }),
      vscode.commands.registerCommand("markCode.openFile", (file) => {
        const { path } = file?.resourceUri;
        const pathUri: vscode.Uri = vscode.Uri.parse(path);
        const folderPath: string = vscode.Uri.joinPath(pathUri).fsPath;
        let isDirectory: boolean = true;
        try {
          isDirectory = statSync(folderPath).isDirectory();
        } catch (error) {
          vscode.window.showErrorMessage(`unknown type file ${error}`);
        }
        if (!isDirectory) {
          //if is file open Text Document a new tab
          vscode.commands.executeCommand("vscode.open", pathUri);
        } else {
          //else if is Directory read files in Directory
          readdir(folderPath, (err, files) => {
            if (err) {
              vscode.window.showErrorMessage(
                `Error reading folder ${err.message}`
              );
              return;
            }
            files.forEach((file) => {
              //for each file create path and open Text Document a new tab( { preview: false } )
              const fileUri = `${folderPath}/${file}`;
              vscode.workspace.openTextDocument(fileUri).then((document) => {
                vscode.window.showTextDocument(document, { preview: false });
              });
            });
          });
        }
      }),
    ]
  );
}

function deactivate() {}

export { activate, deactivate };
