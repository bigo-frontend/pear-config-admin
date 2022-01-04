import React, { Component } from 'react';
import { Table, Modal, Button } from 'antd';
import styles from '../index.less';
import 'antd/dist/antd.css';

class PublishRecordsModal extends Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.state = {
      visible: false,
    };
  }

  handleShow() {
    this.setState({
      visible: true,
    });
  }

  handlePageChange(value) {
    const { keyValueManagement, dispatch } = this.props;
    const { publishRecords, publishRecordsPagination } = keyValueManagement;
    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        publishRecordsPagination: {
          ...publishRecordsPagination,
          pageIndex: value
        }
      },
    });

    dispatch({
      type: 'keyValueManagement/getKeyValuePublishRecords',
      payload: {
        configRef: publishRecords[0].configId
      },
    });
  }

  handleRollback(record) {
    const { dispatch } = this.props;

    this.setState({
      visible: false,
    });

    dispatch({
      type: 'keyValueManagement/publishRecordRollback',
      payload: {
        configId: record.configId,
        recordId: record._id,
      },
    });
  }

  handlePreview(record, mode) {
    const { dispatch } = this.props;
    dispatch({
      type: 'keyValueManagement/recordPreview',
      payload: {
        mode,
        _id: record._id,
      },
    });
  }

  handleHide() {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { keyValueManagement } = this.props;
    const { publishRecords, publishRecordsPagination } = keyValueManagement;

    const columns = [
      {
        title: '发布id',
        dataIndex: '_id',
      },
      {
        title: '发布时间',
        dataIndex: 'lastEditTime',
        render: text => {
          return new Date(text).format('yyyy-MM-dd hh:mm:ss');
        },
      },
      {
        title: '操作',
        render: record => {
          return (
            <div>
              <Button type="primary" size="small" onClick={this.handleRollback.bind(this, record)}>
                回滚
              </Button>
              <Button size="small" style={{ marginLeft: '10px' }} onClick={this.handlePreview.bind(this, record, 'prod')}>
                预览
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <Modal
        title="历史发布版本"
        className={styles.keyValueModal}
        visible={this.state.visible}
        onOk={this.handleHide}
        onCancel={this.handleHide}
      >
        <Table
          columns={columns}
          dataSource={publishRecords}
          pagination={{ pageSize: publishRecordsPagination.pageSize, current: publishRecordsPagination.pageIndex, total: publishRecordsPagination.total, onChange: this.handlePageChange }}
        />
      </Modal>
    );
  }
}

export default PublishRecordsModal;
