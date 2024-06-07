import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "../ui/breadcrumb";
import Link from "next/link";

type Crumb = {
    name: string;
    href: string;
};

type Props = {
    crumbs: Crumb[];
};

export default function MyBreadcrumb({ crumbs }: Props) {
    return (
        <div>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <div>
                    <Breadcrumb className="hidden md:flex">
                        <BreadcrumbList>
                            {crumbs.map((crumb, index) => {
                                return (
                                    <>
                                        <BreadcrumbItem key={index}>
                                            <BreadcrumbLink asChild>
                                                <Link href={crumb.href}>
                                                    {crumb.name}
                                                </Link>
                                            </BreadcrumbLink>
                                        </BreadcrumbItem>
                                        {index < crumbs.length - 1 && (
                                            <BreadcrumbSeparator />
                                        )}
                                    </>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </header>
        </div>
    );
}
