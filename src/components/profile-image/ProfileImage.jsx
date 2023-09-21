import { BsPencilFill, BsPersonFill } from 'react-icons/bs';
import IconButton from '../buttons/icon-button/IconButton';
import styles from './ProfileImage.module.css';

function ProfileImage({ user, allowEdit, onClick, sizeInPixels = 200 }) {
  const image = user.profileImage ?? user.profile_image;

  return (
    <div
      className={styles.pictureContainer}
      style={{ width: `${sizeInPixels}px`, height: `${sizeInPixels}px` }}
    >
      {image && <img className={styles.profileImage} src={image} />}
      {!image && (
        <BsPersonFill
          style={{
            fontSize: `${(sizeInPixels * 2) / 3}px`,
            color: 'darkgray',
          }}
        />
      )}
      {allowEdit && (
        <IconButton
          className={styles.editPicture}
          icon={<BsPencilFill />}
          onClick={onClick}
        />
      )}
    </div>
  );
}

export default ProfileImage;
