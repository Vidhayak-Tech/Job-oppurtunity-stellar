import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from "@stellar/stellar-sdk/contract";
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
};
export const JobPortalError = {
    1: { message: "JobNotFound" },
    2: { message: "JobAlreadyExists" },
    3: { message: "JobClosed" },
    4: { message: "NotEmployer" },
    5: { message: "InvalidTitle" },
    6: { message: "InvalidSalaryRange" },
    7: { message: "AlreadyApplied" },
    8: { message: "ApplicationNotFound" }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAAA0pvYgAAAAAKAAAAAAAAAA9hcHBsaWNhbnRfY291bnQAAAAABAAAAAAAAAALZGVzY3JpcHRpb24AAAAAEAAAAAAAAAAIZW1wbG95ZXIAAAATAAAAAAAAAAdpc19vcGVuAAAAAAEAAAAAAAAACGpvYl90eXBlAAAAEQAAAAAAAAAIbG9jYXRpb24AAAAQAAAAAAAAAAlwb3N0ZWRfYXQAAAAAAAAGAAAAAAAAAApzYWxhcnlfbWF4AAAAAAALAAAAAAAAAApzYWxhcnlfbWluAAAAAAALAAAAAAAAAAV0aXRsZQAAAAAAABA=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAAB0pvYkxpc3QAAAAAAQAAAAAAAAADSm9iAAAAAAEAAAARAAAAAQAAAAAAAAALQXBwbGljYXRpb24AAAAAAgAAABEAAAATAAAAAQAAAAAAAAAQQXBwbGljYXRpb25Db3VudAAAAAEAAAAR",
            "AAAAAQAAAAAAAAAAAAAAC0FwcGxpY2F0aW9uAAAAAAMAAAAAAAAACmFwcGxpZWRfYXQAAAAAAAYAAAAAAAAADGNvdmVyX2xldHRlcgAAABAAAAAAAAAACGlzX2hpcmVkAAAAAQ==",
            "AAAABAAAAAAAAAAAAAAADkpvYlBvcnRhbEVycm9yAAAAAAAIAAAAAAAAAAtKb2JOb3RGb3VuZAAAAAABAAAAAAAAABBKb2JBbHJlYWR5RXhpc3RzAAAAAgAAAAAAAAAJSm9iQ2xvc2VkAAAAAAAAAwAAAAAAAAALTm90RW1wbG95ZXIAAAAABAAAAAAAAAAMSW52YWxpZFRpdGxlAAAABQAAAAAAAAASSW52YWxpZFNhbGFyeVJhbmdlAAAAAAAGAAAAAAAAAA5BbHJlYWR5QXBwbGllZAAAAAAABwAAAAAAAAATQXBwbGljYXRpb25Ob3RGb3VuZAAAAAAI",
            "AAAAAAAAAAAAAAAHZ2V0X2pvYgAAAAABAAAAAAAAAAJpZAAAAAAAEQAAAAEAAAPoAAAH0AAAAANKb2IA",
            "AAAAAAAAAAAAAAAIcG9zdF9qb2IAAAAIAAAAAAAAAAJpZAAAAAAAEQAAAAAAAAAIZW1wbG95ZXIAAAATAAAAAAAAAAV0aXRsZQAAAAAAABAAAAAAAAAAC2Rlc2NyaXB0aW9uAAAAABAAAAAAAAAACGxvY2F0aW9uAAAAEAAAAAAAAAAKc2FsYXJ5X21pbgAAAAAACwAAAAAAAAAKc2FsYXJ5X21heAAAAAAACwAAAAAAAAAIam9iX3R5cGUAAAARAAAAAA==",
            "AAAAAAAAAAAAAAAJYXBwbHlfam9iAAAAAAAAAwAAAAAAAAAGam9iX2lkAAAAAAARAAAAAAAAAAlhcHBsaWNhbnQAAAAAAAATAAAAAAAAAAxjb3Zlcl9sZXR0ZXIAAAAQAAAAAA==",
            "AAAAAAAAAAAAAAAJY2xvc2Vfam9iAAAAAAAAAgAAAAAAAAACaWQAAAAAABEAAAAAAAAACGVtcGxveWVyAAAAEwAAAAA=",
            "AAAAAAAAAAAAAAAJbGlzdF9qb2JzAAAAAAAAAAAAAAEAAAPqAAAAEQ==",
            "AAAAAAAAAAAAAAAOaGlyZV9hcHBsaWNhbnQAAAAAAAMAAAAAAAAABmpvYl9pZAAAAAAAEQAAAAAAAAAIZW1wbG95ZXIAAAATAAAAAAAAAAlhcHBsaWNhbnQAAAAAAAATAAAAAA==",
            "AAAAAAAAAAAAAAAVZ2V0X2FwcGxpY2F0aW9uX2NvdW50AAAAAAAAAQAAAAAAAAAGam9iX2lkAAAAAAARAAAAAQAAAAQ="]), options);
        this.options = options;
    }
    fromJSON = {
        get_job: (this.txFromJSON),
        post_job: (this.txFromJSON),
        apply_job: (this.txFromJSON),
        close_job: (this.txFromJSON),
        list_jobs: (this.txFromJSON),
        hire_applicant: (this.txFromJSON),
        get_application_count: (this.txFromJSON)
    };
}
