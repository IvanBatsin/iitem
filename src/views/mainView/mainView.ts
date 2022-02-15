import { AccordionItem } from "../../types/accrordionItem";
import BaseView from "../../types/baseView";
import './styles.css';
import { AboutMe } from "./templates/about";
import { Accordion } from "./templates/accordion";
import { AccordionItemTemplate } from "./templates/accordionItem";
import { BookItem } from "./templates/bookItem";
import { BooksContainer } from "./templates/booksContainer";
import { Footer } from "./templates/footer";
import { SocialItem } from "./templates/socialIcon";

export interface MainViewProps {
  accordionItems: AccordionItem[],
  socialIcons: {name: string, svg: string}[]
}

export default class MainView extends BaseView {
  private rootEl: HTMLElement;
  private socialIcons: {name: string, svg: string}[] = [];
  private accordionItems: AccordionItem[] = [];
  private accordionItemsEl!: HTMLDivElement[];

  constructor(selector: string, props: MainViewProps) {
    super(selector);
    this.accordionItems = props.accordionItems;
    this.socialIcons = props.socialIcons;
    this.rootEl = document.querySelector(selector) as HTMLElement;

    this.accordionItemHandler = this.accordionItemHandler.bind(this);
  }

  private getAccordionItemsTemplate = (): string => {
    let template = '';
    this.accordionItems.forEach((item, index) => {
      template += AccordionItemTemplate(item, index + 1);
    });

    return template;
  }

  private getBookItemsTemplate = (): string => {
    let template = '';
    for (let index = 1; index <= 3; index++) {
      template += BookItem(index);
    }

    return template;
  }

  private getSocialIconsTemplate = (): string => {
    let template = '';
    this.socialIcons.forEach(icon => {
      template += SocialItem(icon);
    });

    return template;
  }

  private accordionItemHandler = (e: Event): void => {
    e.preventDefault();
    const accordionItem = e.currentTarget as HTMLDivElement;
    const btn = accordionItem.querySelector('.accordion-button');
    btn!.classList.toggle('collapsed');
    const textBlock = accordionItem.querySelector('.accordion-collapse') as HTMLDivElement;
    textBlock.classList.toggle('show');
  }

  render(): Promise<void> {
    const content = [
      AboutMe(), 
      Accordion(this.getAccordionItemsTemplate.bind(this)),
      BooksContainer(this.getBookItemsTemplate),
      Footer(this.getSocialIconsTemplate.bind(this))
    ];

    this.rootEl.innerHTML += content.join('');
    
    this.accordionItemsEl = Array.from(this.rootEl.querySelectorAll('.accordion-item') as NodeListOf<HTMLDivElement>);
    this.accordionItemsEl.forEach(item => {;
      item.addEventListener('click', this.accordionItemHandler);
    });

    return Promise.resolve();
  }

  destroy(): void {
    this.accordionItemsEl.forEach(item => {;
      item.removeEventListener('click', this.accordionItemHandler);
    });
    this.rootEl.innerHTML = '';
  }
} 