import {menuItemsConfig} from "@/components/common/navbar/menu-items";
import Link from "next/link";


const MenuList = () => {
    return (
        <ul className={'flex gap-10'}>
            {menuItemsConfig.map((item) => (
                <li key={item.title}>
                    <Link href={item.url}
                          className={'flex gap-2 items-center border-b border-transparent hover:border-black'}>
                        {item.icon && item.icon} {item.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};
export default MenuList;
