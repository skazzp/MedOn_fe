import { Spin } from 'antd';
import { LoadingStyledOutlined } from 'components/Spinner/styles';

const antIcon = <LoadingStyledOutlined spin />;

export default function Spinner() {
  return <Spin indicator={antIcon} size="small" />;
}
