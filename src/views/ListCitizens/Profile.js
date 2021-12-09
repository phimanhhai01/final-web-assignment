import React from 'react';
import Title from '../../components/Title';
import CitizenProfile from './CitizenProfile';
import { useLocation } from 'react-router';
const Profile = () => {
    const location = useLocation();
    const id = location.pathname.slice(15, location.pathname.length);
    console.log(id);
    return (
        <div>
            <Title name="Thông tin chi tiết" />
            <CitizenProfile id={id} />
        </div>
    );
}

export default Profile;