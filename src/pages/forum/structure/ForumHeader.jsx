import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import {
  BsChatDots,
  BsClipboard,
  BsHouse,
  BsPlus,
  BsStars,
} from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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

function ForumHeader({ height = 69 }) {
  const navigate = useNavigate();
  const location = useLocation();

  const userId = useSelector((state) => state.user.id);

  const communities = useSelector((state) => state.commu.communities);

  const remappedCommunities = communities.map((commu) => ({
    key: `${RouteNames.FORUM}/${commu.name}`,
    label: commu.title,
    icon: commu.user?.id === userId ? <BsClipboard /> : <BsChatDots />,
    isCommunity: true,
  }));

  const allOptions = [
    ..._forumPageOptions,
    createCommunity,
    ...remappedCommunities,
  ];

  const selectedOption =
    allOptions.find((opt) => opt.key === location.pathname) ?? allOptions[0];

  return (
    <Card className={styles.header} style={{ height: `${height}px` }}>
      <DropdownButton
        className={styles.select}
        onSelect={(value) => {
          navigate(value);
        }}
        title={
          <div className={styles['selected-option']}>
            <div className={styles.icon}>{selectedOption.icon}</div>
            <div className={styles.label}>
              {selectedOption.labelKey
                ? t(selectedOption.labelKey)
                : selectedOption.label}
            </div>
          </div>
        }
      >
        <div className={styles['options-container']}>
          {_forumPageOptions.map((opt) => (
            <DropdownItem
              className={styles.item}
              key={opt.key}
              eventKey={opt.key}
              value={opt.key}
              active={opt.key == location.pathname}
            >
              <div className={styles.icon}>{opt.icon}</div>{' '}
              <div className={styles.label}>{t(opt.labelKey)}</div>
            </DropdownItem>
          ))}
          <Dropdown.Divider style={{ margin: '0' }} />
          <DropdownItem
            className={styles.item}
            eventKey={createCommunity.key}
            value={createCommunity.value}
            active={createCommunity.key == location.pathname}
          >
            <div className={styles.icon}>{createCommunity.icon}</div>
            {t(createCommunity.labelKey)}
          </DropdownItem>
          {!!remappedCommunities.length && (
            <Dropdown.Divider style={{ margin: '0' }} />
          )}
          {remappedCommunities.map((opt) => (
            <DropdownItem
              className={styles.item}
              key={opt.key}
              eventKey={opt.key}
              value={opt.key}
              active={opt.key === location.pathname}
            >
              <div className={styles.icon}>{opt.icon}</div>
              <div className={styles.label}>{opt.label}</div>
            </DropdownItem>
          ))}
        </div>
      </DropdownButton>
    </Card>
  );
}

export default ForumHeader;
