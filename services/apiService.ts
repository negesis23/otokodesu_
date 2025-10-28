

import { API_BASE_URL } from '../constants';
import type { HomeData, Genre, OngoingAnime, Pagination, CompleteAnime, AnimeDetailData, SearchResult, EpisodeData, AnimeByGenreResponse, ScheduleDay } from '../types';

async function apiFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  const result = await response.json();
  if (result.status?.toLowerCase() !== 'ok') {
    throw new Error(result.message || 'API returned an error');
  }
  return result.data as T;
}

export const getHomeData = (): Promise<HomeData> => apiFetch<HomeData>('/home');

export const getGenres = (): Promise<Genre[]> => apiFetch<Genre[]>('/genres');

export const getOngoingAnime = (page: number = 1): Promise<{ data: OngoingAnime[], pagination: Pagination }> => 
  fetch(`${API_BASE_URL}/ongoing-anime/${page}`).then(res => res.json());

export const getCompletedAnime = (page: number = 1): Promise<{ data: CompleteAnime[], pagination: Pagination }> => 
  fetch(`${API_BASE_URL}/complete-anime/${page}`).then(res => res.json());

export const getAnimeDetail = (slug: string): Promise<AnimeDetailData> => apiFetch<AnimeDetailData>(`/anime/${slug}`);

export const searchAnime = (query: string): Promise<SearchResult[]> => apiFetch<SearchResult[]>(`/search/${query}`);

export const getEpisode = (slug: string): Promise<EpisodeData> => apiFetch<EpisodeData>(`/episode/${slug}`);

export const getAnimeByGenre = (slug: string, page: number = 1): Promise<AnimeByGenreResponse> => 
  apiFetch<AnimeByGenreResponse>(`/genres/${slug}/${page}`);
  
export const getSchedule = (): Promise<ScheduleDay[]> => apiFetch<ScheduleDay[]>('/jadwal-rilis');