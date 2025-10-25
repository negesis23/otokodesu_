import React, { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApiAuto } from '../hooks/useApi';
import { getEpisode } from '../services/apiService';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';
import Header from '../components/Header';

const Accordion: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-surface rounded-2xl">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-4 text-left font-medium"
            >
                <span>{title}</span>
                <ChevronRightIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            </button>
            {isOpen && <div className="p-4 border-t border-bg">{children}</div>}
        </div>
    )
}

const Episode: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error } = useApiAuto(getEpisode, slug || '');
    
    const [streamUrl, setStreamUrl] = useState<string | null>(null);
    const [selectedQuality, setSelectedQuality] = useState<string | null>(null);
    const [selectedServer, setSelectedServer] = useState<{ provider: string; url: string | null } | null>(null);

    const streamQualities = useMemo(() => {
        if (!data?.streamList) return new Map<string, { provider: string; url: string | null }[]>();
        
        const qualities = new Map<string, { provider: string; url:string | null }[]>();
        data.streamList.forEach(stream => {
            if (!stream.url) return;
            if (!qualities.has(stream.quality)) {
                qualities.set(stream.quality, []);
            }
            qualities.get(stream.quality)!.push({ provider: stream.provider, url: stream.url });
        });
        return qualities;
    }, [data?.streamList]);

    React.useEffect(() => {
        if (data?.stream_url) {
            setStreamUrl(data.stream_url);
            setSelectedQuality(null);
            setSelectedServer(null);
        } else if (streamQualities.size > 0) {
            const firstQuality = Array.from(streamQualities.keys())[0];
            const firstServerForQuality = streamQualities.get(firstQuality)?.[0];
            if (firstQuality && firstServerForQuality) {
                setSelectedQuality(firstQuality);
                setSelectedServer(firstServerForQuality);
                setStreamUrl(firstServerForQuality.url);
            }
        }
    }, [data, streamQualities]);

    const handleQualityClick = (quality: string) => {
        const firstServerForQuality = streamQualities.get(quality)?.[0];
        if (firstServerForQuality) {
            setSelectedQuality(quality);
            setSelectedServer(firstServerForQuality);
            setStreamUrl(firstServerForQuality.url);
        }
    }

    const handleServerClick = (server: { provider: string, url: string | null }) => {
        setSelectedServer(server);
        setStreamUrl(server.url);
    }

    if (loading) {
        return (
            <>
                <Header title="Loading episode..." />
                <div className="p-5 space-y-5">
                    <div className="w-full aspect-video bg-surface rounded-2xl animate-pulse"></div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-surface h-12 rounded-full w-full animate-pulse"></div>
                        <div className="bg-surface h-12 rounded-full w-full animate-pulse"></div>
                        <div className="bg-surface h-12 rounded-full w-full animate-pulse"></div>
                    </div>
                </div>
            </>
        );
    }
    
    if (error) return (
        <>
            <Header title="Error" />
            <div className="min-h-[50vh] flex items-center justify-center p-5 text-center">
                <p>Error: {error.message}</p>
            </div>
        </>
    );

    if (!data) return (
        <>
            <Header title="Not Found" />
            <div className="min-h-[50vh] flex items-center justify-center p-5 text-center">
                <p>Episode not found.</p>
            </div>
        </>
    );

    return (
        <div className="pb-5 space-y-5">
            <Header title={data.episode} />

            <section className="px-5">
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden">
                    {streamUrl ? (
                        <iframe src={streamUrl} className="w-full h-full" allowFullScreen title={data.episode}></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-text/70">
                            <p>No stream available for this episode.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="px-5">
                 <div className="grid grid-cols-3 items-center gap-3">
                    <div className="text-left">
                        {data.has_previous_episode && data.previous_episode_slug && (
                            <Link to={`/episode/${data.previous_episode_slug}`} className="inline-flex items-center gap-2 capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary">
                                <ChevronLeftIcon /> Prev
                            </Link>
                        )}
                    </div>
                    <div className="text-center">
                        <Link to={`/anime/${data.anime.slug}`} className="inline-flex items-center capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary whitespace-nowrap">
                            All Episodes
                        </Link>
                    </div>
                    <div className="text-right">
                        {data.has_next_episode && data.next_episode_slug && (
                            <Link to={`/episode/${data.next_episode_slug}`} className="inline-flex items-center gap-2 capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary">
                               Next <ChevronRightIcon />
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {streamQualities.size > 0 && (
                <section className="px-5 space-y-4">
                    <h2 className="text-xl font-medium">Streaming Servers</h2>
                    <div className="space-y-2">
                        <p className="font-semibold text-text/80">Quality</p>
                        <div className="flex flex-wrap gap-3">
                            {/* Fix: Explicitly type 'quality' as string to resolve type inference issue. */}
                            {Array.from(streamQualities.keys()).map((quality: string) => (
                                <button
                                    key={quality}
                                    onClick={() => handleQualityClick(quality)}
                                    className={`inline-flex items-center capitalize justify-center px-4 py-2 text-sm font-medium rounded-full focus:outline-none transition ${selectedQuality === quality ? 'bg-primary text-primary-content' : 'bg-surface text-text hover:text-primary'}`}
                                >
                                    {quality}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedQuality && streamQualities.has(selectedQuality) && (
                        <div className="space-y-2">
                            <p className="font-semibold text-text/80">Server</p>
                            <div className="flex flex-wrap gap-3">
                                {streamQualities.get(selectedQuality)?.map((server, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleServerClick(server)}
                                        className={`inline-flex items-center capitalize justify-center px-4 py-2 text-sm font-medium rounded-full focus:outline-none transition ${selectedServer?.provider === server.provider && selectedServer?.url === server.url ? 'bg-primary text-primary-content' : 'bg-surface text-text hover:text-primary'}`}
                                    >
                                        {server.provider}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </section>
            )}

            <section className="px-5 space-y-4 mt-8">
                <h2 className="text-xl font-medium">Download Links</h2>
                {data.download_urls.map((group, i) => (
                    <Accordion key={i} title={group.format_title}>
                        <div className="space-y-3">
                            {group.formats.map((format, j) => (
                                <div key={j} className="bg-bg p-4 rounded-xl">
                                    <p className="font-semibold">{format.resolution} <span className="text-text/60">({format.size})</span></p>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                    {format.links.map((link, k) => (
                                        <a href={link.url} key={k} target="_blank" rel="noopener noreferrer" className="inline-block bg-surface px-3 py-1 rounded-md text-sm hover:text-primary transition">
                                            {link.provider}
                                        </a>
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Accordion>
                ))}
            </section>
        </div>
    );
};

export default Episode;