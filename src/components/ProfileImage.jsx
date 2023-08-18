import { BsPencilFill } from 'react-icons/bs';
import IconButton from './IconButton';
import styles from './ProfileImage.module.css';

function ProfileImage({ username, image, allowEdit, onClick, style }) {
  return (
    <div className={styles.pictureContainer} style={style}>
      <img className={styles.profileImage} src={image} />
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
