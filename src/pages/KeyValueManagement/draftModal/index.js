import React, { Component } from 'react';
import { Card, Divider, Row, Col, Table, Select, Radio, Modal, Tag, Checkbox, Button } from 'antd';
import styles from '../index.less';


class DraftModal extends Component {
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
    const { keyValueDraft, draftPagination } = keyValueManagement;
    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        draftPagination: {
          ...draftPagination,
          pageIndex: value
        }
      },
    });

    dispatch({
      type: 'keyValueManagement/getKeyValueDraft',
      payload: {
        configRef: keyValueDraft[0].configId
      },
    });
  }

  handleRollback(record) {
    const { dispatch } = this.props;

    this.setState({
      visible: false,
    });

    dispatch({
      type: 'keyValueManagement/rollbackKeyValue',
      payload: {
        configId: record.configId,
        draftId: record._id,
      },
    });
  }

  handlePreview(record, mode) {
    const { keyValueManagement, dispatch } = this.props;
    const { envList } = keyValueManagement;
    dispatch({
      type: 'keyValueManagement/previewKeyValue',
      payload: {
        cdnUrl: record.cdnUrl,
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
    const self = this;
    const { keyValueManagement } = this.props;
    const { keyValueDraft, draftPagination } = keyValueManagement;

    const columns = [
      {
        title: '草稿id',
        dataIndex: '_id',
      },
      {
        title: '创建时间',
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
              <Button size="small" style={{ marginLeft: '10px' }} onClick={this.handlePreview.bind(this, record, 'draft')}>
                预览
              </Button>
            </div>
          );
        },
      },
    ];

    return (
      <Modal
        title="历史版本"
        className={styles.keyValueModal}
        visible={this.state.visible}
        onOk={this.handleHide}
        onCancel={this.handleHide}
      >
        <Table
          columns={columns}
          dataSource={keyValueDraft}
          pagination={{ pageSize: draftPagination.pageSize, current: draftPagination.pageIndex, total: draftPagination.total, onChange: this.handlePageChange }}
        />
      </Modal>
    );
  }
}

export default DraftModal;
