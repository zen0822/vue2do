/**
 * 测试 form 组件
 */

import Vue from 'vue'
import FormComp from '../../../src/component/Form/Form'
import InputComp from '../../../src/component/Input/Input'

export default {
  render() {
    return (
      <FormComp ref='form'>
        <InputComp initVal='zen' param='name' />
        <InputComp initVal='男' param='sex' />
      </FormComp>
    )
  }
}
