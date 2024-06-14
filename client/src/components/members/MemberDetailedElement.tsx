import { Alert, Button, Card, Col, Container, FloatingLabel, Form, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Member } from "../../interface/memberInterface"
import RowWithKeyValue from "../RowWithKeyValue";
import { dateFormatOptions } from "../../util/dateOptions";
import { apiPrefix } from '../../config/application.json'
import configuredAxios from "../../axios/configuredAxios";
import { ErrorResponseData } from "../../interface/errorResponseInterface";
import { formatKeyToMessage } from "../../util/stringFormatting";
import { isOlderThen } from "../../util/ageChecker";

interface PropType {
  member: Member;
}

export interface UpdateForm {
  firstName: string;
  lastName: string;
  birthDate: string;
  country: string;
  city: string;
  [key: string]: string
}

const emptyErrors = {
  firstName: '',
  lastName: '',
  birthDate: '',
  country: '',
  city: ''
}

export default function MemberDetailedElement({ member }: PropType) {
  const memberUrl = `/${apiPrefix}/members/${member.id}`;
  const [error, setError] = useState<string>('');
  const [deleted, setDeleted] = useState<boolean>(false);
  const [editing, setEditing] = useState<boolean>(false);

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 18);
  const date18YearsAgo = currentDate.toISOString().split('T')[0];

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteMutationFunction,
    onSuccess: handleDeleteSubmitSucces,
    onError: handleSubmitError,
  });

  const originalEditableValues: UpdateForm = {
    firstName: member.firstName,
    lastName: member.lastName,
    birthDate: member.birthDate,
    country: member.country,
    city: member.city
  }
  const [savedEditableValues, setSavedEditableValues] = useState<UpdateForm>(originalEditableValues);
  // savedEditableValues stores the last value of the member, updated after succestful put request
  const [updateForm, setUpdateForm] = useState<UpdateForm>(savedEditableValues);
  // stores the values during editing

  const [formErrors, setFormErrors] = useState<UpdateForm>(emptyErrors);
  const { mutate: mutatePut } = useMutation({
    mutationFn: putMutationFunction,
    onSuccess: handlePutSubmitSucces,
    onError: handleSubmitError,
  });

  function handleDeleteButtonClicked() {
    mutateDelete();
  }

  function deleteMutationFunction() {
    return configuredAxios.delete(memberUrl);
  }

  function putMutationFunction(data: UpdateForm) {
    return configuredAxios.put(memberUrl, data);
  }

  function handleDeleteSubmitSucces() {
    setDeleted(true);
  }

  function handlePutSubmitSucces() {
    setEditing(false);
    setSavedEditableValues(updateForm);
  }

  function handleSubmitError(error: AxiosError<ErrorResponseData>) {
    if (error.message === 'Network Error') {
      setError('Error connecting to the server')
    } else {
      setError(error.response?.data.errorMessage || 'Error processing the request');
    }
  }

  function setFieldUpdateForm(field: string, value: string) {
    const newForm = { ...updateForm, [field]: value }
    setUpdateForm(newForm); // only changes value of the selected field
    let newErrors = { ...formErrors }
    if (!value || value === '') {
      let newErrorMessage = `Please enter your ${formatKeyToMessage(field)}`;
      newErrors = { ...formErrors, [field]: newErrorMessage }
    } else if (formErrors[field] !== '') {
      newErrors = { ...formErrors, [field]: '' }
    }
    setFormErrors(newErrors);
  }


  function handleEditSave() {
    let noErrors = true;
    let newErrors = { ...formErrors }
    for (const [key, value] of Object.entries(updateForm)) {
      // check the fields are not empty
      if (!value || value === '') {
        newErrors[key] = `Please enter your ${formatKeyToMessage(key)}`;
        noErrors = false;
      }
    }
    // check for age, members must be 18 years old
    if (!isOlderThen(updateForm.birthDate, 18)) {
      newErrors['birthDate'] = `Members must be at least 18 years old!`;
      noErrors = false;
    }

    if (noErrors) {
      mutatePut(updateForm);
    } else {
      setFormErrors(newErrors);
    }
  }

  function handleEditCancel() {
    setEditing(false);
    setUpdateForm(savedEditableValues);
    setFormErrors(emptyErrors);
  }

  const popover = (
    <Popover>
      <Popover.Header as='h3' className='delete-popover-header'>
        Delete Member
      </Popover.Header>
      <Popover.Body>
        Are you sure you want to delete this member?
        <br></br>
        <Button variant='light' className='mx-1 border border-2 my-2 float-end'
          onClick={handleDeleteButtonClicked} >
          Delete
        </Button>
        <Button variant='light' className='mx-1 border border-2 my-2 float-end'
          onClick={() => document.body.click()} >
          Cancel
        </Button>
      </Popover.Body>
    </Popover>
  )

  if (deleted) {
    return (
      <Container className='text-center mt-5 w-50' >
        <Alert variant="success" dismissible>
          <Alert.Heading>
            Member Deleted Succesfully
          </Alert.Heading>
        </Alert>
      </Container>
    )
  }


  return (
    <>
      <Card className='mt-4 mb-3'>
        <Card.Header>
          {
            editing ?
              <Row>
                <Col>
                  <FloatingLabel controlId='floatingLastNameInput'
                    label='Last Name' className='mb-3' >
                    <Form.Control type='text' placeholder='Last Name'
                      value={updateForm.lastName} isInvalid={!!formErrors.lastName} autoComplete='off'
                      onChange={e => { setFieldUpdateForm('lastName', e.target.value) }} />
                    <Form.Control.Feedback type='invalid'>
                      {formErrors['lastName']}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>

                <Col>
                  <FloatingLabel controlId='floatingFirstNameInput'
                    label='First Name' className='mb-3' >
                    <Form.Control type='text' placeholder='First Name'
                      value={updateForm.firstName} isInvalid={!!formErrors.firstName} autoComplete='off'
                      onChange={e => { setFieldUpdateForm('firstName', e.target.value) }} />
                    <Form.Control.Feedback type='invalid'>
                      {formErrors['firstName']}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Col>
              </Row>
              :
              `${savedEditableValues.lastName} ${savedEditableValues.firstName}`
          }

          {/* buttons for editing and delete */}
          <OverlayTrigger trigger='click' placement='bottom' rootClose={true}
            overlay={popover} >
            <span className='float-end'>
              <Button className='btn btn-orange-dark mx-2'  >
                Delete
              </Button>
            </span>
          </OverlayTrigger>
          <span className='float-end'>
            <Button className='btn btn-orange mx-2' onClick={() => setEditing(true)} disabled={editing}>
              Edit
            </Button>
          </span>
        </Card.Header>
        <Card.Body>

          {
            editing ?
              <FloatingLabel controlId='floatingBirthDateInput'
                label='Birth Date' className='mb-3' >
                <Form.Control type='date' placeholder='Birth Date'
                  value={updateForm.birthDate.split('T')[0]} isInvalid={!!formErrors.birthDate} autoComplete='off'
                  max={date18YearsAgo}
                  onChange={e => { setFieldUpdateForm('birthDate', e.target.value) }} />
                <Form.Control.Feedback type='invalid'>
                  {formErrors['birthDate']}
                </Form.Control.Feedback>
              </FloatingLabel>
              :
              <RowWithKeyValue keyString="Birth Date" editing={false} fieldName="birthDate"
                valueString={new Date(savedEditableValues.birthDate).toLocaleDateString('ro-RO', dateFormatOptions)}
                form={updateForm} errors={formErrors} setFieldUpdateForm={setFieldUpdateForm} />
          }

          <RowWithKeyValue keyString="Country" valueString={savedEditableValues.country} editing={editing}
            form={updateForm} errors={formErrors} setFieldUpdateForm={setFieldUpdateForm} fieldName="country" />
          <RowWithKeyValue keyString="City" valueString={savedEditableValues.city} editing={editing}
            form={updateForm} errors={formErrors} setFieldUpdateForm={setFieldUpdateForm} fieldName="city" />

          {editing &&
            <>
              <span className='float-end mt-3'>
                <Button className='btn btn-orange mx-2' onClick={handleEditSave} >
                  Save changes
                </Button>
              </span>
              <span className='float-end mt-3'>
                <Button className='btn btn-orange mx-2' onClick={handleEditCancel} >
                  Cancel
                </Button>
              </span>
            </>
          }
        </Card.Body>
      </Card>
      <Alert key='danger' variant='danger' show={error !== ''}
        onClose={() => setError('')} dismissible >
        {error}
      </Alert>
    </>
  )
}
