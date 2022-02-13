import { getTemplate } from "./template";
import './styles.css';
import User from "../types/user";
import { generateClassName } from "../utils/generateClass";

export default class Modal {
  private rootEl!: HTMLElement;
  private emit!: (user: User) => void;
  private className: string;  
  private modal: null | HTMLDivElement = null;
  private form: HTMLFormElement | null = null;
  private closeBtn: HTMLButtonElement | null = null;
  private submitBtn: HTMLButtonElement | null = null;
  private overlay: HTMLDivElement | null = null;
  private alert: HTMLDivElement | null = null;
  private isLoading: boolean = false;
  private isOpen!: boolean; 

  private formSubmutControl!: (e: Event) => Promise<void>
  private destroyFunc: () => void

  constructor(emit: (user: User) => void) {
    this.rootEl = document.createElement('div') as HTMLDivElement;
    document.body.append(this.rootEl);
    this.emit = emit;
    this.className = generateClassName();

    this.formSubmutControl = async (e: Event): Promise<void> => {
      e.preventDefault();
      e.stopPropagation();
      if (!this.form!.checkValidity()) {
        this.form!.classList.add('was-validated');
        return;
      }

      const inputs = this.form?.querySelectorAll('input');
      const newUser: User = {} as User; 
      inputs?.forEach(input => {
        const key = input.dataset.type as keyof User;
        newUser[key] = input.value;
      });

      await this.addUser(newUser);
    }

    this.destroyFunc = () => this.destroy();
  } 

  private async addUser(user: User): Promise<void> {
    this.isLoading = true;
    this.disableBtns();
    try { 
      const reqUserExist = await window.fetch(`${process.env.BASE_URL!}?email=${user.email}`, {
        method: 'GET'
      });
      const resUserExist = await reqUserExist.json() as User[];
      this.isLoading = false;

      if (resUserExist.length) {
        this.alert!.style.display = 'block';
        this.closeBtn!.disabled = false;
        return;
      }

      const reqCreateUser = await window.fetch(process.env.BASE_URL!, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const createdUser = await reqCreateUser.json();
      this.emit(createdUser);
      this.destroy();
    } catch (error) {
      console.log(error);
    }
  }

  private disableBtns = (): void => {
    if (this.isLoading) {
      this.closeBtn!.disabled = true;
      this.submitBtn!.disabled = true;
      return;
    }

    this.closeBtn!.disabled = false;
    this.submitBtn!.disabled = false;
  }

  private setIsOpen(isOpen: boolean): void {
    this.isOpen = isOpen;
  }

  getState(): boolean {
    return this.isOpen;
  }

  init(): void {
    this.rootEl.innerHTML = getTemplate(this.className);
    this.overlay = this.rootEl.querySelector('.overlay');
    this.modal = this.overlay!.querySelector(`.${this.className}`);
    this.form = this.modal?.querySelector('.needs-validation') as HTMLFormElement;
    this.alert = this.form.querySelector('#alert');
    this.closeBtn = this.form?.querySelector('#closeBtn') as HTMLButtonElement;
    this.submitBtn = this.form?.querySelector('#submitBtn') as HTMLButtonElement;

    this.form?.addEventListener('submit', this.formSubmutControl);
    this.closeBtn.addEventListener('click', this.destroyFunc);

    this.setIsOpen(true);
  }

  destroy(): void {
    this.form!.classList.remove('was-validated');
    this.form!.removeEventListener('submit', this.formSubmutControl);
    this.closeBtn?.removeEventListener('click', this.destroyFunc);
    this.overlay?.classList.toggle('show');
    this.setIsOpen(false);

    setTimeout(() => this.rootEl.innerHTML = '', 300);
  }
}