import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
    ChevronRight,
    MoreHorizontal,
    Printer,
    Tag,
    Trash,
} from "lucide-react";
import { StatusIcon } from "@/app/dashboard/regnskab/data-table-status-icons";

type Props = {
    onClickLabelOpen: () => void;
    onClickLabelClosed: () => void;
    onClickDelete: () => void;
};

export default function RegnskabDropdown({
    onClickLabelOpen,
    onClickLabelClosed,
    onClickDelete,
}: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Handlinger</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    <span>Se Regnskab</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Printer className="mr-2 h-4 w-4" />
                    <span>Udskriv Regnskab</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Tag className="mr-2 h-4 w-4" />
                            <span>Markér status som</span>
                        </DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem onClick={onClickLabelOpen}>
                                    <StatusIcon
                                        status="OPEN"
                                        className="mr-2 h-4 w-4 text-gray-600"
                                    />
                                    <span className="text-sm">Åben</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={onClickLabelClosed}>
                                    <StatusIcon
                                        status="CLOSED"
                                        className="mr-2 h-4 w-4 text-gray-600"
                                    />
                                    <span className="text-sm ">Lukket</span>
                                </DropdownMenuItem>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onClickDelete}>
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Slet Regnskab</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
