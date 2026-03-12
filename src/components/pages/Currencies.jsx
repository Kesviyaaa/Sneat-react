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

const Currencies = () => {
    const tableRef = useRef(null);
    const dt = useRef(null);
    const openedRowRef = useRef(null);
  
    const [showModal, setShowModal] = useState(false);

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
  
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const [formData, setFormData] = useState({
      currencyName: "",
      currencyCode: "",
      majorUnit: "",
      minorUnit: "",
      scale: "",
      symbol: "",
      roundTo: "",
      minimum: "",
    });
  
    const [editingId, setEditingId] = useState(null);
  
    const [errors, setErrors] = useState({});
  
    const validateForm = () => {
      let newErrors = {};
  
      if (!formData.currencyName.trim()) {
        newErrors.currencyName = "Currency Name is required";
      }
  
      if (!formData.currencyCode.trim()) {
        newErrors.currencyCode = "Currency Code is required";
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
      
          let url = "http://localhost:5000/currencies";
          let method = "POST";
      
          if (editingId) {
            url = `http://localhost:5000/currencies/${editingId}`;
            method = "PUT";
          }
      
          await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
      
          dt.current.ajax.reload(null, false);
      
          setShowModal(false);
          setEditingId(null);
      
          setFormData({
            currencyName: "",
            currencyCode: "",
            majorUnit: "",
            minorUnit: "",
            scale: "",
            symbol: "",
            roundTo: "",
            minimum: "",
          });
      
          setErrors({});
      
        } catch (error) {
          console.error(error);
        }
      
      };
  
    /* ===== DATATABLE ===== */
  
    useEffect(() => {
      if (dt.current) return;
  
      dt.current = $(tableRef.current).DataTable({
        dom:
          "<'row align-items-center px-3 mb-3'<'col-md-6'B><'col-md-6 d-flex justify-content-end gap-3'l f>>" +
          "t" +
          "<'d-flex justify-content-between align-items-center px-3 pb-3' i p>",
  
        language: { lengthMenu: "Show _MENU_ Entries" },
  
        buttons: [
          {
            extend: "copy",
            className: "btn btn-primary",
            exportOptions: {
              columns: ":visible:not(:nth-last-child(-n+2))",
            },
          },
          {
            extend: "excel",
            className: "btn btn-primary",
            exportOptions: {
              columns: ":visible:not(:nth-last-child(-n+2))",
            },
          },
          {
            extend: "pdf",
            className: "btn btn-primary",
            exportOptions: {
              columns: ":visible:not(:nth-last-child(-n+2))",
            },
          },
          {
            extend: "colvis",
            text: "Customise Columns",
            className: "btn btn-primary",
            columns: ":not(:nth-last-child(-n+2))",
          },
        ],
  
        responsive: true,
  
        ajax: {
          url: "http://localhost:5000/currencies",
          dataSrc: "data",
        },
  
        columns: [
          { data: "currencyName", responsivePriority: 1 },
          { data: "currencyCode", responsivePriority: 2 },
          { data: "majorUnit", responsivePriority: 3 },
          { data: "minorUnit", responsivePriority: 4 },
          { data: "scale", responsivePriority: 5 },
        
          { data: "symbol", responsivePriority: 100 },
          { data: "roundTo", responsivePriority: 100 },
          { data: "minimum", responsivePriority: 100 },
        
          {
            data: null,
            responsivePriority: 1,
            orderable: false,
            render: function (data) {
              return `<i class="bx bx-edit edit-icon" data-id="${data._id}" style="cursor:pointer;"></i>`;
            },
          },
        
          {
            data: null,
            responsivePriority: 1,
            orderable: false,
            render: function (data) {
              return `<i class="bx bx-trash delete-icon" data-id="${data._id}" style="cursor:pointer;"></i>`;
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
          currencyName: rowData.currencyName,
          currencyCode: rowData.currencyCode,
          majorUnit: rowData.majorUnit,
          minorUnit: rowData.minorUnit,
          scale: rowData.scale,
          symbol: rowData.symbol,
          roundTo: rowData.roundTo,
          minimum: rowData.minimum,
        });
      
        setShowModal(true);
      
      });
  
      /* DELETE */
  
      $(tableRef.current).on("click", ".delete-icon", function () {

        const id = $(this).data("id");
      
        setDeleteId(id);
        setShowDeleteModal(true);
      
      });

      $(tableRef.current).on("click", "td.dtr-control", function () {

        let tr = $(this).closest("tr");
      
        if (tr.hasClass("child")) {
          tr = tr.prev();
        }
      
        // If row is already expanded, do nothing
        if (tr.hasClass("parent")) return;
      
        const row = dt.current.row(tr);
        const rowData = row.data();
      
        if (!rowData) return;
      
        openedRowRef.current = row;
      
        setSelectedRow(rowData);
        setShowDetailsModal(true);
      
      });
  
    }, []);

    const confirmDelete = async () => {

      try {
    
        await fetch(`http://localhost:5000/currencies/${deleteId}`, {
          method: "DELETE",
        });
    
        dt.current.ajax.reload(null, false);
    
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
            <h5 className="table-title">Currency Details</h5>
            <div className="breadcrumb-text">Global Masters &gt; Currencies</div>
          </div>

          <button
            className="btn-add-record"
            onClick={() => setShowModal(true)}
          >
            <i className="bx bx-plus"></i> Create Currency
          </button>

        </div>

        <div className="card-datatable table-responsive p-3">

          <table
            ref={tableRef}
            className="table dataTable dtr-inline"
            style={{ width: "100%" }}
          >

<thead>
  <tr>
    <th>Currency Name</th>
    <th>Currency Code</th>
    <th>Major Unit</th>
    <th>Minor Unit</th>
    <th>Scale</th>
    <th>Symbol</th>
    <th>Round To</th>
    <th>Minimum</th>
    <th>Edit</th>
    <th>Remove</th>
  </tr>
</thead>

          </table>

        </div>

      </div>

      {/* MODAL */}

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
                {editingId ? "Edit Currency" : "Create Currency"}
            </h5>

            <hr className="modal-divider"/>

            <div className="row">

              {/* Currency Name */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Currency Name *</label>

                  <div className="input-icon">

                    <i className="bx bx-money"></i>

                    <input
                      type="text"
                      name="currencyName"
                      className="form-field"
                      placeholder="Enter Currency Name"
                      value={formData.currencyName}
                      onChange={handleChange}
                    />

                  </div>
                  {errors.currencyName && (
  <small className="text-danger">{errors.currencyName}</small>
)}
                </div>
              </div>

              {/* Currency Code */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Currency Code *</label>

                  <div className="input-icon">

                    <i className="bx bx-barcode"></i>

                    <input
                      type="text"
                      name="currencyCode"
                      className="form-field"
                      placeholder="Enter Currency Code"
                      value={formData.currencyCode}
                      onChange={handleChange}
                    />


                  </div>
                  {errors.currencyCode && (
  <small className="text-danger">{errors.currencyCode}</small>
)}
                </div>
              </div>

              {/* Major Unit */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Major Unit</label>

                  <div className="input-icon">

                    <i className="bx bx-coin"></i>

                    <input
                      type="text"
                      name="majorUnit"
                      className="form-field"
                      placeholder="Eg: Rupee"
                      value={formData.majorUnit}
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>

              {/* Minor Unit */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Minor Unit</label>

                  <div className="input-icon">

                    <i className="bx bx-coin-stack"></i>

                    <input
                      type="text"
                      name="minorUnit"
                      className="form-field"
                      placeholder="Eg: Paise"
                      value={formData.minorUnit}
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>

              {/* Scale */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Scale</label>

                  <div className="input-icon">

                    <i className="bx bx-calculator"></i>

                    <input
                      type="number"
                      name="scale"
                      className="form-field"
                      placeholder="Enter Scale"
                      value={formData.scale}
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>

              {/* Symbol */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Symbol</label>

                  <div className="input-icon">

                    <i className="bx bx-dollar"></i>

                    <input
                      type="text"
                      name="symbol"
                      className="form-field"
                      placeholder="Enter Symbol"
                      value={formData.symbol}
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>

              {/* Round To */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Round To</label>

                  <div className="input-icon">

                    <i className="bx bx-reset"></i>

                    <input
                      type="number"
                      name="roundTo"
                      className="form-field"
                      placeholder="Enter RoundTo"
                      value={formData.roundTo}
                      onChange={handleChange}
                    />

                  </div>
                </div>
              </div>

              {/* Minimum */}

              <div className="col-md-6">
                <div className="form-group">

                  <label>Minimum</label>

                  <div className="input-icon">

                    <i className="bx bx-trending-down"></i>

                    <input
                      type="number"
                      name="minimum"
                      className="form-field"
                      placeholder="Enter Minimum"
                      value={formData.minimum}
                      onChange={handleChange}
                    />

                  </div>
                </div>
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
                onClick={() => setShowModal(false)}
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
      Details of {selectedRow.currencyName}
    </h5>

    <hr className="modal-divider"/>

    <table className="table table-sm">

      <tbody>

        <tr>
          <td>Currency Name</td>
          <td>{selectedRow.currencyName}</td>
        </tr>

        <tr>
          <td>Currency Code</td>
          <td>{selectedRow.currencyCode}</td>
        </tr>

        <tr>
          <td>Major Unit</td>
          <td>{selectedRow.majorUnit}</td>
        </tr>

        <tr>
          <td>Minor Unit</td>
          <td>{selectedRow.minorUnit}</td>
        </tr>

        <tr>
          <td>Scale</td>
          <td>{selectedRow.scale}</td>
        </tr>

        <tr>
          <td>Symbol</td>
          <td>{selectedRow.symbol}</td>
        </tr>

        <tr>
          <td>Round To</td>
          <td>{selectedRow.roundTo}</td>
        </tr>

        <tr>
          <td>Minimum</td>
          <td>{selectedRow.minimum}</td>
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
        Are you sure you want to delete this Currency?
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

export default Currencies;