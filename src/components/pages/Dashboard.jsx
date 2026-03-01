import React from "react";

const Dashboard = () => {
  return (
    <div className="content-wrapper">
    {/* Content */}
    <div className="container-xxl flex-grow-1 container-p-y">
      
<div className="row">
<div className="col-md-12 col-xxl-4 mb-6">
  <div className="card h-100">
    <div className="d-flex align-items-end row">
      <div className="col-7">
        <div className="card-body">
          <h5 className="card-title mb-1 text-nowrap">Congratulations Katie! 🎉</h5>
          <p className="card-subtitle text-nowrap mb-3">Best seller of the month</p>

          <h5 className="card-title text-primary mb-0">$48.9k</h5>
          <p className="mb-3">78% of target 🚀</p>

          <a href="javascript:;" className="btn btn-sm btn-primary mb-1">View sales</a>
        </div>
      </div>
      <div className="col-5">
        <div className="card-body pb-0 text-end">
          <img src="../../assets/img/illustrations/prize-light.png" width="91" height="144" className="rounded-start" alt="View Sales" />
        </div>
      </div>
    </div>
  </div>
</div>
{/* New Visitors & Activity */}
<div className="col-xxl-8 mb-6">
  <div className="card h-100">
    <div className="card-body row g-4 p-0">
      <div className="col-md-6 card-separator">
        <div className="p-6">
          <div className="card-title d-flex align-items-start justify-content-between">
            <h5 className="mb-0">New Visitors</h5>
            <small>Last Week</small>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mt-auto">
              <h3 className="mb-1">23%</h3>
              <small className="text-danger text-nowrap fw-medium"><i className="icon-base bx bx-down-arrow-alt"></i> -13.24%</small>
            </div>
            <div id="visitorsChart"></div>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-6">
          <div className="card-title d-flex align-items-start justify-content-between">
            <h5 className="mb-0">Activity</h5>
            <small>Last Week</small>
          </div>
          <div className="d-flex justify-content-between">
            <div className="mt-auto">
              <h3 className="mb-1">82%</h3>
              <small className="text-success text-nowrap fw-medium"><i className="icon-base bx bx-up-arrow-alt"></i> 24.8%</small>
            </div>
            <div id="activityChart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/*/ New Visitors & Activity */}

<div className="col-lg-12 col-xxl-4">
  <div className="row">
    <div className="col-xxl-6 col-md-3 col-sm-6 col-12 mb-6">
      <div className="card h-100">
        <div className="card-body">
          <div className="card-title d-flex align-items-start justify-content-between mb-4">
            <div className="avatar flex-shrink-0 w-px-40 h-px-40">
              <img src="../../assets/img/icons/unicons/wallet-info.png" alt="wallet info" className="rounded" />
            </div>
            <div className="dropdown">
              <button className="btn p-0" type="button" id="cardOpt6" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon-base bx bx-dots-vertical-rounded text-body-secondary"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt6">
                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
              </div>
            </div>
          </div>
          <p className="mb-1">Sales</p>
          <h4 className="card-title mb-3">$4,679</h4>
          <small className="text-success fw-medium"><i className="icon-base bx bx-up-arrow-alt"></i> +28.42%</small>
        </div>
      </div>
    </div>
    <div className="col-xxl-6 col-md-3 col-sm-6 col-12 mb-6">
      <div className="card h-100">
        <div className="card-body pb-2">
          <span className="d-block fw-medium mb-1">Profit</span>
          <h4 className="card-title mb-4">624k</h4>
          <div id="profitChart"></div>
        </div>
      </div>
    </div>
    <div className="col-xxl-6 col-md-3 col-sm-6 col-12 mb-6">
      <div className="card h-100">
        <div className="card-body pb-0">
          <span className="d-block fw-medium mb-1">Expenses</span>
        </div>
        <div id="expensesChart" className="mb-2"></div>
        <div className="p-4 pt-2">
          <small className="d-block text-center">$21k Expenses more than last month</small>
        </div>
      </div>
    </div>
    <div className="col-xxl-6 col-md-3 col-sm-6 col-12 mb-6">
      <div className="card h-100">
        <div className="card-body">
          <div className="card-title d-flex align-items-start justify-content-between mb-4">
            <div className="avatar flex-shrink-0">
              <img src="../../assets/img/icons/unicons/cc-primary.png" alt="Credit Card" className="rounded" />
            </div>
            <div className="dropdown">
              <button className="btn p-0" type="button" id="cardOpt1" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon-base bx bx-dots-vertical-rounded text-body-secondary"></i>
              </button>
              <div className="dropdown-menu" aria-labelledby="cardOpt1">
                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
              </div>
            </div>
          </div>
          <p className="mb-1">Transactions</p>
          <h4 className="card-title mb-3">$14,857</h4>
          <small className="text-success fw-medium"><i className="icon-base bx bx-up-arrow-alt"></i> +28.14%</small>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Total Income */}
<div className="col-md-12 col-xxl-8 mb-6">
  <div className="card h-100">
    <div className="row row-bordered g-0">
      <div className="col-md-8">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h5 className="card-title mb-1">Total Income</h5>
            <p className="card-subtitle">Yearly report overview</p>
          </div>
          <div className="dropdown">
            <button className="btn p-0" type="button" id="totalIncome" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="icon-base bx bx-dots-vertical-rounded icon-lg text-body-secondary"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="totalIncome">
              <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
              <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
              <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div id="totalIncomeChart"></div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card-header d-flex justify-content-between">
          <div>
            <h5 className="card-title mb-1">Report</h5>
            <p className="card-subtitle">Monthly Avg. $45.578k</p>
          </div>
          <div className="dropdown">
            <button className="btn p-0" type="button" id="totalReport" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="icon-base bx bx-dots-vertical-rounded icon-lg text-body-secondary"></i>
            </button>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="totalReport">
              <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
              <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
              <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
            </div>
          </div>
        </div>
        <div className="card-body pt-lg-6">
          <div className="report-list">
            <div className="report-list-item rounded-2 mb-4">
              <div className="d-flex align-items-center">
                <div className="report-list-icon shadow-xs me-4">
                  <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/svg/icons/paypal-icon.svg" width="22" height="22" alt="Paypal" />
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
                  <div className="d-flex flex-column">
                    <span>Income</span>
                    <h5 className="mb-0">$42,845</h5>
                  </div>
                  <small className="text-success">+2.34k</small>
                </div>
              </div>
            </div>
            <div className="report-list-item rounded-2 mb-4">
              <div className="d-flex align-items-center">
                <div className="report-list-icon shadow-xs me-4">
                  <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/svg/icons/credit-card-icon.svg" width="22" height="22" alt="Shopping Bag" />
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
                  <div className="d-flex flex-column">
                    <span>Expense</span>
                    <h5 className="mb-0">$38,658</h5>
                  </div>
                  <small className="text-danger">-1.15k</small>
                </div>
              </div>
            </div>
            <div className="report-list-item rounded-2">
              <div className="d-flex align-items-center">
                <div className="report-list-icon shadow-xs me-4">
                  <img src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/svg/icons/wallet-icon.svg" width="22" height="22" alt="Wallet" />
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 flex-wrap gap-2">
                  <div className="d-flex flex-column">
                    <span>Profit</span>
                    <h5 className="mb-0">$18,220</h5>
                  </div>
                  <small className="text-success">+1.35k</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*/ Total Income */}
