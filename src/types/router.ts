import UsersView from "../views/usersView/usersView";

export interface Router {
  className: string,
  view: typeof UsersView,
  default?: boolean 
}

export interface Routers {
  [hash: string]: Router
}