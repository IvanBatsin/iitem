export const Accordion = (accordionItems: () => string): string => {
  return `
    <div class="mt-4">
      <h2 class="fst-italic">Stages of life</h2>
      <div class="accordion" id="accordionExample">
        ${accordionItems()}
      </div>
    </div>
  `;
}