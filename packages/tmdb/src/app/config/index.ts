// 接口请求 地址
// export const BASE_URL = 'http://127.0.0.1:8080';
export const BASE_URL = 'https://kaishuhw8.ue.r.appspot.com';

// 用户名
export const USERNAEM = ' Kai Shu';

// 图片 基地址
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// 收藏 KEY
export const MINE_WATCHED_COLLECTION_KEY = 'mine-watched-collection-list-key';

// 已观看 KEY
export const CONTINUE_WATCHING_KEY = 'continue-watching-list-key';

// 默认播放器 ID
export const DEFAULT_YOUTUBE_PLAYER_ID = 'tzkWB85ULJY';

// 优兔播放地址
export const YOUTUBE_PLAYER_URL = 'https://www.youtube.com/watch';

// 优兔播放视频地址
export const DEFAULT_YOUTUBE_VIDEO_URL = `${YOUTUBE_PLAYER_URL}?v=${DEFAULT_YOUTUBE_PLAYER_ID}`;

// 视频 搜索顺序
export const VIDEO_TYPE_ORDER_LISTS = ['Trailer', 'Teaser'];

// 默认播放器 信息
export const DEFAULT_PLAYER_INFORMATION = {
  type: '',
  site: 'YouTube',
  name: 'NotFount -- Custom',
  key: DEFAULT_YOUTUBE_VIDEO_URL,
  videoId: DEFAULT_YOUTUBE_PLAYER_ID,
};
