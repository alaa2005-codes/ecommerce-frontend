import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../redux/actions/authAction';

const UserProfile = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const currentUser = auth?.currentUser || {};
  const user = currentUser?.data || {};

  useEffect(() => {
    dispatch(getLoggedUser());
  }, [dispatch]);

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>الملف الشخصي</h2>
      </div>
      <div className="profile-content">
        <div className="profile-info">
          <div className="info-item">
            <span className="label">الاسم:</span>
            <span className="value">{user?.name || 'غير محدد'}</span>
          </div>
          <div className="info-item">
            <span className="label">البريد الإلكتروني:</span>
            <span className="value">{user?.email || 'غير محدد'}</span>
          </div>
          <div className="info-item">
            <span className="label">رقم الهاتف:</span>
            <span className="value">{user?.phone || 'غير محدد'}</span>
          </div>
        </div>
        <div className="profile-actions">
          <Link to="/edit-profile" className="btn btn-primary">
            تعديل الملف الشخصي
          </Link>
          <Link to="/my-orders" className="btn btn-secondary">
            طلباتي
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;