import * as vscode from "vscode";

import { FileSystemObject } from "./FileSystemObject";

export class BookmarkTreeProvider
  implements vscode.TreeDataProvider<FileSystemObject>
{
  getTreeItem(
    element: FileSystemObject
  ): FileSystemObject | Thenable<FileSystemObject> {
    throw new Error("Method not implemented.");
  }
  getChildren(
    element?: FileSystemObject | undefined
  ): vscode.ProviderResult<FileSystemObject[]> {
    throw new Error("Method not implemented.");
  }
}
