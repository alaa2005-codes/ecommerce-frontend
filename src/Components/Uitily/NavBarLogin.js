import React, { useEffect, useState } from 'react'
import { Navbar, Container, FormControl, Nav, NavDropdown } from 'react-bootstrap'
import logo from '../../images/logo.png'
import login from '../../images/login.png'
import cart from '../../images/cart.png'
import NavbarSearchHook from './../../hook/search/navbar-search-hook';
import { Link, useLocation } from 'react-router-dom';
const NavBarLogin = () => {
    const [OnChangeSearch, searchWord] = NavbarSearchHook()
    let word = "";
    if (localStorage.getItem("searchWord") != null)
        word = localStorage.getItem("searchWord")

    const location = useLocation();
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : '';
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser != null) {
            setUser(JSON.parse(storedUser))
        } else {
            setUser('')
        }
    }, [location.pathname])

    const logOut = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser('')
    }

    const isAuthenticated = !!localStorage.getItem('token');
    const isAdminArea = user?.role === 'admin' || user?.role === 'manager';

    return (
        <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    <img src={logo} className='logo' alt='logo' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <FormControl
                        value={word}
                        onChange={OnChangeSearch}
                        type="search"
                        placeholder="ابحث..."
                        className="me-2 w-100 text-center"
                        aria-label="Search"
                    />
                    <Nav className="me-auto">
                        {isAuthenticated ? (
                            <NavDropdown title={user?.name || 'الحساب'} id="basic-nav-dropdown">
                                {isAdminArea ? (
                                    <>
                                        <NavDropdown.Item as={Link} to="/admin/allproducts">لوحة التحكم</NavDropdown.Item>
                                        <NavDropdown.Item as={Link} to="/user/profile">الصفحة الشخصية</NavDropdown.Item>
                                    </>
                                ) : (
                                    <NavDropdown.Item as={Link} to="/user/profile">الصفحة الشخصية</NavDropdown.Item>
                                )}
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logOut} as={Link} to="/">تسجيل خروج</NavDropdown.Item>
                            </NavDropdown>
                        ) : (
                            <Nav.Link as={Link} to='/login'
                                className="nav-text d-flex mt-3 justify-content-center">
                                <img src={login} className="login-img" alt="sfvs" />
                                <p style={{ color: "white" }}>دخول</p>
                            </Nav.Link>
                        )}

                        {isAuthenticated && (
                            <Nav.Link as={Link} to='/cart'
                                className="nav-text d-flex mt-3 justify-content-center"
                                style={{ color: "white" }}>
                                <img src={cart} className="login-img" alt="sfvs" />
                                <p style={{ color: "white" }}>السلة</p>
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBarLogin
