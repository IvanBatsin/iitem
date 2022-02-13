import { AccordionItem } from "../../types/accrordionItem";
import BaseView from "../../types/baseView";
import './styles.css';
import { AboutMe } from "./templates/about";
import { Accordion } from "./templates/accordion";
import { AccordionItemTemplate } from "./templates/accordionItem";

export default class MainView extends BaseView {
  private rootEl: HTMLElement;
  private accordionData: AccordionItem[] = [];
  private accordionItemsEl!: HTMLDivElement[];

  constructor(selector: string, initialData: AccordionItem[]) {
    super(selector);
    this.accordionData = initialData;
    this.rootEl = document.querySelector(selector) as HTMLElement;
  }

  private getAccordionItemsTemplate = (): string => {
    let template = '';
    this.accordionData.forEach((item, index) => {
      template += AccordionItemTemplate(item, index + 1);
    });

    return template;
  }

  render(): void {
    this.rootEl.innerHTML += AboutMe();
    this.rootEl.innerHTML += Accordion(this.getAccordionItemsTemplate.bind(this));
    
    this.accordionItemsEl = Array.from(this.rootEl.querySelectorAll('.accordion-item') as NodeListOf<HTMLDivElement>);
    this.accordionItemsEl.forEach(item => {
      item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const accordionItem = e.currentTarget as HTMLDivElement;
        const btn = accordionItem.querySelector('.accordion-button');
        btn!.classList.toggle('collapsed');
        const textBlock = accordionItem.querySelector('.accordion-collapse') as HTMLDivElement;
        textBlock.classList.toggle('show');
      });
    });
  }

  destroy(): void {
      
  }
} 