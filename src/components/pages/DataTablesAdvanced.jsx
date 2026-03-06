import React, { useEffect, useRef } from "react";
import $ from "jquery";

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



  useEffect(() => {
    const sidebar = document.querySelector("#layout-menu");
  
    if (showModal) {
      document.body.style.overflow = "hidden";
  
      if (sidebar) {
        sidebar.style.pointerEvents = "none";
        sidebar.style.opacity = "0.6";
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
  }, [showModal]);


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
    if (showModal) {
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      document.body.style.overflow = "auto"; // allow scroll again
    }
  
    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  useEffect(() => {
    if (!responsiveTableRef.current) return;
    if (responsiveDt.current) return;
  
    // 🔥 1. DataTable init
    responsiveDt.current = $(responsiveTableRef.current).DataTable({
      processing: true,
  
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
        { data: "city" },
        { data: "date_joined" },
        { data: "salary" },
        { data: null, defaultContent: "28" },
        { data: null, defaultContent: "3 Years" },
        { data: null, defaultContent: "Active" },
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
  
    // cleanup
    return () => {
      if (responsiveDt.current) {
        responsiveDt.current.destroy(true);
        responsiveDt.current = null;
      }
  
      // 🔥 remove event listener (VERY IMPORTANT)
      $(responsiveTableRef.current).off("click", "td.control");
    };
  }, []);

  return (
    <div>
      
  
        {/* ===== YOUR CARD + TABLE ===== */}
        <div className="card">
          
  
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
  
        {/* ✅ still inside container */}
      </div>

  );
};

export default DataTablesAdvanced;