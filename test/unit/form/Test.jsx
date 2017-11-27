/**
 * 测试 form 组件
 */

import Vue from 'vue'
import FormComp from '../../../../src/component/base/form/form'
import InputComp from '../../../../src/component/base/input/input'

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
