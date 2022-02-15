import User from "../../../types/user";

export const UserCard = (user: User): string => {
  return `
    <div class="col">
      <div class="card card-hover">
        <img src="../../assets/avatar.png" class="card-img-top" alt="user - ${user.name}">
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <p class="card-text">${user.email}</p>
        </div>
      </div>
    </div>
  `;
}