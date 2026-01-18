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