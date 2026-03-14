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

const UnitMaster = () => {

const tableRef = useRef(null);
const dt = useRef(null);

const [showModal,setShowModal] = useState(false);

const [formData,setFormData] = useState({
    description:"",
    uneceCode:"",
    code:"",
    type:"",
    plural:"",
    decimals:"",
    conversionFactor:"",
    status:"Active"
    });

const [editingId,setEditingId] = useState(null);

const handleChange = (e)=>{
const {name,value}=e.target;

setFormData({
...formData,
[name]:value
});
};

const handleSubmit = async ()=>{

    let url="http://localhost:5000/units";
    let method="POST";
    
    if(editingId){
    url=`http://localhost:5000/units/${editingId}`;
    method="PUT";
    }
    
    const payload={
    ...formData,
    status:formData.status==="Active"
    };
    
    await fetch(url,{
    method:method,
    headers:{
    "Content-Type":"application/json"
    },
    body:JSON.stringify(payload)
    });
    
    dt.current.ajax.reload(null,false);
    
    setShowModal(false);
    setEditingId(null);
    
    setFormData({
    description:"",
    uneceCode:"",
    code:"",
    type:"",
    plural:"",
    decimals:"",
    conversionFactor:"",
    status:"Active"
    });
    };

useEffect(()=>{

if(dt.current) return;
$.fn.dataTable.Buttons.defaults.dom.button.className = "export-btn";


dt.current=$(tableRef.current).DataTable({

  dom:
  "<'row align-items-center px-3'<'col-md-6'B><'col-md-6 d-flex align-items-center justify-content-end gap-3'lf>>" +
  "t" +
  "<'d-flex justify-content-between align-items-center px-3 pb-3'ip>",

      scrollY: "350px",
      scrollCollapse: true,
      scrollX: false,
      paging: true,

language:{lengthMenu:"Show _MENU_ Entries"},

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
      className: "custom-colvis",
      columns: ":not(.no-export)",
      dropIcon: false,
      autoClose: false
    }

  ]
},

responsive:true,

ajax:{
    url:"http://localhost:5000/units",
dataSrc:"data"
},

columns:[

{data:"description",responsivePriority:1},

{data:"code",responsivePriority:2},

{data:"uneceCode",responsivePriority:3},

{data:"type",responsivePriority:4},

{
  data:null,
  orderable:false,
  className:"no-export",
  render:function(data){
  return `
  <i class="bx bx-edit edit-icon me-2" data-id="${data._id}" style="cursor:pointer;"></i>
  `;
  }
  },
  
  {
  data:null,
  orderable:false,
  className:"no-export",
  render:function(data){
  return `
  <i class="bx bx-trash delete-icon" data-id="${data._id}" style="cursor:pointer;"></i>
  `;
  }
  }

],

order:[[0,"asc"]]

});

$(tableRef.current).on("click",".edit-icon",function(){

let tr=$(this).closest("tr");

if(tr.hasClass("child")){
tr=tr.prev();
}

const rowData=dt.current.row(tr).data();

setEditingId(rowData._id);

setFormData({
    description:rowData.description,
    uneceCode:rowData.uneceCode,
    code:rowData.code,
    type:rowData.type,
    plural:rowData.plural,
    decimals:rowData.decimals,
    conversionFactor:rowData.conversionFactor,
    status:rowData.status ? "Active" : "Inactive"
    });

setShowModal(true);

});

},[]);


useEffect(()=>{

if(showModal){
document.body.style.overflow="hidden";
}
else{
document.body.style.overflow="auto";
}

return ()=>{
document.body.style.overflow="auto";
}

},[showModal]);

