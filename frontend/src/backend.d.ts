import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    checkTripExists(): Promise<boolean>;
    getCost(_distance: number, _time: number): Promise<bigint>;
    getDistance(): Promise<number>;
    getFinalTripStep(step: bigint): Promise<bigint>;
    getTime(distance: number): Promise<number>;
    startBooking(): Promise<bigint>;
    verifyOTP(enteredOTP: bigint): Promise<boolean>;
}
