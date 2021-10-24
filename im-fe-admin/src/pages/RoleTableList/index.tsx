import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Popconfirm, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { SorterResult } from 'antd/es/table/interface';

import { ListItemDataType } from './data';
import { queryRoles, deleteRoles } from './service';
import { queryRights } from '../RightTableList/service';
import OperationModal from './components/OperationModal';

const TableList: React.FC<{}> = () => {
  const [sorter, setSorter] = useState<string>('');
  const actionRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [current, setCurrent] = useState<Partial<ListItemDataType> | undefined>(undefined);

  const [rights, setRights] = useState<Array<any>>([]);

  const remove = (id: number) => {
    deleteRoles({ ids: [id] }).then(() => {
      message.success('删除成功');
      if (actionRef.current) {
        actionRef.current.reloadAndRest();
      }
    });
  };

  const disabledRemove = (record: ListItemDataType) => {
    if ([1, 2].includes(record.id)) {
      return true;
    }
    return false;
  };

  const columns: ProColumns<ListItemDataType>[] = [
    {
      title: '角色名称',
      dataIndex: 'name',
      rules: [
        {
          required: true,
          message: '规则名称为必填项',
        },
      ],
    },
    {
      title: '描述',
      dataIndex: 'desc',
      valueType: 'textarea',
      hideInSearch: true,
    },
    {
      title: '关键字',
      dataIndex: 'keyName',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'updatedAt',
      sorter: true,
      valueType: 'dateTime',
      hideInForm: true,
      hideInSearch: true,
    },
    {
      title: '权限',
      render(_, record) {
        const roles = record.rights.map((right: { name: string; id: string }) => (
          <div key={right.id}>{right.name}</div>
        ));
        return roles;
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <div>
          <Button
            type="link"
            onClick={async () => {
              const result: {
                data: Array<any>;
              } = await queryRights({
                current: 1,
                pageSize: 99,
              });
              setRights(result.data);
              setCurrent(record);
              setVisible(true);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.id)}>
            <Button type="link" disabled={disabledRemove(record)}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<ListItemDataType>
        headerTitle="角色表格"
        actionRef={actionRef}
        search={false}
        rowKey="id"
        onChange={(_, _filter, _sorter) => {
          const sorterResult = _sorter as SorterResult<ListItemDataType>;
          if (sorterResult.field) {
            setSorter(`${sorterResult.field}_${sorterResult.order}`);
          }
        }}
        params={{
          sorter,
        }}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={async () => {
              const result: {
                data: Array<any>;
              } = await queryRights({
                current: 1,
                pageSize: 99,
              });
              setRights(result.data);
              setVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params) => queryRoles(params)}
        columns={columns}
        rowSelection={false}
      />
      <OperationModal
        onDone={() => {
          setVisible(false);
          if (actionRef.current) {
            actionRef.current.reloadAndRest();
          }
        }}
        onCancel={() => {
          setVisible(false);
        }}
        visible={visible}
        rights={rights}
        current={current}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
