import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Field, Message, TreeSelect, Icon, Select } from '@alifd/next';
import { store as appStore, useRequest } from 'ice';
import moduleService from '@/services/module';
import DrawerButton from '@/components/DrawerButton';

const AddDrawer = (props: { fetchData: Function }) => {
  const { fetchData } = props;
  const field = Field.useField();
  const { init } = field;
  const [drawerVisible, setVisible] = useState(false);
  const { request, loading } = useRequest(moduleService.create);
  const [moduleState, dispatchers] = appStore.useModel('module');
  const [iconState, iconDispatchers] = appStore.useModel('icon');

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
    dispatchers.fetchData();
    iconDispatchers.initSelectData();
  }

  const onClose = () => setVisible(false);

  const selectRender = item => {
    return (
      <span>
        <Icon type={item.type} size="xs" style={{ color: item.value }} />{" "}
        {item.label}
      </span>
    )
  }

  return (
    <React.Fragment>
      <Button type="primary" onClick={() => onOpen()}>
        新增
      </Button>
      <Drawer
        title="模块管理-新增"
        width={520}
        closeMode={'mask'}
        onClose={onClose}
        visible={drawerVisible}
      >
      <DrawerButton loading={loading} onOk={onOk} onClose={onClose} />
        <Form field={field} labelCol={{ fixedSpan: 7 }} wrapperCol={{ span: 14 }}>
          <Form.Item required label="模块名称" >
            <Input
              {...init('name', {
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item label="父模块"  >
            <TreeSelect
              showSearch
              style={{ width: "100%" }}
              {...init('parentId')}
              dataSource={moduleState.tree}
              treeDefaultExpandAll
              hasClear
            />
          </Form.Item>
          <Form.Item label="模块描述"  >
            <Input
              {...init('description')}
            />
          </Form.Item>
          <Form.Item required label="模块类型"  >
            <Input
              {...init('type', {
                initValue: 'admin_menu',
                rules: [{ required: true, message: '必填选项' }],
              })}
            />
          </Form.Item>
          <Form.Item label="模块路径"  >
            <Input
              {...init('path')}
            />
          </Form.Item>
          <Form.Item label="模块图标"  >
            <Select
              style={{ width: "100%" }}
              dataSource={iconState.data}
              itemRender={selectRender}
              valueRender={selectRender}
              placeholder=""
              {...init('icon')}
            />
          </Form.Item>
          <Form.Item label="组内排序"  >
            <Input
              {...init('sort')}
            />
          </Form.Item>
        </Form>
        <DrawerButton loading={loading} onOk={onOk} onClose={onClose} />
      </Drawer>
    </React.Fragment >
  );
}

export default AddDrawer;
