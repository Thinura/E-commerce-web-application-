import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose';
import { noneAuthorization } from "../../Session";
import { withFirebase } from "../../Firebase";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

import Notification from '../../components/Notification'
import Loader from '../../components/Loader'

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);

  function onSubmit(event) {
    setLoader(true)
    props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);
        props.history.push('/dashboard');
      })
      .catch((error) => {
        setError(error);
      });
    setLoader(false)
    event.preventDefault();

  }

  function onChange(event) {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        return;
    }
  }

  function isInvalid() {
    return password === "" || email === "";
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center" style={{ marginTop: 200 }}>
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <CRow>
                      {error && <Notification variant='danger'>{error.message}</Notification>}
                      {loader && <Loader />}
                    </CRow>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="email"
                        value={email}
                        onChange={onChange}
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        name="password"
                        value={password}
                        onChange={onChange}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton type="submit" disabled={isInvalid()} color="success" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}
const SignInForm = compose(withRouter, withFirebase)(Login);

const condition = (authUser) => !!authUser;
export default noneAuthorization(condition)(Login);
export { SignInForm }
