import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Field, Message, Select } from '@alifd/next';
import { useRequest } from 'ice';
import projectService from '@/services/project';

const EditDialog = (props: { recordId: number; fetchData: Function; organizationData: any }) => {
  const { recordId, fetchData, organizationData } = props;
  const field = Field.useField();
  const { init } = field;
  const [dialogVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(projectService.update);

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
    const result = await projectService.show(id);
    if (result?.code === 200) {
      field.setValues(result.data);
      if (!result.data.remark) {
        field.setValues({ remark: '' });
      }
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
        title="项目管理-编辑"
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
          <Form.Item >
            <Input
              htmlType="hidden"
              {...init('id')}
            />
          </Form.Item>
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

    </React.Fragment>
  );
}

export default EditDialog;
