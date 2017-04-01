import React from 'react'
import {
  defaultProps,
  withState,
  withHandlers,
  compose,
  mapProps
} from 'recompose'
import styles from '../../css/style.styl'

const addDefaultProps = defaultProps({ labelName: 'Default' })

const addFirstState = withState('validity', 'changeValid', {
  isValid: true,
  isDirty: false
})

const hasMinimumLength = length => val => val.length >= length

export const hasMinimumLengthEight = hasMinimumLength(8)

const mapPropsToForm = validator =>
  mapProps(({ validity, changeValid, labelName }) => ({
    changeValue: ({ target }) => {
      validator(target.value)
        ? changeValid(_ => ({ isValid: true, isDirty: true }))
        : changeValid(_ => ({ isValid: false, isDirty: true }))
    },
    isDirty: validity.isDirty,
    isValid: validity.isValid,
    labelName
  }))

const validateAndMapProps = mapPropsToForm(hasMinimumLengthEight)

const enhance = compose(addDefaultProps, addFirstState, validateAndMapProps)

export const Input = ({ labelName, changeValue, isDirty, isValid }) => (
  <div className='row'>
    <label>{labelName} : </label>
    <input
      type='text'
      className={isDirty && isValid ? 'valid' : isDirty ? 'not-valid' : ''}
      onChange={changeValue}
    />
  </div>
)

const FormInput = enhance(Input)

console.log(FormInput)

export default FormInput
