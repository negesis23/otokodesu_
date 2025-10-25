
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApiAuto } from '../hooks/useApi';
import { getAnimeDetail } from '../services/apiService';
import StarIcon from '../components/icons/StarIcon';
import Header from '../components/Header';
import AnimeCard from '../components/AnimeCard';

const DetailItem: React.FC<{ label: string; value?: string | null }> = ({ label, value }) => {
    if (!value) return null;
    return (
        <div className="bg-surface p-4 rounded-2xl">
            <p className="text-sm text-text/60">{label}</p>
            <p className="font-semibold text-text">{value}</p>
        </div>
    );
};

const AnimeDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { data, loading, error } = useApiAuto(getAnimeDetail, slug || '');

    if (loading) return (
        <div>
            <Header title="Loading..." />
            <div className="p-5 animate-pulse">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 lg:w-1/4">
                        <div className="aspect-9/12 bg-surface rounded-3xl"></div>
                    </div>
                    <div className="w-full md:w-2/3 lg:w-3/4 space-y-4">
                        <div className="h-10 bg-surface rounded-lg w-3/4"></div>
                        <div className="h-6 bg-surface rounded-lg w-1/2"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-surface rounded-lg w-full"></div>
                            <div className="h-4 bg-surface rounded-lg w-full"></div>
                            <div className="h-4 bg-surface rounded-lg w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    if (error) return <p className="text-center p-5">Error: {error.message}</p>;
    if (!data) return <p className="text-center p-5">Anime not found.</p>;

    return (
        <div className="py-5">
            <Header title={data.title} />

            <section className="p-5 flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                    <img src={data.poster} alt={data.title} className="w-full h-auto object-cover rounded-3xl shadow-lg" />
                </div>
                <div className="space-y-4">
                    <h2 className="text-xl text-text/70 -mt-4">{data.japanese_title}</h2>
                    {data.rating && (
                        <div className="flex items-center gap-2 text-xl">
                            <StarIcon className="w-6 h-6 text-yellow-400" />
                            <span className="font-bold">{data.rating}</span>
                        </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {data.genres.map(g => <Link key={g.slug} to={`/genre/${g.slug}`} className="bg-surface px-4 py-2 rounded-full text-sm hover:bg-surface/70 transition">{g.name}</Link>)}
                    </div>
                    <h3 className="text-lg font-semibold pt-4">Synopsis</h3>
                    <p className="text-text/80 leading-relaxed max-w-prose">{data.synopsis}</p>
                </div>
            </section>
            
            <section className="p-5">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <DetailItem label="Status" value={data.status} />
                    <DetailItem label="Type" value={data.type} />
                    <DetailItem label="Episodes" value={data.episode_count} />
                    <DetailItem label="Duration" value={data.duration} />
                    <DetailItem label="Producer" value={data.produser} />
                    <DetailItem label="Studio" value={data.studio} />
                    <DetailItem label="Release Date" value={data.release_date} />
                </div>
            </section>

            <section className="p-5 space-y-5">
                <h3 className="text-2xl font-bold">Episodes</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {data.episode_lists.map(ep => (
                        <Link key={ep.slug} to={`/episode/${ep.slug}`} className="block text-center p-4 bg-surface rounded-2xl hover:bg-primary hover:text-primary-content transition font-medium">
                            {ep.episode}
                        </Link>
                    ))}
                </div>
            </section>

            {data.recommendations && data.recommendations.length > 0 && (
                 <section className="p-5 space-y-5">
                    <h3 className="text-2xl font-bold">Recommendations</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
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
    );
};

export default AnimeDetail;