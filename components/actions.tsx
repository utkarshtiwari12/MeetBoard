"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, } from "./ui/dropdown-menu";

import { ConfirmModel } from "./confirm.model";

import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel"; // Import Id type
import { Button } from "./ui/button";
import { useRenameModel } from "@/store/use-rename-model";
import { useRouter } from "next/navigation";

interface ActionProps{
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionProps) => {

    const router = useRouter();

    const {onOpen} = useRenameModel();

    const remove = useMutation(api.board.remove);
    
    const onDelete = () => {
        remove({ id: id as Id<"boards"> })  
            .then(() => {
                toast.success("Board Deleted");
                router.push("/")
            })
            .catch(() => {
                toast.error("Failed to delete board");
            });
    };
    

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        ).then(() => toast.success("Link Copied"))
            .catch(() => toast.error("Failed to copy link"))
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>

            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem onClick={onCopyLink} className="p-3 cursor-pointer">
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board Link
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => onOpen(id, title)} className="p-3 cursor-pointer">
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>

                <ConfirmModel
                    header="Confirm Delete?"
                    description="This will delete the board and all of its contents."
                    onConfirm={onDelete}
                >
                <Button variant="ghost" className="p-3 cursor-pointer text-sm w-full justify-start font-normal">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                </Button>
                </ConfirmModel>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}