import { Col, FloatingLabel, Form, Row } from "react-bootstrap";

import { UpdateForm } from "./members/MemberDetailedElement";

interface PropType {
  keyString: string;
  valueString: string;
  editing: boolean;
  form: UpdateForm;
  setFieldUpdateForm: (field: string, value: string) => void;
  errors: UpdateForm;
  fieldName: string
}

export default function RowWithKeyValue({
  keyString, valueString, editing, form, setFieldUpdateForm, errors, fieldName
}: PropType) {



  return (
    <Row>
      <Col lg='2'>
        {keyString}
      </Col>
      <Col>
        {
          editing ?
            <FloatingLabel controlId='floatingCountryInput'
              label={keyString} className='mb-3' >
              <Form.Control type='text' placeholder={keyString}
                value={form[fieldName]} isInvalid={!!errors[fieldName]} autoComplete='off'
                onChange={e => { setFieldUpdateForm(fieldName, e.target.value) }} />
              <Form.Control.Feedback type='invalid'>
                {errors[fieldName]}
              </Form.Control.Feedback>
            </FloatingLabel>
            :
            valueString
        }
      </Col>
    </Row>
  )
}
