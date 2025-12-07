// ============================================================
// SMART SCHOLARSHIP PORTAL - Flare Coston2 dApp
// With FTSOv2 Price Feed Integration
// ============================================================

// ==== NETWORK CONFIGURATION ====
const COSTON2_CHAIN_ID = 114;
const COSTON2_RPC_URL = "https://coston2-api.flare.network/ext/C/rpc";

// ==== SCHOLARSHIP CONTRACT CONFIG ====
const CONTRACT_ADDRESS = "0xf8e81D47203A594245E36C48e151709F0C19fBe8";

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "student", "type": "address" },
      { "indexed": false, "internalType": "bool", "name": "eligible", "type": "bool" }
    ],
    "name": "EligibilityChecked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "FundsReceived",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "student", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "ScholarshipReleased",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "student", "type": "address" },
      { "indexed": false, "internalType": "uint8", "name": "marks", "type": "uint8" },
      { "indexed": false, "internalType": "uint8", "name": "attendance", "type": "uint8" }
    ],
    "name": "StudentRegistered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MIN_ATTENDANCE",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_MARKS",
    "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "getStudent",
    "outputs": [
      { "internalType": "uint8", "name": "marks", "type": "uint8" },
      { "internalType": "uint8", "name": "attendance", "type": "uint8" },
      { "internalType": "bool", "name": "eligible", "type": "bool" },
      { "internalType": "bool", "name": "received", "type": "bool" },
      { "internalType": "uint256", "name": "appliedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "releasedAt", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalStudents",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "manualRelease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "scholarshipAmount",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "studentList",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "name": "students",
    "outputs": [
      { "internalType": "address", "name": "walletAddress", "type": "address" },
      { "internalType": "uint8", "name": "marks", "type": "uint8" },
      { "internalType": "uint8", "name": "attendance", "type": "uint8" },
      { "internalType": "bool", "name": "isEligible", "type": "bool" },
      { "internalType": "bool", "name": "hasReceived", "type": "bool" },
      { "internalType": "uint256", "name": "appliedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "releasedAt", "type": "uint256" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint8", "name": "_marks", "type": "uint8" },
      { "internalType": "uint8", "name": "_attendance", "type": "uint8" }
    ],
    "name": "submitApplication",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "_newAdmin", "type": "address" }],
    "name": "transferAdmin",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
];

// ==== FTSOv2 CONFIGURATION (Coston2) ====
// FastUpdatesConfiguration contract on Coston2
const FTSO_FAST_UPDATES_ADDRESS = "0x9B931f5d3e24fc8C9064DB35bDc8FB4bE0E862f9";

// FLR/USD Feed ID for Coston2 (21 bytes - category + ticker)
// Category: 01 (Crypto), Ticker: "FLR/USD" padded
const FLR_USD_FEED_ID = "0x01464c522f55534400000000000000000000000000";

// Minimal ABI for FastUpdates (FTSOv2)
const FTSO_FAST_UPDATES_ABI = [
  {
    "inputs": [
      { "internalType": "bytes21[]", "name": "_feedIds", "type": "bytes21[]" }
    ],
    "name": "fetchCurrentFeeds",
    "outputs": [
      { "internalType": "uint256[]", "name": "_values", "type": "uint256[]" },
      { "internalType": "int8[]", "name": "_decimals", "type": "int8[]" },
      { "internalType": "uint64", "name": "_timestamp", "type": "uint64" }
    ],
    "stateMutability": "payable",
    "type": "function"
  }
];

// ==== GLOBALS ====
let provider = null;
let signer = null;
let contract = null;
let currentAccount = null;
let isTransactionPending = false;

// Eligibility thresholds (updated from contract)
let MIN_MARKS_REQ = 85;
let MIN_ATTENDANCE_REQ = 75;

// ==== DOM ELEMENTS ====
const walletDiv = document.getElementById("wallet");
const networkWarning = document.getElementById("networkWarning");
const marksInput = document.getElementById("marks");
const attendanceInput = document.getElementById("attendance");
const marksError = document.getElementById("marksError");
const attendanceError = document.getElementById("attendanceError");
const submitBtn = document.getElementById("submitBtn");
const submitBtnText = document.getElementById("submitBtnText");
const connectBtn = document.getElementById("connectBtn");
const connectBtnText = document.getElementById("connectBtnText");
const statusBox = document.getElementById("status");
const progressBar = document.getElementById("progressBar");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const criteriaMarks = document.getElementById("criteriaMarks");
const criteriaAttendance = document.getElementById("criteriaAttendance");

// FTSO Elements
const flrPriceEl = document.getElementById("flrPrice");
const priceUpdatedEl = document.getElementById("priceUpdated");
const refreshPriceBtn = document.getElementById("refreshPriceBtn");
const refreshBtnText = document.getElementById("refreshBtnText");
const ftsoStatus = document.getElementById("ftsoStatus");

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Update the main status message box
 */
