import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import type { MenuItem } from 'primereact/menuitem';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  

export default function NavbarDefault() {
    const itemRenderer = (item: any) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home'
        },
        {
            label: 'Features',
            icon: 'pi pi-star'
        }
    ];

    const end = (
        <div className="flex align-items-center gap-2">
            <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" />
            <Avatar image="https://primefaces.org/cdn/primerestartact/images/avatar/amyelsner.png" shape="circle" />
        </div>
    );

    return (
        <div className="card" style={{ marginBottom: '2rem', position: 'sticky', top: 0, zIndex: 1000 }}>
            <Menubar model={items} end={end} />
        </div>
    )
}
        
        