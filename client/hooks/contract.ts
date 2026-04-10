"use client";

import {
  Networks,
  TransactionBuilder,
  Keypair,
  rpc,
} from "@stellar/stellar-sdk";
import {
  isConnected,
  getAddress,
  signTransaction,
  setAllowed,
  isAllowed,
  requestAccess,
} from "@stellar/freighter-api";
import * as contractClient from "contract";

// ============================================================
// CONSTANTS — Update these for your contract
// ============================================================

/** Your deployed Soroban contract ID */
export const CONTRACT_ADDRESS =
  "CA35LQQJMVHFK5KF6H5BNAYZHFFALVTYADFI2H4RUNXE6U572BW56NI3";

/** Network passphrase (testnet by default) */
export const NETWORK_PASSPHRASE = Networks.TESTNET;

/** Soroban RPC URL */
export const RPC_URL = "https://soroban-testnet.stellar.org";

/** Horizon URL */
export const HORIZON_URL = "https://horizon-testnet.stellar.org";

/** Network name for Freighter */
export const NETWORK = "TESTNET";

// ============================================================
// RPC Server Instance
// ============================================================

const server = new rpc.Server(RPC_URL);

// ============================================================
// Wallet Helpers
// ============================================================

export async function checkConnection(): Promise<boolean> {
  const result = await isConnected();
  return result.isConnected;
}

export async function connectWallet(): Promise<string> {
  const connResult = await isConnected();
  if (!connResult.isConnected) {
    throw new Error("Freighter extension is not installed or not available.");
  }

  const allowedResult = await isAllowed();
  if (!allowedResult.isAllowed) {
    await setAllowed();
    await requestAccess();
  }

  const { address } = await getAddress();
  if (!address) {
    throw new Error("Could not retrieve wallet address from Freighter.");
  }
  return address;
}

export async function getWalletAddress(): Promise<string | null> {
  try {
    const connResult = await isConnected();
    if (!connResult.isConnected) return null;

    const allowedResult = await isAllowed();
    if (!allowedResult.isAllowed) return null;

    const { address } = await getAddress();
    return address || null;
  } catch {
    return null;
  }
}

// ============================================================
// Contract Interaction Helpers using Generated Bindings
// ============================================================

/**
 * Build, simulate, and optionally sign + submit a Soroban contract call.
 *
 * @param assembledTx - The assembled transaction from contract client
 * @returns The result of the submission
 */
async function signAndSend(
  assembledTx: contractClient.AssembledTransaction<unknown>
) {
  // Sign with Freighter
  const { signedTxXdr } = await signTransaction(assembledTx.tx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const txToSubmit = TransactionBuilder.fromXDR(
    signedTxXdr,
    NETWORK_PASSPHRASE
  );

  const result = await server.sendTransaction(txToSubmit);

  if (result.status === "ERROR") {
    throw new Error(`Transaction submission failed: ${result.status}`);
  }

  // Poll for confirmation
  let getResult = await server.getTransaction(result.hash);
  while (getResult.status === "NOT_FOUND") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    getResult = await server.getTransaction(result.hash);
  }

  if (getResult.status === "FAILED") {
    throw new Error("Transaction failed on chain.");
  }

  return getResult;
}

// ============================================================
// Job Portal — Contract Methods
// ============================================================

/**
 * Post a new job listing.
 * Calls: post_job(id: Symbol, employer: Address, title: String, description: String, location: String, salary_min: i128, salary_max: i128, job_type: Symbol)
 */
export async function postJob(
  caller: string,
  id: string,
  title: string,
  description: string,
  location: string,
  salaryMin: bigint,
  salaryMax: bigint,
  jobType: string
) {
  const client = new contractClient.Client({
    contractId: CONTRACT_ADDRESS,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const tx = await client.post_job({
    id,
    employer: caller,
    title,
    description,
    location,
    salary_min: salaryMin,
    salary_max: salaryMax,
    job_type: jobType,
  });

  return signAndSend(tx);
}

/**
 * Apply for a job.
 * Calls: apply_job(job_id: Symbol, applicant: Address, cover_letter: String)
 */
export async function applyJob(
  caller: string,
  jobId: string,
  coverLetter: string
) {
  const client = new contractClient.Client({
    contractId: CONTRACT_ADDRESS,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const tx = await client.apply_job({
    job_id: jobId,
    applicant: caller,
    cover_letter: coverLetter,
  });

  return signAndSend(tx);
}

/**
 * Close a job listing (only employer can close).
 * Calls: close_job(id: Symbol, employer: Address)
 */
export async function closeJob(caller: string, id: string) {
  const client = new contractClient.Client({
    contractId: CONTRACT_ADDRESS,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const tx = await client.close_job({
    id,
    employer: caller,
  });

  return signAndSend(tx);
}

/**
 * Hire an applicant (only employer can hire).
 * Calls: hire_applicant(job_id: Symbol, employer: Address, applicant: Address)
 */
export async function hireApplicant(
  caller: string,
  jobId: string,
  applicant: string
) {
  const client = new contractClient.Client({
    contractId: CONTRACT_ADDRESS,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const tx = await client.hire_applicant({
    job_id: jobId,
    employer: caller,
    applicant,
  });

  return signAndSend(tx);
}

/**
 * Get job details (read-only).
 * Calls: get_job(id: Symbol) -> Option<Job>
 */
export async function getJob(id: string) {
  const client = new contractClient.Client({
    contractId: CONTRACT_ADDRESS,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const tx = await client.get_job({ id });
  const result = await server.simulateTransaction(tx);
  
  if (
    rpc.Api.isSimulationSuccess(result as rpc.Api.SimulateTransactionResponse) &&
    (result as rpc.Api.SimulateTransactionSuccessResponse).result
  ) {
    return (result as rpc.Api.SimulateTransactionSuccessResponse).result.retval;
  }
  return null;
}

/**
 * List all job IDs (read-only).
 * Calls: list_jobs() -> Vec<Symbol>
 */
export async function listJobs() {
  const client = new contractClient.Client({
    contractId: CONTRACT_ADDRESS,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const tx = await client.list_jobs();
  const result = await server.simulateTransaction(tx);
  
  if (
    rpc.Api.isSimulationSuccess(result as rpc.Api.SimulateTransactionResponse) &&
    (result as rpc.Api.SimulateTransactionSuccessResponse).result
  ) {
    return (result as rpc.Api.SimulateTransactionSuccessResponse).result.retval;
  }
  return null;
}

/**
 * Get application count for a job (read-only).
 * Calls: get_application_count(job_id: Symbol) -> u32
 */
export async function getApplicationCount(jobId: string) {
  const client = new contractClient.Client({
    contractId: CONTRACT_ADDRESS,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  const tx = await client.get_application_count({ job_id: jobId });
  const result = await server.simulateTransaction(tx);
  
  if (
    rpc.Api.isSimulationSuccess(result as rpc.Api.SimulateTransactionResponse) &&
    (result as rpc.Api.SimulateTransactionSuccessResponse).result
  ) {
    return (result as rpc.Api.SimulateTransactionSuccessResponse).result.retval;
  }
  return null;
}