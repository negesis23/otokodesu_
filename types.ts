
export interface Pagination {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
  next_page: number | null;
  has_previous_page: boolean;
  previous_page: number | null;
}

export interface Genre {
  name: string;
  slug: string;
  otakudesu_url: string;
}

export interface AnimeBase {
  title: string;
  slug: string;
  poster: string;
  otakudesu_url: string;
}

export interface OngoingAnime extends AnimeBase {
  current_episode: string;
  release_day: string;
  newest_release_date: string;
}

export interface CompleteAnime extends AnimeBase {
  episode_count: string;
  rating: string;
  last_release_date: string;
}

export interface HomeData {
  ongoing_anime: OngoingAnime[];
  complete_anime: CompleteAnime[];
}

export interface EpisodeInfo {
  episode: string;
  slug: string;
  otakudesu_url: string;
}

export interface BatchInfo {
  slug: string;
  otakudesu_url: string;
  uploaded_at: string;
}

export interface Recommendation extends AnimeBase {}

export interface AnimeDetailData {
  title: string;
  japanese_title: string;
  poster: string;
  rating: string;
  produser: string;
  type: string;
  status: string;
  episode_count: string;
  duration: string;
  release_date: string;
  studio: string;
  genres: Genre[];
  synopsis: string;
  batch: BatchInfo | null;
  episode_lists: EpisodeInfo[];
  recommendations: Recommendation[];
}

export interface SearchResult extends AnimeBase {
  genres: Genre[];
  status: string;
  rating: string;
}

export interface EpisodeData {
    episode: string;
    anime: {
        slug: string;
        otakudesu_url: string;
    };
    has_previous_episode: boolean;
    previous_episode_slug: string | null;
    has_next_episode: boolean;
    next_episode_slug: string | null;
    stream_url: string | null;
    streamList: {
        quality: string;
        provider: string;
        url: string | null;
    }[];
    download_urls: {
        format_title: string;
        formats: {
            resolution: string;
            size: string;
            links: {
                provider: string;
                url: string;
            }[];
        }[];
    }[];
}

export interface AnimeByGenre extends AnimeBase {
    rating: string | null;
    episode_count: string | null;
    season: string;
    studio: string;
    genres: Genre[];
    synopsis: string;
}

export interface AnimeByGenreResponse {
    anime: AnimeByGenre[];
    pagination: Pagination;
}
