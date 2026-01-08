# Forensic Analysts Guide for Secure Evidence Collection & Verification

## Introduction
EVID-DGC is a blockchain-based evidence management system designed to maintain the integrity and chain of custody of digital evidence throughout the forensic investigation process.

### Key Benefits for Forensic Analysts
- **Immutable Evidence Records**: All evidence is cryptographically hashed and stored on blockchain
- **Automated Chain of Custody**: Every access and modification is automatically logged
- **Real-time Verification**: Instant integrity verification against blockchain records
- **Standards Compliance**: Aligned with ISO 27037 and NIST digital forensics guidelines

## Evidence Registration Process

### Step 1: Pre-Registration Checklist
✅ **Physical Evidence Secured**
- Evidence properly bagged and labeled
- Chain of custody forms initiated
- Photography completed

✅ **Digital Evidence Prepared**
- Forensic imaging completed using write-blocking tools
- Hash values calculated using multiple algorithms
- Working copies created for analysis

### Step 2: System Access
1. **Login to EVID-DGC**
   ```
   URL: https://evid-dgc.onrender.com
   Role: Forensic Analyst
   Authentication: MetaMask + 2FA (recommended)
   ```

2. **Verify System Status**
   - Check blockchain connectivity indicator (green = connected)
   - Confirm storage system availability

### Step 3: Evidence Registration
1. **Access Evidence Upload Interface**
   - From case detail page, click "Add Evidence"
   - Select "Forensic Evidence Upload"

2. **Complete Evidence Form**
   ```
   Evidence ID: [Auto-generated or manual entry]
   Evidence Name: [Descriptive name]
   Evidence Type: [Select from dropdown]
   Collection Date: [Date/time of collection]
   Collection Location: [Physical location]
   Collected By: [Officer/analyst name]
   ```

## Safe Hashing & Upload Workflows

### Pre-Upload Hash Calculation
**Using Command Line Tools:**
```bash
# Windows (PowerShell)
Get-FileHash -Path "evidence.img" -Algorithm SHA256

# Linux/macOS
sha256sum evidence.img
```

**Using Forensic Tools:**
- **FTK Imager**: Built-in hash calculation during imaging
- **EnCase**: Automatic hash verification
- **Autopsy**: Hash calculation in case management
- **X-Ways Forensics**: Multiple hash algorithm support

### Upload Security Measures
1. **Network Security**
   - Use secure, encrypted connection (HTTPS)
   - Verify SSL certificate validity
   - Use VPN if accessing remotely

2. **File Integrity**
   - Hash verification before upload
   - Chunked upload with integrity checks
   - Automatic re-upload on corruption detection

## Chain of Custody Management

### Digital Chain of Custody
EVID-DGC automatically maintains digital chain of custody through:

1. **Immutable Timestamps**
   - Blockchain-based timestamping
   - Cannot be altered or backdated
   - Cryptographically verifiable

2. **Access Tracking**
   - Every file access logged
   - User identification required
   - Purpose of access documented

### Court-Ready Documentation
Generate comprehensive custody reports:
1. **Access Report Generation**
   - Navigate to evidence detail page
   - Click "Generate Custody Report"
   - Select date range and detail level
   - Download PDF report

## Evidence Integrity Verification

### Real-Time Verification
**Automatic Verification:**
- System continuously monitors file integrity
- Compares current hash with blockchain record
- Alerts on any discrepancies

**Manual Verification:**
1. Navigate to evidence item
2. Click "Verify Integrity"
3. System recalculates hash
4. Compares with blockchain record
5. Displays verification result

### Verification Scenarios
**✅ Successful Verification**
- Hash matches blockchain record
- Evidence integrity confirmed
- Safe to proceed with analysis

**❌ Verification Failure**
- Hash mismatch detected
- Evidence may be compromised
- Immediate investigation required

## Best Practices

### Evidence Collection
1. **Use Write-Blocking Tools**
   - Hardware write blockers for physical media
   - Software write protection for logical imaging
   - Verify write-blocking functionality before use

2. **Multiple Hash Algorithms**
   - Calculate MD5, SHA-1, and SHA-256 hashes
   - Store all hash values in case documentation
   - Use for cross-verification purposes

### System Usage
1. **Regular Verification**
   - Verify evidence integrity weekly
   - Check blockchain connectivity daily
   - Monitor system alerts and notifications

2. **Documentation Standards**
   - Use consistent naming conventions
   - Include detailed evidence descriptions
   - Maintain comprehensive case notes

## Integration with Standard Tools

### FTK (Forensic Toolkit)
**Integration Steps:**
1. Complete imaging in FTK
2. Export hash values and metadata
3. Upload image files to EVID-DGC
4. Import FTK metadata into case record

### EnCase
**Workflow Integration:**
1. Create EnCase evidence file (.E01)
2. Calculate verification hashes
3. Register in EVID-DGC with EnCase metadata
4. Link analysis results to evidence record

## Compliance Standards

### ISO 27037:2012 Compliance
**Digital Evidence Handling:**
- ✅ Identification and documentation
- ✅ Collection with integrity preservation
- ✅ Acquisition using validated tools
- ✅ Preservation of original evidence
- ✅ Chain of custody maintenance

### NIST Guidelines Compliance
**NIST SP 800-86 Requirements:**
- ✅ Evidence collection procedures
- ✅ Examination methodology
- ✅ Analysis documentation
- ✅ Reporting standards

## Troubleshooting

### Common Issues
**Hash Mismatch Errors**
```
Problem: Calculated hash doesn't match expected value
Solutions:
1. Re-calculate hash using different tool
2. Verify file integrity at source
3. Re-transfer file if necessary
4. Contact system administrator if persistent
```

**Upload Failures**
```
Problem: Evidence file upload fails
Solutions:
1. Check network connection
2. Verify file size limits
3. Contact administrator for storage
4. Confirm user permissions
```

---

**Document Version**: 2.0  
**Last Updated**: January 2024  
**Prepared by**: EVID-DGC Development Team