import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PersonIcon from '@mui/icons-material/Person';

import './NavbarDefault.css';

export default function NavbarDefault() {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState(0);

    useEffect(() => {
        const path = location.pathname;
        if (path === '/') setValue(0);
        else if (path === '/pedidos') setValue(1);
        else if (path === '/perfil') setValue(2);
    }, [location.pathname]);

    return (
        <Paper className="navbar-container" elevation={3}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    if (newValue === 0) navigate('/');
                    if (newValue === 1) navigate('/pedidos');
                    if (newValue === 2) navigate('/perfil');
                }}
                className="navbar-content"
            >
                <BottomNavigationAction 
                    label="Início" 
                    icon={<HomeIcon />} 
                    className="navbar-action" 
                />
                <BottomNavigationAction 
                    label="Pedidos" 
                    icon={<ReceiptLongIcon />} 
                    className="navbar-action" 
                />
                <BottomNavigationAction 
                    label="Perfil" 
                    icon={<PersonIcon />} 
                    className="navbar-action" 
                />
            </BottomNavigation>
        </Paper>
    );
}