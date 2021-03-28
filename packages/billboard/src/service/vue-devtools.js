import devtools from '@vue/devtools'

if (process.env.NODE_ENV === 'development') {
  devtools.connect()
}
