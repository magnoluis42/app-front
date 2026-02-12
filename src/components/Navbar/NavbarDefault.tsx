import { TabMenu } from 'primereact/tabmenu';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NavbarDefault.css';

export default function NavbarDefault() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { 
            label: 'Início', 
            icon: 'pi pi-home', 
            command: () => { navigate('/') } 
        },
        { 
            label: 'Pedidos', 
            icon: 'pi pi-list', 
            command: () => { navigate('/pedidos') } 
        }, 
        { 
            label: 'Perfil', 
            icon: 'pi pi-user', 
            command: () => { navigate('/perfil') } 
        },
    ];

    useEffect(() => {
        const currentIndex = items.findIndex(item => {
            if (item.label === 'Início') return location.pathname === '/';
            if (item.label === 'Pedidos') return location.pathname === '/pedidos';
            if (item.label === 'Perfil') return location.pathname === '/perfil';
            return false;
        });
        if (currentIndex !== -1) setActiveIndex(currentIndex);
    }, [location.pathname]);

    return (
        <div className="navbar">
            <div className="navbar-itens">
                <TabMenu 
                    model={items} 
                    activeIndex={activeIndex} 
                    onTabChange={(e) => setActiveIndex(e.index)} 
                />
            </div>
        </div>
    );
}