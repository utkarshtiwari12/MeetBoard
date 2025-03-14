"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

import React, { useCallback, useState } from "react";

import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";
import { useCanRedo, useCanUndo, useHistory, useMutation, useStorage } from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

const MAX_LAYERS = 100;

interface CanvasProps{
  boardId: string;
}

const Canavs = ({
  boardId,
}: CanvasProps) => {

  const layerIds = useStorage((root) => root.layerIds)

  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.none
  })

  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    b: 0,
    g: 0
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Text,
    position: Point
  ) => {
    const liveLayers = storage.get("layers");
    if (liveLayers.size >= MAX_LAYERS) {
      return
    }

    const liveLayerIds = storage.get("layerIds");
    const layerId = nanoid();

    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      height: 100,
      width: 100,
      fill: lastUsedColor
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);

    setMyPresence({ selection: [layerId] }, { addToHistory: true });
    setCanvasState({ mode: CanvasMode.none });
  }, [lastUsedColor])

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, camera);

    setMyPresence({ cursor: current });
  }, [])

  const onPointerLeave = useMutation(( {setMyPresence} ) => {
    setMyPresence({ cursor: null });
  }, [])

  const onPointerUp = useMutation((
    {},
    e
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);
    if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.LayerType, point);
    } else {
      setCanvasState({
        mode: CanvasMode.none
      })
    }
    history.resume();
  }, [camera, canvasState, history, insertLayer])

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canUndo={canUndo}
        canRedo={canRedo}
        undo={history.undo}
        redo={history.redo}
      />

      <svg className="h-[100vh] w-[100vw]" onWheel={onWheel} onPointerMove={onPointerMove} onPointerLeave={onPointerLeave} onPointerUp={onPointerUp}>
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => { }}
              selectionColor="#000"
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  )
}

export default Canavs;