// UI configuration for AI agent benchmarking
import uiConfig from '../ui-config.json';

export type DisplayMode = 'icon_only' | 'text_only' | 'icon_text';

interface UIConfig {
  displayMode: DisplayMode;
}

const config = uiConfig as UIConfig;

export function getDisplayMode(): DisplayMode {
  return config.displayMode || 'icon_text';
}

export function shouldShowIcons(): boolean {
  const mode = getDisplayMode();
  return mode === 'icon_only' || mode === 'icon_text';
}

export function shouldShowText(): boolean {
  const mode = getDisplayMode();
  return mode === 'text_only' || mode === 'icon_text';
}

export function shouldShowIconsOnly(): boolean {
  return getDisplayMode() === 'icon_only';
}

export function shouldShowTextOnly(): boolean {
  return getDisplayMode() === 'text_only';
}

