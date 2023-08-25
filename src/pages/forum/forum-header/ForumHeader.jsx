import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { t } from '../../../i18n/translate';
import RouteNames from '../../../router/RouteNames';
import styles from './ForumHeader.module.css';

const _forumPageOptions = [
  {
    key: RouteNames.FORUM_HOME,
    labelKey: 'HOME',
  },
  {
    key: RouteNames.FORUM_FEED,
    labelKey: 'FEED',
  },
];

function ForumHeader({ initialSelectedPage }) {
  const navigate = useNavigate();

  const [selectedPage, setSelectedPage] = useState(initialSelectedPage);

  return (
    <Card className={styles.header}>
      <Form.Select
        className={styles.select}
        onChange={(event) => {
          const selectedItem = _forumPageOptions[event.target.selectedIndex];
          setSelectedPage(selectedItem.key);
          navigate(selectedItem.key);
        }}
        value={selectedPage}
      >
        {_forumPageOptions.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {t(opt.labelKey)}
          </option>
        ))}
      </Form.Select>
    </Card>
  );
}

export default ForumHeader;
