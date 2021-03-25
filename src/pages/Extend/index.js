import React, { Component } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import {
  FormButtonGroup,
  SchemaForm,
  Submit,
  Reset
} from '@uform/antd';
import Json from '@/components/extendedFormField/Json';
import UploadImage from '@/components/extendedFormField/UploadImage';
import styles from './index.less';



@connect(({ extend, loading }) => ({
  extend,
}))
class Extend extends Component {
  
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    dispatch({
      type: 'extend/submit',
      payload: {
        ...values
      }
    })
  }

  render() {
    const { extend, location: { pathname } } = this.props;
    const { jsonSchema, requestUrl, requestMethod, data, titile } = extend;

    return (
      <Card>
        <div className={styles.main}>
          <SchemaForm
            key={Date.now()}
            onSubmit={this.handleSubmit}
            schema={jsonSchema}
            initialValues={data}
            labelCol={6}
            wrapperCol={18}
          >
            <FormButtonGroup sticky style={{textAlign: "center"}}>
              <Submit />
              <Reset />
            </FormButtonGroup>
          </SchemaForm>
        </div>
      </Card>
    );
  }
}

export default Extend;
