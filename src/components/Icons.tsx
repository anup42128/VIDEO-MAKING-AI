// Icons.tsx

export const CoffeeIcon = ({ className = '' }) => (
  <svg className={className} width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17 8H3V15C3 18.3137 5.68629 21 9 21H11C14.3137 21 17 18.3137 17 15V8Z" fill="url(#coffee-grad)" />
    <path d="M17 10H19C20.6569 10 22 11.3431 22 13C22 14.6569 20.6569 16 19 16H17" stroke="url(#coffee-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 2L6 4.5M10.5 2L9.5 4.5M14 2L13 4.5" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="coffee-grad" x1="10" y1="8" x2="10" y2="21" gradientUnits="userSpaceOnUse">
        <stop stopColor="var(--accent-warm)" />
        <stop offset="1" stopColor="var(--accent-gold)" />
      </linearGradient>
    </defs>
  </svg>
);

export const ImageIcon = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" opacity="0.4" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const MusicIcon = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13" opacity="0.4" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

export const ClapperboardIcon = ({ className = '' }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" opacity="0.4" />
    <line x1="2" y1="10" x2="22" y2="10" />
    <line x1="6" y1="2" x2="2" y2="6" />
    <line x1="10" y1="2" x2="6" y2="6" />
    <line x1="14" y1="2" x2="10" y2="6" />
    <line x1="18" y1="2" x2="14" y2="6" />
    <line x1="22" y1="2" x2="18" y2="6" />
  </svg>
);

export const DownloadIcon = ({ className = '' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" opacity="0.4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

export const RefreshIcon = ({ className = '' }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" opacity="0.7"/>
  </svg>
);

export const CheckIcon = ({ className = '' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const XIcon = ({ className = '' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const AlertIcon = ({ className = '' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" opacity="0.4" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

export const SparklesIcon = ({ className = '' }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    <path d="M5 3l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" opacity="0.5"/>
  </svg>
);

export const ArrowRightIcon = ({ className = '' }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export const ArrowLeftIcon = ({ className = '' }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export const LargeDropImageIcon = ({ className = '' }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="drop-shadow(0px 0px 8px rgba(200, 145, 58, 0.4))">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" opacity="0.2" fill="var(--accent-gold)" stroke="none" />
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="2" fill="var(--accent-amber)" stroke="none" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export const LargeDropAudioIcon = ({ className = '' }) => (
  <svg className={className} width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent-warm)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" filter="drop-shadow(0px 0px 8px rgba(200, 145, 58, 0.4))">
    <path d="M9 18V5l12-2v13" opacity="0.2" fill="var(--accent-gold)" stroke="none" />
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" fill="var(--accent-amber)" stroke="none" />
    <circle cx="18" cy="16" r="3" fill="var(--accent-amber)" stroke="none" />
  </svg>
);
