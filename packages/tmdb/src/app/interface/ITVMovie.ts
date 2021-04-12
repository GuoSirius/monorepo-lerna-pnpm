export type MediaType = 'tv' | 'movie';

export type ImageFieldType = 'poster_path' | 'backdrop_path';

export interface ITVMovie {
  id: number;
  name: string;
  media_type: MediaType;
  poster_path: string;
  backdrop_path: string;
  isVirtual?: boolean;
}

export interface ISelectedTVMovie extends ITVMovie {
  mediaType: MediaType;
}
