// ✅ Contract details
const contractAddress = "0xfE44C4AceEC49c31c44894733662E47E521904F0";

const contractABI = [
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
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
    "inputs": [{ "internalType": "address", "name": "_student", "type": "address" }],
    "name": "manualRelease",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
    "inputs": [{ "internalType": "uint256", "name": "_amount", "type": "uint256" }],
    "name": "setScholarshipAmount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
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
  { "stateMutability": "payable", "type": "receive" },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
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
  }
];

let account;

// ------------------------------
// ✅ Connect Wallet
// ------------------------------
async function connectWallet() {
  if (!window.ethereum) return alert("MetaMask not installed");

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    account = accounts[0];
    document.getElementById("wallet").innerText = "Connected: " + account;
  } catch (err) {
    console.error(err);
    alert("Wallet connection failed.");
  }
}

// ------------------------------
// ✅ Submit Application to Blockchain
// ------------------------------
async function releaseScholarship() {
  const marksInput = document.getElementById("marks");
  const attendanceInput = document.getElementById("attendance");
  const statusEl = document.getElementById("status");

  let marks = Number(marksInput.value);
  let attendance = Number(attendanceInput.value);

  if (!account) return (statusEl.innerText = "❌ Connect wallet first.");
  if (!marksInput.value || !attendanceInput.value)
    return (statusEl.innerText = "❌ Fill both values.");
  if (
    isNaN(marks) ||
    isNaN(attendance) ||
    marks < 0 ||
    marks > 100 ||
    attendance < 0 ||
    attendance > 100
  )
    return (statusEl.innerText = "❌ Values must be 0–100.");

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    statusEl.innerText = "⏳ Sending transaction...";

    // ⭐ Calls your smart contract
    const tx = await contract.submitApplication(marks, attendance);

    statusEl.innerText = "⏳ Waiting for confirmation...";

    await tx.wait();

    statusEl.innerText = "✅ Application submitted on-chain!";
  } catch (err) {
    console.error(err);
    statusEl.innerText = "❌ Transaction failed.";
  }
}
// Contract Configuration
    const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE"; // Replace after deployment
    const CONTRACT_ABI = [
      "function submitApplication(uint8 _marks, uint8 _attendance) external",
      "function getStudent(address _student) external view returns (uint8 marks, uint8 attendance, bool eligible, bool received, uint256 appliedAt, uint256 releasedAt)",
      "function scholarshipAmount() external view returns (uint256)",
      "function getBalance() external view returns (uint256)",
      "event StudentRegistered(address indexed student, uint8 marks, uint8 attendance)",
      "event ScholarshipReleased(address indexed student, uint256 amount)"
    ];

    let provider;
    let signer;
    let contract;
    let userAddress;

    // Connect Wallet
    async function connectWallet() {
      try {
        if (typeof window.ethereum === 'undefined') {
          showStatus('Please install MetaMask!', 'error');
          return;
        }

        showStatus('Connecting to MetaMask...', 'info');
        
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        userAddress = accounts[0];
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        // Update UI
        document.getElementById('wallet').innerHTML = `
          <strong>✅ Connected:</strong> ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}
        `;
        document.getElementById('wallet').classList.add('wallet-connected');
        document.getElementById('connectBtn').textContent = '✅ Wallet Connected';
        document.getElementById('connectBtn').disabled = true;
        
        // Enable inputs
        document.getElementById('marks').disabled = false;
        document.getElementById('attendance').disabled = false;
        document.getElementById('submitBtn').disabled = false;

        showStatus('Wallet connected successfully!', 'success');
        
        // Check if user already applied
        await checkExistingApplication();

      } catch (error) {
        console.error(error);
        showStatus('Failed to connect wallet: ' + error.message, 'error');
      }
    }

    // Check if user already applied
    async function checkExistingApplication() {
      try {
        const studentData = await contract.getStudent(userAddress);
        if (studentData.marks > 0) {
          showStatus('You have already submitted an application!', 'warning');
          document.getElementById('marks').value = studentData.marks;
          document.getElementById('attendance').value = studentData.attendance;
          document.getElementById('marks').disabled = true;
          document.getElementById('attendance').disabled = true;
          document.getElementById('submitBtn').disabled = true;
          
          if (studentData.received) {
            showStatus('🎉 Scholarship already released to your wallet!', 'success');
          } else if (studentData.eligible) {
            showStatus('You are eligible! Processing scholarship...', 'info');
          } else {
            showStatus('Application submitted. Not eligible for scholarship.', 'warning');
          }
        }
      } catch (error) {
        console.error('Error checking application:', error);
      }
    }

    // Submit Application
    async function submitApplication() {
      const marks = parseInt(document.getElementById('marks').value);
      const attendance = parseInt(document.getElementById('attendance').value);

      // Validation
      if (isNaN(marks) || marks < 0 || marks > 100) {
        showStatus('Please enter valid marks (0-100)', 'error');
        return;
      }

      if (isNaN(attendance) || attendance < 0 || attendance > 100) {
        showStatus('Please enter valid attendance (0-100)', 'error');
        return;
      }

      try {
        showStatus('Submitting your application... Please confirm in MetaMask', 'info');
        document.getElementById('submitBtn').innerHTML = '<span class="loading"></span> Processing...';
        document.getElementById('submitBtn').disabled = true;

        // Submit transaction
        const tx = await contract.submitApplication(marks, attendance);
        showStatus('Transaction submitted! Waiting for confirmation...', 'info');
        
        // Wait for transaction to be mined
        const receipt = await tx.wait();
        
        // Check eligibility
        if (marks >= 85 && attendance >= 75) {
          showStatus('🎉 Congratulations! You are eligible! Scholarship will be released to your wallet.', 'success');
        } else {
          showStatus('Application submitted successfully. Unfortunately, you do not meet the eligibility criteria.', 'warning');
        }

        // Disable form
        document.getElementById('marks').disabled = true;
        document.getElementById('attendance').disabled = true;

      } catch (error) {
        console.error(error);
        let errorMsg = 'Transaction failed: ';
        
        if (error.message.includes('Already applied')) {
          errorMsg = 'You have already submitted an application!';
        } else if (error.message.includes('user rejected')) {
          errorMsg = 'Transaction was rejected by user';
        } else {
          errorMsg += error.message;
        }
        
        showStatus(errorMsg, 'error');
        document.getElementById('submitBtn').innerHTML = '🎓 Submit Application';
        document.getElementById('submitBtn').disabled = false;
      }
    }

    // Show status message
    function showStatus(message, type) {
      const statusDiv = document.getElementById('status');
      statusDiv.textContent = message;
      statusDiv.className = 'status-box show status-' + type;
      
      // Auto-hide info messages after 5 seconds
      if (type === 'info') {
        setTimeout(() => {
          statusDiv.classList.remove('show');
        }, 5000);
      }
    }

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          location.reload();
        } else {
          location.reload();
        }
      });

      window.ethereum.on('chainChanged', () => {
        location.reload();
      });
    }// Contract Configuration
    const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
    const CONTRACT_ABI = [
      "function submitApplication(uint8 _marks, uint8 _attendance) external",
      "function getStudent(address _student) external view returns (uint8 marks, uint8 attendance, bool eligible, bool received, uint256 appliedAt, uint256 releasedAt)",
      "function scholarshipAmount() external view returns (uint256)",
      "function getBalance() external view returns (uint256)",
      "event StudentRegistered(address indexed student, uint8 marks, uint8 attendance)",
      "event ScholarshipReleased(address indexed student, uint256 amount)"
    ];

    let provider;
    let signer;
    let contract;
    let userAddress;

    // Connect Wallet
    async function connectWallet() {
      try {
        if (typeof window.ethereum === 'undefined') {
          showStatus('⚠️ Please install MetaMask to continue', 'error');
          return;
        }

        showProgress(30);
        showStatus('🔄 Connecting to MetaMask...', 'info');
        
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        showProgress(60);
        userAddress = accounts[0];
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

        showProgress(100);

        // Update UI
        document.getElementById('wallet').innerHTML = `✅ Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;
        document.getElementById('wallet').classList.add('connected');
        document.getElementById('connectBtn').innerHTML = '<span>✅ Wallet Connected</span>';
        document.getElementById('connectBtn').disabled = true;
        
        // Enable inputs
        document.getElementById('marks').disabled = false;
        document.getElementById('attendance').disabled = false;
        document.getElementById('submitBtn').disabled = false;

        setTimeout(() => {
          showStatus('🎉 Wallet connected successfully!', 'success');
          hideProgress();
        }, 500);
        
        await checkExistingApplication();

      } catch (error) {
        console.error(error);
        hideProgress();
        showStatus('❌ Failed to connect: ' + error.message, 'error');
      }
    }

    // Check existing application
    async function checkExistingApplication() {
      try {
        const studentData = await contract.getStudent(userAddress);
        if (studentData.marks > 0) {
          document.getElementById('marks').value = studentData.marks;
          document.getElementById('attendance').value = studentData.attendance;
          document.getElementById('marks').disabled = true;
          document.getElementById('attendance').disabled = true;
          document.getElementById('submitBtn').disabled = true;
          
          if (studentData.received) {
            showStatus('🎉 Scholarship already released to your wallet!', 'success');
          } else if (studentData.eligible) {
            showStatus('✅ You are eligible! Processing scholarship...', 'success');
          } else {
            showStatus('📝 Application submitted. Not eligible for scholarship.', 'warning');
          }
        }
      } catch (error) {
        console.error('Error checking application:', error);
      }
    }

    // Submit Application
    async function submitApplication() {
      const marks = parseInt(document.getElementById('marks').value);
      const attendance = parseInt(document.getElementById('attendance').value);

      if (isNaN(marks) || marks < 0 || marks > 100) {
        showStatus('⚠️ Please enter valid marks (0-100)', 'error');
        return;
      }

      if (isNaN(attendance) || attendance < 0 || attendance > 100) {
        showStatus('⚠️ Please enter valid attendance (0-100)', 'error');
        return;
      }

      try {
        showProgress(20);
        showStatus('📤 Submitting application... Please confirm in MetaMask', 'info');
        document.getElementById('submitBtn').innerHTML = '<span><span class="loading-spinner"></span>Processing...</span>';
        document.getElementById('submitBtn').disabled = true;

        showProgress(40);
        const tx = await contract.submitApplication(marks, attendance);
        
        showProgress(60);
        showStatus('⏳ Transaction submitted! Waiting for confirmation...', 'info');
        
        const receipt = await tx.wait();
        showProgress(100);
        
        setTimeout(() => {
          if (marks >= 85 && attendance >= 75) {
            showStatus('🎉 Congratulations! You are eligible! Scholarship released to your wallet.', 'success');
          } else {
            showStatus('📝 Application submitted. You do not meet the eligibility criteria.', 'warning');
          }
          hideProgress();
        }, 500);

        document.getElementById('marks').disabled = true;
        document.getElementById('attendance').disabled = true;

      } catch (error) {
        console.error(error);
        hideProgress();
        let errorMsg = '❌ ';
        
        if (error.message.includes('Already applied')) {
          errorMsg += 'You have already submitted an application!';
        } else if (error.message.includes('user rejected')) {
          errorMsg += 'Transaction was rejected';
        } else {
          errorMsg += 'Transaction failed: ' + error.message;
        }
        
        showStatus(errorMsg, 'error');
        document.getElementById('submitBtn').innerHTML = '<span>🎓 Submit Application</span>';
        document.getElementById('submitBtn').disabled = false;
      }
    }

    // Show status
    function showStatus(message, type) {
      const statusDiv = document.getElementById('status');
      statusDiv.textContent = message;
      statusDiv.className = 'status-box show status-' + type;
    }

    // Progress bar
    function showProgress(percent) {
      document.getElementById('progressBar').classList.add('show');
      document.getElementById('progressFill').style.width = percent + '%';
    }

    function hideProgress() {
      setTimeout(() => {
        document.getElementById('progressBar').classList.remove('show');
        document.getElementById('progressFill').style.width = '0%';
      }, 500);
    }

    // Event listeners
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => location.reload());
      window.ethereum.on('chainChanged', () => location.reload());
    }
