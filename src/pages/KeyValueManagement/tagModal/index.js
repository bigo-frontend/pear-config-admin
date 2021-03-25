import React, { Component } from 'react';
import { Card, Divider, Row, Col, Table, Select, Radio, Modal, Tag, Checkbox, Button } from 'antd';
import styles from '../index.less';

import { bind } from 'lodash-decorators/utils';

class TagModal extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.state = {
      currentKeyValue: null,
      tags: [],
      visible: false,
    };
  }

  handleChange(values) {
    this.setState({
      tags: values,
    });
  }

  handleShow(currentKeyValue) {
    this.setState({
      currentKeyValue,
      tags: currentKeyValue.tags,
      visible: true,
    });
  }

  handleHide() {
    this.setState({
      currentKeyValue: null,
      visible: false,
    });
  }

  handleOk() {
    const { dispatch } = this.props;

    dispatch({
      type: 'keyValueManagement/updateTags',
      payload: {
        _id: this.state.currentKeyValue._id,
        tags: this.state.tags,
      },
    });

    this.setState({
      currentKeyValue: null,
      visible: false,
    });
  }

  render() {
    const self = this;
    const { keyValueManagement } = this.props;
    const { tagList } = keyValueManagement;

    const options = tagList.map(tag => tag.title);

    return (
      <Modal
        title="标签编辑"
        className={styles.keyValueModal}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleHide}
      >
        <Checkbox.Group
          options={options}
          value={this.state.tags}
          onChange={this.handleChange}
        />
      </Modal>
    );
  }
}

export default TagModal;
