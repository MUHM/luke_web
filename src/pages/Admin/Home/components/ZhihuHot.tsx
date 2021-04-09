import React, { useEffect, useState } from 'react';
import { Card, List, Loading, Avatar } from '@alifd/next';
import { useRequest, Link } from 'ice';
import moment from 'moment';
import crawlerService from '@/services/crawler';

interface IData {
  content: IZhihuData[];
  name: string;
  cache?: {
    ex: number;
    time: string;
  }
}
interface IZhihuData {
  title: string;
  href: string;
  image: string;
}

const ZhihuHot = () => {
  const [data, setData]: [IData | undefined, any] = useState({ name: '知乎热榜', content: [] });
  const { request, loading } = useRequest(crawlerService.zhihuHot);
  const fetchData = async () => {
    const result = await request();
    if (result?.code === 200) {
      if (result.data.content.length > 10) {
        result.data.content.length = 10;
      }
      setData(result.data);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card free>
      <Card.Header title={data.name} subTitle={`更新时间:${moment(data.cache?.time).format('YYYY-MM-DD HH:mm:ss')}`} />
      <Card.Divider />
      <Card.Content>
        <Loading visible={loading} tip="加载中...">
          <List>
            {
              data.content.map(item => {
                return <a target={"_blank"} href={item.href}><List.Item media={<Avatar src={item.image} />} >{item.title}</List.Item></a>;
              })
            }
          </List>
        </Loading>
      </Card.Content>
    </Card >
  )
}
export default ZhihuHot;