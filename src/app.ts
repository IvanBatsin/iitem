import Modal from './modal/modal';
import './styles/styles.css';
import User from './types/user';
import UsersView from './views/usersView';

const usersBlock = document.querySelector('.fans-container') as HTMLElement;
const mainBlock = document.querySelector('.main-container');

class App {
  modal!: Modal;
  usersPage!: UsersView;

  constructor() {
    this.modal =  new Modal(document.querySelector('.modal-container')!, this.updateUsersData.bind(this), 'my_modal');
    this.usersPage = new UsersView(usersBlock, this.modal);
  }

  updateUsersData(user: User): void {
    this.usersPage.addNewUser(user);
  }

  renderPage() {
    this.usersPage.render();
  }
}

const app = new App();
app.renderPage();