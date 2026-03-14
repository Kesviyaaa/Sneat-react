import {
    regions,
    timeZones,
    currencies,
    languages,
    isdCodes,
  } from "../../data/countryDropdownData";
  
  import React, { useEffect, useRef, useState } from "react";
  import $ from "jquery";
  
  import "datatables.net-bs5";
  import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";
  import "datatables.net-responsive";
  import "datatables.net-responsive-bs5";
  import "datatables.net-responsive-bs5/css/responsive.bootstrap5.min.css";
  
  import "datatables.net-buttons";
  import "datatables.net-buttons/js/buttons.html5";
  import "datatables.net-buttons/js/buttons.print";
  import "datatables.net-buttons/js/buttons.colVis";
  
  import JSZip from "jszip";
  import pdfMake from "pdfmake/build/pdfmake";
  import pdfFonts from "pdfmake/build/vfs_fonts";
  
  window.JSZip = JSZip;
  pdfMake.vfs = pdfFonts.vfs;
  
  import "../../App.css";
  
  const Countries = () => {
    const responsiveTableRef = useRef(null);
    const responsiveDt = useRef(null);
    const openedRowRef = useRef(null);
  
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  
    const [formData, setFormData] = useState({
      countryName: "",
      countryCode: "",
      region: "",
      timeZone: "",
      isdCode: "",
      currency: "",
      language: "",
      status: false,
    });
  
    const [errors, setErrors] = useState({});
  
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
  
    /* ---------------- HANDLE CHANGE ---------------- */
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
  
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
  
      /* clear error when user fixes input */
  
      setErrors({
        ...errors,
        [name]: "",
      });
    };
  
    /* ---------------- VALIDATION ---------------- */
  
    const validateForm = () => {
      let newErrors = {};
  
      if (!formData.countryName.trim()) {
        newErrors.countryName = "Country Name is required";
      }
  
      if (!formData.countryCode.trim()) {
        newErrors.countryCode = "Country Code is required";
      }
  
      if (!formData.region.trim()) {
        newErrors.region = "Region is required";
      }
  
      if (!formData.isdCode.trim()) {
        newErrors.isdCode = "ISD Code is required";
      }
  
      if (!formData.currency.trim()) {
        newErrors.currency = "Currency is required";
      }
  
      setErrors(newErrors);
  
      return Object.keys(newErrors).length === 0;
    };
  
    /* ---------------- SUBMIT ---------------- */
    const confirmDelete = async () => {
      try {
        await fetch(`http://localhost:5000/countries/${deleteId}`, {
          method: "DELETE",
        });
    
        responsiveDt.current.ajax.reload(null, false);
    
        setShowDeleteModal(false);
        setDeleteId(null);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSubmit = async () => {
      if (!validateForm()) return;
  
      const newCountry = {
        countryName: formData.countryName,
        countryCode: formData.countryCode,
        region: formData.region,
        timeZone: formData.timeZone,
        isdCode: formData.isdCode,
        currency: formData.currency,
        language: formData.language,
        status: formData.status,
        createdOn: new Date(),
      };
  
      try {
        const url = editingId
          ? `http://localhost:5000/countries/${editingId}`
          : "http://localhost:5000/countries";
  
        const method = editingId ? "PUT" : "POST";
  
        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCountry),
        });
  
        await response.json();
  
        if (responsiveDt.current) {
          responsiveDt.current.ajax.reload(null, false);
        }
  
        setShowAddModal(false);
        setEditingId(null);
  
        setFormData({
          countryName: "",
          countryCode: "",
          region: "",
          timeZone: "",
          isdCode: "",
          currency: "",
          language: "",
          status: false,
        });
  
        setErrors({});
      } catch (error) {
        console.error("Submit Error:", error);
      }
    };
  
    /* ---------------- DATATABLE ---------------- */
  
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
                  columns: ":visible:not(.no-export)",
                },
              },
              {
                extend: "copy",
                text: '<i class="bx bx-copy"></i> Copy',
                exportOptions: {
                  columns: ":visible:not(.no-export)",
                },
              },
              {
                extend: "excel",
                text: '<i class="bx bx-spreadsheet"></i> Excel',
                exportOptions: {
                  columns: ":visible:not(.no-export)",
                },
              },
              {
                extend: "pdf",
                text: '<i class="bx bx-file"></i> PDF',
                exportOptions: {
                  columns: ":visible:not(.no-export)",
                },
              }
            ],
          },
        
          {
            extend: "colvis",
            text: '<i class="bx bx-columns"></i> Customise Columns',
            className: "custom-colvis",
            columns: ":not(.no-export)",
            dropIcon: false
          },
        ],
  
        responsive: true,
  
        ajax: {
          url: "http://localhost:5000/countries",
          dataSrc: "data",
        },
  
        columns: [
          { data: "countryName", responsivePriority: 1 },
          { data: "countryCode", responsivePriority: 2 },
          { data: "region", responsivePriority: 3 },
          { data: "timeZone", responsivePriority: 4 },
          { data: "isdCode", responsivePriority: 5 },
        
          { data: "currency", responsivePriority: 100 },
          { data: "language", responsivePriority: 100 },
        
          {
            data: null,
            className: "no-export",
            responsivePriority: 1,
            render: function (data) {
              return `<i class="bx bx-edit edit-icon" data-id="${data._id}"></i>`;
            },
          },
        
          {
            data: null,
            className: "no-export",
            responsivePriority: 1,
            render: function (data) {
              return `<i class="bx bx-trash delete-icon" data-id="${data._id}"></i>`;
            },
          },
        ],
  
        order: [[1, "asc"]],
      });

      setTimeout(() => {
        $(".dt-button").removeClass("btn btn-secondary");
      }, 0);

      responsiveDt.current.on("responsive-display", function (e, datatable, row, showHide) {

        if (showHide) {
      
          openedRowRef.current = row;
      
          const rowData = row.data();
      
          setSelectedRow(rowData);
          setShowDetailsModal(true);
      
        }
      
      });
  
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
        const rowData = responsiveDt.current.row($(this).parents("tr")).data();
  
        setFormData({
          countryName: rowData.countryName,
          countryCode: rowData.countryCode,
          region: rowData.region,
          timeZone: rowData.timeZone,
          isdCode: rowData.isdCode,
          currency: rowData.currency,
          language: rowData.language,
          status: rowData.status,
        });
  
        setEditingId(rowData._id);
        setShowAddModal(true);
      });

      $(responsiveTableRef.current).on("click", "tbody tr td:first-child", function () {

        const tr = $(this).closest("tr");
        const row = responsiveDt.current.row(tr);
        const rowData = row.data();
      
        if (!rowData) return;
      
        setSelectedRow(rowData);
        setShowDetailsModal(true);
      
      });
    }, []);
  
    return (
      <div className="container-xxl flex-grow-1 ">
  
      <div className="card">
            
        <div className="datatable-toolbar d-flex justify-content-between align-items-start">

          <div className="title-section">
            <h5 className="table-title">Country Details</h5>
            <div className="breadcrumb-text">Global Masters &gt; Countries</div>
          </div>
    
            <button
              className="btn-add-record"
              onClick={() => setShowAddModal(true)}
            >
              <i className="bx bx-plus"></i> Create Country
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
                  <th>Country Name</th>
                  <th>Country Code</th>
                  <th>Region</th>
                  <th>Time Zone</th>
                  <th>ISD Code</th>
                  <th>Currency</th>
                  <th>Language</th>
                  <th>Edit</th>
                  <th>Remove</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
  
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
                {editingId ? "Edit Country" : "Create Country"}
              </h5>
  
              <hr className="modal-divider" />
  
              {/* Form Grid */}
              <div className="row g-3">
                {/* Country Name */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Country Name *</label>
  
                    <div className="input-icon position-relative">
                      <i className="bx bx-globe input-icon-left"></i>
  
                      <input
                        type="text"
                        name="countryName"
                        className="form-field"
                        placeholder="Enter Country Name"
                        value={formData.countryName}
                        onChange={handleChange}
                      />
                    </div>
  
                    {errors.countryName && (
                      <small className="text-danger">{errors.countryName}</small>
                    )}
                  </div>
                </div>
  
                {/* Country Code */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Country Code *</label>
  
                    <div className="input-icon position-relative">
                      <i className="bx bx-barcode input-icon-left"></i>
  
                      <input
                        type="text"
                        name="countryCode"
                        className="form-field"
                        placeholder="Enter Code"
                        value={formData.countryCode}
                        onChange={handleChange}
                      />
                    </div>
  
                    {errors.countryCode && (
                      <small className="text-danger">{errors.countryCode}</small>
                    )}
                  </div>
                </div>
  
                {/* Region */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Region *</label>
  
                    <div className="input-icon position-relative">
                      <i className="bx bx-map input-icon-left"></i>
  
                      <select
                        name="region"
                        className="form-field"
                        value={formData.region}
                        onChange={handleChange}
                      >
                        <option value="">Select Region</option>
  
                        {regions.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </div>
  
                    {errors.region && (
                      <small className="text-danger">{errors.region}</small>
                    )}
                  </div>
                </div>
  
                {/* Time Zone */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Time Zone</label>
  
                    <div className="input-icon position-relative">
                      <i className="bx bx-time input-icon-left"></i>
  
                      <select
                        name="timeZone"
                        className="form-field"
                        value={formData.timeZone}
                        onChange={handleChange}
                      >
                        <option value="">Select Time Zone</option>
  
                        {timeZones.map((t) => (
                          <option key={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
  
                {/* ISD Code */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">ISD Code *</label>
  
                    <div className="input-icon position-relative">
                      <i className="bx bx-phone input-icon-left"></i>
  
                      <select
                        name="isdCode"
                        className="form-field"
                        value={formData.isdCode}
                        onChange={handleChange}
                      >
                        <option value="">Select ISD Code</option>
  
                        {isdCodes.map((i) => (
                          <option key={i}>{i}</option>
                        ))}
                      </select>
                    </div>
  
                    {errors.isdCode && (
                      <small className="text-danger">{errors.isdCode}</small>
                    )}
                  </div>
                </div>
  
                {/* Currency */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Currency *</label>
  
                    <div className="input-icon position-relative">
                      <i className="bx bx-money input-icon-left"></i>
  
                      <select
                        name="currency"
                        className="form-field"
                        value={formData.currency}
                        onChange={handleChange}
                      >
                        <option value="">Select Currency</option>
  
                        {currencies.map((c) => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
  
                    {errors.currency && (
                      <small className="text-danger">{errors.currency}</small>
                    )}
                  </div>
                </div>
  
                {/* Language */}
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="form-label">Language</label>
  
                    <div className="input-icon position-relative">
                      <i className="bx bx-chat input-icon-left"></i>
  
                      <select
                        name="language"
                        className="form-field"
                        value={formData.language}
                        onChange={handleChange}
                      >
                        <option value="">Select Language</option>
  
                        {languages.map((l) => (
                          <option key={l}>{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
  
                {/* Active */}
              </div>
              {/* Buttons */}
              <div className="modal-buttons">
              <button
                className={editingId ? "btn-update" : "btn-submit"}
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
                      countryName: "",
                      countryCode: "",
                      region: "",
                      timeZone: "",
                      isdCode: "",
                      currency: "",
                      language: "",
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
        {showDetailsModal && selectedRow && (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-card">

    <button
        className="custom-close"
        onClick={() => {

          if (openedRowRef.current) {
        
            const tr = $(openedRowRef.current.node());
        
            // collapse responsive row FIRST
            tr.find("td.dtr-control").trigger("click");
        
            openedRowRef.current = null;
          }
        
          // THEN close modal
          setShowDetailsModal(false);
        
        }}
      >
        ×
      </button>

      <h5 className="modal-title">
        Details of {selectedRow.countryName}
      </h5>

      <hr className="modal-divider" />

      <table className="table table-sm">
        <tbody>
          <tr>
            <td>Country Name:</td>
            <td>{selectedRow.countryName}</td>
          </tr>

          <tr>
            <td>Country Code:</td>
            <td>{selectedRow.countryCode}</td>
          </tr>

          <tr>
            <td>Region:</td>
            <td>{selectedRow.region}</td>
          </tr>

          <tr>
            <td>Time Zone:</td>
            <td>{selectedRow.timeZone}</td>
          </tr>

          <tr>
            <td>ISD Code:</td>
            <td>{selectedRow.isdCode}</td>
          </tr>

          <tr>
            <td>Currency:</td>
            <td>{selectedRow.currency}</td>
          </tr>

          <tr>
            <td>Language:</td>
            <td>{selectedRow.language}</td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
)}

{showDeleteModal && (
  <div className="custom-modal-backdrop">
    <div className="custom-modal-card">
      <h5 className="modal-title">Confirm Delete</h5>

      <p style={{ marginTop: "10px" }}>
        Are you sure you want to delete this Country?
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
  
  export default Countries;
  