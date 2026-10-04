export interface ColorPreset {
  id: string
  name: string
  color: string
  emissive: string
  accentColor: string
}

export const COLOR_PRESETS: ColorPreset[] = [
  {
    id: 'sapphire',
    name: 'Zafiro Cyber',
    color: '#2563eb',
    emissive: '#1d4ed8',
    accentColor: '#60a5fa',
  },
  {
    id: 'emerald',
    name: 'Esmeralda Neón',
    color: '#059669',
    emissive: '#047857',
    accentColor: '#34d399',
  },
  {
    id: 'amethyst',
    name: 'Amatista Místico',
    color: '#7c3aed',
    emissive: '#6d28d9',
    accentColor: '#c084fc',
  },
  {
    id: 'ruby',
    name: 'Rubí Obsidiana',
    color: '#e11d48',
    emissive: '#be123c',
    accentColor: '#fb7185',
  },
  {
    id: 'amber',
    name: 'Ámbar Solar',
    color: '#d97706',
    emissive: '#b45309',
    accentColor: '#fbbf24',
  },
]
