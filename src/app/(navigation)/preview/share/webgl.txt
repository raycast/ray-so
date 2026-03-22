import { hexToVec3, TWallpaperWebGL } from '@twallpaper/webgl'
import '@twallpaper/webgl/css'

const container = document.querySelector<HTMLElement>('#app')!
const twallpaper = new TWallpaperWebGL(container)

twallpaper.init({
  colors: [
    hexToVec3('#4f5bd5'),
    hexToVec3('#962fbf'),
    hexToVec3('#dd6cb9'),
    hexToVec3('#fec496')],
  backgroundColor: '#000000',
  image: `${location.origin}/patterns/magic.svg`,
  mask: false,
  opacity: 0.3,
  size: 420
})

document.addEventListener('click', () => {
  twallpaper.animate()
})
