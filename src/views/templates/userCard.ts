import User from "../../types/user";

export const UserCard = (user: User): string => {
  return `
    <div class="card col-3 m-3">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${user.name}</h5>
        <p class="card-text">${user.email}</p>
      </div>
    </div>
  `;
}