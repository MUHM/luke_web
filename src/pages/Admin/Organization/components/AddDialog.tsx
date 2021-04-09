import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message } from '@alifd/next';
import { useRequest } from 'ice';
import organizationService from '@/services/organization';

const AddDialog = (props: { fetchData: Function }) => {
  const { fetchData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(organizationService.create);

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
        title="组织管理-新增"
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
          <Form.Item required label="组织名称" >
            <Input
              {...init('name', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item required label="联系人"  >
            <Input
              {...init('contact', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item label="联系电话"  >
            <Input
              {...init('telphone')}
            />
          </Form.Item>
          <Form.Item label="联系地址"  >
            <Input
              {...init('address')}
            />
          </Form.Item>
          <Form.Item label="组内排序"  >
            <Input
              {...init('sort')}
            />
          </Form.Item>
        </Form>
      </Dialog>
    </React.Fragment >
  );
}

export default AddDialog;
