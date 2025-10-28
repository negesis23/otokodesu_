import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApiAuto } from '../hooks/useApi';
import { getAnimeDetail } from '../services/apiService';
import StarIcon from '../components/icons/StarIcon';
import AnimatedPage from '../components/AnimatedPage';
import SectionHeader from '../components/SectionHeader';
import AnimeCard from '../components/AnimeCard';

const DetailItem: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="relative p-px rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30">
            <div className="bg-surface-container h-full w-full p-4 rounded-[11px]">
                <p className="text-sm text-on-surface-variant">{label}</p>
                <p className="font-semibold text-on-surface mt-1">{value}</p>
            </div>
        </div>
    );
};

const AnimeDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error } = useApiAuto(getAnimeDetail, slug || '');

    if (loading) return (
        <AnimatedPage>
            <div className="p-5 animate-pulse">
                <div className="h-96 bg-surface-container rounded-3xl mb-8"></div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                    {Array.from({length: 4}).map((_, i) => <div key={i} className="h-24 bg-surface-container rounded-2xl"></div>)}
                </div>
                 <div className="h-8 bg-surface-container rounded-lg w-1/4 mb-8"></div>
                 <div className="space-y-2">
                    {Array.from({length: 12}).map((_, i) => <div key={i} className="h-12 bg-surface-container rounded-lg"></div>)}
                </div>
            </div>
        </AnimatedPage>
    );
    if (error) return <p className="text-center p-5">Error: {error.message}</p>;
    if (!data) return <p className="text-center p-5">Anime not found.</p>;

    return (
        <AnimatedPage>
            <div className="pb-5 space-y-16">
                <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-end rounded-3xl overflow-hidden p-5 md:p-8">
                    <div className="absolute inset-0">
                        <img src={data.poster} alt="" className="w-full h-full object-cover blur-2xl scale-125" />
                        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background via-background/80 to-primary/20"></div>
                    </div>
                    <div className="relative z-10 w-full flex flex-col md:flex-row items-center md:items-end text-center md:text-left gap-8 md:gap-12">
                        <div className="w-48 md:w-64 flex-shrink-0">
                            <img src={data.poster} alt={data.title} className="w-full h-auto object-cover rounded-xl shadow-2xl shadow-black/40" />
                        </div>
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-background">{data.title}</h1>
                            <h2 className="text-xl text-on-surface-variant -mt-2">{data.japanese_title}</h2>
                            {data.rating && (
                                <div className="inline-flex items-center gap-2 text-xl bg-surface-container/80 text-on-surface-container px-4 py-2 rounded-full backdrop-blur-sm">
                                    <StarIcon className="w-6 h-6 text-yellow-400" />
                                    <span className="font-bold">{data.rating}</span>
                                </div>
                            )}
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                                {data.genres.map(g => <Link key={g.slug} to={`/genre/${g.slug}`} className="bg-primary-container px-4 py-2 rounded-full text-sm font-medium text-on-primary-container hover:bg-primary hover:text-on-primary transition">{g.name}</Link>)}
                            </div>
                        </div>
                    </div>
                </section>
                
                <p className="text-on-surface-variant leading-relaxed max-w-prose p-5 -my-8">{data.synopsis}</p>

                <section className="p-5">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        <DetailItem label="Status" value={data.status} />
                        <DetailItem label="Type" value={data.type} />
                        <DetailItem label="Episodes" value={data.episode_count} />
                        <DetailItem label="Duration" value={data.duration} />
                        <DetailItem label="Producer" value={data.produser} />
                        <DetailItem label="Studio" value={data.studio} />
                        <DetailItem label="Release Date" value={data.release_date} />
                    </div>
                </section>

                <section className="p-5 space-y-8">
                    <SectionHeader title="Episodes" />
                     <div className="border border-outline-variant/30 rounded-2xl max-h-[500px] overflow-y-auto">
                        <ul className="divide-y divide-outline-variant/30">
                            {data.episode_lists.map(ep => (
                                <li key={ep.slug}>
                                    <Link to={`/episode/${ep.slug}`} className="block p-4 hover:bg-primary/10 transition-colors group">
                                        <span className="font-medium text-on-surface-variant group-hover:text-primary transition-colors">{ep.episode}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {data.recommendations && data.recommendations.length > 0 && (
                     <section className="p-5 space-y-8">
                        <SectionHeader title="You Might Also Like" />
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-10">
                            {data.recommendations.map(rec => (
                                <AnimeCard 
                                    key={rec.slug}
                                    slug={rec.slug}
                                    title={rec.title}
                                    poster={rec.poster}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </AnimatedPage>
    );
};

export default AnimeDetail;