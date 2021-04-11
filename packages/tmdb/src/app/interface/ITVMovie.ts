export type MediaType = 'tv' | 'movie';

export interface ITVMovie {
  id: number;
  name: string;
  media_type: MediaType;
  backdrop_path: string;
  isVirtual?: boolean;
}

export interface ISelectedTVMovie extends ITVMovie {
  mediaType: MediaType;
}
