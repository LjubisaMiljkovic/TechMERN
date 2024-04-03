import { useState } from 'react';
import { adminSidebarConfig } from '../../config/adminSidebarConfig';
import './Sidebar.scss';
import { Link, useNavigate } from 'react-router-dom';
import { routesConfig } from '../../config/routesConfig';

function Sidebar() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(adminSidebarConfig[0].name);

    const changeView = (name, url) => {
        setActiveItem(name);
        navigate(url);
    };

    const displayNavigation = () => {
        return adminSidebarConfig.map((item, index) => {
            return (
                <li key={index} className={activeItem === item.name ? 'active' : null} onClick={() => changeView(item.name, item.url)}>
                    <i className={item.icon}></i>
                    <span>{item.name}</span>
                </li>
            );
        });
    };

    return (
        <>
            <div className='sidebar-wrapper'>
                <div className='sidebar'>
                    <div className='header'>
                        <h3>Dashboard / </h3>
                        <h3>
                            <Link to={routesConfig.SHOP.url}> HOME</Link>
                        </h3>
                    </div>
                    <div className='navigation'>
                        <nav>
                            <ul>{displayNavigation()}</ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Sidebar;