function setStatus(message, type = "info") {
  statusBox.textContent = message;
  statusBox.className = "status-box show status-" + type;
}

/**
 * Clear the status box
 */
function clearStatus() {
  statusBox.className = "status-box";
  statusBox.textContent = "";
}

/**
 * Truncate address for display
 */
function truncateAddress(address) {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
}

/**
 * Update progress bar based on marks and attendance
 */
function updateProgress() {
  const marks = Number(marksInput.value) || 0;
  const attendance = Number(attendanceInput.value) || 0;

  // Calculate average progress
  let progress = (marks + attendance) / 2;
  progress = Math.max(0, Math.min(100, progress));

  progressFill.style.width = progress + "%";

  // Update label
  const isEligible = marks >= MIN_MARKS_REQ && attendance >= MIN_ATTENDANCE_REQ;
  if (marks > 0 || attendance > 0) {
    if (isEligible) {
      progressLabel.textContent = `✅ Eligible! Marks: ${marks}%, Attendance: ${attendance}%`;
      progressLabel.style.color = "var(--earth-green)";
    } else {
      progressLabel.textContent = `📊 Progress: ${progress.toFixed(0)}% — Need Marks ≥ ${MIN_MARKS_REQ} & Attendance ≥ ${MIN_ATTENDANCE_REQ}`;
      progressLabel.style.color = "var(--earth-dark)";
    }
  } else {
    progressLabel.textContent = "";
  }
}

/**
 * Validate input field
 */
function validateInput(input, errorEl, fieldName) {
  const value = Number(input.value);
  
  if (input.value === "") {
    errorEl.textContent = "";
    input.classList.remove("input-error-state", "input-success-state");
    return true;
  }

  if (isNaN(value) || value < 0 || value > 100) {
    errorEl.textContent = `${fieldName} must be between 0 and 100`;
    input.classList.add("input-error-state");
    input.classList.remove("input-success-state");
    return false;
  }

  errorEl.textContent = "";
  input.classList.remove("input-error-state");
  input.classList.add("input-success-state");
  return true;
}

/**
 * Enable form inputs
 */
function enableForm() {
  marksInput.disabled = false;
  attendanceInput.disabled = false;
  submitBtn.disabled = false;
  progressBar.classList.add("show");
}

/**
 * Disable form inputs
 */
function disableForm() {
  marksInput.disabled = true;
  attendanceInput.disabled = true;
  submitBtn.disabled = true;
  progressBar.classList.remove("show");
  progressLabel.textContent = "";
  marksInput.value = "";
  attendanceInput.value = "";
  marksError.textContent = "";
  attendanceError.textContent = "";
  marksInput.classList.remove("input-error-state", "input-success-state");
  attendanceInput.classList.remove("input-error-state", "input-success-state");
  progressFill.style.width = "0%";
}

/**
 * Update criteria display
 */
function updateCriteriaDisplay() {
  criteriaMarks.textContent = `Academic Excellence: Minimum ${MIN_MARKS_REQ}% marks`;
  criteriaAttendance.textContent = `Regular Attendance: Minimum ${MIN_ATTENDANCE_REQ}% presence`;
}

// ============================================================
// WALLET CONNECTION
// ============================================================

/**
 * Connect to MetaMask wallet
 */
async function connectWallet() {
  if (typeof window.ethereum === "undefined") {
    setStatus("❌ MetaMask not detected. Please install MetaMask to continue.", "error");
    return;
  }

  try {
    connectBtnText.innerHTML = '<span class="loading-spinner"></span>Connecting...';
    connectBtn.disabled = true;

    // Request accounts
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    if (!accounts || accounts.length === 0) {
      setStatus("No account selected in MetaMask.", "error");
      connectBtnText.textContent = "🔗 Connect MetaMask Wallet";
      connectBtn.disabled = false;
      return;
    }

    currentAccount = accounts[0];
    walletDiv.textContent = `Connected: ${truncateAddress(currentAccount)}`;
    walletDiv.classList.add("connected");

    // Create ethers provider & signer (v5)
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();

    // Create contract instance
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Check network
    const network = await provider.getNetwork();
    console.log("Connected to network:", network);

    if (network.chainId !== COSTON2_CHAIN_ID) {
      networkWarning.textContent = `⚠️ Wrong network! Please switch to Flare Coston2 (chainId: ${COSTON2_CHAIN_ID}). Current: ${network.chainId}`;
      networkWarning.classList.add("show");
      setStatus(`Connected, but wrong network. Switch to Coston2 testnet.`, "warning");
    } else {
      networkWarning.classList.remove("show");
      networkWarning.textContent = "";
    }

    // Read eligibility criteria from contract
    try {
      const minMarksBN = await contract.MIN_MARKS();
      const minAttendanceBN = await contract.MIN_ATTENDANCE();
      MIN_MARKS_REQ = minMarksBN;
      MIN_ATTENDANCE_REQ = minAttendanceBN;
      console.log("Min criteria from contract:", MIN_MARKS_REQ, MIN_ATTENDANCE_REQ);
      updateCriteriaDisplay();
    } catch (err) {
      console.warn("Could not read MIN_* from contract, using defaults:", err);
    }

    // Update button and enable form
    connectBtnText.textContent = "✅ Wallet Connected";
    enableForm();

    if (network.chainId === COSTON2_CHAIN_ID) {
      setStatus(`Wallet connected on Coston2! Min criteria → Marks ≥ ${MIN_MARKS_REQ}%, Attendance ≥ ${MIN_ATTENDANCE_REQ}%.`, "success");
    }

  } catch (err) {
    console.error("connectWallet error:", err);
    setStatus("Failed to connect wallet: " + (err?.message || err), "error");
    connectBtnText.textContent = "🔗 Connect MetaMask Wallet";
    connectBtn.disabled = false;
  }
}

