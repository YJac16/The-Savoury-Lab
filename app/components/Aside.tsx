import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useId} from 'react';

type AsideType = 'search' | 'cart' | 'mobile' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

type AsideProps = {
  children?: ReactNode;
  heading: ReactNode;
  type: AsideType;
  wide?: boolean;
};

export function Aside({children, heading, type, wide = false}: AsideProps) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const id = useId();

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.body.style.overflow = 'hidden';
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      abortController.abort();
    };
  }, [close, expanded]);

  return (
    <div
      aria-modal={expanded}
      className={`overlay ${expanded ? 'expanded' : ''} ${wide ? 'overlay-wide' : ''}`}
      role="dialog"
      aria-labelledby={id}
      aria-hidden={!expanded}
    >
      <button
        type="button"
        className="close-outside"
        onClick={close}
        aria-label="Close panel"
        tabIndex={expanded ? 0 : -1}
      />
      <aside
        className={`aside-premium ${wide ? 'aside-wide' : ''}`}
        data-expanded={expanded}
      >
        <header className="aside-header">
          <h2 id={id} className="font-display text-lg font-medium tracking-tight">
            {heading}
          </h2>
          <button
            type="button"
            className="aside-close reset"
            onClick={close}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>
        <main className="aside-main">{children}</main>
      </aside>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
