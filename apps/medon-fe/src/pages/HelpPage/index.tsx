import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { getHelpContent } from 'translation/getHelpContent';
import { Wrapper } from './styles';

const { Panel } = Collapse;

export function HelpPage() {
  const { t, i18n } = useTranslation();
  const content = getHelpContent(i18n.language);

  return (
    <div>
      <Wrapper>
        <h1>{t('help.title')}</h1>
        <Collapse defaultActiveKey={['1']}>
          {content.map((section) => (
            <Panel header={section.title} key={section.id}>
              <div
                dangerouslySetInnerHTML={{ __html: section.description }}
              ></div>
            </Panel>
          ))}
        </Collapse>
      </Wrapper>
    </div>
  );
}
