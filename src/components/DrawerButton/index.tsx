import React from 'react';
import { Button } from '@alifd/next';

const DrawerButton = (props: { buttonGroup?: Button[]; loading?: boolean; onOk?: React.MouseEventHandler; onClose?: React.MouseEventHandler }) => {
  const { buttonGroup, loading, onOk, onClose } = props;
  return (
    <div
      style={{
        position: 'absolute',
        // position: 'fixed',
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e8e8e8',
        padding: '10px 16px',
        textAlign: 'right',
        left: 0,
        background: '#fff',
        borderRadius: '0 0 4px 4px',
      }}
    >
      {buttonGroup ||
        <React.Fragment>
          <Button style={{ marginRight: 8 }} onClick={onClose}>取消</Button>
          <Button loading={loading} onClick={onOk} type="primary">确定</Button>
        </React.Fragment>
      }
    </div>
  )
};

export default DrawerButton;
