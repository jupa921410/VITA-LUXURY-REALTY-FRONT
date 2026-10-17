import { useState, type FormEvent } from 'react';
import { CheckCircle2, FileText, Send, ShieldCheck, Upload } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import { apiRequest } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';

export default function JoinTeam() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '', email: '', phone: '', whatsapp: '', license_number: '', brokerage: '', years_experience: '', message: '',
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [resume, setResume] = useState<File | null>(null);

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (value) body.append(key, value); });
    if (photo) body.append('photo', photo);
    if (resume) body.append('resume', resume);

    try {
      await apiRequest('/agent-applications', { method: 'POST', body });
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'No se pudo enviar la solicitud.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-[#0C1730] text-white">
      <PageHero
        eyebrow={t('joinEyebrow')}
        titlePrefix="JOIN THE"
        rotatingWords={['Advisory Council', 'VITA Team', 'Next Chapter', 'Private Network']}
        titleSuffix="AT VITA"
        description={t('joinHeroDesc')}
        backgroundImage="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85"
        badgeText="CONFIDENTIAL APPLICATION"
        statCard={{ label: 'NEXT STEP', value: 'PRIVATE REVIEW', sub: 'Every application reviewed by leadership' }}
        ctaText={t('joinSubmitBtn')}
        ctaLink="#application-form"
        ctaSecondaryText="MEET OUR ADVISORS"
        ctaSecondaryLink="/agents"
        coordinates="BUILD YOUR LEGACY WITH VITA"
      />

      <section id="application-form" className="luxury-section">
        <div className="section-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 gold-glass-card p-8 sm:p-12 rounded-sm">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 size={42} className="text-[#B8892F] mx-auto" />
                <h2 className="display text-4xl">{t('joinSuccessTitle')}</h2>
                <p className="text-sm text-white/70">{t('joinSuccessDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="pb-5 border-b border-[#B8892F]/25"><span className="eyebrow">{t('joinFormEyebrow')}</span><h2 className="display text-3xl sm:text-4xl mt-1">{t('joinFormH2')}</h2></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={t('joinNameLabel')} required value={form.name} onChange={value => update('name', value)} />
                  <Field label={t('joinEmailLabel')} required type="email" value={form.email} onChange={value => update('email', value)} />
                  <Field label={t('joinPhoneLabel')} value={form.phone} onChange={value => update('phone', value)} />
                  <Field label={t('joinWhatsappLabel')} value={form.whatsapp} onChange={value => update('whatsapp', value)} />
                  <Field label={t('joinLicenseLabel')} value={form.license_number} onChange={value => update('license_number', value)} />
                  <Field label={t('joinBrokerageLabel')} value={form.brokerage} onChange={value => update('brokerage', value)} />
                  <Field label={t('joinYearsLabel')} type="number" value={form.years_experience} onChange={value => update('years_experience', value)} />
                </div>
                <div><label className="text-[10px] font-accent tracking-[0.2em] text-white/60 uppercase block mb-2">{t('joinMessageLabel')}</label><textarea required rows={5} value={form.message} onChange={event => update('message', event.target.value)} className="luxury-input resize-none" placeholder="Tell us about your market, track record, and what you want to build." /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FileField label={t('joinPhotoLabel')} icon={<Upload size={15} />} accept="image/*" onChange={setPhoto} />
                  <FileField label={t('joinResumeLabel')} icon={<FileText size={15} />} accept=".pdf,.doc,.docx" onChange={setResume} />
                </div>
                {error && <p className="text-sm text-red-300 border border-red-400/30 bg-red-950/30 p-3">{error}</p>}
                <div className="flex items-center gap-2 text-[10px] text-white/50"><ShieldCheck size={15} className="text-[#B8892F]" /><span>Your information is reviewed confidentially.</span></div>
                <button disabled={submitting} className="luxury-btn-primary w-full !py-3.5 disabled:opacity-60"><Send size={15} /><span>{submitting ? '...' : t('joinSubmitBtn')}</span></button>
              </form>
            )}
          </div>
          <div className="lg:col-span-5 space-y-6 lg:pt-8"><span className="eyebrow">A DIFFERENT KIND OF BROKERAGE</span><h2 className="display text-4xl">Representation with <i>standards.</i></h2><p className="text-sm text-white/70 leading-relaxed">VITA brings together advisors who value discretion, local intelligence, and long-term relationships over transaction volume.</p><div className="gold-glass-card p-6 space-y-4"><div className="flex gap-3"><ShieldCheck className="text-[#B8892F] shrink-0" size={20} /><div><strong className="text-sm">Leadership review</strong><p className="text-xs text-white/60 mt-1">Every application is reviewed personally by the team.</p></div></div><div className="flex gap-3"><FileText className="text-[#B8892F] shrink-0" size={20} /><div><strong className="text-sm">Professional profile</strong><p className="text-xs text-white/60 mt-1">Share your experience and the market you know best.</p></div></div></div></div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return <div><label className="text-[10px] font-accent tracking-[0.2em] text-white/60 uppercase block mb-2">{label}</label><input required={required} type={type} value={value} onChange={event => onChange(event.target.value)} className="luxury-input" /></div>;
}

function FileField({ label, icon, accept, onChange }: { label: string; icon: React.ReactNode; accept: string; onChange: (file: File | null) => void }) {
  return <label className="luxury-input flex items-center gap-2 cursor-pointer"><span className="text-[#B8892F]">{icon}</span><span className="truncate text-xs">{label}</span><input type="file" accept={accept} className="hidden" onChange={event => onChange(event.target.files?.[0] || null)} /></label>;
}