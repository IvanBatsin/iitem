import { AccordionItem } from "../../../types/accrordionItem";

export const AccordionItemTemplate = (accordionItem: AccordionItem, index: number): string => {
  return `
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button fw-bolder collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        ${accordionItem.title}
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        <div class="accordion-body">
          <div class="card bg-dark text-white stage stage-${index}">
            <div class="card-img-overlay">
              <h5 class="card-title">My ${accordionItem.title}</h5>
              <p class="card-text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt cum placeat illum dolor non atque debitis. At voluptatibus quos laborum fugiat dignissimos excepturi, omnis incidunt quaerat sed? Impedit, ea hic. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi ipsa tempora aliquam ea quibusdam commodi reiciendis ut! Placeat asperiores excepturi numquam distinctio sequi recusandae, debitis, officia pariatur ducimus cum reprehenderit?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}