export type ImageItem = {
  id: number | string;
  name: string;
  category: string;
  url: string,
  // size: string
};

export type CollectionItem = {
  id: number | string;
  name: string;
  icon: string,
  totalImages: number,
  imgUrls: string[]
}