import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Modal, Button } from 'antd';
import { FormButtonGroup, SchemaForm, Submit, Reset } from '@uform/antd';
import { createFormActions } from '@uform/react';
import Json from '@/components/extendedFormField/Json';
import UploadImage from '@/components/extendedFormField/UploadImage';
import { getEnv } from '@/utils/utils';
import schema from './schema.js';
import styles from './index.less';


const actions = createFormActions();
const { confirm } = Modal;

@connect(({ formManagement }) => ({
  formManagement,
}))
class FormManagement extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      modalVisible: false,
      previewModalVisible: false,
      formConfig: {},
      previewSchema: {}
    };
  }

  handlePageChange(value) {
    const { formManagement, dispatch } = this.props;
    const { pagination } = formManagement;
    dispatch({
      type: 'formManagement/updateData',
      payload: {
        pagination: {
          ...pagination,
          pageIndex: value
        }
      },
    });

    dispatch({ type: 'formManagement/getFormConfig' });
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    let { _id, key, ...rest } = values;
    let actionType = '';
    if (_id !== undefined) {
      actionType = 'formManagement/editFormConfig';
    } else {
      actionType = 'formManagement/createFormConfig';
    }
    dispatch({
      type: actionType,
      payload: {
        _id,
        envId: getEnv()._id,
        ...rest,
      },
    });
    this.setState({
      modalVisible: false,
    });
  }

  handleCreate() {
    this.setState({
      modalVisible: true,
      formConfig: {},
    });
  }

  handleEdit(record) {
    this.setState({
      modalVisible: true,
      formConfig: record,
    });
  }

  handleDelete(record) {
    const { dispatch } = this.props;
    confirm({
      title: '???????????????????????????',
      okText: '??????',
      okType: 'danger',
      cancelText: '??????',
      onOk() {
        dispatch({
          type: 'formManagement/deleteFormConfig',
          payload: {
            _id: record._id,
          },
        });
      },
      onCancel() {},
    });
  }

  handlePreview(record) {
    this.setState({
      previewModalVisible: true,
      previewSchema: record.jsonSchema
    })
  }

  handleOk() {
    actions.submit();
  }

  handleCancel() {
    this.setState({
      modalVisible: false,
    });
  }

  render() {
    const {
      formManagement,
      location: { pathname },
    } = this.props;
    const { formConfigData, pagination } = formManagement;

    const columns = [
      {
        title: '????????????',
        dataIndex: 'formKey',
      },
      {
        title: '??????',
        render: record => {
          return (
            <div>
              <Button type="primary" size="small" onClick={this.handleEdit.bind(this, record)}>
                ??????
              </Button>
              <Button type="danger" size="small" onClick={this.handleDelete.bind(this, record)}>
                ??????
              </Button>
              <Button size="small" onClick={this.handlePreview.bind(this, record)}>
                ??????
              </Button>
            </div>
          );
        },
      },
    ];

    formConfigData.forEach((d, index) => {
      d.key = d._id;
    });

    return (
      <Card className={styles.formManagement}>
        <Button type="primary" onClick={this.handleCreate}>
          ????????????
        </Button>
        <Table
          columns={columns}
          dataSource={formConfigData}
          pagination={{ pageSize: pagination.pageSize, current: pagination.pageIndex, total: pagination.total, onChange: this.handlePageChange }}
        />
        <Modal
          title="????????????"
          className={styles.formManagementModal}
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <SchemaForm
            actions={actions}
            key={Date.now()}
            onSubmit={this.handleSubmit}
            schema={schema}
            initialValues={this.state.formConfig}
            labelCol={6}
            wrapperCol={18}
          />
        </Modal>
        <Modal
          title="????????????"
          className={styles.formManagementModal}
          visible={this.state.previewModalVisible}
          footer={null}
          onCancel={() => { this.setState({ previewModalVisible: false }); }}
        >
          <SchemaForm
            key={Date.now()}
            schema={this.state.previewSchema}
            labelCol={6}
            wrapperCol={18}
          />
        </Modal>
      </Card>
    );
  }
}

export default FormManagement;
