// EmailJS Test Component - Use this to test your configuration
import { useState } from "react";
import emailjs from "@emailjs/browser";

const EmailJSTest = () => {
  const [testResult, setTestResult] = useState("");

  const testEmailJS = async () => {
    try {
      // Initialize EmailJS
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      emailjs.init(publicKey);

      console.log("Testing with config:", {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: publicKey,
      });

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: "Test User",
          to_name: "Abdullah",
          from_email: "test@test.com",
          to_email: "iamabdullahakram1@gmail.com",
          message: "This is a test message from EmailJS integration.",
          reply_to: "test@test.com",
        },
        publicKey
      );

      setTestResult(`Success: ${JSON.stringify(result)}`);
    } catch (error) {
      setTestResult(`Error: ${JSON.stringify(error)}`);
      console.error("Test failed:", error);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", margin: "20px" }}>
      <h3>EmailJS Configuration Test</h3>
      <button onClick={testEmailJS}>Test EmailJS</button>
      <pre style={{ marginTop: "10px", fontSize: "12px" }}>
        {testResult}
      </pre>
    </div>
  );
};

export default EmailJSTest;
