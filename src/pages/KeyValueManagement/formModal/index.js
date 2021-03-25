import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
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

class FormModal extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGetSchema = this.handleGetSchema.bind(this);
    this.state = {
      visible: false,
    };
  }

  handleShow() {
    this.setState({
      visible: true,
    });
  }

  handleGetSchema(value) {
    const { dispatch } = this.props;

    if (value === 'default') {
      dispatch({
        type: 'keyValueManagement/updateData',
        payload: {
          currentForm: {
            _id: 'default',
            jsonSchema: schema.keyValueDefault,
          },
        },
      });
    } else if (value === 'custom') {
      dispatch({
        type: 'keyValueManagement/updateData',
        payload: {
          currentForm: {
            _id: 'custom',
            jsonSchema: schema.keyValueCustom,
          },
        },
      });
    } else {
      dispatch({
        type: 'keyValueManagement/getSchema',
        payload: {
          formId: value,
        },
      });
    }
  }

  handleSubmit(values) {
    const { dispatch } = this.props;

    dispatch({ type: 'keyValueManagement/createFormConfig', payload: values });

    this.setState({
      visible: false,
    });

    this.props.showKeyValueModal();
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

  render() {
    const self = this;
    const { keyValueManagement } = this.props;
    const { envList, formConfigData, currentForm, keyValueConfigData } = keyValueManagement;

    return (
      <Modal
        title="表单schema配置"
        className={styles.keyValueModal}
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <SchemaForm
          actions={actions}
          key={Date.now().toString(32)}
          initialValues={{
            formId: currentForm._id || 'default',
          }}
          schema={{
            type: 'object',
            properties: {
              formId: {
                type: 'string',
                enum: [
                  { label: '默认模板', value: 'default' },
                  { label: '通用表单模板', value: 'custom' },
                ].concat(
                  formConfigData.map(config => {
                    return { label: config.formKey, value: config._id };
                  })
                ),
                title: '表单模板',
              },
            },
          }}
          labelCol={6}
          wrapperCol={18}
          effects={($, { setFieldState }) => {
            $('onFieldChange', 'formId').subscribe(fieldState => {
              if (fieldState.value !== undefined && fieldState.value !== currentForm._id) {
                self.handleGetSchema(fieldState.value);
              }
            });
          }}
        />
        <Button className="reedit-form" type="primary" onClick={() => {
          router.push('/systemManagement/formManagement');
        }}
        >
          新增模板
        </Button>
        <Divider style={{ marginTop: 0 }} />
        <SchemaForm
          actions={actions}
          key={Date.now()}
          onSubmit={this.handleSubmit}
          schema={{
            type: 'object',
            properties: {
              jsonSchema: {
                title: 'schema配置',
                type: 'json',
                'x-component': 'json',
              },
            },
          }}
          initialValues={{ jsonSchema: currentForm.jsonSchema || {} }}
          labelCol={6}
          wrapperCol={18}
        />
      </Modal>
    );
  }
}

export default FormModal;
