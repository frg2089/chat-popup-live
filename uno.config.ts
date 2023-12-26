import { defineConfig, presetAttributify, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify({
      strict: true,
    }),
    presetUno(),
  ],
})
