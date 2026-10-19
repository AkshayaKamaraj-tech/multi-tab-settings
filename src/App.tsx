import { useEffect, useRef, useState } from 'react';
import './App.css';

type Version = {
  counter: number;
  tabId: string;
};

type Setting<T> = {
  value: T;
  version: Version;
};

type Settings = {
  theme: Setting<'light' | 'dark'>;
  language: Setting<string>;
  fontSize: Setting<number>;
};

const STORAGE_KEY = 'syncspace-settings';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
];

const translations = {
  en: {
    eyebrow: 'YOUR WORKSPACE',
    title: 'Your Settings',
    description:
      'Personalise your experience. Your preferences sync automatically across tabs.',
    appearance: 'Appearance',
    appearanceDescription: 'Make SyncSpace feel like yours.',
    darkMode: 'Dark mode',
    darkModeDescription: 'Switch between light and dark themes.',
    language: 'Language',
    languageDescription: 'Choose your preferred language.',
    fontSize: 'Font size',
    fontSizeDescription:
      'Adjust text size for comfortable reading.',
    small: 'Small',
    large: 'Large',
    bannerTitle: 'Your settings travel with you.',
    bannerDescription:
      'Change a preference in one tab and watch it update in your other open tabs.',
    footer: 'Preferences saved automatically',
    sync: 'Live Sync Enabled',
  },

  ta: {
    eyebrow: 'உங்கள் பணியிடம்',
    title: 'உங்கள் அமைப்புகள்',
    description:
      'உங்கள் விருப்பங்களுக்கு ஏற்ப மாற்றுங்கள். உங்கள் அமைப்புகள் அனைத்து தாவல்களிலும் தானாக ஒத்திசைக்கப்படும்.',
    appearance: 'தோற்றம்',
    appearanceDescription:
      'SyncSpace-ஐ உங்கள் விருப்பத்திற்கு ஏற்ப மாற்றுங்கள்.',
    darkMode: 'இருண்ட பயன்முறை',
    darkModeDescription:
      'ஒளி மற்றும் இருண்ட தோற்றங்களுக்கு இடையே மாறுங்கள்.',
    language: 'மொழி',
    languageDescription:
      'உங்களுக்கு விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்.',
    fontSize: 'எழுத்து அளவு',
    fontSizeDescription:
      'வாசிப்பதற்கு ஏற்றவாறு எழுத்து அளவை மாற்றுங்கள்.',
    small: 'சிறியது',
    large: 'பெரியது',
    bannerTitle: 'உங்கள் அமைப்புகள் உங்களுடன் வரும்.',
    bannerDescription:
      'ஒரு தாவலில் மாற்றம் செய்தால், மற்ற திறந்த தாவல்களிலும் அது புதுப்பிக்கப்படும்.',
    footer: 'விருப்பங்கள் தானாகச் சேமிக்கப்படும்',
    sync: 'நேரடி ஒத்திசைவு இயங்குகிறது',
  },

  hi: {
    eyebrow: 'आपका कार्यक्षेत्र',
    title: 'आपकी सेटिंग्स',
    description:
      'अपने अनुभव को अपनी पसंद के अनुसार बनाएँ। आपकी सेटिंग्स सभी टैब में अपने आप सिंक होती हैं।',
    appearance: 'रूप',
    appearanceDescription:
      'SyncSpace को अपनी पसंद के अनुसार बनाएँ।',
    darkMode: 'डार्क मोड',
    darkModeDescription:
      'लाइट और डार्क थीम के बीच बदलें।',
    language: 'भाषा',
    languageDescription: 'अपनी पसंदीदा भाषा चुनें।',
    fontSize: 'फ़ॉन्ट का आकार',
    fontSizeDescription:
      'आसानी से पढ़ने के लिए टेक्स्ट का आकार बदलें।',
    small: 'छोटा',
    large: 'बड़ा',
    bannerTitle: 'आपकी सेटिंग्स आपके साथ रहती हैं।',
    bannerDescription:
      'एक टैब में बदलाव करें और उसे दूसरे खुले टैब में भी देखें।',
    footer: 'सेटिंग्स अपने आप सेव होती हैं',
    sync: 'लाइव सिंक चालू है',
  },

  fr: {
    eyebrow: 'VOTRE ESPACE',
    title: 'Vos paramètres',
    description:
      'Personnalisez votre expérience. Vos préférences se synchronisent automatiquement entre les onglets.',
    appearance: 'Apparence',
    appearanceDescription:
      'Personnalisez SyncSpace selon vos goûts.',
    darkMode: 'Mode sombre',
    darkModeDescription:
      'Passez du thème clair au thème sombre.',
    language: 'Langue',
    languageDescription:
      'Choisissez votre langue préférée.',
    fontSize: 'Taille du texte',
    fontSizeDescription:
      'Ajustez la taille du texte pour lire confortablement.',
    small: 'Petit',
    large: 'Grand',
    bannerTitle: 'Vos paramètres vous suivent.',
    bannerDescription:
      'Modifiez une préférence dans un onglet et retrouvez-la dans les autres.',
    footer: 'Préférences enregistrées automatiquement',
    sync: 'Synchronisation active',
  },

  es: {
    eyebrow: 'TU ESPACIO DE TRABAJO',
    title: 'Tu configuración',
    description:
      'Personaliza tu experiencia. Tus preferencias se sincronizan automáticamente entre pestañas.',
    appearance: 'Apariencia',
    appearanceDescription:
      'Personaliza SyncSpace a tu gusto.',
    darkMode: 'Modo oscuro',
    darkModeDescription:
      'Cambia entre los temas claro y oscuro.',
    language: 'Idioma',
    languageDescription:
      'Elige tu idioma preferido.',
    fontSize: 'Tamaño de fuente',
    fontSizeDescription:
      'Ajusta el tamaño del texto para leer cómodamente.',
    small: 'Pequeño',
    large: 'Grande',
    bannerTitle: 'Tu configuración va contigo.',
    bannerDescription:
      'Cambia una preferencia en una pestaña y verás el cambio en las demás.',
    footer: 'Preferencias guardadas automáticamente',
    sync: 'Sincronización activa',
  },
};

