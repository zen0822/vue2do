/**
 * 测试 form 组件
 */

import FormComp from '../Form'
import InputComp from '../../Input/Input'

export default {
  render() {
    return (
      <FormComp ref='form'>
        <InputComp value='zen' param='name' />
        <InputComp value='男' param='sex' />
      </FormComp>
    )
  }
}
