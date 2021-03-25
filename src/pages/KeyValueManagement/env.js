import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Modal, Button } from 'antd';
import { FormButtonGroup, SchemaForm, Submit, Reset } from '@uform/antd';
import { createFormActions } from '@uform/react';
import Json from '@/components/extendedFormField/Json';
import UploadImage from '@/components/extendedFormField/UploadImage';
import schema from './schema.js';
import styles from './index.less';


const actions = createFormActions();
const defaultDomin = 'http://127.0.0.1:9005/';

@connect(({ keyValueManagement, loading }) => ({
  keyValueManagement,
}))
class KeyValueManagement extends Component {
  constructor(props) {
    super(props);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.state = {
      modalVisible: false,
      envSchema: {},
      envConfig: {
        cdnDomain: defaultDomin,
      },
    };
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    let { _id, name, desc, cdnDomain } = values;
    let actionType = '';
    if (_id !== undefined) {
      actionType = 'keyValueManagement/editEnv';
    } else {
      actionType = 'keyValueManagement/createEnv';
    }
    dispatch({
      type: actionType,
      payload: {
        name,
        desc,
        cdnDomain,
      },
    });
    this.setState({
      modalVisible: false,
    });
  }

  handleCreate() {
    this.setState({
      modalVisible: true,
      envSchema: schema.envCreate,
      envConfig: {
        cdnDomain: defaultDomin,
      },
    });
  }

  handleEdit(record) {
    this.setState({
      modalVisible: true,
      envSchema: schema.envEdit,
      envConfig: record,
    });
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
      keyValueManagement,
      location: { pathname },
    } = this.props;
    const { envList } = keyValueManagement;

    envList.forEach((d, index) => {
      d.key = `${d._id}${Date.now()}`;
    });

    const columns = [
      {
        title: 'id',
        dataIndex: '_id',
      },
      {
        title: '空间名称',
        dataIndex: 'name',
      },
      {
        title: '空间描述',
        dataIndex: 'desc',
      },
      {
        title: 'cdn访问域名',
        dataIndex: 'cdnDomain',
      },
      {
        title: '操作',
        render: record => {
          return (
            <div>
              <Button type="primary" size="small" onClick={this.handleEdit.bind(this, record)}>
                修改
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <Card className={styles.keyValueManagement}>
        <Button type="primary" onClick={this.handleCreate}>
          新增空间
        </Button>
        <Table columns={columns} dataSource={envList} pagination={false} />
        <Modal
          title="空间配置"
          className={styles.envModal}
          visible={this.state.modalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <SchemaForm
            actions={actions}
            key={Date.now()}
            onSubmit={this.handleSubmit}
            schema={this.state.envSchema}
            initialValues={this.state.envConfig}
            labelCol={6}
            wrapperCol={18}
          />
        </Modal>
      </Card>
    );
  }
}

export default KeyValueManagement;
