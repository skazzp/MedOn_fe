import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { Wrapper } from './styles';

const { Panel } = Collapse;

export function HelpPage() {
  const { t } = useTranslation();
  return (
    <div>
      <Wrapper>
        <h1>{t('help.title')}</h1>
        <Collapse defaultActiveKey={['1']}>
          <Panel header={t('help.headers.1')} key="1">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.1') }}
            />
          </Panel>
          <Panel header={t('help.headers.2')} key="2">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.2') }}
            />
          </Panel>
          <Panel header={t('help.headers.3')} key="3">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.3') }}
            />
          </Panel>
          <Panel header={t('help.headers.4')} key="4">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.4') }}
            />
          </Panel>
          <Panel header={t('help.headers.5')} key="5">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.5') }}
            />
          </Panel>
          <Panel header={t('help.headers.6')} key="6">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.6') }}
            />
          </Panel>
          <Panel header={t('help.headers.7')} key="7">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.7') }}
            />
          </Panel>
          <Panel header={t('help.headers.8')} key="8">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.8') }}
            />
          </Panel>
          <Panel header={t('help.headers.9')} key="9">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.9') }}
            />
          </Panel>
          <Panel header={t('help.headers.10')} key="10">
            <section
              dangerouslySetInnerHTML={{ __html: t('help.descriptions.10') }}
            />
          </Panel>
        </Collapse>
      </Wrapper>
    </div>
  );
}
