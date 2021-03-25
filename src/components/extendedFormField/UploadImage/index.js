import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { registerFormField, connect } from '@uform/react';
import styles from './index.less';
import { getToken, getEnv } from '@/utils/utils';
import config from '../../../../config/admin.config.js';

let { apiPrefix } = config;

class UploadImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: this.initFileList(this.props.value).map(file => file.url),
      loading: false,
      fileList: this.initFileList(this.props.value)
    }
    // 若值为空，返回空字符串
    if (!this.props.value) {
      this.props.onChange('');
    }
  }

  initFileList(value) {
    if (!value) {
      return [];
    }
    let data = typeof value === 'string' ? [ value ] : [ ...value ];
    return data.map((url, index) => {
      return {
        uid: `-${index}`,
        name: `image-${index}.png`,
        status: 'done',
        url
      }
    })
  }
  
  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('你只可以上传 JPG/PNG 文件!');
    }
    const isLt500K = file.size / 1024 < 500;
    if (!isLt500K) {
      message.error('图片必须小于 500 Kb!');
    }
    return isJpgOrPng && isLt500K;
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      // 必须每次都维护fileList，否则会遇到 onChange 只调用一次的问题，请参考 #2423
      // https://github.com/ant-design/ant-design/issues/2423
      this.setState({
        loading: true,
        fileList: [...info.fileList]
      })
    }
    if (info.file.status === 'done' && info.file.response && info.file.response.status) {
      let imageUrl = info.file.response.data.link;
      let newImageUrl = [...this.state.imageUrl, imageUrl];
      this.setState({
        loading: false,
        imageUrl: newImageUrl,
        fileList: this.initFileList(newImageUrl)
      })
      this.props.onChange(newImageUrl.length <= 1 ? newImageUrl[0] : newImageUrl);
    }
    if (info.file.status === 'removed') {
      let newImageUrl = this.state.imageUrl.filter(url => url !== info.file.url); 
      this.setState({
        imageUrl: newImageUrl,
        fileList: this.initFileList(newImageUrl)
      })
      this.props.onChange(newImageUrl.length <= 1 ? (newImageUrl[0] || '') : newImageUrl);
    }
  };

  render() {
    const uploadButton = (
      <div>
        <div className="ant-upload-text">
          {
            this.state.loading ? <Icon type="loading" /> : <Icon type="plus-circle" />
          }
        </div>
      </div>
    );
    const { imageUrl, fileList } = this.state;
    return (
      <Upload
        name="image"
        listType="picture-card"
        className="image-uploader"
        headers={{Authorization: getToken()}}
        data ={{ envId: getEnv()._id }}
        fileList={fileList}
        action={`${apiPrefix}/material/upload`}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {uploadButton}
      </Upload>
    );
  }
}

export default registerFormField(
  'uploadImage',
  connect()(props => 
    <UploadImage
      key={`${Date.now()}${Math.floor(Math.random() * 10000)}`}
      {...props}
      value={props.value} 
    />
  )
);
