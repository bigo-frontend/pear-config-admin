import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import ReactMarkdown from 'react-markdown';
import homeText from './doc/home.js';
import styles from './index.less';

@connect(({ doc, global }) => ({
  doc,
  global
}))
class Doc extends Component {

  render() {
    const { type } = this.props.doc;
    let text = homeText;

    return (
      <div className={styles.doc}>
        <Card bordered={false} className={styles.md}>
          <ReactMarkdown
            source={text}
          />
        </Card>
      </div>
    )
  }
};

export default Doc;
