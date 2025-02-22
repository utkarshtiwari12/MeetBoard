"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import { useOrganization } from "@clerk/nextjs";
import { toast } from "sonner";

export const EmptyBoards = () => {

    const { organization } = useOrganization();

    const create = useMutation(api.board.create);

    const onClick = () => {

        if (!organization) return;

        create({
            orgId: organization?.id,
            title: "Untitled"
        })
            .then((id) => {
                toast.success("Board Created");

                // TODO : redirect to board/{id}
            })
            .catch(() => toast.error("Failed to create board"));
    }

    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src='./note.svg'
                height={110}
                width={110}
                alt="Empty"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Create Your First Board!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Start by creating a board for your organization.
            </p>
            <div className="mt-6">
                <Button onClick={onClick} size='lg'>Create Board</Button>
            </div>
        </div>
    )
}