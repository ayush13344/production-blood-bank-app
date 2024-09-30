import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from 'react-router-dom';
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donor");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === 'login') {
      await handleLogin(e, email, password, role);
    } else if (formType === 'register') {
      await handleRegister(e, name, role, email, password, organisationName, hospitalName, address, phone, website);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donorRadio"
              value="donor"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "donor"}
            />
            <label htmlFor="donorRadio" className="form-check-label">
              Donor
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value="admin"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "admin"}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value="hospital"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "hospital"}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>

          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value="organisation"
              onChange={(e) => setRole(e.target.value)}
              checked={role === "organisation"}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>

        {formType === 'login' && (
          <>
            <InputType
              labelText="Email"
              labelFor="email"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        )}

        {formType === 'register' && (
          <>
            <InputType
              labelText="Email"
              labelFor="email"
              inputType="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputType
              labelText="Password"
              labelFor="forPassword"
              inputType="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {(role === 'admin' || role === 'donor') && (
              <InputType
                labelText="Name"
                labelFor="forName"
                inputType="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            {role === 'organisation' && (
              <InputType
                labelText="Organisation Name"
                labelFor="forOrganisationName"
                inputType="text"
                name="organisationName"
                value={organisationName}
                onChange={(e) => setOrganisationName(e.target.value)}
              />
            )}
            {role === 'hospital' && (
              <InputType
                labelText="Hospital name"
                labelFor="forhospitalName"
                inputType="text"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
              />
            )}
            <InputType
              labelText="Website"
              labelFor="forWebsite"
              inputType="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
            <InputType
              labelText="Address"
              labelFor="forAddress"
              inputType="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <InputType
              labelText="Phone"
              labelFor="forPhone"
              inputType="text"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </>
        )}

        <div className="d-flex flex-row justify-content-between">
          {formType === 'login' ? (
            <p>
              Not registered yet? Register <Link to="/register">Here!</Link>
            </p>
          ) : (
            <p>
              Already Registered? <Link to="/login">Login</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
