export const BookItem = (index: number): string => {
  return `
    <div class="col">
      <div class="card h-100 card-hover">
        <img src="assets/book.jpg" class="card-img-top" alt="book=${index}">
        <div class="card-body">
          <h5 class="card-title">Favourite book №${index}</h5>
          <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo inventore, placeat sunt et praesentium quisquam, ea aliquam maxime cumque iure sequi maiores non cupiditate alias! Minima voluptates pariatur possimus perspiciatis!</p>
        </div>
      </div>
    </div>
  `;
}