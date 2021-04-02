import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message, Select } from '@alifd/next';
import { useRequest } from 'ice';
import userService from '@/services/user';

const AddDialog = (props) => {
  const { fetchData, roleData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(userService.create);

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

  const onOpen = () => {
    setVisible(true);
  }

  const onClose = () => setVisible(false);

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => onOpen()}>
        新增
      </Button>
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
        </Form>
      </Dialog>
    </React.Fragment >
  );
}

export default AddDialog;
