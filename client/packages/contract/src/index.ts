import { Buffer } from "buffer";
import { Address } from "@stellar/stellar-sdk";
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  MethodOptions,
  Result,
  Spec as ContractSpec,
} from "@stellar/stellar-sdk/contract";
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Timepoint,
  Duration,
} from "@stellar/stellar-sdk/contract";
export * from "@stellar/stellar-sdk";
export * as contract from "@stellar/stellar-sdk/contract";
export * as rpc from "@stellar/stellar-sdk/rpc";

if (typeof window !== "undefined") {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CA35LQQJMVHFK5KF6H5BNAYZHFFALVTYADFI2H4RUNXE6U572BW56NI3",
  }
} as const


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

export type DataKey = {tag: "JobList", values: void} | {tag: "Job", values: readonly [string]} | {tag: "Application", values: readonly [string, string]} | {tag: "ApplicationCount", values: readonly [string]};


export interface Application {
  applied_at: u64;
  cover_letter: string;
  is_hired: boolean;
}

export const JobPortalError = {
  1: {message:"JobNotFound"},
  2: {message:"JobAlreadyExists"},
  3: {message:"JobClosed"},
  4: {message:"NotEmployer"},
  5: {message:"InvalidTitle"},
  6: {message:"InvalidSalaryRange"},
  7: {message:"AlreadyApplied"},
  8: {message:"ApplicationNotFound"}
}

