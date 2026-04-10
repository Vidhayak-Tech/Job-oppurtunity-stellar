import { Buffer } from "buffer";
import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, MethodOptions } from "@stellar/stellar-sdk/contract";
import type { u32, u64, i128, Option } from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CA35LQQJMVHFK5KF6H5BNAYZHFFALVTYADFI2H4RUNXE6U572BW56NI3";
    };
};
export interface Job {
    applicant_count: u32;
    description: string;
    employer: string;
    is_open: boolean;
    job_type: string;
    location: string;
    posted_at: u64;
    salary_max: i128;
    salary_min: i128;
    title: string;
}
export type DataKey = {
    tag: "JobList";
    values: void;
} | {
    tag: "Job";
    values: readonly [string];
} | {
    tag: "Application";
    values: readonly [string, string];
} | {
    tag: "ApplicationCount";
    values: readonly [string];
};
export interface Application {
    applied_at: u64;
    cover_letter: string;
    is_hired: boolean;
}
export declare const JobPortalError: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
    6: {
        message: string;
    };
    7: {
        message: string;
    };
    8: {
        message: string;
    };
};
export interface Client {
    /**
     * Construct and simulate a get_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_job: ({ id }: {
        id: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<Option<Job>>>;
    /**
     * Construct and simulate a post_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    post_job: ({ id, employer, title, description, location, salary_min, salary_max, job_type }: {
        id: string;
        employer: string;
        title: string;
        description: string;
        location: string;
        salary_min: i128;
        salary_max: i128;
        job_type: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a apply_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    apply_job: ({ job_id, applicant, cover_letter }: {
        job_id: string;
        applicant: string;
        cover_letter: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a close_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    close_job: ({ id, employer }: {
        id: string;
        employer: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a list_jobs transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    list_jobs: (options?: MethodOptions) => Promise<AssembledTransaction<Array<string>>>;
    /**
     * Construct and simulate a hire_applicant transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    hire_applicant: ({ job_id, employer, applicant }: {
        job_id: string;
        employer: string;
        applicant: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<null>>;
    /**
     * Construct and simulate a get_application_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_application_count: ({ job_id }: {
        job_id: string;
    }, options?: MethodOptions) => Promise<AssembledTransaction<u32>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    static deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions & Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
    }): Promise<AssembledTransaction<T>>;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        get_job: (json: string) => AssembledTransaction<Option<Job>>;
        post_job: (json: string) => AssembledTransaction<null>;
        apply_job: (json: string) => AssembledTransaction<null>;
        close_job: (json: string) => AssembledTransaction<null>;
        list_jobs: (json: string) => AssembledTransaction<string[]>;
        hire_applicant: (json: string) => AssembledTransaction<null>;
        get_application_count: (json: string) => AssembledTransaction<number>;
    };
}
