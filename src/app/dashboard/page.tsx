import React from "react";
import CalendarForm from "@/components/ui/CalendarForm";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import MyBreadcrumb from "@/components/client/Breadcrumb";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/app/dashboard/components/date-range-picker";
import { Overview } from "@/app/dashboard/components/overview";
import { RecentSales } from "@/app/dashboard/components/recent-sales";
import { Metadata } from "next";
import { Activity, CircleDollarSign, CreditCard } from "lucide-react";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dit dashboard",
};

const cardsData1 = [
    {
        title: "Totale transaktioner",
        amount: "167",
        change: "+20.1% fra sidste måned",
        icon: <CreditCard className="h-4 w-4 stroke-1" />,
    },
    {
        title: "Total forbrug",
        amount: "45,231.89 kr.",
        change: "+20.1% fra sidste måned",
        icon: <CircleDollarSign className="h-4 w-4 stroke-1" />,
    },
    {
        title: "Rådighedsbeløb",
        amount: "102,451 kr.",
        change: "+20.1% fra sidste måned",
        icon: <CircleDollarSign className="h-4 w-4 stroke-1" />,
    },
    {
        title: "Gns. rådighedsbeløb pr. måned",
        amount: "89,155 kr.",
        change: "+20.1% fra sidste måned",
        icon: <Activity className="h-4 w-4 stroke-1" />,
    },
];

const cardsData2 = [
    {
        title: "Forbrug per. måned",
        content: <Overview />,
        colSpan: "col-span-4",
    },
    {
        title: "Nylige transaktioner",
        description: "Du har lavet 231 totale transaktioner denne periode.",
        content: <RecentSales />,
        colSpan: "col-span-3",
    },
];

export default function Home() {
    return (
        <div className="flex flex-col sm:gap-4 sm:py-8 sm:px-14">
            <MyBreadcrumb crumbs={crumbs} />
            <main className="flex flex-col items-center justify-between">
                <div className="md:hidden">
                    <Image
                        src="/examples/dashboard-light.png"
                        width={1280}
                        height={866}
                        alt="Dashboard"
                        className="block dark:hidden"
                    />
                    <Image
                        src="/examples/dashboard-dark.png"
                        width={1280}
                        height={866}
                        alt="Dashboard"
                        className="hidden dark:block"
                    />
                </div>
                <div className="hidden flex-col w-full md:flex">
                    <div className="flex-1 space-y-4 pt-2 p-6">
                        <div className="flex items-center justify-between space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">
                                Overblik
                            </h2>
                            <div className="flex items-center space-x-2">
                                <CalendarDateRangePicker />
                                <Button variant={"outline"}>
                                    Gå til regnskab
                                </Button>
                                <Button>Download (Ikke implementeret)</Button>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {cardsData1.map((card, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {card.title}
                                        </CardTitle>
                                        {card.icon}
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {card.amount}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {card.change}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            {cardsData2.map((card, index) => (
                                <Card key={index} className={card.colSpan}>
                                    <CardHeader>
                                        <CardTitle>{card.title}</CardTitle>
                                        {card.description && (
                                            <CardDescription>
                                                {card.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent className="pl-2">
                                        {card.content}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

const crumbs = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
];
