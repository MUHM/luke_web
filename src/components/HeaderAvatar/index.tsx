import React, { useState } from 'react';
import { Avatar, Overlay, Menu, Message, Icon, Field, Dialog, Form, Input } from '@alifd/next';
import { useRequest, useHistory } from 'ice';
import accountService from '@/services/account';
import styles from './index.module.scss';
import github from './github.png';
import { WebCache } from '@/utils/cache';

const { Item } = Menu;
const { Popup } = Overlay;

const UserProfile = ({ name, avatar, mail }) => (
  <div className={styles.profile}>
    <div className={styles.avatar}>
      <Avatar src={avatar} alt="用户头像" />
    </div>
    <div className={styles.content}>
      <h4>{name}</h4>
      <span>{mail}</span>
    </div>
  </div>
);

const HeaderAvatar = props => {
  const { name, avatar } = props;
  const [dialogVisible, setVisible] = useState(false);
  const history = useHistory();
  const cache = new WebCache();
  const logout = () => {
    cache.clear();
    Message.success('注销成功');
    history.push('/user/login');
  }
  const field = Field.useField({});
  const { init } = field;
  const { request, loading } = useRequest(accountService.password);
  const onOk = async () => {
    const { errors } = await field.validatePromise();
    if (errors) {
      return;
    }
    const data = field.getValues();
    const result = await request(data);
    if (result?.code === 200) {
      Message.success(result.message);
      setVisible(false);
      setTimeout(logout, 1000);
    }
  }

  const onOpen = () => {
    field.setValues({});
    setVisible(true);
  }

  const onClose = () => setVisible(false);

  const checkPass = (_rule, value) => {
    const { validate } = field;
    if (value) {
      validate(['confirmPwd']);
    }
    return Promise.resolve(null);
  }

  const checkPass2 = (_rule, value) => {
    const { getValue } = field;
    if (value && value !== getValue('newPwd')) {
      return Promise.reject('两次输入的密码不一致');
    } else {
      return Promise.resolve(null);
    }
  }

  const cleanCache = () => {
    for (let i = 0; i < cache.storage.length; i++) {
      let key = cache.key(i);
      if (key && key !== 'credentials') {
        cache.removeItem(key)
      }
    }
    location.reload();
  }

  return (
    <div>
      <Popup
        trigger={
          <div className={styles.headerAvatar}>
            <Avatar size="small" src={avatar} alt="用户头像" />
            <span
              style={{
                marginLeft: 10,
              }}
            >
              {name}
            </span>
          </div>
        }
        triggerType="click"
      >
        <div className={styles.avatarPopup}>
          <UserProfile {...props} />
          <Menu className={styles.menu}>
            <Item onClick={onOpen}>
              <Icon size="small" type="set" />
              修改密码
            </Item>
            {/* <Item>
              <Icon size="small" type="account" />
              修改密码
            </Item> */}
            <Item onClick={cleanCache}>
              <Icon size="small" type="delete-filling" />
              清理缓存
            </Item>
            <Item onClick={logout} >
              <Icon size="small" type="exit" />
              退出
            </Item>
          </Menu>
        </div>
      </Popup>
      <Dialog
        style={{ width: 640 }}
        visible={dialogVisible}
        okProps={{ loading }}
        onOk={onOk}
        // closeMode={{ ['close', 'esc', 'mask']}}
        onCancel={onClose}
        onClose={onClose}
        title="修改密码"
        hasMask={true}
      >
        <Form field={field} labelCol={{ fixedSpan: 6 }} wrapperCol={{ span: 14 }}>
          <Form.Item required label="旧密码"  >
            <Input
              htmlType="password"
              {...init('oldPwd', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>

          <Form.Item required label="新密码"  >
            <Input
              htmlType="password"
              {...init('newPwd', {
                rules: [{ required: true, message: '必填选项', validator: checkPass }],
              })}
            />
          </Form.Item>

          <Form.Item required label="确认密码"  >
            <Input
              htmlType="password"
              {...init('confirmPwd', {
                rules: [{ validator: checkPass2 }],
              })}
            />
          </Form.Item>
        </Form>
      </Dialog>
    </div>
  );
};

HeaderAvatar.defaultProps = {
  name: 'anakin',
  mail: '',
  avatar: github,
};
export default HeaderAvatar;
