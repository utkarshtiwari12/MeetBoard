import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterProps { 
    title: string;
    authorLabel: string;
    createdAtLabel: string;
    isFavorite: boolean;
    onClick: () => void;
    isDisabled: boolean
}

export const Footer = ({
    title, 
    authorLabel,
    createdAtLabel,
    isFavorite,
    onClick,
    isDisabled,
}: FooterProps) => {

    const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.stopPropagation();
        event.preventDefault();

        onClick();
    }

    return (
        <div className="relative bg-white p-3">
            <p className="text-[13px] truncate max-w-[calc(100%-20px)]">
                {title}
            </p>
            <p className="opacity-0 truncate group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground">
                {authorLabel}, {createdAtLabel}
            </p>
            <button
                disabled={isDisabled}
                onClick={handleClick}
                className={cn("opacity-0 group-hover:opacity-100 transition-opacity absolute top-3 right-3 text-muted-foreground hover:text-blue-600", isDisabled && "cursor-not-allowed opacity-75")}
            >
                <Star
                    className={cn("h-4 w-4", isFavorite && "fill-blue-600 text-blue-600")}
                />
            </button>
        </div>
    )
}