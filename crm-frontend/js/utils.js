import { contactTooltip } from './createTooltip.js';
import { svgEmail, svgFb, svgOther, svgPhone, svgVk } from './svg.js';

export function createContactLink(type, value, item) {
  const setTooltip = contactTooltip(type, value);
  const element = document.createElement('a');
  element.classList.add('contacts__link');
  let svg;

  switch (type) {
    case 'Email':
      element.href = `mailto:${value.trim()}`;
      svg = svgEmail;
      break;
    case 'Телефон':
      element.href = `tel:${value.trim()}`;
      svg = svgPhone;
      setTooltip.tooltipValue.style.color = 'var(--color-white)';
      setTooltip.tooltipValue.style.textDecoration = 'none';
      setTooltip.tooltipType.textContent = '';
      break;
    case 'Доп. телефон':
      element.href = `tel:${value.trim()}`;
      svg = svgPhone;
      setTooltip.tooltipValue.style.color = 'var(--color-white)';
      setTooltip.tooltipValue.style.textDecoration = 'none';
      setTooltip.tooltipType.textContent = '';
      break;
    case 'Вконтакте':
      element.href = value.trim();
      svg = svgVk;
      break;
    case 'Facebook':
      element.href = value.trim();
      svg = svgFb;
      break;
    case 'Другое':
      element.href = value.trim();
      svg = svgOther;
      break;
    default:
      break;
  }
  element.innerHTML = svg;

  element.append(setTooltip.tooltip);
  item.append(element);
}
