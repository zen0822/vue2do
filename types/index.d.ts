declare module '*.svg'
declare module '*.png'
declare module '*.jpeg'
declare module '*.jpg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.scss'
declare module '*.pug'
declare module '*.html'
declare module '@vue2do/*'

declare module '*.vue' {
  export default Vue
}

declare module '*.pug' {
  const content: any

  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.css' {
  const content: string
  export default content
}
