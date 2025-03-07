export const Participants = () => {
    return (
        <div className="top-2 absolute h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
            List of Participants.
        </div>
    )
}

Participants.Skeleton = function ParticipantsSkeleton() {
    return (
        <div className="top-2 absolute h-12 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]" />
    )
}