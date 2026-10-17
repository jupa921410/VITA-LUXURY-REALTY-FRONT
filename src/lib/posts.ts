export interface Post {
  id: number;
  slug: string;
  title: string;
  excerptEn: string | null;
  contentEn?: string | null;
  featuredImage: string | null;
  category: string;
  publishedAt: string | null;
  metaDescriptionEn?: string | null;
}

export function formatPostDate(value: string | null): string {
  if (!value) return 'VITA JOURNAL';
  const date = new Date(/^\d{4}-\d{2}-\d{2}$/.test(value) ? value + 'T00:00:00' : value);
  return Number.isNaN(date.getTime()) ? 'VITA JOURNAL' : date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
}
