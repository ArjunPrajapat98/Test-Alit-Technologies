import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { utils } from '../../helper/utils';
import { errorSchema } from '../../helper/errorSchema';
import { InputField } from '../common/InputField';
import { userLogin } from '../../services/authService';
import { setStorage } from '../../helper/storage';
import { useNavigate } from 'react-router-dom';

const formObj = {
    UserName: '',
    Password: '',
}

export default function Login() {

    const [formValue, setFormValue] = useState(formObj);
    const [formError, setFormError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleOnChange = async (name, value) => {
        const stateObj = { ...formValue, [name]: value };
        setFormValue(stateObj);
        if (!utils.isObjectKeyEmpty(formError)) {
            const validationResult = await utils.checkFormError(stateObj, errorSchema.loginSchema);
            if (validationResult === true) {
                setFormError("");
            } else {
                setFormError(validationResult);
            }
        }
    };
    // UserName=admin&Password=admin@123
    const handleSubmitClick = async (e) => {
        e.preventDefault();

        const validationResult = await utils?.checkFormError(formValue, errorSchema.loginSchema);

        if (utils?.isObjectKeyEmpty(validationResult)) {
            setLoading(true);
            try {
                const res = await userLogin(utils.queryString(formValue));
                if (!!res.authToken) {
                    setFormValue('');
                    setLoading(false);
                    toast.success('Login Successfully');
                    setStorage("logged-in", res.authToken);
                    navigate("/dashboard");
                } else {
                    setLoading(false);
                    navigate("/login");
                }
            } catch (error) {
                console.log("errr", error);
            }
            setFormError("");
        } else {
            setFormError(validationResult);
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container">
                <div className="row m-5 no-gutters shadow-lg">
                    <div className="col-md-6 d-none d-md-block img_ajn p-5">
                        <img
                            src="https://images.unsplash.com/photo-1566888596782-c7f41cc184c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=2134&q=80"
                            className="img-fluid"
                            style={{ minHeight: "100%" }}
                        />
                    </div>
                    <div className="col-md-6 bg-white p-5">
                        <h3 className="pb-3">Login</h3>
                        <div className="form-style mt-5">
                            <form>
                                <div className="form-group pb-3">
                                    <InputField
                                        label="User Name *"
                                        placeholder="User Name"
                                        name='UserName'
                                        type='text'
                                        value={formValue?.UserName}
                                        focus={!!(typeof formError === "object" && formError?.UserName)}
                                        error={!!(typeof formError === "object") ? formError?.UserName : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>
                                <div className="form-group pb-3">
                                    <InputField
                                        placeholder="Password"
                                        label="Password *"
                                        name='Password'
                                        type='Password'
                                        value={formValue?.Password}
                                        focus={!!(typeof formError === "object" && formError?.Password)}
                                        error={!!(typeof formError === "object") ? formError?.Password : ""}
                                        onChange={({ target: { name, value } }) =>
                                            handleOnChange(name, value)
                                        }
                                    />
                                </div>

                                <div className="pb-2 mt-4">
                                    <button
                                        onClick={handleSubmitClick}
                                        type="submit"
                                        className="btn btn-primary w-100 font-weight-bold mt-2"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
