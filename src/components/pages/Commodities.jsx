import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";

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

const Commodities = () => {
  const tableRef = useRef(null);
  const dt = useRef(null);
  const openedRowRef = useRef(null);

  const [showModal, setShowModal] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    iataCode: "",
    nature: "",
    status: "Active",
  });

  const [editingId, setEditingId] = useState(null);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.iataCode.trim()) {
      newErrors.iataCode = "IATA Code is required";
    }

    if (!formData.nature) {
      newErrors.nature = "Nature is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      let url = "http://localhost:5000/commodities";
      let method = "POST";

      if (editingId) {
        url = `http://localhost:5000/commodities/${editingId}`;
        method = "PUT";
      }

      await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          status: formData.status === "Active",
        }),
      });

      dt.current.ajax.reload(null, false);

      setShowModal(false);
      setEditingId(null);

      setFormData({
        name: "",
        description: "",
        iataCode: "",
        nature: "",
        status: "Active",
      });

      setErrors({});
    } catch (error) {
      console.error(error);
    }
  };

  /* DATATABLE */

  useEffect(() => {
    if (dt.current) return;
    $.fn.dataTable.Buttons.defaults.dom.button.className = "export-btn";


    dt.current = $(tableRef.current).DataTable({
      dom:
      "<'row align-items-center px-3'<'col-md-6'B><'col-md-6 d-flex align-items-center justify-content-end gap-3'lf>>" +
      "t" +
      "<'d-flex justify-content-between align-items-center px-3 pb-3'ip>",
      language: { lengthMenu: "Show _MENU_ Entries" },
      scrollY: "350px",
scrollCollapse: true,
scrollX: false,
paging: true,
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

      responsive: true,

      ajax: {
        url: "http://localhost:5000/commodities",
        dataSrc: "data",
      },

      columns: [
        { data: "name", responsivePriority: 1 },
        { data: "description", responsivePriority: 2 },
        { data: "nature", responsivePriority: 3 },

        {
          data: null,
          responsivePriority: 1,
          orderable: false,
          className: "no-export",
          render: function (data) {
            return `
              <i class="bx bx-edit edit-icon" data-id="${data._id}" style="cursor:pointer;"></i>
            `;
          },
        },
      ],

      order: [[0, "asc"]],
    });

    /* EDIT */

    $(tableRef.current).on("click", ".edit-icon", function () {
      let tr = $(this).closest("tr");

      if (tr.hasClass("child")) {
        tr = tr.prev();
      }

      const rowData = dt.current.row(tr).data();

      if (!rowData) return;

      setEditingId(rowData._id);

      setFormData({
        name: rowData.name,
        description: rowData.description,
        iataCode: rowData.iataCode,
        nature: rowData.nature,
        status: rowData.status,
      });

      setShowModal(true);
    });

    /* DELETE */

    $(tableRef.current).on("click", "td.dtr-control", function () {
      let tr = $(this).closest("tr");

      if (tr.hasClass("child")) {
        tr = tr.prev();
      }

      if (tr.hasClass("parent")) return;

      const row = dt.current.row(tr);
      const rowData = row.data();

      if (!rowData) return;

      openedRowRef.current = row;

      setSelectedRow(rowData);
      setShowDetailsModal(true);
    });
  }, []);

  useEffect(() => {
    if (showModal || showDetailsModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal, showDetailsModal]);

  return (
    <div className="container-xxl flex-grow-1">
      <div className="card">
        <div className="datatable-toolbar d-flex justify-content-between align-items-start">
          <div className="title-section">
            <h5 className="table-title">Commodities</h5>
            <div className="breadcrumb-text">
              Global Masters &gt; Commodities
            </div>
          </div>

          <button className="btn-add-record" onClick={() => setShowModal(true)}>
            <i className="bx bx-plus"></i> Create Commodity
          </button>
        </div>

        <div className="card-datatable p-3">
          <table
            ref={tableRef}
            className="table dataTable dtr-inline"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Nature</th>
                <th>Update</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT MODAL */}

      {showModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal-card">
            <button
              className="custom-close"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h5 className="modal-title">
              {editingId ? "Edit Commodity" : "Create Commodity"}
            </h5>

            <hr className="modal-divider" />

            <div className="row">
              {/* Name */}

              <div className="col-12">
                <div className="form-group">
                  <label>Name *</label>

                  <div className="input-icon">
                    <i className="bx bx-package"></i>

                    <input
                      type="text"
                      name="name"
                      className="form-field"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {errors.name && (
                    <small className="text-danger">{errors.name}</small>
                  )}
                </div>
              </div>

              {/* Description (Large Text Area) */}

              <div className="col-12">
                <div className="form-group">
                  <label>Description</label>

                  <div className="input-icon">
                    <i className="bx bx-detail"></i>

                    <textarea
                      name="description"
                      className="form-field"
                      placeholder="Enter Description"
                      rows="4"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* IATA Code */}

              <div className="col-12">
                <div className="form-group">
                  <label>IATA Code *</label>

                  <div className="input-icon">
                    <i className="bx bx-barcode"></i>

                    <input
                      type="text"
                      name="iataCode"
                      className="form-field"
                      placeholder="Enter IATA Code"
                      value={formData.iataCode}
                      onChange={handleChange}
                    />
                  </div>

                  {errors.iataCode && (
                    <small className="text-danger">{errors.iataCode}</small>
                  )}
                </div>
              </div>

              {/* Nature */}

              <div className="col-12">
                <div className="form-group">
                  <label>Nature *</label>

                  <div className="input-icon">
                    <i className="bx bx-category"></i>

                    <select
                      name="nature"
                      className="form-field"
                      value={formData.nature}
                      onChange={handleChange}
                    >
                      <option value="">Select Nature</option>
                      <option value="General">General</option>
                      <option value="Dangerous">Dangerous</option>
                      <option value="Perishable">Perishable</option>
                    </select>
                  </div>

                  {errors.nature && (
                    <small className="text-danger">{errors.nature}</small>
                  )}
                </div>
              </div>

              {/* Status (Radio Buttons Same Line) */}

              <div className="col-12">
                <div className="form-group">
                  <label>Status</label>

                  <div className="d-flex gap-4 mt-2">
                    <label className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="Active"
                        checked={formData.status === "Active"}
                        onChange={handleChange}
                      />
                      Active
                    </label>

                    <label className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={formData.status === "Inactive"}
                        onChange={handleChange}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-buttons">
              <button className="btn-submit" onClick={handleSubmit}>
                {editingId ? "Update" : "Create"}
              </button>

              <button
                className="btn-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}

      {showDetailsModal && selectedRow && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal-card">
            <button
              className="custom-close"
              onClick={() => {
                if (openedRowRef.current) {
                  const tr = $(openedRowRef.current.node());

                  tr.find("td.dtr-control").trigger("click");

                  openedRowRef.current = null;
                }

                setShowDetailsModal(false);
              }}
            >
              ×
            </button>

            <h5 className="modal-title">Details of {selectedRow.name}</h5>

            <hr className="modal-divider" />

            <table className="table table-sm">
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>{selectedRow.name}</td>
                </tr>

                <tr>
                  <td>Description</td>
                  <td>{selectedRow.description}</td>
                </tr>

                <tr>
                  <td>IATA Code</td>
                  <td>{selectedRow.iataCode}</td>
                </tr>

                <tr>
                  <td>Nature</td>
                  <td>{selectedRow.nature}</td>
                </tr>

                <tr>
                  <td>Status</td>
                  <td>{selectedRow.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
export default Commodities;
