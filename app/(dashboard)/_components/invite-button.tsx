import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

export const InviteButton = () => {
    return (
        <Dialog>
            <DialogTrigger asChild> 
                <Button variant='outline'> 
                    <Plus className="h-4 w-4 lg:mr-2"/>
                    <span className="hidden lg:block">Invite Members</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0 border-none bg-transparent max-w-[880px]">
                <OrganizationProfile />
            </DialogContent>
        </Dialog>
    )
}