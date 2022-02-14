import './styles/styles.css';
import BaseView from './types/baseView';
import { Routers } from './types/router';
import { getPathFromHash } from './utils/getPath';
import UsersView from './views/usersView/usersView';
import './views/mainView/styles.css';
import MainView, { MainViewProps } from './views/mainView/mainView';

class App {
  private currentView!: BaseView;
  private routers!: Routers;
  private defaultPath: string | undefined = undefined;
  private currentPath!: string;
  private selector: string;
  private canUpdate!: boolean;

  constructor(selector: string, routers: Routers) {
    this.selector = selector;
    this.routers = routers;

    this.setDefaultPath();
    this.setHash();
    this.render();

    window.addEventListener('hashchange', this.chageHashHandler.bind(this));
  }

  private setHash = (): void => {
    this.currentPath = getPathFromHash(window.location.hash);

    if (this.currentPath && this.routers[this.currentPath]) return;

    if (this.currentPath && !this.routers[this.currentPath]) {
      this.currentPath = this.defaultPath!;
      window.location.hash = this.defaultPath!;
      return;
    }
    
    if (!this.currentPath && this.defaultPath) {
      window.location.hash = this.defaultPath;
      this.currentPath = this.defaultPath;
    }
  }

  private setDefaultPath(): void {
    Object.keys(this.routers).forEach(path => {
      if (this.routers[path].default) {
        this.defaultPath = path;
      }
    });
  }

  private chageHashHandler(e: Event): void {
    console.log('chageHashHandler');
    this.setHash();
  }

  private async render(): Promise<void> {
    try {
      const route = this.routers[this.currentPath];
      route.props ?
        this.currentView = new this.routers[this.currentPath].view(this.selector, route.props) :
        this.currentView = new this.routers[this.currentPath].view(this.selector);
      await this.currentView.render();
      this.canUpdate = true;
    } catch (error) {
      console.error(error);
    }
  }
}

const mainViewProps: MainViewProps = {
  accordionItems: [
    {title: 'Childhood'},
    {title: 'University'},
    {title: 'Work'}
  ],
  socialIcons: [
    {title: 'facebook'},
    {title: 'instagram'},
    {title: 'twitter'}
  ]
}

const routers: Routers = {
  'users': {
    view: UsersView
  },
  'main': {
    view: MainView,
    default: true,
    props: mainViewProps
  }
};

const app = new App('#root', routers);