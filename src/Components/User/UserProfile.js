import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedUser } from '../../redux/actions/authAction';
import { getCurrentUser } from '../../utils/currentUser';

const UserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLoggedUser());
  }, [dispatch]);

  // بيانات الحساب المسجل حالياً من الـ API، مع localStorage كاحتياط
  const currentUser = useSelector(state => state.authReducer?.currentUser);
  const user = currentUser?.data || getCurrentUser() || {};

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>الملف الشخصي</h2>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <div className="info-item">
            <span className="label">الاسم: </span>
            <span className="value">{user?.name || 'غير محدد'}</span>
          </div>
          <div className="info-item">
            <span className="label">البريد الإلكتروني: </span>
            <span className="value">{user?.email || 'غير محدد'}</span>
          </div>
          <div className="info-item">
            <span className="label">رقم الهاتف: </span>
            <span className="value">{user?.phone || 'غير محدد'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
