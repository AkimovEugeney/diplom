import { svgPreloaderMain } from './svg.js';

export function createPreload() {
  const preloaderBlock = document.createElement('div');
  const preloaderCircle = document.createElement('span');

  preloaderBlock.classList.add('preloader');
  preloaderCircle.classList.add('loader');

  preloaderCircle.innerHTML = svgPreloaderMain;
  preloaderBlock.append(preloaderCircle);

  return preloaderBlock;
}
