import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";

import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-responsive";
import "datatables.net-responsive-bs5";
import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";

import "datatables.net-buttons";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.print";
import "datatables.net-buttons/js/buttons.html5";
import "datatables.net-buttons/js/buttons.colVis";

import JSZip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

window.JSZip = JSZip;
pdfMake.vfs = pdfFonts.vfs;

import "../../App.css";

const Ports = () => {
  const responsiveTableRef = useRef(null);
  const responsiveDt = useRef(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    portName: "",
    portCode: "",
    country: "",
    state: "",
    timeZone: "",
    tradeLane: "",
    iata: "",
    unece: "",
    coordinates: "",
    schedK: "",
    schedDAirport: "",
    schedDSeaport: "",
    portFunction: [],
    status: true,
  });

  const [errors, setErrors] = useState({});

  /* ===== Modal Scroll Lock ===== */

  useEffect(() => {
    if (showAddModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showAddModal]);

  /* ===== HANDLE CHANGE ===== */

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

  /* ===== HANDLE PORT FUNCTION CHECKBOX ===== */

  const handlePortFunction = (e) => {
    const { value, checked } = e.target;

    let updated = [...formData.portFunction];

    if (checked) {
      updated.push(value);
    } else {
      updated = updated.filter((item) => item !== value);
    }

    setFormData({
      ...formData,
      portFunction: updated,
    });
  };

  /* ===== VALIDATION ===== */

  const validateForm = () => {
    let newErrors = {};

    if (!formData.portName.trim()) {
      newErrors.portName = "Port Name is required";
    }

    if (!formData.portCode.trim()) {
      newErrors.portCode = "Port Code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.timeZone.trim()) {
      newErrors.timeZone = "Time Zone is required";
    }

    if (!formData.unece.trim()) {
      newErrors.unece = "UNECE Code is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* ===== SUBMIT ===== */

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newPort = {
      ...formData,
      createdOn: new Date(),
    };

    try {
      const url = editingId
        ? `http://localhost:5000/ports/${editingId}`
        : "http://localhost:5000/ports";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPort),
      });

      await response.json();

      if (responsiveDt.current) {
        responsiveDt.current.ajax.reload(null, false);
      }

      setShowAddModal(false);
      setEditingId(null);

      setFormData({
        portName: "",
        portCode: "",
        country: "",
        state: "",
        timeZone: "",
        tradeLane: "",
        iata: "",
        unece: "",
        coordinates: "",
        schedK: "",
        schedDAirport: "",
        schedDSeaport: "",
        portFunction: [],
        status: false,
      });

      setErrors({});
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  /* ===== DATATABLE ===== */

  useEffect(() => {
    if (!responsiveTableRef.current) return;
    if (responsiveDt.current) return;
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

      language: { lengthMenu: "Show _MENU_ Entries" },

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
            columns: ":not(.no-export)",
            className: "custom-colvis",
            dropIcon: false,
            autoClose: false
          }
        ]
      },

      responsive: {
        details: {
          type: "column",
          target: 0
        }
      },

      ajax: {
        url: "http://localhost:5000/ports",
        dataSrc: "data",
      },

      columns: [
        { data: "portName" },
        { data: "portCode" },
        { data: "unece" },
        { data: "iata" },
        { data: "country" },
        { data: "timeZone" },

        {
          data: "status",
          render: function (data) {
            return data
              ? `<span class="status-badge">Active</span>`
              : `<span class="status-badge" style="background:#ffe0e0;color:#ff3e1d;">Inactive</span>`;
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

      order: [[0, "asc"]],
    });

    /* DELETE */

    /* DELETE */

/* DELETE */

    $(responsiveTableRef.current).on(
      "click",
      ".delete-icon",
      function () {
        const id = $(this).data("id");
        setDeleteId(id);
        setShowDeleteModal(true);
      }
    );

    /* EDIT */

    $(responsiveTableRef.current).on("click", ".edit-icon", function () {
      let tr = $(this).closest("tr");

      if (tr.hasClass("child")) {
        tr = tr.prev();
      }

      const rowData = responsiveDt.current.row(tr).data();

      if (!rowData) return;

      setFormData(rowData);
      setEditingId(rowData._id);
      setShowAddModal(true);
    });
  }, []);

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/ports/${deleteId}`, {
        method: "DELETE",
      });
  
      responsiveDt.current.ajax.reload(null, false);
  
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  return (
    <div className="container-xxl flex-grow-1">
  
      <div className="card">
            
        <div className="datatable-toolbar d-flex justify-content-between align-items-start">

          <div className="title-section">
            <h5 className="table-title">Port Details</h5>
            <div className="breadcrumb-text">Global Masters &gt; Ports</div>
          </div>

          <button
            className="btn-add-record"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bx bx-plus"></i> Create Port
          </button>
        </div>

        <div className="card-datatable p-3">
          <table
            ref={responsiveTableRef}
            className="table dataTable dtr-inline"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <thead>
              <tr>
                <th>Port Name</th>
                <th>Port Code</th>
                <th>UNECE</th>
                <th>IATA</th>
                <th>Country</th>
                <th>Time Zone</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="custom-modal-backdrop">
          <div className="custom-modal-card port-modal">
            <button
              className="custom-close"
              onClick={() => setShowAddModal(false)}
            >
              ×
            </button>

            <h5 className="modal-title">
                {editingId ? "Edit Port" : "Create Port"}
            </h5>

            <hr className="modal-divider" />

            <div className="row">
              {/* LEFT SIDE FORM */}
              <div className="col-md-9">
                <div className="row g-3">
                  {/* Port Name */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Port Name *</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-anchor input-icon-left"></i>

                        <input
                          type="text"
                          name="portName"
                          className="form-field"
                          placeholder="Enter Port Name"
                          value={formData.portName}
                          onChange={handleChange}
                        />
                      </div>

                      {errors.portName && (
                        <small className="text-danger">{errors.portName}</small>
                      )}
                    </div>
                  </div>

                  {/* Port Code */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Port Code *</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-barcode input-icon-left"></i>

                        <input
                          type="text"
                          name="portCode"
                          className="form-field"
                          placeholder="Enter Port Code"
                          value={formData.portCode}
                          onChange={handleChange}
                        />
                      </div>

                      {errors.portCode && (
                        <small className="text-danger">{errors.portCode}</small>
                      )}
                    </div>
                  </div>

                  {/* Country */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Country *</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-globe input-icon-left"></i>

                        <input
                          type="text"
                          name="country"
                          className="form-field"
                          placeholder="Enter Country"
                          value={formData.country}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* State */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">State / Province</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-map input-icon-left"></i>

                        <input
                          type="text"
                          name="state"
                          className="form-field"
                          placeholder="Enter State"
                          value={formData.state}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Time Zone */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Time Zone *</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-time input-icon-left"></i>

                        <input
                          type="text"
                          name="timeZone"
                          className="form-field"
                          placeholder="Enter Time Zone"
                          value={formData.timeZone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trade Lane */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Trade Lane</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-transfer input-icon-left"></i>

                        <input
                          type="text"
                          name="tradeLane"
                          className="form-field"
                          placeholder="Enter Trade Lane"
                          value={formData.tradeLane}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* IATA */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">IATA</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-plane input-icon-left"></i>

                        <input
                          type="text"
                          name="iata"
                          className="form-field"
                          placeholder="Enter IATA Code"
                          value={formData.iata}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* UNECE */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">UNECE Code *</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-code input-icon-left"></i>

                        <input
                          type="text"
                          name="unece"
                          className="form-field"
                          placeholder="Enter UNECE Code"
                          value={formData.unece}
                          onChange={handleChange}
                        />
                      </div>

                      {errors.unece && (
                        <small className="text-danger">{errors.unece}</small>
                      )}
                    </div>
                  </div>

                  {/* Coordinates */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Coordinates</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-current-location input-icon-left"></i>

                        <input
                          type="text"
                          name="coordinates"
                          className="form-field"
                          placeholder="13.0827,80.2707"
                          value={formData.coordinates}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sched-K */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">Sched-K Code</label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-hash input-icon-left"></i>

                        <input
                          type="text"
                          name="schedK"
                          className="form-field"
                          placeholder="Enter Code"
                          value={formData.schedK}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Airport Code */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">
                        Sched-D Code (Airport)
                      </label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-plane-alt input-icon-left"></i>

                        <input
                          type="text"
                          name="schedDAirport"
                          className="form-field"
                          value={formData.schedDAirport}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seaport Code */}
                  <div className="col-md-4">
                    <div className="form-group">
                      <label className="form-label">
                        Sched-D Code (Seaport)
                      </label>

                      <div className="input-icon position-relative">
                        <i className="bx bx-ship input-icon-left"></i>

                        <input
                          type="text"
                          name="schedDSeaport"
                          className="form-field"
                          value={formData.schedDSeaport}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE PORT FUNCTION */}

              <div className="col-md-3">
                <label className="form-label fw-semibold mb-3">
                  Port Function
                </label>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Sea Port"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">Sea Port</label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Rail Terminal"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">Rail Terminal</label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Road Terminal"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">Road Terminal</label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Airport Terminal"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">Airport Terminal</label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Postal Exchange Offics"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">
                    Postal Exchange Office
                  </label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Multimodal (ICD)"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">Multimodal (ICD)</label>
                </div>

                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Fixed Transport (Oil Platform)"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">
                    Fixed Transport (Oil Platform)
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="Border Crossing"
                    onChange={handlePortFunction}
                  />
                  <label className="form-check-label">Border Crossing</label>
                </div>
              </div>
            </div>

            {/* Buttons */}

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
                    portName: "",
                    portCode: "",
                    country: "",
                    state: "",
                    timeZone: "",
                    tradeLane: "",
                    iata: "",
                    unece: "",
                    coordinates: "",
                    schedK: "",
                    schedDAirport: "",
                    schedDSeaport: "",
                    portFunction: [],
                    status: false,
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{showDeleteModal && (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-card">
      <h5 className="modal-title">Confirm Delete</h5>

      <p style={{ marginTop: "10px" }}>
        Are you sure you want to delete this Port?
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
    </div>
  );
};

export default Ports;