type Language = keyof typeof translations;

function defaultSettings(): Settings {
  const version = { counter: 0, tabId: '' };

  return {
    theme: { value: 'light', version },
    language: { value: 'en', version },
    fontSize: { value: 16, version },
  };
}

function isValidSettings(data: unknown): data is Settings {
  if (!data || typeof data !== 'object') return false;

  const item = data as Record<string, unknown>;

  const validSetting = (setting: unknown): boolean => {
    if (!setting || typeof setting !== 'object') return false;

    const entry = setting as Record<string, unknown>;
    const version = entry.version as Record<string, unknown> | null;

    return (
      !!version &&
      typeof version === 'object' &&
      typeof version.counter === 'number' &&
      Number.isFinite(version.counter) &&
      version.counter >= 0 &&
      typeof version.tabId === 'string'
    );
  };

  return (
    validSetting(item.theme) &&
    validSetting(item.language) &&
    validSetting(item.fontSize) &&
    ['light', 'dark'].includes(
      (item.theme as Setting<string>).value
    ) &&
    LANGUAGES.some(
      (language) =>
        language.code ===
        (item.language as Setting<string>).value
    ) &&
    typeof (item.fontSize as Setting<number>).value === 'number' &&
    Number.isFinite((item.fontSize as Setting<number>).value) &&
    (item.fontSize as Setting<number>).value >= 12 &&
    (item.fontSize as Setting<number>).value <= 28
  );
}

function readSettings(): Settings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed: unknown = JSON.parse(stored);

      if (isValidSettings(parsed)) {
        return parsed;
      }
    }
  } catch {
    console.warn('Could not load saved settings.');
  }

  return defaultSettings();
}

function compareVersions(a: Version, b: Version): number {
  if (a.counter !== b.counter) {
    return a.counter - b.counter;
  }

  return a.tabId.localeCompare(b.tabId);
}

function mergeSettings(a: Settings, b: Settings): Settings {
  return {
    theme:
      compareVersions(a.theme.version, b.theme.version) >= 0
        ? a.theme
        : b.theme,

    language:
      compareVersions(a.language.version, b.language.version) >= 0
        ? a.language
        : b.language,

    fontSize:
      compareVersions(a.fontSize.version, b.fontSize.version) >= 0
        ? a.fontSize
        : b.fontSize,
  };
}

function applySettings(settings: Settings) {
  document.documentElement.dataset.theme =
    settings.theme.value;

  document.documentElement.style.setProperty(
    '--base-font-size',
    `${settings.fontSize.value}px`
  );

  document.documentElement.lang = settings.language.value;
}

