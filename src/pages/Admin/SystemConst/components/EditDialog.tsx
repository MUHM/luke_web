import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message } from '@alifd/next';
import { useRequest } from 'ice';
import systemConstService from '@/services/systemConst';

const EditDialog = (props: { recordId: number; fetchData: Function; }) => {
  const { recordId, fetchData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(systemConstService.update);

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
    const result = await systemConstService.show(id);
    if (result?.code === 200) {
      result.data.remark = result.data.remark || '';
      result.data.type = result.data.type || '';
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
        title="系统常量-新增"
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
          <Form.Item >
            <Input
              htmlType="hidden"
              {...init('id')}
            />
          </Form.Item>

          <Form.Item required label="Key" >
            <Input
              {...init('constKey', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item required label="Value"  >
            <Input
              {...init('constValue', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item label="类型"  >
            <Input
              {...init('type')}
            />
          </Form.Item>
          <Form.Item label="备注"  >
            <Input
              {...init('remark')}
            />
          </Form.Item>
        </Form>
      </Dialog>

    </React.Fragment>
  );
}

export default EditDialog;
