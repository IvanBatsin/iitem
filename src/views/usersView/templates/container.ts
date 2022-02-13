import { Loader } from "./loader";

export const UsersPageTemplate = (usersTemplate: () => string, isLoading: boolean): string => {
  return `
    <div class="users-container d-flex align-items-center justify-content-between flex-column mt-4">
      <div id="users_page_alert" class="alert alert-danger" role="alert">
        Server error< please try later
      </div>
      <button type="button" id="add" class="btn btn-primary btn-lg">Join</button>
      <div class="users-block row justify-content-center w-100 mt-4">
        ${isLoading ? Loader() : ''}
        <div class="row row-cols-1 row-cols-md-3 g-4">
          ${!isLoading ? usersTemplate() : ''}
        </div>
      </div>
    </div>
  `;
}