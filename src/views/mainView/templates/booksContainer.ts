export const BooksContainer = (booksTemplate: () => string): string => {
  return `
    <div class="mt-4 fst-italic">
      <h2>My fovourite books</h2>
      <div class="row row-cols-1 row-cols-md-3 g-4">
        ${booksTemplate()}
      </div>
    </div>
  `;
}