import { Form, Alert, Button, Col, FloatingLabel, Row } from "react-bootstrap"
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import FormContainer from "../../components/FromContainer"
import { formatKeyToMessage } from "../../util/stringFormatting";
import configuredAxios from "../../axios/configuredAxios";
import { ErrorResponseData } from "../../interface/errorResponseInterface";
import { isOlderThen } from "../../util/ageChecker";


interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  city: string;
  [key: string]: string
}

const currentDate = new Date();
currentDate.setFullYear(currentDate.getFullYear() - 18);
const date18YearsAgo = currentDate.toISOString().split('T')[0];
// use the date 18 years ago as default value for birthDate

const defaultFormData = {
  firstName: '',
  lastName: '',
  birthDate: date18YearsAgo,
  country: '',
  city: ''
}

const emptyErrors = {
  firstName: '',
  lastName: '',
  birthDate: '',
  country: '',
  city: ''
}

export default function MemberCreate() {
  const createMemberUrl = '/api/members';
  const [form, setForm] = useState<FormData>(defaultFormData);
  const [errors, setErrors] = useState<FormData>(emptyErrors);
  const [succesfullReg, setSuccesfull] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { mutate } = useMutation({
    mutationFn: mutationFunction,
    onSuccess: handleSubmitSucces,
    onError: handleSubmitError,
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let noErrors = true;
    const newErrors: FormData = {
      firstName: '',
      lastName: '',
      birthDate: '',
      country: '',
      city: ''
    };

    for (const [key, value] of Object.entries(form)) {
      // check the fields are not empty
      if (!value || value === '') {
        newErrors[key] = `Please enter your ${formatKeyToMessage(key)}`;
        noErrors = false;
      }
    }

    // check for age, members must be 18 years old
    if (!isOlderThen(form.birthDate, 18)) {
      newErrors['birthDate'] = `Members must be at least 18 years old!`;
      noErrors = false;
    }

    setErrors(newErrors);
    if (noErrors) {
      // if no errors send the request
      mutate(form);
    }
  }

  function mutationFunction(data: FormData) {
    return configuredAxios.post(createMemberUrl, data);
  }

  function handleSubmitSucces() {
    setForm(defaultFormData);
    setSuccesfull(true);
  }

  function handleSubmitError(error: AxiosError<ErrorResponseData>) {
    setSuccesfull(false);
    if (error.message === 'Network Error') {
      setSubmitError('Error connecting to the server')
    } else {
      setSubmitError(error.response?.data.errorMessage || 'Error during creation');
    }
  }

  function setField(field: string, value: string) {
    const newForm = { ...form, [field]: value }
    setForm(newForm); // only changes value of the selected field
    let newErrors = { ...errors }
    if (!value || value === '') {
      let newErrorMessage = `Please enter your ${formatKeyToMessage(field)}`;
      newErrors = { ...errors, [field]: newErrorMessage }
    } else if (errors[field] !== '') {
      newErrors = { ...errors, [field]: '' }
    }
    setErrors(newErrors);
  }

  return (
    <FormContainer>
      <Form className='justify-content-md-center mt-5' onSubmit={handleSubmit} >
        <h2 className='text-center'>Registration</h2>
        <Row>
          <Col>
            <FloatingLabel controlId='floatingFirstNameInput'
              label='First Name' className='mb-3' >
              <Form.Control type='text' placeholder='First Name'
                value={form.firstName} isInvalid={!!errors.firstName} autoComplete='off'
                onChange={e => { setField('firstName', e.target.value) }} />
              <Form.Control.Feedback type='invalid'>
                {errors['firstName']}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>

          <Col>
            <FloatingLabel controlId='floatingLastNameInput'
              label='Last Name' className='mb-3' >
              <Form.Control type='text' placeholder='Last Name'
                value={form.lastName} isInvalid={!!errors.lastName} autoComplete='off'
                onChange={e => { setField('lastName', e.target.value) }} />
              <Form.Control.Feedback type='invalid'>
                {errors['lastName']}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Col>
        </Row>

        <FloatingLabel controlId='floatingBirthDateInput'
          label='Birth Date' className='mb-3' >
          <Form.Control type='date' placeholder='Birth Date'
            value={form.birthDate} isInvalid={!!errors.birthDate} autoComplete='off'
            max={date18YearsAgo}
            onChange={e => { setField('birthDate', e.target.value) }} />
          <Form.Control.Feedback type='invalid'>
            {errors['birthDate']}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId='floatingCountryInput'
          label='Country' className='mb-3' >
          <Form.Control type='text' placeholder='Country'
            value={form.country} isInvalid={!!errors.country} autoComplete='off'
            onChange={e => { setField('country', e.target.value) }} />
          <Form.Control.Feedback type='invalid'>
            {errors['country']}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId='floatingCity'
          label='City' className='mb-3 mt-3' >
          <Form.Control type='city' placeholder='City'
            value={form.city} isInvalid={!!errors.city} autoComplete='off'
            onChange={e => { setField('city', e.target.value) }} />
          <Form.Control.Feedback type='invalid'>
            {errors['city']}
          </Form.Control.Feedback>
        </FloatingLabel>

        <Alert key='danger' variant='danger' show={submitError !== null} onClose={() => setSubmitError(null)} dismissible >
          {submitError}
        </Alert>
        <Alert key='success' variant='success' show={succesfullReg} onClose={() => setSuccesfull(false)} dismissible >
          Succesfully created
        </Alert>

        <Button type='submit' variant='secondary' className='col-md-6 offset-md-3'>
          Create
        </Button>

      </Form>
    </FormContainer>
  )
}
