import React, { useState } from 'react';
import { Button, Drawer, Form, Input, Field, Message, Tab, Tree } from '@alifd/next';
import { store as appStore, useRequest } from 'ice';
import DrawerButton from '@/components/DrawerButton';
import roleService from '@/services/role';

const AddDrawer = (props) => {
  const { recordId, fetchData } = props;
  const field = Field.useField();
  const { init } = field;
  const [drawerVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(roleService.update);
  const [moduleState, moduleDispatchers] = appStore.useModel('module');
  const [permissionState, permissionDispatchers] = appStore.useModel('permission');

  const onOk = async () => {
    const { errors } = await field.validatePromise();
    if (errors) {
      Message.warning('验证不通过');
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
    moduleDispatchers.fetchData();
    permissionDispatchers.fetchData();
    const result = await roleService.show(id);
    if (result?.code === 200) {
      field.setValues(result.data.role);
      if (!result.data.role.description) {
        field.setValues({ description: '' });
      }
      field.setValues({
        permissions: result.data.permissions.map(item => String(item.id)),
        modules: result.data.modules.map(item => String(item.id)),
      });
      setVisible(true);
    }
  }

  const onClose = () => setVisible(false);

  const modulesCheck = (keys: string[]) => {
    field.setValue('modules', keys);
  }

  const permissionsCheck = (keys: string[]) => {
    field.setValue('permissions', keys);
  }

  return (
    <React.Fragment>
      <Button type="primary" text onClick={() => onOpen(recordId)}>
        编辑
      </Button>
      <Drawer
        title="角色管理-修改"
        width={520}
        closeMode="mask"
        onClose={onClose}
        visible={drawerVisible}
      >
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
          <Tab triggerType="hover">
            <Tab.Item key="basic" title="基础信息">
              <Form.Item >
                <Input
                  htmlType="hidden"
                  {...init('id')}
                />
              </Form.Item>
              <Form.Item required label="角色名称" >
                <Input
                  {...init('name', {
                    rules: [{ required: true, message: '必填选项' }],
                  })}
                />
              </Form.Item>
              <Form.Item label="角色描述"  >
                <Input
                  {...init('description')}
                />
              </Form.Item>
            </Tab.Item>
            <Tab.Item key="module" title="模块授权">
              <Form.Item label="模块授权">
                <Tree
                  checkable
                  checkedKeys={field.getValue('modules')}
                  // selectedKeys={field.getValue('modules')}
                  dataSource={moduleState.tree}
                  defaultExpandAll
                  // editable
                  // multiple
                  onCheck={modulesCheck}
                  // onSelect={modulesCheck}
                  selectable={false}
                  showLine
                />
              </Form.Item>
            </Tab.Item>
            <Tab.Item key="permission" title="接口授权">
              <Form.Item label="接口授权">
                <Tree
                  checkable
                  checkedKeys={field.getValue('permissions')}
                  // selectedKeys={field.getValue('permissions')}
                  style={{ maxHeight: '500px', overflow: 'auto' }}
                  dataSource={permissionState.tree}
                  defaultExpandAll
                  // editable
                  // multiple
                  onCheck={permissionsCheck}
                  // onSelect={permissionsCheck}
                  selectable={false}
                  showLine
                />
              </Form.Item>
            </Tab.Item>
          </Tab>
        </Form>
        <DrawerButton loading={loading} onOk={onOk} onClose={onClose} />
      </Drawer>
    </React.Fragment>
  );
}

export default AddDrawer;
