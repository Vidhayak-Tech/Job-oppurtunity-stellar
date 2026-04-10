# Job Opportunity Portal Contract (Stellar Soroban)

<img width="1470" height="841" alt="image" src="https://github.com/user-attachments/assets/2662e1b7-92dc-4b33-80a1-251ecc733a86" />


## Overview

The **Job Opportunity Portal Contract** is a decentralized job marketplace built on the Stellar Soroban smart contract platform. It enables employers to post job listings, applicants to apply for jobs, and employers to manage hiring decisions — all on-chain.

This contract ensures transparency, immutability, and trust in the hiring process by leveraging blockchain technology.

**Contract Address:**  
`CA35LQQJMVHFK5KF6H5BNAYZHFFALVTYADFI2H4RUNXE6U572BW56NI3`

---

## Features

### For Employers
- Post new job listings with detailed metadata
- Close job listings when no longer accepting applications
- Hire applicants directly through the contract

### For Applicants
- Apply to open job listings
- Submit a cover letter
- Track application status (hired or not)

### General
- Public access to job listings
- Transparent applicant counts per job
- Immutable application records
- On-chain timestamping for jobs and applications

---

## Data Model

### Job

Each job listing contains:

- **Employer**: Address of the job poster  
- **Title**: Job title (must be non-empty)  
- **Description**: Detailed job description  
- **Location**: Job location  
- **Salary Range**: Minimum and maximum salary  
- **Job Type**: Categorization (e.g., full-time, part-time)  
- **Applicant Count**: Number of applications received  
- **Status**: Whether the job is open or closed  
- **Posted Timestamp**: Time of job creation  

---

### Application

Each application includes:

- **Cover Letter**: Applicant’s submission text  
- **Applied Timestamp**: Time of application  
- **Hiring Status**: Whether the applicant has been hired  

---

### Storage Structure

The contract organizes its data using structured keys:

- **Job List**: Stores all job identifiers  
- **Job Entry**: Maps job IDs to job data  
- **Application Entry**: Maps job ID + applicant address to application data  
- **Application Count**: Tracks number of applications per job  

---

## Core Functionalities

### 1. Post Job

Allows an employer to create a new job listing.

**Requirements:**
- Employer must authorize the transaction  
- Job title must not be empty  
- Minimum salary must not exceed maximum salary  
- Job ID must be unique  

**Effects:**
- Stores job details on-chain  
- Initializes applicant count to zero  
- Adds job ID to the global job list  

---

### 2. Apply for Job

Allows an applicant to apply for a specific job.

**Requirements:**
- Applicant must authorize the transaction  
- Job must exist and be open  
- Applicant must not have already applied  

**Effects:**
- Stores application data  
- Increments job applicant count  
- Updates global application count  

---

### 3. Close Job

Allows the employer to close a job listing.

**Requirements:**
- Employer must authorize the transaction  
- Only the original employer can close the job  
- Job must exist  

**Effects:**
- Marks the job as closed  
- Prevents further applications  

---

### 4. Hire Applicant

Allows the employer to mark an applicant as hired.

**Requirements:**
- Employer must authorize the transaction  
- Only the original employer can hire  
- Application must exist  

**Effects:**
- Updates the application status to "hired"  

---

### 5. Get Job

Fetches details of a specific job.

**Returns:**
- Job data if it exists  
- No data if the job is not found  

---

### 6. List Jobs

Retrieves all job IDs stored in the contract.

**Use Case:**
- Indexing job listings  
- Building frontends to display available jobs  

---

### 7. Get Application Count

Returns the total number of applications for a given job.

---

## Error Handling

The contract enforces strict validation and will fail with specific errors:

- **JobNotFound**: Job does not exist  
- **JobAlreadyExists**: Duplicate job ID  
- **JobClosed**: Job is not accepting applications  
- **NotEmployer**: Unauthorized employer action  
- **InvalidTitle**: Empty job title  
- **InvalidSalaryRange**: Minimum salary exceeds maximum  
- **AlreadyApplied**: Duplicate application attempt  
- **ApplicationNotFound**: Application does not exist  

---

## Security Considerations

- **Authorization Enforcement**:  
  All sensitive operations require cryptographic authorization from the relevant address.  

- **Data Integrity**:  
  Once stored, job and application data cannot be arbitrarily altered.  

- **Duplicate Protection**:  
  Prevents duplicate job postings and multiple applications from the same user.  

---

## Design Notes

- The contract uses **symbol-based IDs** for jobs, making them lightweight and efficient.  
- Applicant counts are tracked both per job and separately for quick lookup.  
- Jobs are never deleted, only marked as closed, preserving historical data.  

---

## Potential Extensions

- Add pagination for job listings  
- Support job editing before closure  
- Introduce applicant shortlisting  
- Add employer/applicant reputation systems  
- Enable token-based incentives or payments  

---

## Conclusion

This smart contract provides a robust foundation for a decentralized job portal on Stellar. It enables trustless interactions between employers and applicants while maintaining transparency and efficiency through on-chain logic.

It can be integrated into web or mobile frontends to create fully decentralized hiring platforms.
