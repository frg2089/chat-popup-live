import { $, component$, useSignal } from '@builder.io/qwik'

export const App = component$(() => {
  const name = useSignal(
    (() => {
      const name = localStorage.getItem('name')
      if (name == null) return ''
      return name
    })(),
  )
  const content = useSignal('')
  const temp = useSignal('')
  const history = useSignal([] as string[])
  const depth = useSignal(0)

  const onKeyDown = $((ev: KeyboardEvent) => {
    const el = ev.target as HTMLTextAreaElement
    window.channel ??= new BroadcastChannel('chat-popup-live')

    switch (ev.key) {
      case 'ArrowUp':
        if (!depth.value) {
          temp.value = el.value
        }
        depth.value++
        depth.value = Math.min(depth.value, history.value.length)
        if (depth.value) {
          el.value = history.value[history.value.length - depth.value]
        } else {
          el.value = temp.value
        }

        ev.preventDefault()
        break
      case 'ArrowDown':
        depth.value--
        depth.value = Math.max(depth.value, 0)
        if (depth.value) {
          el.value = history.value[history.value.length - depth.value]
        } else {
          el.value = temp.value
        }

        ev.preventDefault()
        break
      case 'Enter':
        if (ev.shiftKey) {
          // 追加换行
        } else if (name.value && content.value) {
          // 发送
          window.channel.postMessage({
            name: name.value,
            content: content.value,
          })
          history.value.push(content.value)
          localStorage.setItem('name', name.value)
          temp.value = el.value = ''
          ev.preventDefault()
        }
        break

      default:
        depth.value = 0
        break
    }
  })

  document.title = 'Chat Box Sender'
  return (
    <>
      <header>
        <label for="name">发言人：</label>
        <input name="name" type="text" bind:value={name} />
      </header>
      <section>
        <textarea
          class="w-full box-border"
          name="content"
          autofocus
          autocapitalize="off"
          rows={10}
          bind:value={content}
          onKeyDown$={onKeyDown}
        />
      </section>
      <footer> </footer>
    </>
  )
})
