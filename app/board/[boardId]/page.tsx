"use client";

import { useParams } from "next/navigation";
import Canvas from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

const BoardIdPage = () => {
    const params = useParams<{ boardId: string }>();

    if (!params?.boardId) {
        return <Loading />;
    }

    return (
        <Room roomId={params.boardId} fallback={<Loading />}>
            <Canvas boardId={params.boardId} />
        </Room>
    );
};

export default BoardIdPage;
