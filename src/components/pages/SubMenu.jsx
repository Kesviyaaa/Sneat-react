import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";

import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";

import "datatables.net-buttons";
import "datatables.net-buttons-bs5";
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.colVis";

import JSZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

window.JSZip = JSZip;
pdfMake.vfs = pdfFonts.vfs;

import "../../App.css";

const SubMenu = () => {
  const responsiveTableRef = useRef(null);
  const responsiveDt = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    menuName: "",
    pageName: "",
    menuListNo: "",
    moduleName: "",
    parentMenuName: "",
    folderName: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.menuName.trim()) {
      newErrors.menuName = "Menu Name is required";
    }

    if (!formData.menuListNo) {
      newErrors.menuListNo = "Menu List Number is required";
    }

    if (!formData.moduleName.trim()) {
      newErrors.moduleName = "Module Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newSubMenu = {
      menuName: formData.menuName,
      pageName: formData.pageName,
      menuListNo: formData.menuListNo,
      moduleName: formData.moduleName,
      parentMenuName: formData.parentMenuName,
      folderName: formData.folderName,
      createdOn: new Date(),
    };

    try {
      const url = editingId
        ? `http://localhost:5000/submenus/${editingId}`
        : "http://localhost:5000/submenus";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSubMenu),
      });

      const result = await response.json();

      console.log(result);

      if (responsiveDt.current) {
        responsiveDt.current.ajax.reload(null, false);
      }

      setShowAddModal(false);
      setEditingId(null);

      setFormData({
        menuName: "",
        pageName: "",
        menuListNo: "",
        moduleName: "",
        parentMenuName: "",
        folderName: "",
      });
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  useEffect(() => {
    if (!responsiveTableRef.current) return;
    if (responsiveDt.current) return;

    responsiveDt.current = $(responsiveTableRef.current).DataTable({
      dom:
        "<'row align-items-center px-3'<'col-md-6'B><'col-md-6 d-flex justify-content-end gap-3'l f>>" +
        "t" +
        "<'d-flex justify-content-between align-items-center px-3 pb-3' i p>",

      language: {
        lengthMenu: "Show _MENU_ Entries",
      },

      buttons: [
        {
          extend: "copy",
          className: "btn btn-primary",
          exportOptions: {
            columns: function (idx, data, node) {
              const table = $(node).closest("table").DataTable();
      
              if (idx === 0) return false; // control column
              if (idx >= table.columns().count() - 2) return false; // edit & delete
      
              return table.column(idx).visible();
            },
          },
        },
      
        {
          extend: "excel",
          className: "btn btn-primary",
          exportOptions: {
            columns: function (idx, data, node) {
              const table = $(node).closest("table").DataTable();
      
              if (idx === 0) return false;
              if (idx >= table.columns().count() - 2) return false;
      
              return table.column(idx).visible();
            },
          },
        },
      
        {
          extend: "pdf",
          className: "btn btn-primary",
          exportOptions: {
            columns: function (idx, data, node) {
              const table = $(node).closest("table").DataTable();
      
              if (idx === 0) return false;
              if (idx >= table.columns().count() - 2) return false;
      
              return table.column(idx).visible();
            },
          },
        },
      
        {
          extend: "colvis",
          text: "Customise Columns",
          className: "btn btn-primary",
          columns: ":not(.control):not(:nth-last-child(-n+2))",
        },
      ],

      responsive: {
        details: {
          type: "column",
          target: 0,
        },
      },

      columnDefs: [{ className: "control", orderable: false, targets: 0 }],

      ajax: {
        url: "http://localhost:5000/submenus",
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

        { data: "menuName" },
        { data: "pageName" },
        { data: "menuListNo" },
        { data: "moduleName" },

        {
          data: "createdOn",
          render: function (data) {
            if (!data) return "";
            return new Date(data).toLocaleString();
          },
        },

        {
          data: null,
          orderable: false,
          searchable: false,
          render: function (data) {
            return `<i class="bx bx-edit edit-icon" data-id="${data._id}" title="Edit"></i>`;
          },
        },

        {
          data: null,
          orderable: false,
          searchable: false,
          render: function (data) {
            return `<i class="bx bx-trash delete-icon" data-id="${data._id}" title="Delete"></i>`;
          },
        },
      ],

      order: [[1, "asc"]],
    });

    $(responsiveTableRef.current).on(
      "click",
      ".delete-icon",
      function () {
        const id = $(this).data("id");
        setDeleteId(id);
        setShowDeleteModal(true);
      }
    );

    $(responsiveTableRef.current).on("click", ".edit-icon", function () {
      const rowData = responsiveDt.current.row($(this).parents("tr")).data();

      setFormData({
        menuName: rowData.menuName,
        pageName: rowData.pageName,
        menuListNo: rowData.menuListNo,
        moduleName: rowData.moduleName,
        parentMenuName: rowData.parentMenuName,
        folderName: rowData.folderName,
      });

      setEditingId(rowData._id);
      setShowAddModal(true);
    });
  }, []);

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/submenus/${deleteId}`, {
        method: "DELETE",
      });
  
      responsiveDt.current.ajax.reload();
  
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-xxl flex-grow-1">
  
    <div className="card">
          
      <div className="datatable-toolbar d-flex justify-content-between align-items-start">

        <div className="title-section">
          <h5 className="table-title">Sub Menu Details</h5>
          <div className="breadcrumb-text">Menu &gt; Sub Menu</div>
        </div>
  
          <button
            className="btn-add-record"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bx bx-plus"></i> Add Sub Menu
          </button>
        </div>
  
        <div className="card-datatable table-responsive p-3">
          <table
            ref={responsiveTableRef}
            className="table dataTable dtr-inline"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Menu Name</th>
                <th>Page Name</th>
                <th>List On</th>
                <th>Module Name</th>
                <th>Created On</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}

      {showModal && selectedRow && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal-card">
            <button className="custom-close" onClick={handleCloseModal}>
              ×
            </button>

            <h5 className="modal-title">Sub Menu Details</h5>

            <div className="details-row">
              <span>Menu Name:</span>
              {selectedRow.menuName}
            </div>

            <div className="details-row">
              <span>Page Name:</span>
              {selectedRow.pageName}
            </div>

            <div className="details-row">
              <span>Menu List No:</span>
              {selectedRow.menuListNo}
            </div>

            <div className="details-row">
              <span>Module Name:</span>
              {selectedRow.moduleName}
            </div>

            <div className="details-row">
              <span>Parent Menu Name:</span>
              {selectedRow.parentMenuName}
            </div>

            <div className="details-row">
              <span>Folder Name:</span>
              {selectedRow.folderName}
            </div>

            <div className="details-row">
              <span>Created On:</span>
              {selectedRow.createdOn}
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}

{showDeleteModal && (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-card">

      <h5 className="modal-title">Confirm Delete</h5>

      <p style={{ marginTop: "10px" }}>
        Are you sure you want to delete this Sub Menu?
      </p>

      <div className="modal-buttons">

        <button
          className="btn-submit btn-delete"
          onClick={confirmDelete}
        >
          Delete
        </button>

        <button
          className="btn-cancel"
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}

      {/* ADD / EDIT MODAL */}

      {showAddModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal-card">
            <button
              className="custom-close"
              onClick={() => setShowAddModal(false)}
            >
              ×
            </button>

            <h5 className="modal-title">
              {editingId ? "Edit Sub Menu" : "New Sub Menu"}
            </h5>

            <hr className="modal-divider" />

            {/* Menu Name */}

            {/* Menu Name */}

            <div className="form-group">
              <label className="form-label">Menu Name *</label>

              <div className="input-icon position-relative">
                <i className="bx bx-menu input-icon-left"></i>

                <input
                  type="text"
                  name="menuName"
                  className="form-field"
                  placeholder="ENTER MENU NAME"
                  value={formData.menuName}
                  onChange={handleChange}
                />
              </div>

              {errors.menuName && (
                <small className="text-danger">{errors.menuName}</small>
              )}
            </div>

            {/* Page Name */}

            <div className="form-group">
              <label className="form-label">Page Name</label>

              <div className="input-icon position-relative">
                <i className="bx bx-file input-icon-left"></i>

                <input
                  type="text"
                  name="pageName"
                  className="form-field"
                  placeholder="ENTER PAGE NAME"
                  value={formData.pageName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Menu List No */}

            {/* Menu List No */}

            <div className="form-group">
              <label className="form-label">Menu List No *</label>

              <div className="input-icon position-relative">
                <i className="bx bx-list-ol input-icon-left"></i>

                <input
                  type="number"
                  name="menuListNo"
                  className="form-field"
                  placeholder="ENTER MENU LIST NUMBER"
                  value={formData.menuListNo}
                  onChange={handleChange}
                />
              </div>

              {errors.menuListNo && (
                <small className="text-danger">{errors.menuListNo}</small>
              )}
            </div>

            {/* Module Name */}

            {/* Module Name */}

            <div className="form-group">
              <label className="form-label">Module Name *</label>

              <div className="input-icon position-relative">
                <i className="bx bx-layer input-icon-left"></i>

                <select
                  className="form-field"
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleChange}
                >
                  <option value="">Select Module</option>
                  <option value="Forwarding">Forwarding</option>
                  <option value="Menus">Menus</option>
                  <option value="Performance">Performance</option>
                  <option value="React">React</option>
                  <option value="Tracking">Tracking</option>
                </select>
              </div>

              {errors.moduleName && (
                <small className="text-danger">{errors.moduleName}</small>
              )}
            </div>

            {/* Parent Menu Name */}

            <div className="form-group">
              <label className="form-label">Parent Menu Name</label>

              <div className="input-icon position-relative">
                <i className="bx bx-menu-alt-left input-icon-left"></i>

                <select
                  className="form-field"
                  name="parentMenuName"
                  value={formData.parentMenuName}
                  onChange={handleChange}
                >
                  <option value="">Select Parent Menu</option>
                  <option value="Accounts">Accounts</option>
                  <option value="Air Calendar">Air Calendar</option>
                  <option value="Air Export">Air Export</option>
                  <option value="Air Export Dashboard">
                    Air Export Dashboard
                  </option>
                  <option value="Air Exports">Air Exports</option>
                  <option value="Air Import">Air Import</option>
                  <option value="Air Import Dashboard">
                    Air Import Dashboard
                  </option>
                  <option value="Air Imports">Air Imports</option>
                </select>
              </div>
            </div>

            {/* Folder Name */}

            <div className="form-group">
              <label className="form-label">Folder Name</label>

              <div className="input-icon position-relative">
                <i className="bx bx-folder input-icon-left"></i>

                <input
                  type="text"
                  name="folderName"
                  className="form-field"
                  placeholder="ENTER FOLDER NAME"
                  value={formData.folderName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* BUTTONS */}

            <div className="modal-buttons">
            <button
              className="btn-submit"
              onClick={handleSubmit}
            >
              {editingId ? "Update" : "Create"}
            </button>

              <button
                className="btn-cancel"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingId(null);

                  setFormData({
                    menuName: "",
                    pageName: "",
                    menuListNo: "",
                    moduleName: "",
                    parentMenuName: "",
                    folderName: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubMenu;
