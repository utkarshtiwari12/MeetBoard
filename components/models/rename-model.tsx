"use client";

import { useRenameModel } from "@/store/use-rename-model";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogClose,
    DialogTitle
} from "../ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Id } from "@/convex/_generated/dataModel";

export const RenameModel = () => {

    const update = useMutation(api.board.update);

    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModel();
    
    const [title, setTitle] = useState(initialValues.title);

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title])

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
    
        if (!initialValues.id) return; // Ensure `id` exists
    
        update({ id: initialValues.id as Id<"boards">, title })  
            .then(() => {
                toast.success("Board Renamed");
                onClose();
            })
            .catch(() => {
                toast.error("Failed to Rename board");
            });
    };
    

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Board Title
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    Enter a new title for this board...
                </DialogDescription>

                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Board Title"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit">Save</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}