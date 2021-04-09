import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message } from '@alifd/next';
import { useRequest } from 'ice';
import systemConstService from '@/services/systemConst';

const AddDialog = (props) => {
  const { fetchData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(systemConstService.create);

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
        title="系统常量-新增"
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
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
    </React.Fragment >
  );
}

export default AddDialog;
