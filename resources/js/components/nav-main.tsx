import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

    const toggleExpand = (title: string) => {
        setExpandedItems((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const renderNavItem = (item: NavItem) => {
        const isExpanded = expandedItems[item.title] || false;
        const hasSubItems = item.items && item.items.length > 0;
        const isActive = item.href ? page.url.startsWith(item.href) : false;
        const isSubItemActive = hasSubItems ? item.items!.some((subItem) => subItem.href && page.url.startsWith(subItem.href)) : false;

        return (
            <SidebarMenuItem key={item.title}>
                {hasSubItems ? (
                    <>
                        <SidebarMenuButton
                            onClick={() => toggleExpand(item.title)}
                            isActive={isActive || isSubItemActive}
                            tooltip={{ children: item.title }}
                            className="flex justify-between"
                        >
                            <div className="flex items-center">
                                {item.icon && <item.icon className="mr-2" />}
                                <span>{item.title}</span>
                            </div>
                            {isExpanded ? <ChevronDown className="ml-2 h-4 w-4" /> : <ChevronRight className="ml-2 h-4 w-4" />}
                        </SidebarMenuButton>

                        {isExpanded && (
                            <div className="mt-1 space-y-1 pl-4">
                                {item.items!.map((subItem) => (
                                    <SidebarMenuItem key={subItem.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={subItem.href ? page.url.startsWith(subItem.href) : false}
                                            tooltip={{ children: subItem.title }}
                                            className="text-sm"
                                        >
                                            <Link href={subItem.href || '#'} prefetch>
                                                {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                                                <span>{subItem.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: item.title }}>
                        <Link href={item.href || '#'} prefetch>
                            {item.icon && <item.icon className="mr-2" />}
                            <span>{item.title}</span>
                        </Link>
                    </SidebarMenuButton>
                )}
            </SidebarMenuItem>
        );
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>{items.map(renderNavItem)}</SidebarMenu>
        </SidebarGroup>
    );
}
