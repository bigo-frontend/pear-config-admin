import React, { Component } from 'react';
import { registerFormField, connect } from '@uform/react';
import { getToken, getEnv } from '@/utils/utils';
import { message } from 'antd';
import styles from './index.less';
import config from '../../../../config/admin.config.js';

const { apiPrefix } = config;

class RichText extends Component {

  componentDidMount() {
    this.createEditor();
  }

  componentWillUnmount() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  createEditor() {
    const { value, onChange } = this.props;
    const uploadUrl = `${apiPrefix}/material/upload`;
    this.editor = window.CKEDITOR.replace(this.refs.editor, {
      uploadUrl,
      filebrowserUploadUrl: uploadUrl,
    });
    this.editor.setData(value || '');

    this.editor.on('fileUploadRequest', (evt) => {
      const { xhr, file } = evt.data.fileLoader;
      const isLt500K = file.size / 1024 < 500;
      if (!isLt500K) {
        message.error('图片必须小于 500 Kb!');
        evt.stop();
        return;
      }

      xhr.setRequestHeader('Authorization', getToken());
      evt.data.requestData.envId = getEnv()._id;
    });

    this.editor.on('fileUploadResponse', (evt) => {
      // Prevent the default response handler.
      evt.stop();

      // Get XHR and response.
      const { data } = evt;
      const { xhr } = data.fileLoader;
      const response = JSON.parse(xhr.responseText);

      if (!response.status) {
        // An error occurred during upload.
        data.message = response.msg;
        evt.cancel();
      } else {
        data.url = response.data.link;
        setTimeout(() => {
          onChange(evt.editor.getData())
        }, 0);
      }
    });

    this.editor.on('change', (evt) => {
      onChange(evt.editor.getData())
    });
  }

  render() {
    return (
      <div className={styles.richTextEditor}>
        <div ref="editor" name="editor" id="editor" />
      </div>
    )
  }
}

export default registerFormField(
  'richText',
  connect()(props =>
    <RichText
      {...props}
      value={props.value}
    />
  )
);