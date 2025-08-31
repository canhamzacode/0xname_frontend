import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../../images/logo_card_tb.png';
import { ConnectButton } from '../connectKit/ConnectButton';
import { Link } from 'react-router-dom';
// import AddSnapButton from '../addSnapButton/addSnapButton';

const pagePaths = {
    '🗂️ COMMUNITY BASE': '/communitybase',
    'MY NAMES': '/n/',
    '🌈 REGISTER TLN': '/registertln',
    'MY TLNs': '/t/',
    ABOUT: '/about',
};

const Header = ({ pages }: { pages: (keyof typeof pagePaths)[] }) => (
    <Navbar expand="xl" className="bg-body-tertiary" collapseOnSelect>
        <Container>
            <Navbar.Brand as={Link} to="/">
                <img src={logo} alt="0xNAME logo" height="30vh" />
                0xNAME
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Nav>
                    {pages.map((page, index) => (
                        <Nav.Item key={index}>
                            <Nav.Link as={Link} to={pagePaths[page]}>
                                {page}
                            </Nav.Link>
                        </Nav.Item>
                    ))}
                    <Nav.Link
                        as={Link}
                        to="https://snaps.metamask.io/snap/npm/0xname-resolver-snap/"
                        target="_blank"
                    >
                        Download Snap
                        <img src="/fox.svg" alt="metamask svg" width={24} height={24} />
                    </Nav.Link>
                </Nav>
                <ConnectButton />
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default Header;
