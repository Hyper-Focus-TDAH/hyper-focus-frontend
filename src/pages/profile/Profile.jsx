import { useSelector } from 'react-redux';
import styles from './Profile.module.css';

function Profile() {
  const userData = useSelector((state) => state.user);

  return (
    <div className={styles.container}>
      <div className={styles.pic}></div>
      {userData.id ?? 'id'} <br />
      {userData.email ?? 'email'} <br />
      {userData.username ?? 'username'} <br />
      {userData.birthdate ?? 'birthdate'} <br />
      {userData.gender ?? 'gender'} <br />
      {userData.language ?? 'language'} <br />
      {userData.nationality ?? 'nationality'} <br />
    </div>
  );
}

export default Profile;

export async function loader() {
  return [];
}
