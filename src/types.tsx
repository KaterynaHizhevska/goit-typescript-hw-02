export type GalleryImage = {
  id: string;
  description: string;
  urls: { small: string; regular: string };
};

export type ImagesDataResponse = {
  results: GalleryImage[];
  total_pages: number;
};