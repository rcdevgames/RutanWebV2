import React from "react";
import { Field } from "redux-form";
import CInput from "../../../components/CInput/CInput";

const LoginComponent = (props) => {
  const { handleSubmit, submitForm, error } = props;

  return (
    <div class="page-content d-flex align-items-center justify-content-center">
      <div class="row w-100 mx-0 auth-page">
        <div class="col-md-8 col-xl-6 mx-auto">
          <div class="card">
            <div class="row">
              <div class="col-md-4 pr-md-0">
                <div class="auth-left-wrapper"></div>
              </div>
              <div class="col-md-8 pl-md-0">
                <div class="auth-form-wrapper px-4 py-5">
                  <a href="#" class="noble-ui-logo d-block mb-2">
                    Rutan<span>Admin</span>
                  </a>
                  <h5 class="text-muted font-weight-normal mb-4">
                    Selamat datang! Silahkan login dengan akun anda.
                  </h5>
                  <form
                    class="forms-sample"
                    onSubmit={handleSubmit(submitForm)}
                  >
                    <div class="form-group">
                      <Field
                        name="username"
                        label="Username"
                        placeholder="Username"
                        component={CInput}
                        type="text"
                      />
                    </div>
                    <div class="form-group">
                      <Field
                        name="password"
                        label="Password"
                        placeholder="Password"
                        component={CInput}
                        type="password"
                      />
                    </div>

                    {error.status && (
                      <span className="mt-2 text-danger">{error.message}</span>
                    )}

                    <div class="mt-3">
                      <button
                        type="submit"
                        class="btn btn-primary mr-2 mb-2 mb-md-0 text-white"
                      >
                        Login
                      </button>
                    </div>
                    <a href="register.html" class="d-block mt-3 text-muted">
                      Belum punya akun? Daftar
                    </a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
