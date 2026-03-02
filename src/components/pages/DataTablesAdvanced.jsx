import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-bs5"; // Bootstrap 5 DataTables
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

import "datatables.net-responsive"; // core responsive plugin
import "datatables.net-responsive-bs5"; // Bootstrap 5 responsive
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import "../../App.css"

const DataTablesAdvanced = () => {
    const tableRef = useRef(null);
    const dtInstance = useRef(null);

    const columnTableRef = useRef(null);
    const columnDt = useRef(null);

    const advancedTableRef = useRef(null);
    const advancedDt = useRef(null);

    const responsiveTableRef = useRef(null);
    const responsiveDt = useRef(null);

    const childTableRef = useRef(null);
    const childDt = useRef(null);
  
    useEffect(() => {
      if (!tableRef.current) return;
  
      // 🛑 prevent double init (VERY IMPORTANT)
      if (dtInstance.current) return;
  
      dtInstance.current = $(tableRef.current).DataTable({
        processing: true,
        serverSide: false,
        responsive: true,
  
        ajax: {
          url: "http://localhost:5000/employees",
          dataSrc: "data",
          error: function (xhr) {
            console.error("AJAX ERROR:", xhr.responseText);
          },
        },
  
        columns: [
          { title: "Full name", data: "name" },
          { title: "Email", data: "email" },
          { title: "Position", data: "post" },
          { title: "Office", data: "city" },
          { title: "Start date", data: "date_joined" },
          { title: "Salary", data: "salary" },
        ],
      });
  
      return () => {
        if (dtInstance.current) {
          dtInstance.current.destroy(true);
          dtInstance.current = null;
        }
      };
    }, []);




    useEffect(() => {
  if (!columnTableRef.current) return;

  // 🛑 prevent double init
  if (columnDt.current) return;

  const table = $(columnTableRef.current).DataTable({
    processing: true,
    responsive: true,
    ajax: {
      url: "http://localhost:5000/employees",
      dataSrc: "data",
    },

    columns: [
      { title: "Name", data: "name" },
      { title: "Email", data: "email" },
      { title: "Post", data: "post" },
      { title: "City", data: "city" },
      { title: "Date", data: "date_joined" },
      { title: "Salary", data: "salary" },
    ],

    initComplete: function () {
      const api = this.api();

      // 🔥 add search inputs to footer
      api.columns().every(function () {
        const column = this;
        const footer = $(column.footer());

        const input = $(
          '<input type="text" class="form-control form-control-sm" placeholder="Search" />'
        )
          .appendTo(footer.empty())
          .on("keyup change clear", function () {
            if (column.search() !== this.value) {
              column.search(this.value).draw();
            }
          });
      });
    },
  });

  columnDt.current = table;

  return () => {
    if (columnDt.current) {
      columnDt.current.destroy(true);
      columnDt.current = null;
    }
  };
}, []);




useEffect(() => {
    if (!advancedTableRef.current) return;
    if (advancedDt.current) return; // prevent double init

    // Initialize DataTable
    const table = $(advancedTableRef.current).DataTable({
      processing: true,
      responsive: true,
      ajax: {
        url: "http://localhost:5000/employees",
        dataSrc: "data",
      },
      columns: [
        { data: null, defaultContent: "", orderable: false, responsivePriority: 1 },
        { data: "name", responsivePriority: 2 },
        { data: "email", responsivePriority: 3 },
        { data: "post" },
        { data: "city" },
        { data: "date_joined" },
        { data: "salary" },
      ],
    });

    advancedDt.current = table;

    // Advanced search inputs
    $(".dt_adv_search .dt-input").on("keyup change", function () {
      const columnIndex = $(this).data("column-index");
      const value = $(this).val();
      table.column(columnIndex).search(value).draw();
    });

    // Flatpickr date range for column search
    flatpickr(".flatpickr-range", {
      mode: "range",
      dateFormat: "Y-m-d",
      onChange: function (selectedDates) {
        $(".start_date").val(selectedDates[0] || '');
        $(".end_date").val(selectedDates[1] || '');
        table.draw();
      },
    });

    return () => {
      if (advancedDt.current) {
        advancedDt.current.destroy(true);
        advancedDt.current = null;
      }
    };
  }, []);






  useEffect(() => {
    if (!responsiveTableRef.current) return;
  
    // 🛑 prevent double init
    if (responsiveDt.current) return;
  
    responsiveDt.current = $(responsiveTableRef.current).DataTable({
      processing: true,
      responsive: true,
  
      ajax: {
        url: "http://localhost:5000/employees",
        dataSrc: "data",
      },
  
      columns: [
        {
          className: "control",
          orderable: false,
          searchable: false,
          data: null,
          defaultContent: "",
        },
        { data: "name" },
        { data: "email" },
        { data: "post" },
        { data: "city" },
        { data: "date_joined" },
        { data: "salary" },
        { data: null, defaultContent: "28" }, // dummy age
        { data: null, defaultContent: "3 Years" }, // dummy exp
        { data: null, defaultContent: "Active" }, // dummy status
      ],
  
      order: [[1, "asc"]],
    });
  
    return () => {
      if (responsiveDt.current) {
        responsiveDt.current.destroy(true);
        responsiveDt.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!childTableRef.current) return;
  
    // 🛑 prevent double init
    if (childDt.current) return;
  
    childDt.current = $(childTableRef.current).DataTable({
      processing: true,
      responsive: {
        details: {
          type: "column",
          target: 0,
        },
      },
  
      ajax: {
        url: "http://localhost:5000/employees",
        dataSrc: "data",
      },
  
      columns: [
        {
          className: "control",
          orderable: false,
          searchable: false,
          data: null,
          defaultContent: "",
        },
        { data: "name" },
        { data: "email" },
        { data: "city" },
        { data: "date_joined" },
        { data: null, defaultContent: "28" }, // age dummy
        { data: null, defaultContent: "Active" }, // status dummy
      ],
  
      order: [[1, "asc"]],
    });
  
    return () => {
      if (childDt.current) {
        childDt.current.destroy(true);
        childDt.current = null;
      }
    };
  }, []);









      
  return(
    <>
    {/* Content wrapper */}
    <div className="content-wrapper">
      {/* Content */}
      <div className="container-xxl flex-grow-1 container-p-y">
        
{/* Ajax Sourced Server-side */}
{/* Ajax Sourced Server-side */}
    <div className="card">
    <h5 className="card-header pb-0 text-md-start text-center">
        Ajax Sourced Server-side
    </h5>

    <div className="card-datatable table-responsive">
        <table
        ref={tableRef}
        className="datatables-ajax table table-bordered"
        style={{ width: "100%" }}
        ></table>
    </div>
    </div>
{/*/ Ajax Sourced Server-side */}

<hr className="my-12" />

{/* Column Search */}
<div className="card">
  <h5 className="card-header pb-0 text-md-start text-center">
    Column Search
  </h5>

  <div className="card-datatable table-responsive">
    <table
      ref={columnTableRef}
      className="dt-column-search table table-bordered"
      style={{ width: "100%" }}
    >
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Post</th>
          <th>City</th>
          <th>Date</th>
          <th>Salary</th>
        </tr>
      </tfoot>
    </table>
  </div>
</div>
{/*/ Column Search */}

<hr className="my-12" />

{/* Advanced Search */}
<div className="card">
      <h5 className="card-header">Advanced Search</h5>
      <div className="card-body">
        <form className="dt_adv_search">
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Name:</label>
              <input type="text" className="form-control dt-input" data-column-index={1} placeholder="Alaric Beslier" />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Email:</label>
              <input type="text" className="form-control dt-input" data-column-index={2} placeholder="demo@example.com" />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Post:</label>
              <input type="text" className="form-control dt-input" data-column-index={3} placeholder="Web Designer" />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">City:</label>
              <input type="text" className="form-control dt-input" data-column-index={4} placeholder="Balky" />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Date:</label>
              <input type="text" className="form-control dt-input flatpickr-range" data-column-index={5} placeholder="StartDate to EndDate" />
              <input type="hidden" className="start_date" />
              <input type="hidden" className="end_date" />
            </div>
            <div className="col-12 col-sm-6 col-lg-4">
              <label className="form-label">Salary:</label>
              <input type="text" className="form-control dt-input" data-column-index={6} placeholder="10000" />
            </div>
          </div>
        </form>
      </div>

      <div className="card-datatable">
        <table
          ref={advancedTableRef}
          className="dt-advanced-search table table-bordered table-striped"
          style={{ width: "100%" }}
        >
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Post</th>
              <th>City</th>
              <th>Date</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Post</th>
              <th>City</th>
              <th>Date</th>
              <th>Salary</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
{/*/ Responsive Datatable */}

<hr className="my-12" />

{/* Responsive Datatable */}
{/* Responsive Datatable */}
<div className="card">
  <h5 className="card-header pb-0">Responsive Datatable</h5>

  <div className="card-datatable table-responsive">
    <table
      ref={responsiveTableRef}
      className="dt-responsive table table-bordered"
      style={{ width: "100%" }}
    >
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>Post</th>
          <th>City</th>
          <th>Date</th>
          <th>Salary</th>
          <th>Age</th>
          <th>Experience</th>
          <th>Status</th>
        </tr>
      </thead>
    </table>
  </div>
</div>
{/*/ Responsive Datatable */}

<hr className="my-12" />

{/* Responsive with Child Rows */}
{/* Responsive with Child Rows */}
<div className="card">
  <h5 className="card-header pb-0">Responsive with Child Rows</h5>

  <div className="card-datatable table-responsive">
    <table
      ref={childTableRef}
      className="dt-responsive-child table table-bordered"
      style={{ width: "100%" }}
    >
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Date</th>
          <th>Age</th>
          <th>Status</th>
        </tr>
      </thead>
    </table>
  </div>
</div>

      </div>
      {/* / Content */}</div>
      </>
  );
};

export default DataTablesAdvanced;