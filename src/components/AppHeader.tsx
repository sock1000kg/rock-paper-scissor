interface AppHeaderProps {
  current: 'home' | 'classic' | 'ottv2';
  onNavigate: (destination: 'home' | 'classic' | 'ottv2') => void;
}

export function AppHeader({ current, onNavigate }: AppHeaderProps) {
  return (
    <header className="app-header">
      <button className="brand" type="button" onClick={() => onNavigate('home')}>
        <span className="brand-mark" aria-hidden="true">✦</span>
        <span>OTT Lab</span>
      </button>
      <nav aria-label="Chọn bài tập">
        <button className={current === 'classic' ? 'nav-active' : ''} onClick={() => onNavigate('classic')}>
          Bài 1 · Cổ điển
        </button>
        <button className={current === 'ottv2' ? 'nav-active' : ''} onClick={() => onNavigate('ottv2')}>
          Bài 2 · OTTv2
        </button>
      </nav>
    </header>
  );
}
