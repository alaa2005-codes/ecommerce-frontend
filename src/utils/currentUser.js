// أدوات قراءة حالة المستخدم الحالي من localStorage بشكل آمن

export const getCurrentUser = () => {
    try {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    } catch (e) {
        return null;
    }
};

export const isLoggedIn = () => !!localStorage.getItem('token');

export const isAdminOrManager = () => {
    const role = getCurrentUser()?.role;
    return role === 'admin' || role === 'manager';
};

// مستخدم عادي = مسجل الدخول وليس أدمن أو مدير
export const isNormalUser = () => isLoggedIn() && !isAdminOrManager();
