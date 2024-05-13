export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
}

export interface Media<T extends MediaType = MediaType> {
  url: string;
  type: T;
  size: number;
  name: string;
  thumbnail: Media<MediaType.IMAGE>; // Thumbnail will always be an image
}
