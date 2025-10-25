
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApiAuto } from '../hooks/useApi';
import { getEpisode } from '../services/apiService';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import ChevronRightIcon from '../components/icons/ChevronRightIcon';

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

    React.useEffect(() => {
        if (data?.stream_url) {
            setStreamUrl(data.stream_url);
        } else if (data?.streamList && data.streamList.length > 0) {
            const firstAvailableStream = data.streamList.find(s => s.url);
            if (firstAvailableStream) {
                setStreamUrl(firstAvailableStream.url);
            }
        }
    }, [data]);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading episode...</p></div>;
    if (error) return <div className="min-h-screen flex items-center justify-center"><p>Error: {error.message}</p></div>;
    if (!data) return <div className="min-h-screen flex items-center justify-center"><p>Episode not found.</p></div>;

    return (
        <div className="py-5 space-y-5">
            <section>
                <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden">
                    {streamUrl ? (
                        <iframe src={streamUrl} className="w-full h-full" allowFullScreen></iframe>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-text/70">
                            <p>No stream available for this episode.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="p-5 space-y-4">
                 <div className="flex items-center justify-between gap-3">
                    {data.has_previous_episode && data.previous_episode_slug ? (
                        <Link to={`/episode/${data.previous_episode_slug}`} className="inline-flex items-center gap-2 capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary">
                            <ChevronLeftIcon /> Prev
                        </Link>
                    ) : <div className="w-[105px]" />}
                    <Link to={`/anime/${data.anime.slug}`} className="inline-flex items-center capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary whitespace-nowrap">
                        All Episodes
                    </Link>
                    {data.has_next_episode && data.next_episode_slug ? (
                        <Link to={`/episode/${data.next_episode_slug}`} className="inline-flex items-center gap-2 capitalize justify-center px-5 py-3 font-medium rounded-full focus:outline-none bg-surface text-text transition hover:text-primary">
                           Next <ChevronRightIcon />
                        </Link>
                    ) : <div className="w-[105px]" />}
                </div>

                <h1 className="text-3xl font-bold pt-5">{data.episode}</h1>
            </section>

            {data.streamList && data.streamList.length > 0 && (
                <section className="p-5 space-y-3">
                    <h2 className="text-xl font-medium">Stream Mirrors</h2>
                    <div className="flex flex-wrap gap-3">
                        {data.streamList.filter(s => s.url).map((stream, i) => (
                            <button key={i} onClick={() => setStreamUrl(stream.url)} className={`inline-flex items-center capitalize justify-center px-4 py-2 text-sm font-medium rounded-full focus:outline-none transition ${streamUrl === stream.url ? 'bg-primary text-primary-content' : 'bg-surface text-text hover:text-primary'}`}>
                                {stream.provider} ({stream.quality})
                            </button>
                        ))}
                    </div>
                </section>
            )}

            <section className="p-5 space-y-4">
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