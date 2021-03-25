import React, { Component } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
import { Layout, Card } from 'antd';
import {
  FormButtonGroup,
  SchemaForm,
  Submit,
  Reset
} from '@uform/antd';
import styles from './index.less';



@connect(({ global }) => ({
  global,
}))
class SelectEnv extends Component {
  
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch, global } = this.props;
    const { envList } = global;

    let envData = envList.find(env => env._id === values.env);

    dispatch({
      type: 'global/selectEnv',
      payload: {
        env: envData
      }
    })
    router.push('/');
  }

  render() {
    const { global } = this.props;
    const { envList } = global;

    const schema = {
      "type": "object",
      "properties": {
        "env": {
          "type": "string",
          "title": "请选择空间",
          "required": true,
          "enum": envList.map(env => {
            return {
              "value": env._id,
              "label": env.desc
            }
          })
        }
      }
    };

    return (
      <Layout className={styles.selectEnvLayout}>
        <Card className={styles.selectEnv}>
          <div>
            <SchemaForm
              key={Date.now()}
              onSubmit={this.handleSubmit}
              schema={schema}
              labelCol={6}
              wrapperCol={18}
            >
              <FormButtonGroup sticky style={{textAlign: "center"}}>
                <Submit title="提交" />
              </FormButtonGroup>
            </SchemaForm>
          </div>
        </Card>
      </Layout>
    );
  }
}

export default SelectEnv;
