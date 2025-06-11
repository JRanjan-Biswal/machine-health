'use client';
import React from 'react';
import ProfileHeader from './ProfileHeader';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
import NotificationSettings from './NotificationSettings';
import SupportSection from './SupportSection';
import LogoutButton from './LogoutButton';
import styles from './Profile.module.css';
import { RxCross2 } from "react-icons/rx";
import useUserLogout from '@/app/actions/useUserLogout';

const Profile = ({ handleProfileButton, showProfile }) => {
  const { logoutUser } = useUserLogout();

  return (
    <>
      {
        showProfile && <div className={styles.overlay} onClick={handleProfileButton} />
      }
      <div className={`${styles.container} ${showProfile ? styles.show : styles.hide}`}>
        <div onClick={handleProfileButton} className='cursor-pointer absolute right-6 top-4'><RxCross2 /></div>
        <div className={styles.header}>
          <ProfileHeader />
        </div>
        <div className='h-[calc(100svh_-_100px)] overflow-y-scroll scroll-hide'>
          <div className={styles.formSection}>
            <EditProfileForm />
            <ChangePasswordForm />
          </div>
          <div className={styles.settingsSection}>
            <NotificationSettings />
            <SupportSection />
          </div>
          <div className={styles.logoutSection}>
            <LogoutButton onClick={() => logoutUser()} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

