import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

const client = createClient({
  publicApiKey:
    "pk_prod_0ctL4Mj2-avErhM8Sg2Y4udAYxNpA494WFpuyDJu3IteW-h8n6BhF3zkV1qWDCHG",
});

export const {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useRoom,
} = createRoomContext(client);
