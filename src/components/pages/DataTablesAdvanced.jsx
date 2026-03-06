import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/themes/light.css";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";

import "../../App.css";

const DataTablesAdvanced = () => {
  const responsiveTableRef = useRef(null);
  const responsiveDt = useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingId, setEditingId] = useState(null);

  

  const [formData, setFormData] = useState({
    name: "",
    post: "",
    email: "",
    joiningDate: "",
    salary: ""
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const validateForm = () => {
    let newErrors = {};
  
    if (!formData.name.trim()) {
      newErrors.name = "The name is required";
    }
  
    if (!formData.post.trim()) {
      newErrors.post = "Post field is required";
    }
  
    if (!formData.email.trim()) {
      newErrors.email = "The Email is required";
    }
  
    if (!formData.joiningDate.trim()) {
      newErrors.joiningDate = "Joining Date is required";
    }
  
    if (!formData.salary.trim()) {
      newErrors.salary = "Salary is required";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };

  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
  
    if (!formData.name) newErrors.name = "The name is required";
    if (!formData.post) newErrors.post = "Post field is required";
    if (!formData.email) newErrors.email = "The Email is required";
    if (!formData.joiningDate) newErrors.joiningDate = "Joining Date is required";
    if (!formData.salary) newErrors.salary = "Salary is required";
  
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length > 0) return;
  
    const newEmployee = {
      name: formData.name,
      email: formData.email,
      post: formData.post,
      city: "Chennai",
      date_joined: formData.joiningDate,
      salary: formData.salary
    };
  
    try {
      if (editingId) {
        /* UPDATE EMPLOYEE */
        await fetch(`http://localhost:5000/employees/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newEmployee)
        });
      } else {
        /* ADD EMPLOYEE */
        await fetch("http://localhost:5000/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newEmployee)
        });
      }
      responsiveDt.current.ajax.reload();
      setShowAddModal(false);
      setEditingId(null);
      setFormData({
        name: "",
        email: "",
        post: "",
        joiningDate: "",
        salary: ""
      });
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (showAddModal) {
      flatpickr("#joiningDate", {
        dateFormat: "m/d/Y",
        allowInput: true,
        position: "below",
        onChange: function(selectedDates, dateStr) {
          setFormData(prev => ({
            ...prev,
            joiningDate: dateStr
          }));
        }
      });
    }
  }, [showAddModal]);



  useEffect(() => {
    const sidebar = document.querySelector("#layout-menu");
  
    if (showModal || showAddModal) {
  
      // Stop page scrolling
      document.body.style.overflow = "hidden";
  
      // Disable sidebar
      if (sidebar) {
        sidebar.style.pointerEvents = "none";
        sidebar.style.opacity = "0.7";   // Sneat grey look
      }
  
    } else {
  
      document.body.style.overflow = "auto";
  
      if (sidebar) {
        sidebar.style.pointerEvents = "auto";
        sidebar.style.opacity = "1";
      }
  
    }
  
    return () => {
      document.body.style.overflow = "auto";
    };
  
  }, [showModal, showAddModal]);

  const handleCloseModal = () => {
    setShowModal(false);
  
    if (responsiveDt.current && selectedRow) {
      const row = responsiveDt.current
        .rows()
        .nodes()
        .to$()
        .filter((_, tr) =>
          $(tr).find("td").eq(1).text() === selectedRow.name
        );
  
      if (row.length) {
        const dtRow = responsiveDt.current.row(row);
  
        // collapse responsive child
        if (dtRow.child.isShown()) {
          dtRow.child.hide();
        }
  
        // remove expanded class so + icon returns
        $(row).removeClass("dtr-expanded");
      }
    }
  
    setSelectedRow(null);
  };

  

  useEffect(() => {
    if (!responsiveTableRef.current) return;
    if (responsiveDt.current) return;
  
    // 🔥 1. DataTable init
    responsiveDt.current = $(responsiveTableRef.current).DataTable({
      dom:"<'d-flex justify-content-end align-items-center mb-3 gap-3'lf>rt<'d-flex justify-content-between align-items-center px-3 pb-3'i p>",      processing: true,

      language: {
        lengthMenu: "Show _MENU_ Entries"
      },
  
      responsive: {
        details: {
          type: "column",
          target: 0,
        },
      },
      columnDefs: [
        { className: "control", orderable: false, targets: 0 }
      ],
  
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
        { data: "date_joined" },
        { data: "salary" },
        { data: null, defaultContent: "28" },
        { data: null, defaultContent: "3 Years" },
        { data: null, defaultContent: "Active" },
        {
          data: null,
          orderable: false,
          searchable: false,
          className: "all",
          render: function (data) {
            return `
              <div class="action-icons">
                <i class="bx bx-edit edit-icon" data-id="${data._id}" title="Edit"></i>
                <i class="bx bx-trash delete-icon" data-id="${data._id}" title="Delete"></i>
              </div>
            `;
          }
        }
      ],
  
      order: [[1, "asc"]],
    });
  
    // ✅ 2. CLICK HANDLER — PUT HERE
    $(responsiveTableRef.current).on("click", "td.control", function () {
      const tr = $(this).closest("tr");
      const row = responsiveDt.current.row(tr);
    
      // Let DataTables toggle first
      setTimeout(() => {
        if (tr.hasClass("dtr-expanded")) {
          const rowData = row.data();
          setSelectedRow(rowData);
          setShowModal(true);
        }
      }, 50);
    });

    /* ✅ DELETE RECORD */
    $(responsiveTableRef.current).on("click", ".delete-icon", async function () {
      const id = $(this).data("id");
      if (!window.confirm("Delete this employee?")) return;
      try {
        await fetch(`http://localhost:5000/employees/${id}`, {
          method: "DELETE"
        });
        responsiveDt.current.ajax.reload();
      } catch (error) {
        console.error(error);
      }
    });

    /* ✅ EDIT RECORD */
    $(responsiveTableRef.current).on("click", ".edit-icon", function () {
      const rowData = responsiveDt.current
        .row($(this).parents("tr"))
        .data();
      setFormData({
        name: rowData.name,
        email: rowData.email,
        post: rowData.post,
        joiningDate: rowData.date_joined,
        salary: rowData.salary
      });
      setEditingId(rowData._id);
      setShowAddModal(true);
    });
  
    // cleanup
    return () => {
      if (responsiveDt.current) {
        responsiveDt.current.destroy(true);
        responsiveDt.current = null;
      }
  
      // 🔥 remove event listener (VERY IMPORTANT)
      $(responsiveTableRef.current).off("click", "td.control");
      $(responsiveTableRef.current).off("click", ".delete-icon");
      $(responsiveTableRef.current).off("click", ".edit-icon");
    };
  }, []);

  return (
    <div>


        <div className="card">
        <div className="datatable-toolbar">
            <button className="btn-add-record" onClick={() => setShowAddModal(true)}>
              <i className="bx bx-plus"></i> Add New Record
            </button>
          </div>
          
  
          <div className="card-datatable table-responsive">
          <table
            ref={responsiveTableRef}
            className="table table-bordered dataTable dtr-inline "
            style={{ width: "100%" }}
          >
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Post</th>
                  <th>Date</th>
                  <th>Salary</th>
                  <th>Age</th>
                  <th>Experience</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
  
        {/* ✅ ✅ ✅ PUT MODAL RIGHT HERE */}
  
        {showModal && selectedRow && (
          <div className="custom-modal-backdrop">
            <div className="custom-modal-card">
            <button className="custom-close" onClick={handleCloseModal}>
                ×
              </button>
  
              <h5 className="modal-title">
                Details of {selectedRow.name}
              </h5>
  
              <div className="details-row"><span>Name:</span> {selectedRow.name}</div>
              <div className="details-row"><span>Email:</span> {selectedRow.email}</div>
              <div className="details-row"><span>Post:</span> {selectedRow.post}</div>
              <div className="details-row"><span>City:</span> {selectedRow.city}</div>
              <div className="details-row"><span>Date:</span> {selectedRow.date_joined}</div>
              <div className="details-row"><span>Salary:</span> {selectedRow.salary}</div>
              <div className="details-row"><span>Age:</span> 28</div>
              <div className="details-row"><span>Experience:</span> 3 Years</div>
              <div className="details-row">
                <span>Status:</span>
                <span className="status-badge">Active</span>
              </div>          
            </div>
          </div>
        )}

        {/* ADD NEW RECORD MODAL */}

        {showAddModal && (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-card">

      <button className="custom-close" onClick={() => setShowAddModal(false)}>
        ×
      </button>

      <h5 className="modal-title">
        {editingId ? "Edit Record" : "New Record"}
      </h5>

      <hr className="modal-divider"/>

      <div className="form-group">
        <label>Full Name</label>
        <div className="input-icon">
          <i className="bx bx-user"></i>
          <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />
        </div>
        {errors.name && <small className="text-danger">{errors.name}</small>}
      </div>

      <div className="form-group">
        <label>Post</label>
        <div className="input-icon">
          <i className="bx bx-briefcase"></i>
          <input
            type="text"
            name="post"
            placeholder="Web Developer"
            value={formData.post}
            onChange={handleChange}
          />
        </div>
        {errors.post && <small className="text-danger">{errors.post}</small>}
      </div>

      <div className="form-group">
        <label>Email</label>
        <div className="input-icon">
          <i className="bx bx-envelope"></i>
          <input
            type="email"
            name="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <small>You can use letters, numbers & periods</small>
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="form-group">
        <label>Joining Date</label>
        <div className="input-icon position-relative">
        <input
          id="joiningDate"
          type="text"
          placeholder="MM/DD/YYYY"
          value={formData.joiningDate}
          onChange={(e) =>
            setFormData({ ...formData, joiningDate: e.target.value })
          }
        />
          <i className="bx bx-calendar calendar-icon"></i>
        </div>
        {errors.joiningDate && <small className="text-danger">{errors.joiningDate}</small>}
      </div>

      <div className="form-group">
        <label>Salary</label>
        <div className="input-icon">
          <span className="currency-icon">$</span>
          <input
            type="number"
            name="salary"
            placeholder="12000"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>
        {errors.salary && <small className="text-danger">{errors.salary}</small>}
      </div>

      <div className="modal-buttons">
      <button className="btn-submit" onClick={handleSubmit}>
        Submit
      </button>
        <button className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancel</button>
      </div>

    </div>
  </div>
)}
  
        {/* ✅ still inside container */}
      </div>

  );
};

export default DataTablesAdvanced;