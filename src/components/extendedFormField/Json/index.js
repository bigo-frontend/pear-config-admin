import React, { Component } from 'react';
import { registerFormField, connect } from '@uform/react';
import styles from './index.less';

class Json extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps() {
  }

  shouldComponentUpdate(nextProps) {
    // 处理数据初始化时的必要重绘，如果数据结构不完全相同则进行render，尽管这个算法并不完美，但是在大多数情境下是有效的
    let oldValueKeys = Object.keys(this.props.value || {});
    let newValueKeys = Object.keys(nextProps.value || {});
    if (oldValueKeys.length !== newValueKeys.length || oldValueKeys.find(key => {return !newValueKeys.find(i => i === key)})) {
      let value = nextProps.value;
      this.setState({
        value
      });
      return true;
    }
    return false;
  }

  componentDidUpdate() {
    const self = this;
    // 需要等待DOM渲染完成再更新
    setTimeout(() => {
      self.editor.set(self.state.value);
      self.editor.expandAll && self.editor.expandAll();
    }, 200);
  }

  componentDidMount() {
    const self = this;
    const { value } = this.props;
    const container = this.refs.wrap;
    const opts = {
      mode: 'form',
      modes: ['form', 'code'],
      onChangeText: (jsonString) => {
        try {
          let newValue = JSON.parse(jsonString);
          self.props.onChange(newValue);
        } catch(err) {

        }
      }
    }
    this.editor = new JSONEditor(container, opts);

    this.editor.set(value || {});
    this.editor.expandAll();
  }

  componentWillUnmount() {

  }

  render() {
    return <div ref="wrap" className={styles.jsoneditorWrap}></div>;
  }
}

export default registerFormField(
  'json',
  connect()(props => 
    <Json
      {...props}
      value={props.value} 
    />
  )
);