// ============================================================
// SUBMIT APPLICATION
// ============================================================

/**
 * Submit scholarship application to the contract
 */
async function submitApplication() {
  if (!contract || !signer || !currentAccount) {
    setStatus("Please connect your wallet first.", "error");
    return;
  }

  if (isTransactionPending) {
    setStatus("A transaction is already pending. Please wait.", "warning");
    return;
  }

  // Validate inputs
  const marksValid = validateInput(marksInput, marksError, "Marks");
  const attendanceValid = validateInput(attendanceInput, attendanceError, "Attendance");

  if (!marksValid || !attendanceValid) {
    setStatus("Please fix the input errors above.", "error");
    return;
  }

  const marks = Number(marksInput.value);
  const attendance = Number(attendanceInput.value);

  // Check if values are provided
  if (marksInput.value === "" || attendanceInput.value === "") {
    setStatus("Please enter both marks and attendance.", "error");
    return;
  }

  // Frontend eligibility check - DON'T send transaction if not eligible
  if (marks < MIN_MARKS_REQ || attendance < MIN_ATTENDANCE_REQ) {
    setStatus(
      `❌ Not eligible for scholarship. Requirements: Marks ≥ ${MIN_MARKS_REQ}% (yours: ${marks}%), Attendance ≥ ${MIN_ATTENDANCE_REQ}% (yours: ${attendance}%).`,
      "error"
    );
    return;
  }

  try {
    isTransactionPending = true;
    submitBtn.disabled = true;
    submitBtnText.innerHTML = '<span class="loading-spinner"></span>Sending Transaction...';
    setStatus("📤 Sending transaction to submit your application...", "info");

    const tx = await contract.submitApplication(marks, attendance);
    console.log("Transaction sent:", tx.hash);
    setStatus(`⏳ Transaction sent! Hash: ${truncateAddress(tx.hash)}\nWaiting for confirmation...`, "info");

    const receipt = await tx.wait();
    console.log("Transaction confirmed:", receipt);

    setStatus(
      `✅ Application submitted successfully!\n📦 Block: ${receipt.blockNumber}\n🔗 Tx: ${truncateAddress(receipt.transactionHash)}`,
      "success"
    );

    // Clear form after successful submission
    marksInput.value = "";
    attendanceInput.value = "";
    marksInput.classList.remove("input-success-state");
    attendanceInput.classList.remove("input-success-state");
    progressFill.style.width = "0%";
    progressLabel.textContent = "";

  } catch (err) {
    console.error("submitApplication error:", err);
    
    let errorMessage = "Error submitting application: ";
    if (err?.reason) {
      errorMessage += err.reason;
    } else if (err?.message) {
      if (err.message.includes("user rejected")) {
        errorMessage = "Transaction was rejected by user.";
      } else {
        errorMessage += err.message.slice(0, 100);
      }
    } else {
      errorMessage += "Unknown error";
    }
    
    setStatus(errorMessage, "error");
  } finally {
    isTransactionPending = false;
    submitBtn.disabled = false;
    submitBtnText.textContent = "🎓 Submit Application";
  }
}

// ============================================================
// FTSOv2 PRICE FEED
// ============================================================

/**
 * Fetch FLR/USD price from FTSOv2 on Coston2
 */
