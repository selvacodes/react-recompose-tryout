import React from 'react'
import {
  defaultProps,
  withState,
  withHandlers,
  compose,
  mapProps
} from 'recompose'
import { Input, hasMinimumLengthEight } from './FormInput'

const addState = withState('validity', 'changeValid', {
  name: {
    validator: hasMinimumLengthEight,
    vState: {
      isValid: true,
      isDirty: false
    }
  }
})
const itemList = [
  {
    labelName: 'Name',
    validator: hasMinimumLengthEight,
    vState: {
      isValid: true,
      isDirty: false
    }
  },
  {
    labelName: 'Email',
    validator: hasMinimumLengthEight,
    vState: {
      isValid: true,
      isDirty: false
    }
  }
]
const mapPropsToForm = mapProps(({
  validator,
  changeValid,
  vState,
  labelName
}) => ({
  changeValue: ({ target }) => {
    validator(target.value)
      ? changeValid(_ =>
          Object.assign({},{
            vState: { isValid: true, isDirty: true }
          }))
      : changeValid(_ => ({ isValid: false, isDirty: true }))
  },
  isDirty: vState.isDirty,
  isValid: vState.isValid,
  labelName
}))

const enhance = compose(mapPropsToForm)
export default class FormGroup extends React.Component {
  constructor (props) {
    super(props)
    this.state = { items: itemList }
  }
  render () {
    const li = this.state.items.map(item => {
      console.log(item);
      return enhance(Input)(item)
    })
    return (
      <div>
        {li}
      </div>
    )
  }
}
