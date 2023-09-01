import { useState } from 'react';
import { Card, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
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

  const selectedPageOptions =
    _forumPageOptions.find((opt) => opt.key == selectedPage) ?? ``;

  return (
    <Card className={styles.header}>
      <DropdownButton
        className={styles.select}
        onSelect={(value) => {
          setSelectedPage(value);
          navigate(value);
        }}
        title={t(selectedPageOptions?.labelKey ?? initialSelectedPage)}
      >
        {_forumPageOptions.map((opt) => (
          <DropdownItem key={opt.key} eventKey={opt.key} value={opt.key}>
            {t(opt.labelKey)}
          </DropdownItem>
        ))}
      </DropdownButton>
    </Card>
  );
}

export default ForumHeader;
