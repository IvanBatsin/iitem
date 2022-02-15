import { capitalize } from "../../../utils/capitalize"

export const SocialItem = (icon: {name: string, svg: string}): string => {
  return `
    <div class="d-flex justify-content-center flex-column align-items-center">
      <h6>${capitalize(icon.name)}</h6>
      <a href="https://${icon.name}.com">
        ${icon.svg}
      </a>
    </div>
  `;
}