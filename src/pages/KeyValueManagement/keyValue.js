import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Icon, Divider, Dropdown, Row, Col, Table, Input, Select, Radio, Modal, Menu, Tag, Checkbox, Button } from 'antd';
import { FormButtonGroup, SchemaForm, Submit, Reset } from '@uform/antd';
import { createFormActions } from '@uform/react';
import * as queryString from 'query-string';
import Json from '@/components/extendedFormField/Json';
import UploadImage from '@/components/extendedFormField/UploadImage';
import FormModal from './formModal';
import KeyValueModal from './keyValueModal';
import DraftModal from './draftModal';
import PublishRecordsModal from './publishRecordsModal';
import TagModal from './tagModal';
import { getEnv } from '@/utils/utils';
import schema from './schema.js';
import styles from './index.less';


const actions = createFormActions();
const { confirm } = Modal;

@connect(({ keyValueManagement, global }) => ({
  keyValueManagement,
  global
}))
class KeyValue extends Component {
  constructor(props) {
    super(props);
    this.handleChangeRelatedSearch = this.handleChangeRelatedSearch.bind(this);
    this.handleChangeTagSearch = this.handleChangeTagSearch.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.showFormModal = this.showFormModal.bind(this);
    this.showKeyValueModal = this.showKeyValueModal.bind(this);
    this.handleRecord = this.handleRecord.bind(this);
  }

  showFormModal() {
    this.refs.formModal.handleShow();
  }

  showKeyValueModal() {
    this.refs.keyValueModal.handleShow();
  }