</div>
{/*/ Total Income */}
</div>
<div className="row">
{/* Performance */}
<div className="col-md-6 col-xxl-4 mb-6">
  <div className="card h-100">
    <div className="card-header d-flex align-items-center justify-content-between">
      <h5 className="card-title m-0 me-2">Performance</h5>
      <div className="dropdown">
        <button className="btn p-0" type="button" id="performanceId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="icon-base bx bx-dots-vertical-rounded icon-lg text-body-secondary"></i>
        </button>
        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="performanceId">
          <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
          <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
          <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
        </div>
      </div>
    </div>
    <div className="card-body">
      <div className="row justify-content-between mb-5">
        <div className="col-6">
          <p className="mb-0">Earnings: $846.17</p>
        </div>
        <div className="col-6">
          <p className="mb-0 text-end">Sales: 25.7M</p>
        </div>
      </div>
      <div id="performanceChart"></div>
    </div>
  </div>
</div>
{/*/ Performance */}

{/* Conversion rate */}
<div className="col-md-6 col-xxl-4 mb-6">
  <div className="card h-100">
    <div className="card-header d-flex justify-content-between">
      <div className="card-title mb-0">
        <h5 className="mb-1 me-2">Conversion Rate</h5>
        <p className="card-subtitle">Compared To Last Month</p>
      </div>
      <div className="dropdown">
        <button className="btn text-body-secondary p-0" type="button" id="conversionRate" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="icon-base bx bx-dots-vertical-rounded icon-lg"></i>
        </button>
        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="conversionRate">
          <a className="dropdown-item" href="javascript:void(0);">Select All</a>
          <a className="dropdown-item" href="javascript:void(0);">Refresh</a>
          <a className="dropdown-item" href="javascript:void(0);">Share</a>
        </div>
      </div>
    </div>
    <div className="card-body pt-4">
      <div className="d-flex justify-content-between align-items-center mb-6">
        <div className="d-flex flex-row align-items-center gap-2">
          <h3 className="mb-0">8.72%</h3>
          <small className="text-success">
            <i className="icon-base bx bx-chevron-up icon-lg"></i>
            4.8%
          </small>
        </div>
        <div id="conversionRateChart"></div>
      </div>
      <ul className="p-0 m-0">
        <li className="d-flex mb-6">
          <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
            <div className="me-2">
              <h6 className="mb-0 fw-normal">Impressions</h6>
              <small>12.4k Visits</small>
            </div>
            <div className="user-progress"><i className="icon-base bx icon-lg bx-up-arrow-alt text-success me-2"></i> <span>12.8%</span></div>
          </div>
        </li>
        <li className="d-flex mb-6">
          <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
            <div className="me-2">
              <h6 className="mb-0 fw-normal">Added To Cart</h6>
              <small>32 Product in cart</small>
            </div>
            <div className="user-progress"><i className="icon-base bx icon-lg bx-down-arrow-alt text-danger me-2"></i> <span>- 8.5% </span></div>
          </div>
        </li>
        <li className="d-flex mb-6">
          <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
            <div className="me-2">
              <h6 className="mb-0 fw-normal">Checkout</h6>
              <small>21 Products checkout</small>
            </div>
            <div className="user-progress"><i className="icon-base bx icon-lg bx-up-arrow-alt text-success me-2"></i> <span>9.12%</span></div>
          </div>
        </li>
        <li className="d-flex">
          <div className="d-flex w-100 flex-wrap justify-content-between gap-2">
            <div className="me-2">
              <h6 className="mb-0 fw-normal">Purchased</h6>
              <small>12 Orders</small>
            </div>
            <div className="user-progress"><i className="icon-base bx icon-lg bx-up-arrow-alt text-success me-2"></i> <span>2.83%</span></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
{/*/ Conversion rate */}

