const ContentWrapper = () => {
    const year = new Date().getFullYear();
  
    return (
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card">
            <div className="card-datatable table-responsive">
              <table className="datatables-customers table border-top">
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th>Customer</th>
                    <th className="text-nowrap">Customer Id</th>
                    <th>Country</th>
                    <th>Order</th>
                    <th className="text-nowrap">Total Spent</th>
                  </tr>
                </thead>
              </table>
            </div>
  
            {/* Offcanvas */}
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasEcommerceCustomerAdd"
              aria-labelledby="offcanvasEcommerceCustomerAddLabel"
            >
              <div className="offcanvas-header">
                <h5
                  id="offcanvasEcommerceCustomerAddLabel"
                  className="offcanvas-title"
                >
                  Add Customer
                </h5>
                <button
                  type="button"
                  className="btn-close text-reset"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
  
              <div className="offcanvas-body border-top mx-0 flex-grow-0">
                <form
                  className="ecommerce-customer-add pt-0"
                  id="eCommerceCustomerAddForm"
                  onSubmit={(e) => e.preventDefault()}
                >
                  {/* Basic Information */}
                  <div className="ecommerce-customer-add-basic mb-4">
                    <h6 className="mb-6">Basic Information</h6>
  
                    <div className="mb-6 form-control-validation">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-name"
                      >
                        Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="ecommerce-customer-add-name"
                        placeholder="John Doe"
                        name="customerName"
                      />
                    </div>
  
                    <div className="mb-6 form-control-validation">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-email"
                      >
                        Email*
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-email"
                        className="form-control"
                        placeholder="john.doe@example.com"
                        name="customerEmail"
                      />
                    </div>
  
                    <div>
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-contact"
                      >
                        Mobile
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-contact"
                        className="form-control phone-mask"
                        placeholder="+(123) 456-7890"
                        name="customerContact"
                      />
                    </div>
                  </div>
  
                  {/* Shipping */}
                  <div className="ecommerce-customer-add-shiping mb-6 pt-4">
                    <h6 className="mb-6">Shipping Information</h6>
  
                    <div className="mb-6">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-address"
                      >
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-address"
                        className="form-control"
                        placeholder="45 Roker Terrace"
                        name="customerAddress1"
                      />
                    </div>
  
                    <div className="mb-6">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-address-2"
                      >
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-address-2"
                        className="form-control"
                        name="customerAddress2"
                      />
                    </div>
  
                    <div className="mb-6">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-town"
                      >
                        Town
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-town"
                        className="form-control"
                        placeholder="New York"
                        name="customerTown"
                      />
                    </div>
  
                    <div className="col-12 mb-6">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-state"
                      >
                        State / Province
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-state"
                        className="form-control"
                        placeholder="Southern tip"
                        name="customerState"
                      />
                    </div>
  
                    <div className="col-12 mb-6">
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-post-code"
                      >
                        Post Code
                      </label>
                      <input
                        type="text"
                        id="ecommerce-customer-add-post-code"
                        className="form-control"
                        placeholder="734990"
                        name="pin"
                        maxLength="8"
                      />
                    </div>
  
                    <div>
                      <label
                        className="form-label"
                        htmlFor="ecommerce-customer-add-country"
                      >
                        Country
                      </label>
                      <select
                        id="ecommerce-customer-add-country"
                        className="form-select"
                      >
                        <option value="">Select</option>
                        <option value="India">India</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
  
                  {/* Billing toggle */}
                  <div className="d-sm-flex mb-6">
                    <div className="me-auto mb-2 mb-md-0">
                      <h6 className="mb-1">
                        Use as a billing address?
                      </h6>
                      <small>
                        If you need more info, please check budget.
                      </small>
                    </div>
  
                    <div className="form-check form-switch my-auto me-n2">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        defaultChecked
                      />
                    </div>
                  </div>
  
                  <div>
                    <button
                      type="submit"
                      className="btn btn-primary me-sm-3"
                    >
                      Add
                    </button>
                    <button
                      type="reset"
                      className="btn btn-label-danger"
                      data-bs-dismiss="offcanvas"
                    >
                      Discard
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="content-footer footer bg-footer-theme">
          <div className="container-xxl">
            <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
              <div className="mb-2 mb-md-0">
                © {year}, made with ❤️ by ThemeSelection
              </div>
            </div>
          </div>
        </footer>
  
        <div className="content-backdrop fade"></div>
      </div>
    );
  };
  
  export default ContentWrapper;