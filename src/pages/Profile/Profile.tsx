import { useState } from 'react'; 
import NavbarDefault from "../../components/Navbar/NavbarDefault";
import AvatarProfile from "../../components/Avatar/Avatar";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "./Profile.css"

import ProfileLoginMUI from '../../components/ProfileLogin/ProfileLogin'; 

export default function Profile() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className="profile-container">
            
            {!isLoggedIn ? (
                <>
                    <ProfileLoginMUI onLoginSuccess={() => setIsLoggedIn(true)} />
                    <NavbarDefault />
                </>
            ) : (
                <>
                    <h1 className="page-title">Perfil</h1>

                    <div className="profile-header-card">
                        <div className="image-profile-wrapper">
                            <AvatarProfile />
                        </div>
                        <div className="infos-user">
                            <h3 className="name">Magno Luis Rodrigues Ribeiro</h3>
                            <div className="info-user-contact">
                                <small className="email">magno.luis42@hotmail.com</small>
                                <small className="phonenumber">(98) 98287-4103</small>
                            </div>
                        </div>
                    </div>

                    <div className="profile-menu-list-minimal">
                        
                        <div className="menu-item-minimal">
                            <div className="menu-item-left">
                                <PersonOutlineIcon className="menu-icon primary-icon" />
                                <div className="menu-texts">
                                    <span className="menu-title">Dados do perfil</span>
                                    <span className="menu-subtitle">Minhas informações</span>
                                </div>
                            </div>
                            <ChevronRightIcon className="arrow-icon" />
                        </div>

                        <div className="menu-item-minimal logout-item" onClick={handleLogout} style={{cursor: 'pointer'}}>
                            <div className="menu-item-left">
                                <LogoutIcon className="menu-icon" />
                                <div className="menu-texts">
                                    <span className="menu-title">Sair</span>
                                </div>
                            </div>
                            <ChevronRightIcon className="arrow-icon" />
                        </div>

                    </div>

                    <NavbarDefault />
                </>
            )}
        </div>
    )
}