/**
 * 测试 form 组件
 */

import FormComp from '../../../src/component/Form/Form'
import InputComp from '../../../src/component/Input/Input'

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
