import User from "../types/user";
import { UserCard } from "./templates/userCard";
import { v4 } from 'uuid';
import { UsersPageTemplate } from "./templates/container";
import Modal from "../modal/modal";

export default class UsersView {
  private rootEl: HTMLElement;
  private data!: User[];
  private isLoading!: boolean;
  private addButton: HTMLButtonElement | null = null;
  private modal!: Modal;

  private showModal!: () => void;

  constructor(rootEl: HTMLElement, modal: Modal) {
    this.rootEl = rootEl;
    this.modal = modal;

    this.showModal = () => this.modal.init();
  }

  private getUsersTemplate(): string {
    let template = '';
    this.data.forEach(user => {
      template += UserCard(user);
    });

    return template;
  }

  private async rerender() {

  }

  addNewUser(user: User): void {
    this.data.unshift(user);
    console.log('new data - ', this.data);
  }

  async render(): Promise<void> {
    this.isLoading = true;
    this.rootEl.innerHTML += UsersPageTemplate(this.getUsersTemplate.bind(this), this.isLoading);
    const req = await window.fetch('http://localhost:3001/users');
    const res = await req.json() as User[];
    this.data = res;
    this.isLoading = false;
    this.rootEl.innerHTML = '';
    this.rootEl.innerHTML += UsersPageTemplate(this.getUsersTemplate.bind(this), this.isLoading);
    this.addButton = this.rootEl.querySelector('#add');

    this.addButton?.addEventListener('click', this.showModal);
  }

  destroy(): void {
    this.addButton?.removeEventListener('click', this.showModal);
  }
}