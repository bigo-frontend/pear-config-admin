import React, { Component } from 'react';
import { Card, Divider, Row, Col, Table, Select, Radio, Modal, Tag, Checkbox, Button } from 'antd';
import { FormButtonGroup, SchemaForm, Submit, Reset } from '@uform/antd';
import { createFormActions } from '@uform/react';
import Json from '@/components/extendedFormField/Json';
import UploadImage from '@/components/extendedFormField/UploadImage';
import { getEnv } from '@/utils/utils';
import schema from '../schema.js';
import styles from '../index.less';


const actions = createFormActions();
const { confirm } = Modal;

class KeyValueModal extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEditForm = this.handleEditForm.bind(this);
    this.state = {
      visible: false,
      formId: '0',
      keyValueConfig: {},
    };
  }

  handleShow() {
    this.tags = [];
    this.setState({
      visible: true,
    });
  }

  handleSubmit(values) {
    const { dispatch, keyValueManagement } = this.props;
    const { currentKeyValue, currentForm } = keyValueManagement;

    let type = '';
    let payload = {
      title: this.configTitle,
      config: values,
      envId: getEnv()._id,
      formId: currentForm._id,
    };

    if (currentKeyValue._id) {
      type = 'keyValueManagement/editKeyValue';
      payload._id = currentKeyValue._id;
    } else {
      type = 'keyValueManagement/createKeyValue';
      payload.tags = this.tags || [];
    }
    dispatch({ type, payload });

    this.setState({
      visible: false,
    });
  }

  handleOk() {
    actions.submit();
  }

  handleCancel() {
    const { dispatch } = this.props;

    this.setState({
      visible: false,
    });

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        currentKeyValue: {},
        currentForm: {},
      },
    });
  }

  handleReset() {
    this.setState({
      keyValueConfig: {},
    });
  }

  handleEditForm() {
    this.setState({
      visible: false,
    });

    this.props.showFormModal();
  }

  render() {
    const self = this;
    const { keyValueManagement } = this.props;
    const { tagList, currentForm, currentKeyValue } = keyValueManagement;

    const tagOptions = tagList.map(tag => tag.title);
    const schema = {
      type: 'object',
      properties: {
        title: {
          title: '配置名称',
          type: 'string',
        }
      }
    }

    if (!currentKeyValue._id) {
      schema.properties.tags = {
        title: '标签',
        type: 'checkbox',
        enum: tagOptions,
      }
    }

    return (
      <Modal
        title="k-v配置"
        className={styles.keyValueModal}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <SchemaForm
          actions={actions}
          key={Date.now().toString(32)}
          initialValues={currentKeyValue}
          schema={schema}
          labelCol={6}
          wrapperCol={18}
          effects={$ => {
            $('onFieldChange', 'title').subscribe(fieldState => {
              if (fieldState.value && fieldState.value !== self.configTitle) {
                self.configTitle = fieldState.value;
              }
            });
            $('onFieldChange', 'tags').subscribe(fieldState => {
              console.log(fieldState.value);
              if (fieldState.value && fieldState.value !== self.tags) {
                self.tags = fieldState.value;
              }
            });
          }}
        />
        {
          currentKeyValue._id ? <Button className="reedit-form" type="primary" ghost onClick={this.handleEditForm}>修改表单</Button> : null
        }
        <Divider style={{ marginTop: 0 }} />
        <SchemaForm
          actions={actions}
          key={Date.now()}
          onSubmit={this.handleSubmit}
          schema={currentForm.jsonSchema}
          initialValues={currentKeyValue.config}
          labelCol={6}
          wrapperCol={18}
        />
      </Modal>
    );
  }
}

export default KeyValueModal;
