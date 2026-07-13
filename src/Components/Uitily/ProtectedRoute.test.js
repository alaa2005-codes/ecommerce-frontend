import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const hasText = (text) => screen.getByText(text) !== null;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects guests to login for protected routes', () => {
    render(
      <MemoryRouter initialEntries={['/admin/allproducts']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/admin/allproducts"
            element={<ProtectedRoute allowedRoles={['admin', 'manager']}><div>Admin Page</div></ProtectedRoute>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(hasText('Login Page')).toBe(true);
  });

  it('renders children for allowed roles', () => {
    localStorage.setItem('token', 'abc');
    localStorage.setItem('user', JSON.stringify({ role: 'manager' }));

    render(
      <MemoryRouter initialEntries={['/admin/allproducts']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route
            path="/admin/allproducts"
            element={<ProtectedRoute allowedRoles={['admin', 'manager']}><div>Admin Page</div></ProtectedRoute>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(hasText('Admin Page')).toBe(true);
  });
});
