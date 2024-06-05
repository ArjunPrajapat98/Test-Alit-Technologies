import React, { useEffect, useState } from 'react'
import CommonButton from '../../common/CommonButton'
import { createCustomers, deleteCustomers, editCustomers, getCustomers } from '../../../services/customersService';
import InputModal from '../../common/InputModal';
import { InputField } from '../../common/InputField';
import { utils } from '../../../helper/utils';
import { errorSchema } from '../../../helper/errorSchema';
import * as XLSX from "xlsx";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Customer() {

  const navigate = useNavigate();
  const [customerList, setCustomersList] = useState([])
  const [formValue, setFormValue] = useState({
    customerName: ""
  })
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const [disableInp, setDisableInp] = useState({});
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const getCustomerList = async () => {
    const response = await getCustomers();
    setCustomersList(response);
  }

  useEffect(() => {
    getCustomerList()
  }, [])

  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
    setFormValue({
      customerName: "",
    });
    setFormError("");
  };


  const handleOnChange = async (name, value) => {
    const stateObj = { ...formValue, [name]: value };
    setFormValue(stateObj);

    if (!!formError) {
      const error = await utils.checkFormError(stateObj, errorSchema.customerSchema);
      setFormError(error);
    }
  };

  const onSubmit = async () => {
    const validationResult = await utils.checkFormError(formValue, errorSchema.customerSchema);
    if (validationResult === true) {
      setLoading(true);
      if (isEdit) {
        const response = await editCustomers(formValue, formValue?.customerID);
        if (response?.responseData?.customerID) {
          toast.success('Data Updated Successfully');
          closeModal();
          getCustomerList();
        }
      } else {
        const response = await createCustomers(formValue);
        if (response?.responseData?.customerID) {
          toast.success('Customer Created Successfully');
          closeModal();
          getCustomerList();
        }
      }
    } else {
      setFormError(validationResult);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteCustomers(id);
    if (!response) {
      toast.success('Customer Deleted Successfully');
    }
    getCustomerList();
  };

  const handleEditAction = (item) => {
    setFormValue(item);
    setDisableInp(item);
    setIsOpen(true);
    setIsEdit(true);
    setFormError("");
  };

  const handleDownload = (e) => {
    e.preventDefault();

    const rows = customerList?.map((product) => ({
      customerID: product.customerID,
      customerName: product?.customerName,
      primaryKeyID: product.primaryKeyID,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, "customer");

    XLSX.utils.sheet_add_aoa(worksheet, [
      ["customerID", "customerName", "primaryKeyID"],
    ]);

    XLSX.writeFile(workbook, "msa.xlsx", { compression: true });
  };

  return (
    <div className='container'>
      <div className="common_flex p-3">
        <p className='bill_heading'> Customer </p>
        <div className='flex-gap'>
          <CommonButton name="Add" onClick={() => setIsOpen(true)} />
          <CommonButton name="Print" onClick={(e) => handleDownload(e)} />
          <CommonButton name="Close" onClick={() => navigate('/')}/>
        </div>
      </div>

      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Sr. No.</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        {
          customerList?.length > 0 ? (
            customerList?.map((el, ind) => {
              return (
                <React.Fragment key={ind + '123'}>
                  <tbody>
                    <tr>
                      <th scope="row">{ind + 1}</th>
                      <td> {el?.customerName} </td>
                      <td>
                        <span className='questions_create' onClick={() => handleEditAction(el)}> <i class='bx bx-edit-alt'></i> </span> &nbsp;
                        <span className='questions_delete' onClick={() => handleDelete(el?.customerID)}> <i class='bx bxs-trash'></i> </span>
                      </td>
                    </tr>
                  </tbody>
                </React.Fragment>
              )
            })
          ) : (
            <> No data found </>
          )
        }
      </table>

      <div className='recour_count'> Record Count : <strong> {customerList?.length } </strong> </div>

      {isOpen && <InputModal
        isOpen={Boolean(isOpen)}
        headerName={isEdit ? "Edit Customer" : "Add Customer"}
        toggle={() => closeModal()}
        submitLabel={isEdit ? "Update Customer" : "Add Customer"}
        onSubmit={(e) => onSubmit(e)}
        disabled={isEdit ? JSON.stringify(formValue) === JSON.stringify(disableInp) : ""}
        loading={loading}
        inputProps={
          <>
            <div className="row">
              <div className="col-md-12">
                <InputField
                  label="Customer Name *"
                  placeholder="Customer Name"
                  name='customerName'
                  type='text'
                  value={formValue?.customerName}
                  focus={!!(typeof formError === "object" && formError?.customerName)}
                  error={!!(typeof formError === "object") ? formError?.customerName : ""}
                  onChange={({ target: { name, value } }) =>
                    handleOnChange(name, value)
                  }
                />
              </div>
            </div>
          </>
        }
      />}
    </div>
  )
}
