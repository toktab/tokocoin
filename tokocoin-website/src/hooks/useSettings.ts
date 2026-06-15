import { useCallback, useEffect, useState } from "react";

const SETTINGS_KEY = "toko-settings-v1";

type Settings = {
  soundEnabled: boolean;
  ambientEnabled: boolean;
  reduceMotion: boolean;
  demoMode: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  soundEnabled: false,
  ambientEnabled: false,
  reduceMotion: false,
  demoMode: false,
};

function loadSettings(): Settings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const stored = window.localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {
    // ignore
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: Settings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export type SettingsState = Settings & {
  setSoundEnabled: (enabled: boolean) => void;
  setAmbientEnabled: (enabled: boolean) => void;
  setReduceMotion: (enabled: boolean) => void;
  setDemoMode: (enabled: boolean) => void;
};

export function useSettings(): SettingsState {
  const [settings, setSettings] = useState<Settings>(loadSettings);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, soundEnabled: enabled }));
  }, []);

  const setAmbientEnabled = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, ambientEnabled: enabled }));
  }, []);

  const setReduceMotion = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, reduceMotion: enabled }));
  }, []);

  const setDemoMode = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, demoMode: enabled }));
  }, []);

  return {
    ...settings,
    setSoundEnabled,
    setAmbientEnabled,
    setReduceMotion,
    setDemoMode,
  };
}