async function fetchFTSOPrice() {
  try {
    refreshPriceBtn.disabled = true;
    refreshBtnText.innerHTML = '<span class="loading-spinner"></span>Fetching...';
    ftsoStatus.textContent = "";
    ftsoStatus.className = "ftso-status";

    // Create read-only provider for FTSO (no wallet needed)
    const ftsoProvider = new ethers.providers.JsonRpcProvider(COSTON2_RPC_URL);

    // Create contract instance
    const ftsoContract = new ethers.Contract(
      FTSO_FAST_UPDATES_ADDRESS,
      FTSO_FAST_UPDATES_ABI,
      ftsoProvider
    );

    // Fetch the price feed
    const feedIds = [FLR_USD_FEED_ID];
    
    // Call fetchCurrentFeeds (it's payable but we can call it with 0 value for reads)
    const result = await ftsoContract.callStatic.fetchCurrentFeeds(feedIds, { value: 0 });
    
    const values = result._values;
    const decimals = result._decimals;
    const timestamp = result._timestamp;

    console.log("FTSO Result:", { values, decimals, timestamp });

    if (values.length > 0) {
      // Convert price using decimals
      const rawValue = values[0];
      const decimalPlaces = decimals[0];
      
      // Format the price
      let price;
      if (decimalPlaces >= 0) {
        price = ethers.utils.formatUnits(rawValue, decimalPlaces);
      } else {
        // Negative decimals mean multiply
        price = rawValue.mul(ethers.BigNumber.from(10).pow(-decimalPlaces)).toString();
      }

      // Display with reasonable precision
      const priceNum = parseFloat(price);
      flrPriceEl.textContent = priceNum < 0.01 ? priceNum.toFixed(6) : priceNum.toFixed(4);

      // Format timestamp
      const date = new Date(Number(timestamp) * 1000);
      priceUpdatedEl.textContent = `Last updated: ${date.toLocaleString()}`;

      ftsoStatus.textContent = "✅ Price fetched successfully";
    } else {
      throw new Error("No price data returned");
    }

  } catch (err) {
    console.error("FTSO fetch error:", err);
    flrPriceEl.textContent = "--";
    priceUpdatedEl.textContent = "Last updated: --";
    ftsoStatus.textContent = "⚠️ Could not load price (see console)";
    ftsoStatus.className = "ftso-status error";
  } finally {
    refreshPriceBtn.disabled = false;
    refreshBtnText.textContent = "🔄 Refresh Price";
  }
}

// ============================================================
// EVENT LISTENERS
// ============================================================

// Connect wallet button
connectBtn?.addEventListener("click", connectWallet);

// Submit button
submitBtn?.addEventListener("click", submitApplication);

// Refresh price button
refreshPriceBtn?.addEventListener("click", fetchFTSOPrice);

// Input validation and progress update
marksInput?.addEventListener("input", () => {
  validateInput(marksInput, marksError, "Marks");
  updateProgress();
});

attendanceInput?.addEventListener("input", () => {
  validateInput(attendanceInput, attendanceError, "Attendance");
  updateProgress();
});

// Handle MetaMask events
if (typeof window.ethereum !== "undefined") {
  // Account changed
  window.ethereum.on("accountsChanged", (accounts) => {
    if (!accounts || accounts.length === 0) {
      currentAccount = null;
      walletDiv.textContent = "Wallet Not Connected";
      walletDiv.classList.remove("connected");
      connectBtnText.textContent = "🔗 Connect MetaMask Wallet";
      connectBtn.disabled = false;
      disableForm();
      setStatus("MetaMask account disconnected.", "info");
      contract = null;
      signer = null;
    } else {
      currentAccount = accounts[0];
      walletDiv.textContent = `Connected: ${truncateAddress(currentAccount)}`;
      walletDiv.classList.add("connected");
      
      // Re-create signer for new account
      if (provider) {
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      }
      
      enableForm();
      setStatus("Account switched. Ready to submit applications.", "info");
    }
  });

  // Network changed
  window.ethereum.on("chainChanged", (chainIdHex) => {
    const chainId = parseInt(chainIdHex, 16);
    console.log("Network changed to:", chainId);
    
    if (chainId !== COSTON2_CHAIN_ID) {
      networkWarning.textContent = `⚠️ Wrong network! Please switch to Flare Coston2 (chainId: ${COSTON2_CHAIN_ID}). Current: ${chainId}`;
      networkWarning.classList.add("show");
      setStatus("Please switch to Coston2 testnet to continue.", "warning");
    } else {
      networkWarning.classList.remove("show");
      networkWarning.textContent = "";
      setStatus("Connected to Coston2 testnet! ✅", "success");
    }

    // Reload to reset state properly
    setTimeout(() => window.location.reload(), 1500);
  });
}

// ============================================================
// INITIALIZATION
// ============================================================

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  console.log("Smart Scholarship Portal initialized");
  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("Network: Flare Coston2 (chainId:", COSTON2_CHAIN_ID, ")");

  // Update criteria display with defaults
  updateCriteriaDisplay();

  // Fetch FTSO price on load
  fetchFTSOPrice();
});
