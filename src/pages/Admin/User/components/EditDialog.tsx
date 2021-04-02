import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message, Select, Switch } from '@alifd/next';
import { useRequest } from 'ice';
import userService from '@/services/user';

import styles from './index.module.scss';

const EditDialog = (props) => {
  const { recordId, roleData, fetchData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(userService.update);

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
      fetchData();
    }
  }

  const onOpen = async id => {
    const result = await userService.show(id);
    if (result?.code === 200) {
      field.setValues(result.data.user);
      field.setValues({ roles: result.data.roles.map((item: { id: number; }) => item.id) });
      setVisible(true);
    }
  }

  const onClose = () => setVisible(false);

  return (
    <React.Fragment>
      <Button type="primary" text onClick={() => onOpen(recordId)}>
        编辑</Button >
      <Dialog
        style={{ width: 640 }}
        visible={dialogVisible}
        okProps={{ loading }}
        onOk={onOk}
        onCancel={onClose}
        onClose={onClose}
        title="用户管理-新增"
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
          <Form.Item >
            <Input
              htmlType="hidden"
              {...init('id')}
            />
          </Form.Item>
          <Form.Item required label="用户名" >
            <Input
              {...init('username', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item required label="真实姓名"  >
            <Input
              {...init('truename', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item label="所属角色"  >
            <Select
              style={{ width: "100%" }}
              mode="multiple"
              {...init('roles')}
              dataSource={roleData}
            />
          </Form.Item>
          <Form.Item required label="状态"  >
            <Switch
              defaultChecked={field.getValue('status') === 1}
              className={styles.tableSwitch}
              checkedChildren="正常"
              onChange={(checked) => field.setValue('status', checked ? 1 : 0)}
              unCheckedChildren="禁用"
            />
          </Form.Item>
        </Form>
      </Dialog>

    </React.Fragment>
  );
}

export default EditDialog;
