import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import Flatpickr from "react-flatpickr";

import "flatpickr/dist/themes/light.css";
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";

import "datatables.net-buttons";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.colVis";

import JSZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

window.JSZip = JSZip;
pdfMake.vfs = pdfFonts.vfs;

import "../../App.css";

const ParentMenu = () => {
  const responsiveTableRef = useRef(null);
  const responsiveDt = useRef(null);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingId, setEditingId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    parentMenuName: "",
    moduleName: "",
    menuDescription: "",
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

    if (!formData.parentMenuName.trim()) {
      newErrors.parentMenuName = "Parent Menu Name is required";
    }

    if (!formData.moduleName.trim()) {
      newErrors.moduleName = "Module Name is required";
    }

    if (!formData.menuDescription.trim()) {
      newErrors.menuDescription = "Menu Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newParentMenu = {
      parentMenuName: formData.parentMenuName,
      moduleName: formData.moduleName,
      menuDescription: formData.menuDescription,
      createdOn: new Date().toLocaleDateString(),
    };

    try {
      if (editingId) {
        await fetch(`http://localhost:5000/menus/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newParentMenu),
        });
      } else {
        await fetch("http://localhost:5000/menus", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newParentMenu),
        });
      }

      responsiveDt.current.ajax.reload();

      setShowAddModal(false);
      setEditingId(null);

      setFormData({
        parentMenuName: "",
        moduleName: "",
        menuDescription: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const sidebar = document.querySelector("#layout-menu");

    if (showModal || showAddModal) {
      document.body.style.overflow = "hidden";

      if (sidebar) {
        sidebar.style.pointerEvents = "none";
        sidebar.style.opacity = "0.7";
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
        .filter(
          (_, tr) =>
            $(tr).find("td").eq(1).text() === selectedRow.parentMenuName
        );

      if (row.length) {
        const dtRow = responsiveDt.current.row(row);

        if (dtRow.child.isShown()) {
          dtRow.child.hide();
        }

        $(row).removeClass("dtr-expanded");
      }
    }

    setSelectedRow(null);
  };

  useEffect(() => {
    if (!responsiveTableRef.current) return;
    if (responsiveDt.current) return;

    $(".dt-button-collection").remove();
    $.fn.dataTable.Buttons.defaults.dom.button.className = "export-btn";
    responsiveDt.current = $(responsiveTableRef.current).DataTable({
      dom:
      "<'row align-items-center px-3'<'col-md-6'B><'col-md-6 d-flex align-items-center justify-content-end gap-3'lf>>" +
      "t" +
      "<'d-flex justify-content-between align-items-center px-3 pb-3'ip>",

      scrollY: "350px",
      scrollCollapse: true,
      scrollX: false,
      paging: true,

      language: {
        lengthMenu: "Show _MENU_ Entries",
      },

      buttons: {
        dom: {
          container: {
            className: "dt-buttons d-flex gap-2"
          }
        },
      
        buttons: [
          {
            extend: "collection",
            text: '<i class="bx bx-export"></i> Export',
            className: "export-btn",
            autoClose: true,
            dropIcon: false,
      
            buttons: [
              {
                extend: "print",
                text: '<i class="bx bx-printer"></i> Print',
                exportOptions: {
                  columns: ":visible:not(.no-export)"
                }
              },
              {
                extend: "copy",
                text: '<i class="bx bx-copy"></i> Copy',
                exportOptions: {
                  columns: ":visible:not(.no-export)"
                }
              },
              {
                extend: "excel",
                text: '<i class="bx bx-spreadsheet"></i> Excel',
                exportOptions: {
                  columns: ":visible:not(.no-export)"
                }
              },
              {
                extend: "pdf",
                text: '<i class="bx bx-file"></i> PDF',
                exportOptions: {
                  columns: ":visible:not(.no-export)"
                }
              }
            ]
          },
      
          {
            extend: "colvis",
            text: '<i class="bx bx-columns"></i> Customise Columns',
            columns: ":not(.control):not(.no-export)",
            className: "custom-colvis",
            dropIcon: false,
            autoClose: false
          }
        ]
      },

      responsive: {
        details: {
          type: "column",
          target: 0,
        },
      },

      columnDefs: [{ className: "control", orderable: false, targets: 0 }],

      ajax: {
        url: "http://localhost:5000/menus",
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

        { data: "parentMenuName" },
        { data: "moduleName" },
        { data: "menuDescription" },
        {
          data: "createdOn",
          render: function (data) {
            return new Date(data).toLocaleString();
          },
        },
        {
          data: null,
          className: "no-export",
          orderable: false,
          searchable: false,
          render: function (data) {
            return `<i class="bx bx-edit edit-icon" data-id="${data._id}" title="Edit"></i>`;
          },
        },

        {
          data: null,
          className: "no-export",
          orderable: false,
          searchable: false,
          render: function (data) {
            return `<i class="bx bx-trash delete-icon" data-id="${data._id}" title="Delete"></i>`;
          },
        },
      ],

      order: [[1, "asc"]],

      initComplete: function () {
        $(".dataTables_info").css({
          marginLeft: "20px",
        });

        $(".dataTables_paginate").css({
          marginRight: "20px",
          textAlign: "right",
        });

        $(".dataTables_wrapper .row:last").css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        });
      },
    });

    $(responsiveTableRef.current).on("click", "td.control", function () {
      const tr = $(this).closest("tr");
      const row = responsiveDt.current.row(tr);

      setTimeout(() => {
        if (tr.hasClass("dtr-expanded")) {
          const rowData = row.data();
          setSelectedRow(rowData);
          setShowModal(true);
        }
      }, 50);
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
        parentMenuName: rowData.parentMenuName,
        moduleName: rowData.moduleName,
        menuDescription: rowData.menuDescription,
      });

      setEditingId(rowData._id);
      setShowAddModal(true);
    });

    return () => {
      if (responsiveDt.current) {
        responsiveDt.current.destroy(true);
        responsiveDt.current = null;
      }

      $(responsiveTableRef.current).off("click", "td.control");
      $(responsiveTableRef.current).off("click", ".delete-icon");
      $(responsiveTableRef.current).off("click", ".edit-icon");
    };
  }, []);
  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/menus/${deleteId}`, {
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
    <>
    <style>
    {`
      table.dataTable tbody tr {
        background-color: white !important;
      }

      table.dataTable tbody tr:hover {
        background-color: pink !important;
      }
      `}
      </style>
    <div className="container-xxl flex-grow-1 container-p-y">
  
      <div className="card">
            
        <div className="datatable-toolbar d-flex justify-content-between align-items-start">

          <div className="title-section">
            <h5 className="table-title">Parent Menu Details</h5>
            <div className="breadcrumb-text">Menu &gt; Parent Menu</div>
          </div>

          <button
            className="btn-add-record"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bx bx-plus"></i> Add Parent
          </button>

        </div>
      
        <div className="card-datatable table-responsive p-3">
          <table
            ref={responsiveTableRef}
            className="table table-hover dataTable dtr-inline"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Parent Menu Name</th>
                <th>Module Name</th>
                <th>Menu Description</th>
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

            <h5 className="modal-title">Parent Menu Details</h5>

            <div className="details-row">
              <span>Parent Menu Name:</span>
              {selectedRow.parentMenuName}
            </div>

            <div className="details-row">
              <span>Module Name:</span>
              {selectedRow.moduleName}
            </div>

            <div className="details-row">
              <span>Menu Description:</span>
              {selectedRow.menuDescription}
            </div>

            <div className="details-row">
              <span>Created On:</span>
              {selectedRow.createdOn}
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-card">
      <h5 className="modal-title">Confirm Delete</h5>

      <p style={{ marginTop: "10px" }}>
        Are you sure you want to delete this Parent Menu?
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
              {editingId ? "Edit Parent Menu" : "New Parent Menu"}
            </h5>

            <hr className="modal-divider" />

            {/* Parent Menu Name */}

            <div className="form-group">
              <div className="mb-3">
                <label className="form-label">Parent Menu Name</label>

                <div className="input-icon position-relative">
                  <i className="bx bx-menu input-icon-left"></i>

                  <input
                    type="text"
                    name="parentMenuName"
                    className="form-field"
                    placeholder="ENTER PARENT MENU"
                    value={formData.parentMenuName}
                    onChange={handleChange}
                  />
                </div>

                {errors.parentMenuName && (
                  <small className="text-danger">{errors.parentMenuName}</small>
                )}
              </div>
            </div>

            {/* Module Name */}

            <div className="form-group">
              <label className="form-label">Module Name</label>

              <div className="input-icon position-relative">
                <i className="bx bx-layer input-icon-left"></i>

                <select
                  className="form-field"
                  name="moduleName"
                  value={formData.moduleName}
                  onChange={handleChange}
                >
                  <option value="">SELECT MODULE</option>
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

            {/* Menu Description */}

            <div className="form-group">
              <label>Menu Description</label>

              <div className="input-icon">
                <i className="bx bx-detail"></i>

                <textarea
                  className="form-field"
                  name="menuDescription"
                  placeholder="ENTER MENU DESCRIPTION"
                  value={formData.menuDescription}
                  onChange={handleChange}
                />
              </div>

              {errors.menuDescription && (
                <small className="text-danger">{errors.menuDescription}</small>
              )}
            </div>

            {/* Created On */}

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
                    parentMenuName: "",
                    moduleName: "",
                    menuDescription: "",
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
    </>
  );
};

export default ParentMenu;
