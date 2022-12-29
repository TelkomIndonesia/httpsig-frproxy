/// <reference types="node" />
import { ClientRequest, IncomingMessage } from 'node:http';
export declare const noVerifyHeaders: string[];
export declare function publicKeyFingerprint(key: string): string;
interface SignOptions {
    key: string;
    keyId?: string;
    pubKey?: string;
}
export declare function sign(req: ClientRequest, opts: SignOptions): void;
interface verifiyOptions {
    publicKeys: Map<string, string>;
}
export declare function verify(msg: IncomingMessage, opts: verifiyOptions): {
    verified: boolean;
    error?: undefined;
} | {
    verified: boolean;
    error: unknown;
};
export {};
