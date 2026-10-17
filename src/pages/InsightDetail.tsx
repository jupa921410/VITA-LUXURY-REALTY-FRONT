import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiRequest } from '../lib/api';
import { type Post, formatPostDate } from '../lib/posts';
import { applySeo } from '../lib/apply-seo';

export default function InsightDetail() {
  const { slug } = useParams();
  return <Article key={slug} slug={slug || ''} />;
}

function Article({ slug }: { slug: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const path = '/insights/' + encodeURIComponent(slug);
    applySeo(path, { title: 'Journal Article | VITA Luxury Realty', description: 'Read the VITA Luxury Realty journal.' });
    apiRequest<Post>('/posts/' + encodeURIComponent(slug), { signal: controller.signal })
      .then(data => {
        if (!data || typeof data.title !== 'string') throw new Error('Invalid article');
        if (controller.signal.aborted) return;
        setPost(data);
        applySeo(path, { title: data.title + ' | VITA Luxury Realty', description: data.metaDescriptionEn || data.excerptEn || data.title, image: data.featuredImage || undefined });
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setError(true);
        applySeo(path, { title: 'Article Unavailable | VITA Luxury Realty', description: 'This article is currently unavailable.', noindex: true });
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [slug, attempt]);
  return <main className="bg-[#0C1730] text-white pt-40 pb-24 min-h-screen">
    <div className="section-container max-w-4xl mx-auto">
      <Link to="/insights" className="text-[#B8892F] inline-block mb-8">&larr; Back to journal</Link>
      {loading && <p role="status">Loading article...</p>}
      {!loading && error && <div role="alert"><h1 className="display text-3xl">Article unavailable</h1><p className="my-6">This article may no longer be published, or we couldn't reach the journal.</p><button className="luxury-btn-outline" onClick={() => { setLoading(true); setError(false); setAttempt(value => value + 1); }}>TRY AGAIN</button></div>}
      {!loading && !error && post && <article>
        <p className="eyebrow">{post.category} &middot; {formatPostDate(post.publishedAt)}</p>
        <h1 className="display text-3xl md:text-5xl my-6">{post.title}</h1>
        {post.featuredImage && <img src={post.featuredImage} alt={post.title} className="w-full max-h-[32rem] object-cover my-8" />}
        <div className="whitespace-pre-wrap text-white/80 leading-loose">{post.contentEn || post.excerptEn || 'Article content is not available yet.'}</div>
      </article>}
    </div>
  </main>;
}
