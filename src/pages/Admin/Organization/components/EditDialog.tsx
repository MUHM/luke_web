import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message } from '@alifd/next';
import { useRequest } from 'ice';
import organizationService from '@/services/organization';

const EditDialog = (props: { recordId: number; fetchData: Function; }) => {
  const { recordId, fetchData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(organizationService.update);

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

  const onOpen = async (id: number) => {
    const result = await organizationService.show(id);
    if (result?.code === 200) {
      // result.data.sort = result.data.sort || '';
      result.data.address = result.data.address || '';
      result.data.telphone = result.data.telphone || '';
      field.setValues(result.data);
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
        title="组织管理-新增"
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
          <Form.Item >
            <Input
              htmlType="hidden"
              {...init('id')}
            />
          </Form.Item>

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

    </React.Fragment>
  );
}

export default EditDialog;
