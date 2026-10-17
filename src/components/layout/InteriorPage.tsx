import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
type Props = { eyebrow: string; title: string; copy: string; action?: string };
export default function InteriorPage({ eyebrow, title, copy, action = 'EXPLORE PROPERTIES' }: Props) {
  return <main className="page-shell"><section className="interior-hero"><div><p className="eyebrow">{eyebrow}</p><h1 className="mt-7 whitespace-pre-line">{title}</h1><p>{copy}</p><Link to="/contact" className="mt-9 inline-flex items-center gap-3 border border-[#B8892F] px-5 py-3 text-[10px] font-accent font-semibold tracking-[.15em] text-[#FFFFFF] transition hover:bg-[#B8892F] hover:text-[#060912]">{action}<ArrowRight size={14} /></Link></div></section></main>;
}
