import React, { useState, useEffect } from 'react';
import { Input, Message, Form } from '@alifd/next';
import { useRequest, useHistory, store as appStore } from 'ice';
import { v1 } from 'uuid';

import accountService from '@/services/account';
import { WebCache } from '@/utils/cache';

import styles from './index.module.scss';

const { Item } = Form;
let imgToken = v1();

export interface IDataSource {
  username?: string;
  password?: string;
  imgCode?: string;
  imgToken?: string;
  imgSrc?: string
}

const DEFAULT_DATA: IDataSource = {
  username: 'anakin',
  password: '123456',
  imgCode: '1',
  imgToken,
  imgSrc: `/api/imgcode/${imgToken}`,
};
interface LoginProps {
  // eslint-disable-next-line react/require-default-props
  dataSource?: IDataSource;
}


const LoginBlock: React.FunctionComponent<LoginProps> = (props: LoginProps): JSX.Element => {
  const {
    dataSource = DEFAULT_DATA,
  } = props;

  const history = useHistory();
  const [postData, setValue] = useState(dataSource);

  const { request, loading } = useRequest(accountService.login);
  const [systemConst, dispatchers] = appStore.useModel('systemConst');

  const onSubmit = (e: Event) => {
    e.preventDefault();
  }
  const imgChange = () => {
    imgToken = v1();
    setValue({ imgToken, imgSrc: '/api/imgcode/' + imgToken });
  }
  const formChange = (values: IDataSource) => {
    setValue(values);
  };
  const handleSubmit = async (values: IDataSource, errors: []) => {
    if (errors) {
      return;
    }
    delete values.imgSrc;
    const result = await request(values);
    if (result?.code === 200) {
      await accountService.saveCredentials(result.data);
      Message.success('登录成功');
      const params = new URLSearchParams(history.location.search);
      const returnUrl = params.get('returnUrl');
      if (returnUrl) {
        history.push(returnUrl);
      } else {
        history.push('/admin');
      }
    }
  };

  const accountForm = <>
    <Item required requiredMessage="必填">
      <Input
        name="username"
        maxLength={20}
        placeholder="用户名"
      />
    </Item>
    <Item required requiredMessage="必填" >
      <Input.Password
        name="password"
        htmlType="password"
        placeholder="密码"
      />
    </Item>
    <Item required requiredMessage="必填" style={{ marginBottom: 0 }}>
      <Input
        innerAfter={
          <img onClick={() => imgChange()} className={styles.inputImg} src={postData.imgSrc} />
        }
        name="imgCode"
        maxLength={6}
        placeholder="验证码"
      />
    </Item>
  </>;

  useEffect(() => {
    const cache = new WebCache();
    cache.clear();
    dispatchers.getWebConfig();
  }, []);

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        <a href="#" >
          {systemConst.webConfig.logo &&
            <img
              className={styles.logo}
              src={systemConst.webConfig.logo}
              alt="logo"
            />
          }
          <span className={styles.title}>{systemConst.webConfig.title}</span>
        </a>
        <div className={styles.desc}>
          <span>用户登录</span>
        </div>

        <Form value={postData} onChange={formChange} size="large" onSubmit={onSubmit.bind(this)}>
          {accountForm}
          <Item
            style={{
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <Form.Submit
              htmlType="submit"
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              {loading ? '登录中...' : '登 录'}
            </Form.Submit>
          </Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginBlock;
