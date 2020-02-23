declare module '*.svg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.jpg'
declare module '*.scss'
declare module '*.html'

declare module '*.vue' {
  export default Vue
}

declare module '*.pug' {
  const content: any

  export default content
}

declare module '*.scss' {
  const content: string
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}
