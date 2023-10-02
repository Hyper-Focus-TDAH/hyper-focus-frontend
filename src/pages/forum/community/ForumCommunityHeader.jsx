import React, { useRef, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCommunity } from '../../../api/communitiesApi';
import { followCommunityByCommunityId } from '../../../api/usersApi';
import FollowButton from '../../../components/buttons/follow-button/FollowButton';
import OptionsButton from '../../../components/buttons/options-button/OptionsButton';
import Dialog from '../../../components/dialog/Dialog';
import { t } from '../../../i18n/translate';
import RouteNames from '../../../router/RouteNames';
import { auxActions } from '../../../store/aux-store/auxStore';
import { commuActions } from '../../../store/misc/commuStore';

import { loadCommunities } from '../../../services/communityService';
import styles from './ForumCommunityHeader.module.css';
import CommunityForm from './community-form/CommunityForm';

function ForumCommunityHeader({ community, onUpdateCommunity }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedUserData = useSelector((state) => state.user);

  const isFollowing = !!community.followers.find(
    (id) => id === loggedUserData.id
  );

  const isOwner = community.user?.id == loggedUserData.id;

  const [isEditCommunityModalOpen, setIsEditCommunityModalOpen] =
    useState(false);
  const [
    isConfirmDeleteCommunityModalOpen,
    setIsConfirmDeleteCommunityModalOpen,
  ] = useState(false);

  const ownerOptions = [
    {
      id: 'EDIT',
      content: t('EDIT'),
      onClick: () => setIsEditCommunityModalOpen(true),
    },
    {
      id: 'DELETE',
      content: t('DELETE'),
      onClick: () => setIsConfirmDeleteCommunityModalOpen(true),
    },
  ];

  const editCommunityForm = useRef(null);

  async function handleDeleteCommunity() {
    try {
      dispatch(auxActions.setLoading(true));

      await deleteCommunity(community.id);

      await updateCommunities();

      navigate(RouteNames.FORUM_FEED);
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(auxActions.setLoading(false));
    }
  }

  async function followCommunity() {
    try {
      const response = await followCommunityByCommunityId(community.id);

      await updateCommunities();

      if (onUpdateCommunity) {
        onUpdateCommunity(response.data);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function updateCommunities() {
    const communities = await loadCommunities();

    dispatch(commuActions.setCommunities(communities));
  }

  return (
    <Container className={styles.header}>
      <div className={styles.info}>
        <span className="h1 m-0">{community.title}</span>
        <span className="h4 m-0 mb-2">{community.name}</span>
      </div>
      {!isOwner && (
        <FollowButton onClick={followCommunity} isActive={isFollowing} />
      )}
      {isOwner && <OptionsButton options={ownerOptions} />}
      <Dialog
        show={isEditCommunityModalOpen}
        onHide={() => setIsEditCommunityModalOpen(false)}
        title={t('EDIT_COMMUNITY')}
        cancelLabel={t('CANCEL')}
        onCancel={() => {
          setIsEditCommunityModalOpen(false);
        }}
        confirmLabel={t('SAVE')}
        onConfirm={() => {
          try {
            editCommunityForm.current.handleSubmit();
            setIsEditCommunityModalOpen(false);
          } catch (e) {
            throw new Error(e);
          }
        }}
        size="lg"
        centered
      >
        <CommunityForm
          ref={editCommunityForm}
          initialValues={community}
          onSubmit={(res) => onUpdateCommunity(res.data)}
        />
      </Dialog>

      <Dialog
        show={isConfirmDeleteCommunityModalOpen}
        onHide={() => setIsConfirmDeleteCommunityModalOpen(false)}
        title={t('CONFIRM_DELETE_COMMUNITY')}
        subtitle={t('THIS_ACTION_CANNOT_BE_UNDONE')}
        cancelLabel={t('CANCEL')}
        onCancel={() => setIsConfirmDeleteCommunityModalOpen(false)}
        confirmLabel={t('DELETE')}
        confirmColor="danger"
        onConfirm={handleDeleteCommunity}
        escDismiss
        centered
      />
    </Container>
  );
}

export default ForumCommunityHeader;
