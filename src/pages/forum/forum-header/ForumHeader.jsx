import { useState } from 'react';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { BsDot, BsHouse, BsPlus, BsStars } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { t } from '../../../i18n/translate';
import RouteNames from '../../../router/RouteNames';
import styles from './ForumHeader.module.css';

const _forumPageOptions = [
  {
    key: RouteNames.FORUM_HOME,
    labelKey: 'HOME',
    icon: <BsHouse />,
  },
  {
    key: RouteNames.FORUM_FEED,
    labelKey: 'FEED',
    icon: <BsStars />,
  },
];

const createCommunity = {
  key: RouteNames.FORUM_NEW,
  labelKey: 'CREATE',
  icon: <BsPlus />,
};

function ForumHeader({ initialSelectedPage, height = 69 }) {
  const navigate = useNavigate();

  const [selectedPage, setSelectedPage] = useState(initialSelectedPage);

  const communities = useSelector((state) => state.commu.communities);

  function allOptions() {
    const remappedCommunities = communities.map((commu) => ({
      key: `${RouteNames.FORUM}/${commu.name}`,
      labelKey: commu.name,
      icon: <BsDot />,
      isCommunity: true,
    }));

    return [..._forumPageOptions, createCommunity, ...remappedCommunities];
  }

  const selectedPageOptions =
    allOptions().find((opt) => opt.key == selectedPage) ?? allOptions()[0];

  return (
    <Card className={styles.header} style={{ height: `${height}px` }}>
      <DropdownButton
        className={styles.select}
        onSelect={(value) => {
          setSelectedPage(value);
          navigate(value);
        }}
        title={
          <>
            <div className={styles.icon}>{selectedPageOptions?.icon}</div>
            <div className={styles.label}>
              {selectedPageOptions.isCommunity
                ? selectedPageOptions?.labelKey
                : t(selectedPageOptions?.labelKey)}
            </div>
          </>
        }
      >
        {_forumPageOptions.map((opt) => (
          <DropdownItem
            className={styles.item}
            key={opt.key}
            eventKey={opt.key}
            value={opt.key}
          >
            <div className={styles.icon}>{opt.icon}</div> {t(opt.labelKey)}
          </DropdownItem>
        ))}
        <Dropdown.Divider style={{ margin: '0' }} />
        <DropdownItem
          className={styles.item}
          eventKey={createCommunity.key}
          value={createCommunity.value}
        >
          <div className={styles.icon}>{createCommunity.icon}</div>
          {t(createCommunity.labelKey)}
        </DropdownItem>
        <Dropdown.Divider style={{ margin: '0' }} />
        {communities.map((opt) => (
          <DropdownItem
            className={styles.item}
            key={opt.name}
            eventKey={`${RouteNames.FORUM}/${opt.name}`}
            value={opt.name}
          >
            <div className={styles.icon}>
              <BsDot />
            </div>
            {opt.name}
          </DropdownItem>
        ))}
      </DropdownButton>
    </Card>
  );
}

export default ForumHeader;