return(

    <div className="container-xxl flex-grow-1">
    
    <div className="card">
    
    <div className="datatable-toolbar d-flex justify-content-between align-items-start">
    
    <div className="title-section">
    <h5 className="table-title">Unit Master</h5>
    <div className="breadcrumb-text">Cargo Masters &gt; Unit Master</div>
    </div>
    
    <button
    className="btn-add-record"
    onClick={()=>setShowModal(true)}
    >
    <i className="bx bx-plus"></i> Create Unit Master
    </button>
    
    </div>
    
    <div className="card-datatable p-3">
    
    <table
    ref={tableRef}
    className="table table-hover dataTable dtr-inline"
    style={{width:"100%"}}
    >
    
    <thead>
    
    <tr>
    
    <th>Description</th>
    <th>Code</th>
    <th>UNECE Code</th>
    <th>Type</th>
    <th>Update</th>
    <th>Remove</th>
    
    </tr>
    
    </thead>
    
    </table>
    
    </div>
    
    </div>

   {/* CREATE / EDIT MODAL */}

{/* CREATE / EDIT MODAL */}

{showModal && (

<div className="custom-modal-backdrop">

  <div className="custom-modal-card">

```
<button
  className="custom-close"
  onClick={() => setShowModal(false)}
>
  ×
</button>

<h5 className="modal-title">
  {editingId ? "Edit Unit Master" : "Create Unit Master"}
</h5>

<hr className="modal-divider"/>

<div className="row">

  {/* Description */}

  <div className="col-md-6">
    <div className="form-group">

      <label>Description *</label>

      <div className="input-icon">

        <i className="bx bx-file"></i>

        <input
          type="text"
          name="description"
          className="form-field"
          placeholder="Enter Description"
          value={formData.description}
          onChange={handleChange}
        />

      </div>

    </div>
  </div>


  {/* UNECE Code */}

  <div className="col-md-6">
    <div className="form-group">

      <label>UNECE Code</label>

      <div className="input-icon">

        <i className="bx bx-barcode"></i>

        <input
          type="text"
          name="uneceCode"
          className="form-field"
          placeholder="Enter UNECE Code"
          value={formData.uneceCode}
          onChange={handleChange}
        />

      </div>

    </div>
  </div>


  {/* Code */}

  <div className="col-md-6">
    <div className="form-group">

      <label>Code *</label>

      <div className="input-icon">

        <i className="bx bx-hash"></i>

        <input
          type="text"
          name="code"
          className="form-field"
          placeholder="Enter Code"
          value={formData.code}
          onChange={handleChange}
        />

      </div>

    </div>
  </div>


  {/* Type */}

  <div className="col-md-6">
    <div className="form-group">

      <label>Type *</label>

      <div className="input-icon">

        <i className="bx bx-category"></i>

        <select
          name="type"
          className="form-field"
          value={formData.type}
          onChange={handleChange}
        >
          <option value="">Select Type</option>
          <option value="Number">Number</option>
          <option value="Weight">Weight</option>
          <option value="Volume">Volume</option>
          <option value="Length">Length</option>
        </select>

      </div>

    </div>
  </div>


  {/* Plural */}

  <div className="col-md-6">
    <div className="form-group">

      <label>Plural</label>

      <div className="input-icon">

        <i className="bx bx-layer"></i>

        <input
          type="text"
          name="plural"
          className="form-field"
          placeholder="Enter Plural"
          value={formData.plural}
          onChange={handleChange}
        />

      </div>

    </div>
  </div>


  {/* No of Decimals */}

  <div className="col-md-6">
    <div className="form-group">

      <label>No of Decimals</label>

      <div className="input-icon">

        <i className="bx bx-calculator"></i>

        <input
          type="number"
          name="decimals"
          className="form-field"
          placeholder="Enter Decimal Count"
          value={formData.decimals}
          onChange={handleChange}
        />

      </div>

    </div>
  </div>


  {/* Conversion Factor */}

  <div className="col-md-6">
    <div className="form-group">

      <label>Conversion Factor</label>

      <div style={{display:"flex",alignItems:"center",gap:"10px"}}>

        <span style={{fontWeight:"600"}}>1</span>

        <span>=</span>

        <input
          type="number"
          name="conversionFactor"
          className="form-field"
          style={{width:"120px"}}
          value={formData.conversionFactor}
          onChange={handleChange}
        />

        <select
          name="conversionUnit"
          className="form-field"
          style={{width:"150px"}}
          value={formData.conversionUnit || ""}
          onChange={handleChange}
        >

          <option value="">Select</option>
          <option value="kg">Kilogram</option>
          <option value="g">Gram</option>
          <option value="lb">Pound</option>

        </select>

      </div>

    </div>
  </div>


  {/* Status */}

  <div className="col-md-12">
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


</div>

);

};

export default UnitMaster;