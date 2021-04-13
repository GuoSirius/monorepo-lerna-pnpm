export interface IPlayerInformation {
  site: string;
  name: string;
  key: string;
  type: string;
  videoId: string;
}

export interface ITVMovieDetail {
  name: string;
  poster_path: string;
  tagline: string;
  vote_average: string;
  release_date: string;
  runtime: string;
  overview: string;
  genres: string;
  spoken_languages: string;
  episode_run_time: string;
}

export interface IReview {
  author: string;
  content: string;
  url: string;
  rating: number;
  avatar_path: string;
  created_at: string;
}

export interface ICastCrew {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface ICastCrewDetail {
  birthday: string;
  gender: string;
  name: string;
  homepage: string;
  also_known_as: string;
  known_for_department: string;
  biography: string;
  place_of_birth: string;
}

export interface IShareDetail {
  imdb_id: string;
  facebook_id: number;
  instagram_id: number;
  twitter_id: number;
}
