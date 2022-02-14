export const Footer = (socilaItemsTemplate: () => string): string => {
  return `
    <div class="mt-4 d-flex justify-content-center flex-column align-items-center w-100">
      <h2>Where you can find me</h2>
      <div class="w-100 d-flex justify-content-around flex-row align-items-center p-4 bg-light">
        ${socilaItemsTemplate()}
      </div>
    </div>
  `;
}