import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useApiAuto } from '../hooks/useApi';
import { getEpisode, getAnimeDetail } from '../services/apiService';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import AnimatedPage from '../components/AnimatedPage';
import Tabs from '../components/Tabs';
import type { EpisodeInfo, AnimeDetailData } from '../types';
import LoadingSpinner from '../components/LoadingSpinner';

const Episode: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const { data: episodeData, loading: episodeLoading, error: episodeError } = useApiAuto(getEpisode, slug || '');
    
    const fetchAnimeDetails = useCallback((animeSlug: string) => {
        if (!animeSlug) return Promise.resolve(null);
        return getAnimeDetail(animeSlug);
    }, []);

    const { data: animeData, loading: animeLoading } = useApiAuto<AnimeDetailData | null, [string]>(
        fetchAnimeDetails,
        episodeData?.anime.slug || ''
    );
    
    const [streamUrl, setStreamUrl] = useState<string | null>(null);

    const handleSetStreamUrl = (url: string | null) => {
        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            setStreamUrl(url);
        } else {
            console.warn('Blocked insecure or invalid URL for iframe:', url);
            setStreamUrl(null); 
        }
    };

    const streamQualities = useMemo(() => {
        if (!episodeData?.streamList) return new Map<string, { provider: string; url: string | null }[]>();
        
        const qualities = new Map<string, { provider: string; url:string | null }[]>();
        episodeData.streamList.forEach(stream => {
            if (!stream.url) return;
            if (!qualities.has(stream.quality)) {
                qualities.set(stream.quality, []);
            }
            qualities.get(stream.quality)!.push({ provider: stream.provider, url: stream.url });
        });
        return qualities;
    }, [episodeData?.streamList]);

    useEffect(() => {
        if (episodeData?.stream_url) {
            handleSetStreamUrl(episodeData.stream_url);
        } else if (streamQualities.size > 0) {
            const firstQuality = Array.from(streamQualities.keys())[0];
            const firstServerForQuality = streamQualities.get(firstQuality)?.[0];
            if (firstServerForQuality?.url) {
                handleSetStreamUrl(firstServerForQuality.url);
            }
        } else {
            handleSetStreamUrl(null);
        }
    }, [episodeData, streamQualities]);
    
    const isPageLoading = episodeLoading || animeLoading;
    const isInitialLoad = episodeLoading && !episodeData;

    if (isInitialLoad) {
        return (
            <AnimatedPage>
                <div className="p-5 grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
                   <div className="lg:col-span-2 space-y-6">
                        <div className="h-10 bg-surface-container rounded-lg w-3/4"></div>
                        <div className="w-full aspect-video bg-surface-container rounded-2xl"></div>
                   </div>
                   <div className="h-96 bg-surface-container rounded-2xl"></div>
                </div>
            </AnimatedPage>
        );
    }
    
    if (episodeError) return <AnimatedPage><div className="min-h-[50vh] flex items-center justify-center p-5 text-center"><p>Error: {episodeError.message}</p></div></AnimatedPage>;
    if (!episodeData) return <AnimatedPage><div className="min-h-[50vh] flex items-center justify-center p-5 text-center"><p>Episode not found.</p></div></AnimatedPage>;

    const tabContent = [
        {
            title: "Streaming",
            content: (
                <div className="space-y-4">
                    {streamQualities.size > 0 ? Array.from(streamQualities.entries()).map(([quality, servers]) => (
                        <div key={quality}>
                            <p className="font-semibold mb-2">{quality}</p>
                            <div className="flex flex-wrap gap-2">
                                {servers.map((server, idx) => (
                                    <button key={idx} onClick={() => handleSetStreamUrl(server.url)} className={`px-4 py-2 rounded-lg text-sm transition ${streamUrl === server.url ? 'bg-primary text-on-primary' : 'bg-surface-container-high hover:bg-surface-container-highest'}`}>
                                        {server.provider}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )) : <p className="text-on-surface-variant">No streaming servers available.</p>}
                </div>
            )
        },
        {
            title: "Download",
            content: (
                 <div className="space-y-4">
                    {episodeData.download_urls.length > 0 ? episodeData.download_urls.map((group, i) => (
                        <div key={i} className="bg-surface-container p-4 rounded-xl">
                             <p className="font-semibold text-lg mb-3 text-on-surface">{group.format_title}</p>
                             <div className="space-y-3">
                                {group.formats.map((format, j) => (
                                    <div key={j} className="bg-surface-container-low p-3 rounded-lg">
                                        <p className="font-semibold text-on-surface-variant">{format.resolution} <span className="text-outline">({format.size})</span></p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                        {format.links.map((link, k) => (
                                            <a href={link.url} key={k} target="_blank" rel="noopener noreferrer" className="inline-block bg-surface-container-high px-3 py-1.5 rounded-md text-sm hover:text-primary transition">
                                                {link.provider}
                                            </a>
                                        ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : <p className="text-on-surface-variant">No download links available.</p>}
                </div>
            )
        }
    ]

    return (
        <AnimatedPage>
            <div className="relative">
                {isPageLoading && !isInitialLoad && <LoadingSpinner overlay />}

                <div className={`p-5 grid grid-cols-1 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${isPageLoading && !isInitialLoad ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                    <div className="lg:col-span-2 space-y-6">
                        {/* Header */}
                        <div>
                            <Link to={`/anime/${episodeData.anime.slug}`} className="text-primary hover:underline text-sm inline-block">
                                &larr; Back to Anime Details
                            </Link>
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-1 text-on-background">{episodeData.episode}</h1>
                        </div>

                        {/* Video Player */}
                        <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                            {streamUrl ? (
                                <iframe src={streamUrl} className="w-full h-full" allowFullScreen title={episodeData.episode}></iframe>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                                    <p>No stream available. Please select a server.</p>
                                </div>
                            )}
                        </div>

                        {/* Episode Navigation */}
                        <div className="flex justify-between items-center gap-4">
                            {episodeData.has_previous_episode && episodeData.previous_episode_slug ? (
                                <Link to={`/episode/${episodeData.previous_episode_slug}`} className="inline-flex items-center gap-2 capitalize justify-center px-6 py-3 font-medium rounded-full focus:outline-none bg-surface-container text-on-surface-container transition hover:bg-surface-container-high">
                                    <ChevronLeftIcon /> Prev
                                </Link>
                            ) : <div />}
                            {episodeData.has_next_episode && episodeData.next_episode_slug && (
                                <Link to={`/episode/${episodeData.next_episode_slug}`} className="inline-flex items-center gap-2 capitalize justify-center px-6 py-3 font-medium rounded-full focus:outline-none bg-surface-container text-on-surface-container transition hover:bg-surface-container-high">
                                Next <ChevronRightIcon />
                                </Link>
                            )}
                        </div>
                        
                        {/* Server/Download Tabs */}
                        <Tabs tabs={tabContent} />

                    </div>
                    
                    {/* Episode Playlist */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface-container border border-outline-variant/30 rounded-2xl max-h-[60vh] lg:h-auto flex flex-col">
                            <h3 className="text-xl font-bold p-4 border-b border-outline-variant/30 flex-shrink-0 text-on-surface">Episode List</h3>
                            <div className="overflow-y-auto p-2">
                            {animeData?.episode_lists?.map((ep: EpisodeInfo) => (
                                    <button
                                        key={ep.slug}
                                        onClick={() => navigate(`/episode/${ep.slug}`)}
                                        className={`w-full text-left p-3 rounded-lg transition ${slug === ep.slug ? 'bg-primary-container text-on-primary-container' : 'hover:bg-primary/10'}`}
                                    >
                                        {ep.episode}
                                    </button>
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedPage>
    );
};

export default Episode;