  handleChangeRelatedSearch(value) {
    const { dispatch } = this.props;

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        related: value
      }
    });

    dispatch({ type: 'keyValueManagement/getKeyValueConfig' });
  }

  handleChangeTagSearch(value) {
    const { dispatch } = this.props;

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        searchTag: value
      }
    });
    dispatch({ type: 'keyValueManagement/getKeyValueConfig' });
  }

  handleSearch(value) {
    const { keyValueManagement, dispatch } = this.props;
    const { pagination } = keyValueManagement;
    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        searchKey: value.trim(),
        pagination: {
          ...pagination,
          pageIndex: 1
        }
      },
    });

    dispatch({ type: 'keyValueManagement/getKeyValueConfig' });
  }

  handlePageChange(value) {
    const { keyValueManagement, dispatch } = this.props;
    const { pagination } = keyValueManagement;
    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        pagination: {
          ...pagination,
          pageIndex: value
        }
      },
    });

    dispatch({ type: 'keyValueManagement/getKeyValueConfig' });
  }

  handleCreate() {
    const { dispatch, keyValueManagement } = this.props;
    const { currentForm } = keyValueManagement;

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        currentForm: {},
        currentKeyValue: {},
      },
    });

    this.showFormModal();
  }

  handleCopy(record) {
    const { dispatch } = this.props;
    confirm({
      title: '确定复制这条记录？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'keyValueManagement/copyKeyValue',
          payload: {
            _id: record._id,
          },
        });
      },
      onCancel() { },
    });
  }

  handleTag(record) {
    const { dispatch } = this.props;

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        currentKeyValue: record,
      },
    });

    this.refs.tagModal.handleShow(record);
  }

  handleEdit(record) {
    const { keyValueManagement, dispatch } = this.props;
    const { envList = [] } = keyValueManagement;

    dispatch({
      type: 'keyValueManagement/getSchema',
      payload: {
        formId: record.formId,
      },
    });

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        currentKeyValue: record,
      },
    });

    this.showKeyValueModal();
  }

  handleDelete(record) {
    const { dispatch } = this.props;
    confirm({
      title: '确定删除这条记录？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'keyValueManagement/deleteKeyValue',
          payload: {
            _id: record._id,
          },
        });
      },
      onCancel() { },
    });
  }

  handleDraft(record) {
    const { keyValueManagement, dispatch } = this.props;
    const { draftPagination } = keyValueManagement;

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        draftPagination: {
          ...draftPagination,
          pageIndex: 1
        }
      },
    });

    dispatch({
      type: 'keyValueManagement/getKeyValueDraft',
      payload: {
        configRef: record._id
      },
    });

    this.refs.draftModal.handleShow();
  }

  handleRecord(record) {
    const { keyValueManagement, dispatch } = this.props;
    const { publishRecordsPagination } = keyValueManagement;

    dispatch({
      type: 'keyValueManagement/updateData',
      payload: {
        publishRecordsPagination: {
          ...publishRecordsPagination,
          pageIndex: 1
        }
      },
    });

    dispatch({
      type: 'keyValueManagement/getKeyValuePublishRecords',
      payload: {
        configRef: record._id
      },
    });

    this.refs.recordsModal.handleShow();
  }

  handlePublish(record, status) {
    const { dispatch } = this.props;
    confirm({
      title: status === 'gray' ? '确定发布到灰度？' : '确定发布这条记录？',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'keyValueManagement/publishKeyValue',
          payload: {
            _id: record._id,
            status,
            envId: getEnv()._id
          },
        });
      },
      onCancel() { },
    });
  }

  handleOffline(record) {
    const { dispatch } = this.props;
    confirm({
      title: '确定下线这条记录？',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'keyValueManagement/offlineKeyValue',
          payload: {
            _id: record._id,
          },
        });
      },
      onCancel() { },
    });
  }

  handlePreview(record, mode) {
    const { keyValueManagement, dispatch } = this.props;
    const { envList } = keyValueManagement;
    dispatch({
      type: 'keyValueManagement/previewKeyValue',
      payload: {
        grayCdnUrl: record.grayCdnUrl,
        cdnUrl: record.cdnUrl,
        mode,
        _id: record._id,
      },
    });
  }

  render() {
    const self = this;
    const { keyValueManagement, dispatch } = this.props;
    const { currentUser } = this.props.global;
    const { envList, tagList, formConfigData, currentForm, keyValueConfigData, related, pagination } = keyValueManagement;

    keyValueConfigData.forEach((d, index) => {
      d.key = `${d._id}${Date.now()}`;
    });

    const tagMap = {
      draft: <Tag color="#999999">草稿</Tag>,
      reedit: <Tag color="#999999">重新编辑未发布</Tag>,
      approving: <Tag color="#999999">审批中</Tag>,
      gray: <Tag color="#999999">灰度</Tag>,
      offline: <Tag color="#999999">已下线</Tag>,
      online: <Tag color="#2db7f5">已发布</Tag>,
    };

    const columns = [
      {
        title: 'id',
        dataIndex: '_id',
      },
      {
        title: '配置名称',
        dataIndex: 'title',
      },
      {
        title: '作者',
        dataIndex: 'author'
      },
      {
        title: '标签',
        dataIndex: 'tags',
        width: 80,
        render: tags => {
          return tags.map((tag, i) => {
            return <Tag color="#2db7f5" key={i}>{tag}</Tag>
          });
        },
      },
      {
        title: '状态',
        dataIndex: 'status',
        width: 80,
        render: text => {
          return tagMap[text] || text;
        },
      },
      {
        title: '最后修改时间',
        dataIndex: 'lastEditTime',
        width: 120,
        render: text => {
          return new Date(text).format('yyyy-MM-dd hh:mm:ss');
        },
      },
      {
        title: '操作',
        width: 260,
        render: record => {

          const menu1 = (
            <Menu>
              <Menu.Item key="1" onClick={this.handleCopy.bind(this, record)}>
                <Icon type="copy" />
                复制
              </Menu.Item>
              <Menu.Item key="2" onClick={this.handleTag.bind(this, record)}>
                <Icon type="tags" />
                标签
              </Menu.Item>
              <Menu.Item key="3" onClick={this.handleDelete.bind(this, record)} type="danger">
                <Icon type="delete" />
                删除
              </Menu.Item>
            </Menu>
          );


          const menu2 = (
            <Menu>
              <Menu.Item key="1" onClick={this.handlePublish.bind(this, record, 'gray')}>
                <Icon type="cloud-upload" />
                发布到灰度
              </Menu.Item>
              <Menu.Item key="2" onClick={this.handleDraft.bind(this, record)}>
                <Icon type="branches" />
                历史编辑版本
              </Menu.Item>
              <Menu.Item key="3" onClick={this.handleRecord.bind(this, record)}>
                <Icon type="branches" />
                历史发布版本
              </Menu.Item>
            </Menu>
          );

          const menu3 = (
            <Menu>
              {
                record.status === 'online' ? (
                  <Menu.Item key="1" onClick={this.handlePreview.bind(this, record, 'preview')}>
                    <Icon type="eye" />
                    预览
                  </Menu.Item>
                ) : (
                  record.cdnUrl ? (
                    <Menu.Item key="2" onClick={this.handlePreview.bind(this, record, 'publish')}>
                      <Icon type="eye" />
                      查看生产配置
                    </Menu.Item>
                  ) : null
                )
              }
              {
                record.grayCdnUrl ? (
                  <Menu.Item key="3" onClick={this.handlePreview.bind(this, record, 'gray')}>
                    <Icon type="eye" />
                    查看灰度配置
                  </Menu.Item>
                ) : null
              }
            </Menu>
          );

          return (
            <div>
              <Dropdown.Button className="btn-box" onClick={this.handleEdit.bind(this, record)} overlay={menu1}>
                <Icon type="edit" />
                修改
              </Dropdown.Button>
              {
                record.status === 'online' ? (
                  <Dropdown.Button className="btn-box" onClick={this.handleOffline.bind(this, record)} overlay={menu2}>
                    <Icon type="cloud-download" />
                    下线
                  </Dropdown.Button>
                ) : (
                  <Dropdown.Button className="btn-box" onClick={this.handlePublish.bind(this, record, 'online')} overlay={menu2}>
                    <Icon type="cloud-upload" />
                    发布
                  </Dropdown.Button>
                )
              }
              <Dropdown.Button className="btn-box" onClick={() => { this.handlePreview.bind(this, record, record.status === 'online' ? 'publish' : 'preview')(); }} overlay={menu3}>
                <Icon type="eye" />
                {record.status === 'online' ? '查看' : '预览'}
              </Dropdown.Button>
            </div>
          );
        },
      },
    ];

    return (
      <Card className={styles.keyValueManagement}>
        <Row>
          <Col span={2}>
            <Button type="primary" onClick={this.handleCreate}>
              新增配置
            </Button>
          </Col>
          <Col span={22}>
            <Input.Group compact>
              <Select style={{ width: '150px' }} defaultValue={related} onChange={this.handleChangeRelatedSearch}>
                <Select.Option key="1" value="self">和我相关</Select.Option>
                <Select.Option key="1" value="all">全部</Select.Option>
              </Select>
              <Select style={{ width: '200px' }} placeholder="通过标签筛选" onChange={this.handleChangeTagSearch}>
                <Select.Option key="all" value="">全部</Select.Option>
                {
                  tagList.map((tag, index) => {
                    return <Select.Option value={tag.title} key={index}>{tag.title}</Select.Option>
                  })
                }
              </Select>
              <Input.Search style={{ width: '400px' }} placeholder="请输入id或配置名称或作者" onSearch={this.handleSearch} enterButton />
            </Input.Group>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={keyValueConfigData}
          pagination={{ pageSize: pagination.pageSize, current: pagination.pageIndex, total: pagination.total, onChange: this.handlePageChange }}
        />
        {/* schema配置表单 */}
        <FormModal
          ref="formModal"
          keyValueManagement={keyValueManagement}
          dispatch={dispatch}
          showKeyValueModal={this.showKeyValueModal}
        />
        {/* key-value配置表单 */}
        <KeyValueModal
          ref="keyValueModal"
          keyValueManagement={keyValueManagement}
          dispatch={dispatch}
          showFormModal={this.showFormModal}
        />
        {/* key-value配置草稿列表 */}
        <DraftModal ref="draftModal" keyValueManagement={keyValueManagement} dispatch={dispatch} />
        {/* 发布记录配置草稿列表 */}
        <PublishRecordsModal ref="recordsModal" keyValueManagement={keyValueManagement} dispatch={dispatch} />
        {/* 标记tag表单 */}
        <TagModal ref="tagModal" keyValueManagement={keyValueManagement} dispatch={dispatch} />
      </Card>
    );
  }
}

export default KeyValue;
