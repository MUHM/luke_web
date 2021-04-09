import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message, Select } from '@alifd/next';
import { store as appStore, useRequest } from 'ice';
import projectService from '@/services/project';

const AddDialog = (props: { fetchData: Function; organizationData: any }) => {
  const { fetchData, organizationData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(projectService.create);

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
        style={{ width: 600 }}
        visible={dialogVisible}
        okProps={{ loading }}
        onOk={onOk}
        onCancel={onClose}
        onClose={onClose}
        title="项目管理-新增"
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }} >
          <Form.Item required label="项目名称" >
            <Input
              {...init('name', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item required label="所属组织"  >
            <Select
              style={{ width: '100%' }}
              {...init('organizationId')}
              dataSource={organizationData}
            />
          </Form.Item>
          <Form.Item label="项目地址"  >
            <Input
              {...init('address')}
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
