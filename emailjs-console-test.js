// Simple EmailJS Test - Run this in browser console to test your configuration
// Copy and paste this into your browser's developer console

(function testEmailJS() {
  console.log("🧪 Starting EmailJS Test...");
  
  // Your configuration
  const config = {
    serviceId: "service_zjx01nh",
    templateId: "template_gbizc1a", 
    publicKey: "eu2FXAc94kg3r-eLh"
  };
  
  console.log("📋 Using config:", config);
  
  // Load EmailJS if not already loaded
  if (typeof emailjs === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
    script.onload = function() {
      console.log("📦 EmailJS loaded, running test...");
      runTest();
    };
    document.head.appendChild(script);
  } else {
    runTest();
  }
  
  function runTest() {
    // Test template parameters
    const testParams = {
      from_name: "Test User",
      from_email: "test@example.com", 
      to_name: "abdullah akram",
      to_email: "iamabdullahakram1@gmail.com",
      message: "This is a test message from the browser console.",
      reply_to: "test@example.com"
    };
    
    console.log("📤 Sending test email with params:", testParams);
    
    emailjs.send(
      config.serviceId,
      config.templateId, 
      testParams,
      config.publicKey
    ).then(function(response) {
      console.log("✅ SUCCESS!", response.status, response.text);
      alert("✅ EmailJS test successful! Check your email.");
    }, function(error) {
      console.error("❌ FAILED:", error);
      alert("❌ EmailJS test failed. Check console for details.");
    });
  }
})();

// To run this test:
// 1. Open your website in the browser
// 2. Open Developer Tools (F12)
// 3. Go to Console tab
// 4. Copy and paste this entire code
// 5. Press Enter