export interface Client {
  /**
   * Construct and simulate a get_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_job: ({id}: {id: string}, options?: MethodOptions) => Promise<AssembledTransaction<Option<Job>>>

  /**
   * Construct and simulate a post_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  post_job: ({id, employer, title, description, location, salary_min, salary_max, job_type}: {id: string, employer: string, title: string, description: string, location: string, salary_min: i128, salary_max: i128, job_type: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a apply_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  apply_job: ({job_id, applicant, cover_letter}: {job_id: string, applicant: string, cover_letter: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a close_job transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  close_job: ({id, employer}: {id: string, employer: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a list_jobs transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  list_jobs: (options?: MethodOptions) => Promise<AssembledTransaction<Array<string>>>

  /**
   * Construct and simulate a hire_applicant transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  hire_applicant: ({job_id, employer, applicant}: {job_id: string, employer: string, applicant: string}, options?: MethodOptions) => Promise<AssembledTransaction<null>>

  /**
   * Construct and simulate a get_application_count transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_application_count: ({job_id}: {job_id: string}, options?: MethodOptions) => Promise<AssembledTransaction<u32>>

}
export class Client extends ContractClient {
  static async deploy<T = Client>(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options: MethodOptions &
      Omit<ContractClientOptions, "contractId"> & {
        /** The hash of the Wasm blob, which must already be installed on-chain. */
        wasmHash: Buffer | string;
        /** Salt used to generate the contract's ID. Passed through to {@link Operation.createCustomContract}. Default: random. */
        salt?: Buffer | Uint8Array;
        /** The format used to decode `wasmHash`, if it's provided as a string. */
        format?: "hex" | "base64";
      }
  ): Promise<AssembledTransaction<T>> {
    return ContractClient.deploy(null, options)
  }
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAA0pvYgAAAAAKAAAAAAAAAA9hcHBsaWNhbnRfY291bnQAAAAABAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAIZW1wbG95ZXIAAAATAAAAAAAAAAdpc19vcGVuAAAAAAEAAAAAAAAACGpvYl90eXBlAAAAEQAAAAAAAAAIbG9jYXRpb24AAAAQAAAAAAAAAAlwb3N0ZWRfYXQAAAAAAAAGAAAAAAAAAApzYWxhcnlfbWF4AAAAAAALAAAAAAAAAApzYWxhcnlfbWluAAAAAAALAAAAAAAAAAV0aXRsZQAAAAAAABA=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAAB0pvYkxpc3QAAAAAAQAAAAAAAAADSm9iAAAAAAEAAAARAAAAAQAAAAAAAAALQXBwbGljYXRpb24AAAAAAgAAABEAAAATAAAAAQAAAAAAAAAQQXBwbGljYXRpb25Db3VudAAAAAEAAAAR",
        "AAAAAQAAAAAAAAAAAAAAC0FwcGxpY2F0aW9uAAAAAAMAAAAAAAAACmFwcGxpZWRfYXQAAAAAAAYAAAAAAAAADGNvdmVyX2xldHRlcgAAABAAAAAAAAAACGlzX2hpcmVkAAAAAQ==",
        "AAAABAAAAAAAAAAAAAAADkpvYlBvcnRhbEVycm9yAAAAAAAIAAAAAAAAAAtKb2JOb3RGb3VuZAAAAAABAAAAAAAAABBKb2JBbHJlYWR5RXhpc3RzAAAAAgAAAAAAAAAJSm9iQ2xvc2VkAAAAAAAAAwAAAAAAAAALTm90RW1wbG95ZXIAAAAABAAAAAAAAAAMSW52YWxpZFRpdGxlAAAABQAAAAAAAAASSW52YWxpZFNhbGFyeVJhbmdlAAAAAAAGAAAAAAAAAA5BbHJlYWR5QXBwbGllZAAAAAAABwAAAAAAAAATQXBwbGljYXRpb25Ob3RGb3VuZAAAAAAI",
        "AAAAAAAAAAAAAAAHZ2V0X2pvYgAAAAABAAAAAAAAAAJpZAAAAAAAEQAAAAEAAAPoAAAH0AAAAANKb2IA",
        "AAAAAAAAAAAAAAAIcG9zdF9qb2IAAAAIAAAAAAAAAAJpZAAAAAAAEQAAAAAAAAAIZW1wbG95ZXIAAAATAAAAAAAAAAV0aXRsZQAAAAAAABAAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAACGxvY2F0aW9uAAAAEAAAAAAAAAAKc2FsYXJ5X21pbgAAAAAACwAAAAAAAAAKc2FsYXJ5X21heAAAAAAACwAAAAAAAAAIam9iX3R5cGUAAAARAAAAAA==",
        "AAAAAAAAAAAAAAAJYXBwbHlfam9iAAAAAAAAAwAAAAAAAAAGam9iX2lkAAAAAAARAAAAAAAAAAlhcHBsaWNhbnQAAAAAAAATAAAAAAAAAAxjb3Zlcl9sZXR0ZXIAAAAQAAAAAA==",
        "AAAAAAAAAAAAAAAJY2xvc2Vfam9iAAAAAAAAAgAAAAAAAAACaWQAAAAAABEAAAAAAAAACGVtcGxveWVyAAAAEwAAAAA=",
        "AAAAAAAAAAAAAAAJbGlzdF9qb2JzAAAAAAAAAAAAAAEAAAPqAAAAEQ==",
        "AAAAAAAAAAAAAAAOaGlyZV9hcHBsaWNhbnQAAAAAAAMAAAAAAAAABmpvYl9pZAAAAAAAEQAAAAAAAAAIZW1wbG95ZXIAAAATAAAAAAAAAAlhcHBsaWNhbnQAAAAAAAATAAAAAA==",
        "AAAAAAAAAAAAAAAVZ2V0X2FwcGxpY2F0aW9uX2NvdW50AAAAAAAAAQAAAAAAAAAGam9iX2lkAAAAAAARAAAAAQAAAAQ=" ]),
      options
    )
  }
  public readonly fromJSON = {
    get_job: this.txFromJSON<Option<Job>>,
        post_job: this.txFromJSON<null>,
        apply_job: this.txFromJSON<null>,
        close_job: this.txFromJSON<null>,
        list_jobs: this.txFromJSON<Array<string>>,
        hire_applicant: this.txFromJSON<null>,
        get_application_count: this.txFromJSON<u32>
  }
}