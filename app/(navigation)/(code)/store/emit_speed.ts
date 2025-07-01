import { atomWithHash } from "jotai-location";


export const EMIT_SPEEDS = [50,100,150,250,300] as const;

export type EmitSpeed = (typeof EMIT_SPEEDS)[number];

export function isEmitSpeed(value: EmitSpeed | unknown): value is EmitSpeed {
  return EMIT_SPEEDS.indexOf(value as EmitSpeed) !== -1;
}

const emitSpeedAtom = atomWithHash<EmitSpeed>("emitSpeed", EMIT_SPEEDS[0]);

export { emitSpeedAtom };
