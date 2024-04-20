import { component$, useSignal, useStore } from '@builder.io/qwik'
import progressbar from 'progressbar.js'
import './app.css'

interface Message {
  name: string
  content: string
}
interface Data {
  delay: number
  message: Message
}

export const App = component$(() => {
  const channel = new BroadcastChannel('chat-popup-live')
  const queue = useStore({
    queue: [] as Data[],
    current: undefined as Data | undefined,
  })
  const progressRef = useSignal<HTMLElement>()
  const delay = useSignal(0)
  const progress = useSignal(undefined as any)
  const setDelay = () => {
    delay.value++

    if (progressRef.value) {
      progress.value ??= new progressbar.Line(progressRef.value, {
        color: '#744da9',
        easing: 'linear',
        duration: 1000,
      })
      if (delay.value <= 1) {
        progress.value.set(0)
      }
      progress.value.animate(delay.value / queue.current!.delay)
    }

    if (delay.value < queue.current!.delay) {
      setTimeout(setDelay, 1000)
    } else {
      delay.value = 0
    }
  }

  const run = (message?: Message) => {
    if (message) {
      const delay = Math.max(Math.round(message.content.length * 0.5), 5)
      queue.queue.push({ delay, message })
      if (!queue.current) run()
    } else {
      // 队列出队
      queue.current = queue.queue.shift()
      if (!queue.current) return
      setDelay()
      setTimeout(run, queue.current.delay * 1000)
    }
  }

  channel.addEventListener('message', ev => run(ev.data))

  document.title = 'Chat Box'
  return (
    <>
      <div
        style={{
          opacity: queue.current ? 0.9 : 0,
        }}
        class="bg-white transition-opacity text-4xl">
        <div class="w-1280px mx-auto">
          <header class="pt-[0.5em] h-1em">
            <div class="font-bold">{queue.current?.message.name}</div>
          </header>
          <section class="h-4em mx-2em pt-[0.5em]">
            {queue.current?.message.content}
          </section>
        </div>
        <footer>
          <div class="control-panel flex flex-row justify-center gap-4">
            <span>SAVE</span>
            <span>LOAD</span>
            <span>⭰</span>
            <span>⯬</span>
            <span>🡄</span>
            <span>▶</span>
            <span>🡆</span>
            <span>⯮</span>
            <span>⭲</span>
            <span>HISTORY</span>
            <strong>×</strong>
          </div>
          <div ref={progressRef} />
        </footer>
      </div>
    </>
  )
})
