import type React from "react";

export interface FileItem {
  org_index: number;
  image: string;
  name: string;
  date: string;
  size: string;
}

export type FolderItem = {
  id: number,
  name: string,
  no_of_images: number,
  icon: string,
  size: string
}

export type ImagesPanelType = {
  title: string;
  left: number;
  width: number;
  collapsed: boolean;
  foldersList: FolderItem[];
  setFoldersList: React.Dispatch<React.SetStateAction<FolderItem[]>>;
  activeFolderID: string | number | null;
  setActiveFolderID: React.Dispatch<React.SetStateAction<string | number | null>>;
}