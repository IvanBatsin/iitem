export const getTemplate = (modalClass: string): string => {
  return `
    <div class="overlay show">
      <div class="modal fade show ${modalClass}" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Become a fan</h5>
            </div>
            <div class="modal-body">
              <form class="row g-3 needs-validation" novalidate>
                <div>
                  <label for="exampleFormControlInput1" class="form-label">Email address</label>
                  <input type="email" data-type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required>
                  <div class="invalid-feedback">
                    Email is required
                  </div>
                </div>
                <div>
                  <label for="exampleFormControlInput2" class="form-label">Name</label>
                  <input type="text" data-type="name" class="form-control" id="exampleFormControlInput2" placeholder="John" required>
                  <div class="invalid-feedback">
                    Name is required
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="alert alert-danger w-100" id="alert" role="alert">
                    Email is already in use 
                  </div>
                  <button id="closeBtn" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button id="submitBtn" type="submit" class="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}