import { render } from '@builder.io/qwik'
import '@builder.io/qwik/qwikloader.js'
import '@unocss/reset/eric-meyer.css'
import 'virtual:uno.css'
import { App } from './app'
import './index.css'

const element = document.querySelector('main')

if (!element) throw new Error('找不到可供挂载的元素')

render(element, <App />)