<div className="col-md-12 col-xxl-4">
  <div className="row">
    <div className="col-12 col-sm-6 col-md-3 col-lg-6 mb-6">
      <div className="card">
        <div className="card-body">
          <div className="card-title d-flex align-items-start justify-content-between mb-4">
            <div className="avatar flex-shrink-0">
              <img src="../../assets/img/icons/unicons/computer.png" alt="computer" className="rounded" />
            </div>
            <div className="dropdown">
              <button className="btn p-0" type="button" id="cardOpt5" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="icon-base bx bx-dots-vertical-rounded text-body-secondary"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="cardOpt5">
                <a className="dropdown-item" href="javascript:void(0);">View More</a>
                <a className="dropdown-item" href="javascript:void(0);">Delete</a>
              </div>
            </div>
          </div>
          <p className="mb-1">Revenue</p>
          <h4 className="card-title mb-3">$42,389</h4>
          <small className="text-success fw-medium"><i className="icon-base bx bx-up-arrow-alt"></i> +52.18%</small>
        </div>
      </div>
    </div>
    <div className="col-12 col-sm-6 col-md-3 col-lg-6 mb-6">
      <div className="card">
        <div className="card-body">
          <span className="d-block fw-medium mb-1">Sales</span>
          <h4 className="card-title mb-3">482k</h4>
          <span className="badge bg-label-info mb-5">+34%</span>
          <small className="d-block mb-1">Sales Target</small>
          <div className="d-flex align-items-center">
            <div className="progress w-75 me-2" style="height: 8px;">
              <div className="progress-bar bg-info shadow-none" style="width: 78%" role="progressbar" aria-valuenow="78" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <small>78%</small>
          </div>
        </div>
      </div>
    </div>
    <div className="col-12 col-md-6 col-lg-12 mb-6">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between flex-wrap">
            <div className="d-flex align-items-start flex-column justify-content-between">
              <div className="card-title">
                <h5 className="mb-0">Expenses</h5>
              </div>
              <div className="d-flex justify-content-between">
                <div className="mt-auto">
                  <h4 className="mb-0">4,234</h4>
                  <span className="text-danger text-nowrap fw-medium"><i className="icon-base bx bx-down-arrow-alt"></i> 8.2%</span>
                </div>
              </div>
              <span className="badge bg-label-secondary">2023 YEAR</span>
            </div>
            <div id="expensesBarChart"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div className="col-lg-7 col-xxl-8 mb-6 mb-lg-0">
  <div className="card">
    <div className="table-responsive text-nowrap">
      <table className="table table-sm text-nowrap table-border-top-0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Payment</th>
            <th>Order Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-border-bottom-0">
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img src="../../assets/img/products/oneplus-lg.png" alt="Oneplus" height="32" width="32" className="me-3" />
                <div className="d-flex flex-column">
                  <h6 className="mb-0">OnePlus 7Pro</h6>
                  <small className="text-body">OnePlus</small>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-label-primary rounded-pill p-1_5 me-3"><i className="icon-base bx bx-mobile-alt icon-xs"></i></span> Smart Phone
            </td>
            <td>
              <div className="text-body"><span className="text-primary fw-medium">$120</span>/499</div>
              <small className="text-body">Partially Paid</small>
            </td>
            <td><span className="badge bg-label-primary">Confirmed</span></td>
            <td>
              <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="icon-base bx bx-dots-vertical-rounded"></i></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-edit-alt me-1"></i> View Details</a>
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-trash me-1"></i> Delete</a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img src="../../assets/img/products/magic-mouse.png" alt="Apple" height="32" width="32" className="me-3" />
                <div className="d-flex flex-column">
                  <h6 className="mb-0">Magic Mouse</h6>
                  <small className="text-body">Apple</small>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-label-warning rounded-pill p-1_5 me-3"><i className="icon-base bx bx-mouse icon-xs"></i></span> Mouse
            </td>
            <td>
              <div><span className="text-primary fw-medium">$149</span></div>
              <small className="text-body">Fully Paid</small>
            </td>
            <td><span className="badge bg-label-success">Completed</span></td>
            <td>
              <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="icon-base bx bx-dots-vertical-rounded"></i></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-edit-alt me-1"></i> View Details</a>
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-trash me-1"></i> Delete</a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img src="../../assets/img/products/imac-pro.png" alt="Apple" height="32" width="32" className="me-3" />
                <div className="d-flex flex-column">
                  <h6 className="mb-0">iMac Pro</h6>
                  <small className="text-body">Apple</small>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-label-info rounded-pill p-1_5 me-3"><i className="icon-base bx bx-desktop icon-xs"></i></span> Computer
            </td>
            <td>
              <div className="text-body"><span className="text-primary fw-medium">$0</span>/899</div>
              <small className="text-body">Unpaid</small>
            </td>
            <td><span className="badge bg-label-danger">Cancelled</span></td>
            <td>
              <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="icon-base bx bx-dots-vertical-rounded"></i></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-edit-alt me-1"></i> View Details</a>
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-trash me-1"></i> Delete</a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img src="../../assets/img/products/note10.png" alt="Samsung" height="32" width="32" className="me-3" />
                <div className="d-flex flex-column">
                  <h6 className="mb-0">Note 10</h6>
                  <small className="text-body">Samsung</small>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-label-primary rounded-pill p-1_5 me-3"><i className="icon-base bx bx-mobile-alt icon-xs"></i></span> Smart Phone
            </td>
            <td>
              <div><span className="text-primary fw-medium">$149</span></div>
              <small className="text-body">Fully Paid</small>
            </td>
            <td><span className="badge bg-label-success">Completed</span></td>
            <td>
              <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="icon-base bx bx-dots-vertical-rounded"></i></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-edit-alt me-1"></i> View Details</a>
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-trash me-1"></i> Delete</a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img src="../../assets/img/products/iphone.png" alt="Apple" height="32" width="32" className="me-3" />
                <div className="d-flex flex-column">
                  <h6 className="mb-0">iPhone 11 Pro</h6>
                  <small className="text-body">Apple</small>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-label-primary rounded-pill p-1_5 me-3"><i className="icon-base bx bx-mobile-alt icon-xs"></i></span> Smart Phone
            </td>
            <td>
              <div><span className="text-primary fw-medium">$399</span></div>
              <small className="text-body">Fully Paid</small>
            </td>
            <td><span className="badge bg-label-success">Completed</span></td>
            <td>
              <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="icon-base bx bx-dots-vertical-rounded"></i></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-edit-alt me-1"></i> View Details</a>
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-trash me-1"></i> Delete</a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img src="../../assets/img/products/mi-tv.png" alt="Xiaomi" height="32" width="32" className="me-3" />
                <div className="d-flex flex-column">
                  <h6 className="mb-0">Mi LED TV 4X</h6>
                  <small className="text-body">Xiaomi</small>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-label-danger rounded-pill p-1_5 me-3"><i className="icon-base bx bx-tv icon-xs"></i></span> Smart TV
            </td>
            <td>
              <div className="text-body"><span className="text-primary fw-medium">$349</span>/2499</div>
              <small className="text-body">Partially Paid</small>
            </td>
            <td><span className="badge bg-label-primary">Confirmed</span></td>
            <td>
              <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="icon-base bx bx-dots-vertical-rounded"></i></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-edit-alt me-1"></i> View Details</a>
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-trash me-1"></i> Delete</a>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="d-flex align-items-center">
                <img src="../../assets/img/products/logitech-mx.png" alt="Logitech" height="32" width="32" className="me-3" />
                <div className="d-flex flex-column">
                  <h6 className="mb-0">Logitech MX</h6>
                  <small className="text-body">Logitech</small>
                </div>
              </div>
            </td>
            <td>
              <span className="badge bg-label-warning rounded-pill p-1_5 me-3"><i className="icon-base bx bx-mouse icon-xs"></i></span> Mouse
            </td>
            <td>
              <div><span className="text-primary fw-medium">$89</span></div>
              <small className="text-body">Fully Paid</small>
            </td>
            <td><span className="badge bg-label-primary">Completed</span></td>
            <td>
              <div className="dropdown">
                <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i className="icon-base bx bx-dots-vertical-rounded"></i></button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-edit-alt me-1"></i> View Details</a>
                  <a className="dropdown-item" href="javascript:void(0);"><i className="icon-base bx bx-trash me-1"></i> Delete</a>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
{/* Total Balance */}
<div className="col-lg-5 col-xxl-4">
  <div className="card h-100">
    <div className="card-header d-flex align-items-center justify-content-between">
      <h5 className="card-title m-0 me-2">Total Balance</h5>
      <div className="dropdown">
        <button className="btn p-0" type="button" id="totalBalance" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i className="icon-base bx bx-dots-vertical-rounded icon-lg text-body-secondary"></i>
        </button>
        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="totalBalance">
          <a className="dropdown-item" href="javascript:void(0);">Last 28 Days</a>
          <a className="dropdown-item" href="javascript:void(0);">Last Month</a>
          <a className="dropdown-item" href="javascript:void(0);">Last Year</a>
        </div>
      </div>
    </div>
    <div className="card-body pb-0">
      <div className="row">
        <div className="col d-flex">
          <div className="me-3">
            <span className="badge rounded-2 bg-label-warning p-2"><i className="icon-base bx bx-wallet icon-lg text-warning"></i></span>
          </div>
          <div>
            <h6 className="mb-0">$2.54k</h6>
            <small>Wallet</small>
          </div>
        </div>
        <div className="col d-flex">
          <div className="me-3">
            <span className="badge rounded-2 bg-label-secondary p-2"><i className="icon-base bx bx-dollar icon-lg text-secondary"></i></span>
          </div>
          <div>
            <h6 className="mb-0">$4.2k</h6>
            <small>Paypal</small>
          </div>
        </div>
      </div>
      <div id="totalBalanceChart"></div>
    </div>
    <hr className="m-0" />
    <div className="card-footer">
      <div className="d-flex justify-content-between">
        <small className="text-body">You have done 57.6% more sales.<br />Check your new badge in your profile.</small>
        <div>
          <span className="badge bg-label-warning rounded-2 p-2"><i className="icon-base bx bx-chevron-right icon-md text-warning"></i></span>
        </div>
      </div>
    </div>
  </div>
</div>
{/*/ Total Balance */}
</div>

    </div>
    {/* / Content */}
    </div>

);
};

export default Dashboard;