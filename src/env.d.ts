import type { AttributifyAttributes } from '@unocss/preset-attributify'

declare module '@builder.io/qwik' {
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
