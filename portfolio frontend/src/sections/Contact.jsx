import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Alert from "../components/Alert";
import { Particles } from "../components/Particles";
import { ScrollMotion, TextReveal } from "../utils/dramaticScrollAnimations.jsx";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Map EmailJS field names to our state
    if (name === "from_name") {
      setFormData({ ...formData, name: value });
    } else if (name === "from_email") {
      setFormData({ ...formData, email: value });
    } else if (name === "message") {
      setFormData({ ...formData, message: value });
    }
  };

  const showAlertMessage = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Get environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log("🔍 Environment Variables Check:");
    console.log("Service ID:", serviceId);
    console.log("Template ID:", templateId);
    console.log("Public Key:", publicKey);

    if (!serviceId || !templateId || !publicKey) {
      console.error("❌ Missing EmailJS configuration");
      setIsLoading(false);
      showAlertMessage("danger", "EmailJS configuration is incomplete.");
      return;
    }

    try {
      console.log("📝 Form Data:", formData);
      
      // Method 1: Try sendForm with form element
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );
      
      console.log("✅ EmailJS Success:", result);
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
      showAlertMessage("success", "Your message has been sent successfully!");
      
    } catch (error) {
      console.error("❌ EmailJS Error:", error);
      
      // If sendForm fails, try the regular send method as backup
      try {
        console.log("🔄 Trying backup method...");
        
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          to_name: import.meta.env.VITE_TO_NAME || "Portfolio Owner",
          to_email: import.meta.env.VITE_TO_EMAIL || "your.email@gmail.com",
          message: formData.message,
          reply_to: formData.email,
        };

        const backupResult = await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          publicKey
        );
        
        console.log("✅ Backup method Success:", backupResult);
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" });
        showAlertMessage("success", "Your message has been sent successfully!");
        
      } catch (backupError) {
        setIsLoading(false);
        console.error("❌ Both methods failed:", backupError);
        
        let errorMessage = "Failed to send message. ";
        
        if (backupError.status === 404) {
          errorMessage += "Account not found. Please verify your EmailJS Public Key.";
        } else if (backupError.status === 400) {
          errorMessage += "Invalid configuration. Please check your Service ID and Template ID.";
        } else if (backupError.status === 422) {
          errorMessage += "Template error. Please check your EmailJS template variables.";
        } else {
          errorMessage += `Error ${backupError.status}: ${backupError.text || "Unknown error"}`;
        }
        
        showAlertMessage("danger", errorMessage);
      }
    }
  };
  return (
    <section className="relative flex items-center c-space section-spacing">
      <Particles
        className="absolute inset-0 -z-50"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
      {showAlert && <Alert type={alertType} text={alertMessage} />}
      
      <ScrollMotion 
        variant="dramaticFadeIn" 
        delay={0.2}
        className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-primary"
      >
        <ScrollMotion variant="cinematicSlideUp" delay={0.4}>
          <div className="flex flex-col items-start w-full gap-5 mb-10">
            <TextReveal className="text-heading">Let's Talk</TextReveal>
            <p className="font-normal text-neutral-400">
              Whether you're loking to build a new website, improve your existing
              platform, or bring a unique project to life, I'm here to help
            </p>
          </div>
        </ScrollMotion>
        
        <ScrollMotion variant="elasticBounce" delay={0.6}>
          <form ref={form} className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="from_name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="from_email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Hidden fields for EmailJS template */}
          <input type="hidden" name="to_name" value={import.meta.env.VITE_TO_NAME || "Portfolio Owner"} />
          <input type="hidden" name="to_email" value={import.meta.env.VITE_TO_EMAIL || "your.email@gmail.com"} />
          <input type="hidden" name="reply_to" value={formData.email} />
          
          <button
            type="submit"
            className="w-full px-1 py-3 text-lg text-center rounded-md cursor-pointer bg-radial from-lavender to-royal hover-animation"
          >
            {!isLoading ? "Send" : "Sending..."}
          </button>
          </form>
        </ScrollMotion>
      </ScrollMotion>
    </section>
  );
};

export default Contact;