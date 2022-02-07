import { Loader } from "./loader";

export const UsersPageTemplate = (usersTemplate: () => string, isLoading: boolean): string => {
  return `
    <div class="users-container d-flex align-items-center justify-content-between flex-column mt-4">
      <div id="users_page_alert" class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
      </div>
      <button type="button" id="add" class="btn btn-primary col-2">Create</button>
      <div class="users-block row justify-content-center w-100">
        ${isLoading ? Loader() : usersTemplate()}
      </div>
    </div>
  `;
}