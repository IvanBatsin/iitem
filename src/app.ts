import './styles/styles.css';
import BaseView from './types/baseView';
import { Routers } from './types/router';
import { getPathFromHash } from './utils/getPath';
import UsersView from './views/usersView/usersView';

const usersBlock = document.querySelector('.fans-container') as HTMLElement;
const mainBlock = document.querySelector('.main-container');

class App {
  private usersPage!: UsersView;
  private currentView!: BaseView;
  private routers!: Routers;
  private defaultPath: string | undefined = undefined;
  private currentPath!: string;

  constructor(routers: Routers) {
    this.routers = routers;

    this.setDefaultPath();
    this.currentPath = getPathFromHash(window.location.hash);
    
    if (!this.currentPath && this.defaultPath) {
      window.location.hash = this.defaultPath;
      this.currentPath = getPathFromHash(window.location.hash);
    }

    this.render();
  }

  private setDefaultPath = (): void => {
    Object.keys(this.routers).forEach(path => {
      // @ts-ignore
      if (this.routers[path].default) {
        this.defaultPath = path;
      }
    });
  }

  private render(): void {
    this.currentView = new this.routers[this.currentPath].view(this.routers[this.currentPath].className);
    this.currentView.render();
  }
}

const routers: Routers = {
  'users': {
    className: '.fans-container',
    view: UsersView,
    // @ts-ignore
    default: true
  }
}
const app = new App(routers);

window.addEventListener('hashchange', (e: Event) => {
  e.preventDefault();

  // 1) Get hash and compare with site map
  // 2) Render component 
});
