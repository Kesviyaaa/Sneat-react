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

const Regions = () => {
  const portData = {
    Asia: {
      India: [
        "Chennai Port",
        "Jawaharlal Nehru Port (Nhava Sheva)",
        "Mundra Port",
        "Kandla Port",
      ],

      China: [
        "Port of Shanghai",
        "Port of Shenzhen",
        "Port of Ningbo-Zhoushan",
        "Port of Guangzhou",
      ],

      Singapore: ["Port of Singapore"],

      Malaysia: ["Port Klang", "Tanjung Pelepas Port"],
    },

    Europe: {
      Netherlands: ["Port of Rotterdam"],

      Germany: ["Port of Hamburg"],

      Belgium: ["Port of Antwerp"],

      Spain: ["Port of Valencia"],
    },

    "Middle East": {
      "United Arab Emirates": ["Jebel Ali Port", "Port Rashid"],

      SaudiArabia: ["King Abdulaziz Port", "Jeddah Islamic Port"],

      Qatar: ["Hamad Port"],
    },

    "North America": {
      USA: [
        "Port of Los Angeles",
        "Port of Long Beach",
        "Port of New York and New Jersey",
      ],

      Canada: ["Port of Vancouver", "Port of Montreal"],
    },
  };

  const responsiveTableRef = useRef(null);
  const responsiveDt = useRef(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");


  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const regions = Object.keys(portData);

  const countries = selectedRegion ? Object.keys(portData[selectedRegion]) : [];

  const ports =
    selectedRegion && selectedCountry
      ? portData[selectedRegion][selectedCountry]
      : [];

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

  const [formData, setFormData] = useState({
    portRegion: "",
    portName: "",
    country: "",
    addAllPorts: false,
    status: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.portRegion.trim()) {
      newErrors.portRegion = "Port Region is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (!formData.portName.trim()) {
      newErrors.portName = "Port Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const newRegion = {
      portRegion: formData.portRegion,
      portName: formData.portName,
      country: formData.country,
      addAllPorts: formData.addAllPorts,
      status: formData.status,
      createdOn: new Date(),
    };

    

    try {
      const url = editingId
        ? `http://localhost:5000/regions/${editingId}`
        : "http://localhost:5000/regions";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRegion),
      });

      const result = await response.json();

      console.log(result);

      if (responsiveDt.current) {
        responsiveDt.current.ajax.reload(null, false);
      }

      setShowAddModal(false);
      setEditingId(null);

      setFormData({
        portRegion: "",
        portName: "",
        country: "",
        addAllPorts: false,
        status: false,
      });
    } catch (error) {
      console.error("Submit Error:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      await fetch(`http://localhost:5000/regions/${deleteId}`, {
        method: "DELETE",
      });
  
      responsiveDt.current.ajax.reload(null, false);
  
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!responsiveTableRef.current) return;
    if (responsiveDt.current) return;

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
          },
          button: {
            className: ""
          }
        },
      
        buttons: [
          {
            extend: "collection",
            text: '<i class="bx bx-export"></i> Export',
            className: "export-btn rounded",
            autoClose: true,
            dropIcon: false,
      
            buttons: [
              {
                extend: "print",
                text: '<i class="bx bx-printer"></i> Print',
                exportOptions: {
                  columns: ":visible:not(.control):not(.no-export)"
                }
              },
              {
                extend: "copy",
                text: '<i class="bx bx-copy"></i> Copy',
                exportOptions: {
                  columns: ":visible:not(.control):not(.no-export)"
                }
              },
              {
                extend: "excel",
                text: '<i class="bx bx-spreadsheet"></i> Excel',
                exportOptions: {
                  columns: ":visible:not(.control):not(.no-export)"
                }
              },
              {
                extend: "pdf",
                text: '<i class="bx bx-file"></i> PDF',
                exportOptions: {
                  columns: ":visible:not(.control):not(.no-export)"
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
        url: "http://localhost:5000/regions",
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

        { data: "portRegion" },
        { data: "portName" },
        { data: "country" },

        {
          data: "status",
          render: function (data) {
            if (data) {
              return `<span class="badge bg-success">Active</span>`;
            } else {
              return `<span class="badge bg-danger">Inactive</span>`;
            }
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

  setSelectedRegion(rowData.portRegion);
  setSelectedCountry(rowData.country);

  setFormData({
    portRegion: rowData.portRegion,
    portName: rowData.portName,
    country: rowData.country,
    addAllPorts: rowData.addAllPorts || false,
    status: rowData.status,
  });

  setEditingId(rowData._id);
  setShowAddModal(true);
});
  }, []);

  return (
    <div className="container-xxl flex-grow-1">
  
      <div className="card">
            
        <div className="datatable-toolbar d-flex justify-content-between align-items-start">

          <div className="title-section">
            <h5 className="table-title">Region Details</h5>
            <div className="breadcrumb-text">Global Masters &gt; Regions</div>
          </div>
  
          <button
            className="btn-add-record"
            onClick={() => setShowAddModal(true)}
          >
            <i className="bx bx-plus"></i> Create Region
          </button>
        </div>
  
        <div className="card-datatable p-3">
          <table
            ref={responsiveTableRef}
            className="table dataTable dtr-inline"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Port Region</th>
                <th>Port Name</th>
                <th>Country</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Remove</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

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
              {editingId ? "Edit Region" : "Create Region"}
            </h5>

            <hr className="modal-divider" />

            {/* Port Region */}

            <div className="form-group">
              <label className="form-label">Port Region *</label>

              <div className="input-icon position-relative">
                <i className="bx bx-map input-icon-left"></i>

                <select
                  name="portRegion"
                  className="form-field"
                  value={selectedRegion}
                  onChange={(e) => {
                    const value = e.target.value;

                    setSelectedRegion(value);
                    setSelectedCountry("");

                    setFormData({
                      ...formData,
                      portRegion: value,
                      country: "",
                      portName: "",
                    });
                  }}
                >
                  <option value="">Select Region</option>

                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              {errors.portRegion && (
                <small className="text-danger">{errors.portRegion}</small>
              )}
            </div>

            {/* Country */}

            <div className="form-group">
              <label className="form-label">Country *</label>

              <div className="input-icon position-relative">
                <i className="bx bx-globe input-icon-left"></i>

                <select
                  name="country"
                  className="form-field"
                  value={selectedCountry}
                  onChange={(e) => {
                    const value = e.target.value;

                    setSelectedCountry(value);

                    setFormData({
                      ...formData,
                      country: value,
                      portName: "",
                    });
                  }}
                >
                  <option value="">Select Country</option>

                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {errors.country && (
                <small className="text-danger">{errors.country}</small>
              )}
            </div>

            {/* Port Name */}

            <div className="form-group">
              <label className="form-label">Port *</label>

              <div className="input-icon position-relative">
                <i className="bx bx-anchor input-icon-left"></i>

                <select
                  name="portName"
                  className="form-field"
                  value={formData.portName}
                  onChange={handleChange}
                >
                  <option value="">Select Port</option>

                  {ports.map((port) => (
                    <option key={port} value={port}>
                      {port}
                    </option>
                  ))}
                </select>
              </div>

              {errors.portName && (
                <small className="text-danger">{errors.portName}</small>
              )}
            </div>

            {/* Add All Ports Checkbox */}

            <div className="form-group">
              <label className="form-label">Add All Port in This Country</label>

              <div className="d-flex align-items-center mt-1">
                <input
                  type="checkbox"
                  name="addAllPorts"
                  checked={formData.addAllPorts}
                  onChange={handleChange}
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />

                <span>Add All Ports</span>
              </div>
            </div>

            {/* Active */}

            <div className="form-group">
              <label className="form-label">Active</label>

              <div className="d-flex align-items-center mt-1">
                <input
                  type="checkbox"
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                  style={{
                    width: "16px",
                    height: "16px",
                    marginRight: "8px",
                    cursor: "pointer",
                  }}
                />

                <span>Active</span>
              </div>
            </div>

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
                  setSelectedRegion("");
setSelectedCountry("");

setFormData({
  portRegion: "",
  portName: "",
  country: "",
  addAllPorts: false,
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
        Are you sure you want to delete this Region?
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

export default Regions;
