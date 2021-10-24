import http from '@/utils/http';
import { TableListParams, TableListItem } from './data';

export async function queryRights(params?: TableListParams) {
  const param = Object.assign(
    {
      pageNumber: params ? params.current : 1,
    },
    params,
  );
  delete param.current;
  const data: any = await http.get('/api/v1/admin/rights', param);
  return {
    data: data.rows,
    total: data.count,
    success: true,
  };
}

export async function addRights(params?: TableListItem) {
  return http.post('/api/v1/admin/rights', params);
}

export async function updateRights(params: TableListItem) {
  return http.put('/api/v1/admin/rights', params);
}

export async function removeRights(params: TableListItem) {
  return http.delete('/api/v1/admin/rights', { id: params.id });
}
