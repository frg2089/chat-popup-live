import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  content: {
    pipeline: {
      include: ['./src/**/*.{ts,tsx,js}'],
    },
  },
  presets: [presetAttributify(), presetUno()],
})
