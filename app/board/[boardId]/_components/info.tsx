"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Hint } from "@/components/hint";

import { useRenameModel } from "@/store/use-rename-model";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps {
    boardId: string;
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"]
});

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}

export const Info = ({
    boardId
}: InfoProps) => {

    const {onOpen} = useRenameModel();

    const data = useQuery(api.board.get, {
        id: boardId as Id<"boards">,
    })

    if(!data) return <InfoSkeleton />

    return (
        <div className="top-2 left-2 absolute rounded-md bg-white px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Go to Boards" side="bottom" sideOffset={10}>
                <Button asChild variant="board" className="px-2">
                    <Link href="/">
                        <Image
                            src="/logo.svg"
                            alt="MeetBoard Logo"
                            height={40}
                            width={40}
                        />
                        <span className={cn(
                            "font-semibold text-xl text-black",
                            font.className
                        )}>
                            MeetBoard
                        </span>
                    </Link>
                </Button>
            </Hint>

            <TabSeparator />

            <Hint label="Edit Board Title" side="bottom" sideOffset={10}>
            <Button variant="board" className="text-base font-normal px-2" onClick={() => onOpen(data._id, data.title)}>
                {data.title}
            </Button>
            </Hint>

            <TabSeparator />

            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="Main Menu" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="board">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div>
    )
}


export const InfoSkeleton = () => {
    return (
        <div className="top-2 left-2 absolute rounded-md bg-white px-1.5 h-12 flex items-center shadow-md w-[300px]" />
    )
}