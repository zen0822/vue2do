declare module '*.svg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'

declare module '*.jpg' {
  const content: string
  export default content
}