function App() {
  const tabId = useRef(crypto.randomUUID()).current;

  const [settings, setSettings] = useState<Settings>(() => {
    const initial = readSettings();
    applySettings(initial);
    return initial;
  });

  const settingsRef = useRef(settings);

  useEffect(() => {
    const channel =
      typeof BroadcastChannel !== 'undefined'
        ? new BroadcastChannel('syncspace-channel')
        : null;

    function receiveSettings(incoming: unknown) {
      if (!isValidSettings(incoming)) return;

      const merged = mergeSettings(
        settingsRef.current,
        incoming
      );

      settingsRef.current = merged;
      setSettings(merged);
      applySettings(merged);

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(merged)
        );
      } catch {
        console.warn('Could not save settings.');
      }
    }

    function handleStorage(event: StorageEvent) {
      if (event.key !== STORAGE_KEY || !event.newValue) {
        return;
      }

      try {
        receiveSettings(JSON.parse(event.newValue));
      } catch {
        console.warn('Received invalid stored settings.');
      }
    }

    function handleBroadcast(event: MessageEvent) {
      receiveSettings(event.data);
    }

    channel?.addEventListener('message', handleBroadcast);
    window.addEventListener('storage', handleStorage);

    return () => {
      channel?.removeEventListener('message', handleBroadcast);
      channel?.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  function updateSetting<K extends keyof Settings>(
    key: K,
    value: Settings[K]['value']
  ) {
    const latest = mergeSettings(
      settingsRef.current,
      readSettings()
    );

    const highestCounter = Math.max(
      latest.theme.version.counter,
      latest.language.version.counter,
      latest.fontSize.version.counter
    );

    const updatedEntry = {
      value,
      version: {
        counter: highestCounter + 1,
        tabId,
      },
    } as Settings[K];

    const next = {
      ...latest,
      [key]: updatedEntry,
    } as Settings;

    settingsRef.current = next;
    setSettings(next);
    applySettings(next);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next)
      );
    } catch {
      console.warn('Could not save settings.');
    }

    if (typeof BroadcastChannel !== 'undefined') {
      const channel = new BroadcastChannel('syncspace-channel');
      channel.postMessage(next);
      channel.close();
    }
  }

  const isDark = settings.theme.value === 'dark';
  const t = translations[settings.language.value as Language];

  return (
    <div className="app">
      <header className="header">
        <div className="brand">
          <span className="brand-icon">✦</span>
          <span>SyncSpace</span>
        </div>

        <span className="sync-badge">
          <span className="status-dot" />
          {t.sync}
        </span>
      </header>

      <main className="main-content">
        <div className="page-heading">
          <span className="eyebrow">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.description}</p>
        </div>

        <section className="settings-card">
          <div className="section-heading">
            <div>
              <h2>{t.appearance}</h2>
              <p>{t.appearanceDescription}</p>
            </div>
            <span className="section-icon">◐</span>
          </div>

          <div className="setting-row">
            <div className="setting-label">
              <span className="setting-icon">☾</span>
              <div>
                <h3>{t.darkMode}</h3>
                <p>{t.darkModeDescription}</p>
              </div>
            </div>

            <button
              type="button"
              className={`toggle ${isDark ? 'active' : ''}`}
              role="switch"
              aria-checked={isDark}
              aria-label={t.darkMode}
              onClick={() =>
                updateSetting(
                  'theme',
                  isDark ? 'light' : 'dark'
                )
              }
            >
              <span className="toggle-knob" />
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-label">
              <span className="setting-icon">文</span>
              <div>
                <h3>{t.language}</h3>
                <p>{t.languageDescription}</p>
              </div>
            </div>

            <select
              value={settings.language.value}
              onChange={(event) =>
                updateSetting('language', event.target.value)
              }
              aria-label={t.language}
            >
              {LANGUAGES.map((language) => (
                <option
                  key={language.code}
                  value={language.code}
                >
                  {language.name}
                </option>
              ))}
            </select>
          </div>

          <div className="setting-row font-row">
            <div className="setting-label">
              <span className="setting-icon">Aa</span>
              <div>
                <h3>{t.fontSize}</h3>
                <p>{t.fontSizeDescription}</p>
              </div>
            </div>

            <span className="font-value">
              {settings.fontSize.value}px
            </span>
          </div>

          <input
            className="font-slider"
            type="range"
            min="12"
            max="28"
            step="1"
            value={settings.fontSize.value}
            onChange={(event) =>
              updateSetting(
                'fontSize',
                Number(event.target.value)
              )
            }
            aria-label={t.fontSize}
          />

          <div className="slider-labels">
            <span>{t.small}</span>
            <span>{t.large}</span>
          </div>
        </section>

        <div className="info-banner">
          <span className="info-icon">↗</span>
          <div>
            <h3>{t.bannerTitle}</h3>
            <p>{t.bannerDescription}</p>
          </div>
        </div>

        <footer className="page-footer">
          <span>SyncSpace</span>
          <span>{t.footer}</span>
        </footer>
      </main>
    </div>
  );
}

export default App;