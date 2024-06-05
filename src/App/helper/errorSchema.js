import * as Yup from "yup";

export const errorSchema = {
  loginSchema: Yup.object().shape({
    UserName: Yup.string().required("Required"),
    Password: Yup.string().required("Required"),
  }),
  customerSchema: Yup.object().shape({
    customerName: Yup.string().required("Please enter customer name"),
  }),
  billSchema: Yup.object().shape({
    billNo: Yup.string().required("Required"),
    billDate: Yup.string().required("Required"),
    customerName: Yup.string().required("Required"),
    remarks: Yup.string().required("Required"),
  }),
};
