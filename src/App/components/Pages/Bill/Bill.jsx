import React, { useEffect, useState } from 'react'
import CommonButton from '../../common/CommonButton'
import { createBills, deleteBills, editBills, getBillList } from '../../../services/billServies';

import { createCustomers, deleteCustomers, editCustomers, getCustomers } from '../../../services/customersService';
import InputModal from '../../common/InputModal';
import { InputField } from '../../common/InputField';
import { utils } from '../../../helper/utils';
import { errorSchema } from '../../../helper/errorSchema';
import * as XLSX from "xlsx";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../common/Dropdown';
import TextArea from '../../common/Textarea';

export default function Bill() {

  const navigate = useNavigate();
  const [billList, setBillList] = useState([])
  const [customerList, setCustomersList] = useState([])
  const [formValue, setFormValue] = useState({
    billNo: '',
    billDate: '',
    customerName: '',
    remarks: "",
  })
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [disableInp, setDisableInp] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const getBillData = async () => {
    const response = await getBillList();
    setBillList(response);
  }

  useEffect(() => {
    getBillData();
    setFormValue((prevState) => ({
      ...prevState,
      billNo: Math.floor(Math.random() * 1000000),
      billDate: new Date().toISOString().split('T')[0], // Set the date in YYYY-MM-DD format
    }));
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
    setFormValue((prevState) => ({
      ...prevState,
      billNo: Math.floor(Math.random() * 1000000),
      billDate: new Date().toISOString().split('T')[0],
    }));
    setFormError("");
  };

  const handleOnChange = async (name, value) => {
    const stateObj = { ...formValue, [name]: value };
    setFormValue(stateObj);

    if (!!formError) {
      const error = await utils.checkFormError(stateObj, errorSchema.billSchema);
      setFormError(error);
    }
  };

  const onSubmit = async () => {
    const validationResult = await utils.checkFormError(formValue, errorSchema.billSchema);
    if (validationResult === true) {
      console.log("validationResult", validationResult)
      setLoading(true);
      if (isEdit) {
        const response = await editBills(formValue, formValue?.customerID);
        if (response?.responseData?.customerID) {
          toast.success('Data Updated Successfully');
          closeModal();
          getBillData();
        }
      } else {
        const response = await createBills(formValue);
        if (response) {
          toast.success('Bill Created Successfully');
          closeModal();
          getBillData();
        }
      }
    } else {
      setFormError(validationResult);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteBills(id);
    if (!response) {
      toast.success('Customer Deleted Successfully');
    }
    getBillData();
  };

  const handleEditAction = (item) => {
    setFormValue(item);
    console.log("item", item)
    setDisableInp(item);
    setIsOpen(true);
    setIsEdit(true);
    setFormError("");
  };

  const handleDownload = (e) => {
    e.preventDefault();

    const rows = billList?.map((product) => ({
      number: product.customerID,
      billNo:product.billNo,
      billDate:product.billDate,
      customerName: product?.customerName,
      netAmount:product.netAmount,
      remarks:product.remarks,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "bills");

    XLSX.utils.sheet_add_aoa(worksheet, [
      ["Sr. No.", "Bill No", "Date" ,"Customer Name", "Net Amount", "Remarks"],
    ]);

    XLSX.writeFile(workbook, "msa.xlsx", { compression: true });
  };

  const getCustomerList = async () => {
    const response = await getCustomers();
    setCustomersList(response);
  }

  useEffect(() => {
    getCustomerList()
  }, [])

  return (
    <div className='container'>
      <div className="common_flex p-3">
        <p className='bill_heading'> Bill </p>
        <div className='flex-gap'>
          <CommonButton name="Add" onClick={() => setIsOpen(true)} />
          <CommonButton name="Print" onClick={(e) => handleDownload(e)}/>
          <CommonButton name="Close" onClick={() => navigate('/')}/>
        </div>
      </div>

      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Bill No</th>
            <th scope="col">Date</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Net Amount</th>
            <th scope="col">Remarks</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {
          billList?.length > 0 ? (
            billList?.map((el, ind) => {
              return (
                <tbody>
                  <tr>
                    <th scope="row">{ind + 1}</th>
                    <td>{el?.billNo}</td>
                    <td>{new Date(el?.billDate).toDateString()}</td>
                    <td>{el?.customerName}</td>
                    <td>{(el?.netAmount).toFixed(2)}</td>
                    <td>{el?.remarks ? el?.remarks : '-'}</td>
                    <td>
                      <span className='questions_create' onClick={() => handleEditAction(el)}> <i class='bx bx-edit-alt'></i> </span> &nbsp;
                      <span className='questions_delete' onClick={() => handleDelete(el?.customerID)}> <i class='bx bxs-trash'></i> </span>
                    </td>
                  </tr>
                </tbody>
              )
            })
          ) : (
            <> No data found </>
          )
        }
      </table>

      <div className='recour_count'> Record Count : <strong> {billList?.length} </strong> </div>

      <InputModal
        isOpen={Boolean(isOpen)}
        mxSize='md'
        headerName={isEdit ? "Edit Bill" : "Add Bill"}
        toggle={() => closeModal()}
        submitLabel={isEdit ? "Update Bill" : "Add Bill"}
        onSubmit={(e) => onSubmit(e)}
        disabled={isEdit ? JSON.stringify(formValue) === JSON.stringify(disableInp) : ""}
        loading={loading}
        inputProps={
          <>
            <div className="row">
              <div className="col-md-6">
                <InputField
                  label="Bill Number *"
                  placeholder="Bill Number "
                  name='billNo'
                  type='number'
                  value={formValue?.billNo}
                  focus={!!(typeof formError === "object" && formError?.billNo)}
                  error={!!(typeof formError === "object") ? formError?.billNo : ""}
                  onChange={({ target: { name, value } }) =>
                    handleOnChange(name, value)
                  }
                />
              </div>
              <div className="col-md-6">
                <InputField
                  label="Bill Date *"
                  placeholder="Bill Date"
                  name='billDate'
                  type='date'
                  value={formValue?.billDate}
                  focus={!!(typeof formError === "object" && formError?.billDate)}
                  error={!!(typeof formError === "object") ? formError?.billDate : ""}
                  onChange={({ target: { name, value } }) =>
                    handleOnChange(name, value)
                  }
                />
              </div>

              <div className="col-md-12 mt-4">
                <label> Customer Name *</label>
                <Dropdown
                  // isMulti={formValue?.type === "to_date"}
                  placeholder="Customer Name "
                  isSearchable={true}
                  className="anvSel_drop"
                  name="customerName"
                  options={
                    customerList?.length > 0
                      ? customerList?.map((e) => {
                        return {
                          value: e?.customerID,
                          label: e?.customerName,
                        };
                      })
                      : []
                  }
                  selectedOption={formValue?.customerName}
                  setSelectedOption={(data) => {
                    handleOnChange("customerName", data?.value);
                  }}
                  valueText="value"
                  labelText="label"
                  focus={!!formError.customerName}
                  error={formError.customerName}
                />
              </div>

              <div className="col-md-12 mt-4">
                <label> Remarks * </label>
                <TextArea
                  type="textarea"
                  name="remarks"
                  placeholder='Remarks'
                  value={formValue?.remarks}
                  focus={!!(typeof formError === "object" && formError?.remarks)}
                  error={!!(typeof formError === "object") ? formError?.remarks : ""}
                  onChange={({ target: { name, value } }) =>
                    handleOnChange(name, value)
                  }
                />
              </div>
            </div>
          </>
        }
      />
    </div>
  )
}
