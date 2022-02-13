import BaseView from "./baseView";

export interface Router {
  view: typeof BaseView,
  default?: boolean,
  initialData?: any
}

export interface Routers {
  [hash: string]: Router
}