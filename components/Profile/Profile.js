'use client';
import React, { useState } from 'react';
import ProfileHeader from './ProfileHeader';
import EditProfileForm from './EditProfileForm';
import ChangePasswordForm from './ChangePasswordForm';
// import NotificationSettings from './NotificationSettings';
// import SupportSection from './SupportSection';
import LogoutButton from './LogoutButton';
import styles from './Profile.module.css';
import { RxCross2 } from "react-icons/rx";
import useUserLogout from '@/app/actions/useUserLogout';
import { useCurrency } from '@/context/CurrencyContext';
import CurrencyChanger from './CurrencyChanger';

const Profile = ({ handleProfileButton, showProfile, setShowProfile, profileImage, loggedInUser, setProfileImage }) => {
  
  const { logoutUser } = useUserLogout();

  return (
    <>
      {
        showProfile && <div className={styles.overlay} onClick={handleProfileButton} />
      }
      <div className={`${styles.container} ${showProfile ? styles.show : styles.hide}`}>
        <div onClick={handleProfileButton} className='cursor-pointer absolute right-6 top-4'><RxCross2 /></div>

        <div className={styles.header}>
          <ProfileHeader profileImage={profileImage} setProfileImage={setProfileImage} />
        </div>

        <div className='h-[calc(100svh_-_100px)] overflow-y-auto thin-scroll pr-[10px]'>
          <div className={styles.formSection}>
            <EditProfileForm loggedInUser={loggedInUser} />
            <CurrencyChanger />
            <ChangePasswordForm />
          </div>
          {/* <div className={styles.settingsSection}>
            <NotificationSettings />
            <SupportSection />
          </div> */}
          <div className={styles.logoutSection}>
            <LogoutButton onClick={() => { logoutUser(); setShowProfile(false) }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

