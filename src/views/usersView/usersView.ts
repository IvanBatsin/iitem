import User from "../../types/user";
import { UserCard } from "./templates/userCard";
import { UsersPageTemplate } from "./templates/container";
import Modal from "../../modal/modal";
import './styles.css';
import BaseView from "../../types/baseView";

export default class UsersView implements BaseView {
  private rootEl: HTMLElement;
  private data!: User[];
  private isLoading!: boolean;
  private addButton: HTMLButtonElement | null = null;
  private usersBlock: HTMLDivElement | null = null;
  private modal!: Modal;

  private showModal!: () => void;

  constructor(className: string) {
    this.rootEl = document.querySelector(className) as HTMLElement;
    this.modal = new Modal(this.addNewUser.bind(this));

    this.showModal = () => this.modal.init();
  }

  private getUsersTemplate(): string {
    let template = '';
    this.data.forEach(user => {
      template += UserCard(user);
    });

    return template;
  }

  private rerenderUsersBlock(): void {
    this.usersBlock!.innerHTML = '';
    this.usersBlock!.innerHTML += this.getUsersTemplate();
  }

  addNewUser(user: User): void {
    this.data.unshift(user);
    this.rerenderUsersBlock();
  }

  async render(): Promise<void> {
    try {
      this.isLoading = true;
      this.rootEl.innerHTML += UsersPageTemplate(this.getUsersTemplate.bind(this), this.isLoading);
      const req = await window.fetch(process.env.BASE_URL!);
      const res = await req.json() as User[];
      this.data = res;
      this.isLoading = false;
      this.rootEl.innerHTML = '';
      this.rootEl.innerHTML += UsersPageTemplate(this.getUsersTemplate.bind(this), this.isLoading);
      this.usersBlock = this.rootEl.querySelector('#users_page_alert');
      this.addButton = this.rootEl.querySelector('#add');
      this.usersBlock = this.rootEl.querySelector('.users-block');;
  
      this.addButton?.addEventListener('click', this.showModal);
    } catch (error) {
      console.log(error);
      (this.rootEl.querySelector!('#users_page_alert') as HTMLElement).style.display = 'block';
    }
  }

  destroy(): void {
    this.addButton?.removeEventListener('click', this.showModal);
  }
}