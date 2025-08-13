"use client"

import { useState } from "react"

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src || "/placeholder.svg"} alt="decorative" />
  </div>
)

const AnimatedTitle = ({ title, className }) => <h1 className={className} dangerouslySetInnerHTML={{ __html: title }} />

const Button = ({ title, containerClass, onClick, disabled }) => (
  <button className={containerClass} onClick={onClick} disabled={disabled}>
    {title}
  </button>
)

const Contact = ({ web3FormsAccessKey }) => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState("idle")

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      if (web3FormsAccessKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsAccessKey,
            ...formData,
          }),
        })

        if (response.ok) {
          setSubmitStatus("success")
          setFormData({ name: "", email: "", subject: "", message: "" })
          setTimeout(() => setShowForm(false), 2000)
        } else {
          setSubmitStatus("error")
        }
      } else {
        // Fallback simulation
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Form submitted:", formData)
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setShowForm(false), 2000)
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox src="/img/contact-1.webp" clipClass="contact-clip-path-1" />
          <ImageClipBox src="/img/contact-2.webp" clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60" />
        </div>
        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox src="/img/swordman-partial.webp" clipClass="absolute md:scale-125" />
          <ImageClipBox src="/img/swordman.webp" clipClass="sword-man-clip-path md:scale-125" />
        </div>
        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-nippo-light text-[20px] uppercase">Join SCR Gaming</p>
          <AnimatedTitle
            title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
            className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9]"
          />
          {/* Enhanced Contact Button */}
          <Button
            title="Contact Us"
            containerClass="mt-6 bg-white text-black px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => setShowForm(true)}
          />
        </div>

        {/* Contact Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-black border border-gray-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-blue-50 mb-2">Contact Us</h2>
                <div className="w-16 h-1 bg-blue-400 mx-auto rounded-full"></div>
              </div>

              {submitStatus === "success" && (
                <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-center">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-center">
                  ❌ Failed to send message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-blue-50 font-semibold mb-2 uppercase text-sm">Name</label>
                    <input
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg px-4 py-3 outline-none transition-colors"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-blue-50 font-semibold mb-2 uppercase text-sm">Email</label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg px-4 py-3 outline-none transition-colors"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-blue-50 font-semibold mb-2 uppercase text-sm">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-lg px-4 py-3 outline-none transition-colors"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label className="block text-blue-50 font-semibold mb-2 uppercase text-sm">Message</label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-gray-900 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 resize-none rounded-lg px-4 py-3 outline-none transition-colors"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    title="Cancel"
                    containerClass="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-full transition-colors cursor-pointer"
                    onClick={() => setShowForm(false)}
                  />
                  <Button
                    title={isSubmitting ? "Sending..." : "Send Message"}
                    containerClass={`px-8 py-3 rounded-full transition-all cursor-pointer ${isSubmitting
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-100"
                      }`}
                    disabled={isSubmitting}
                  />
                </div>
              </form>

              {!web3FormsAccessKey && (
                <p className="text-gray-400 text-sm text-center mt-4">
                  💡 Add your Web3Forms access key to enable form submissions
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
        
        .contact-clip-path-1 {
          clip-path: polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%);
          transform: rotate(12deg);
        }
        .contact-clip-path-2 {
          clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
          transform: rotate(-8deg);
        }
        .sword-man-clip-path {
          clip-path: polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%);
          transform: rotate(5deg);
        }
        .special-font {
          font-family: 'Zentry', sans-serif;
        }
        .font-zentry {
          font-family: 'Zentry', sans-serif;
        }
        .font-nippo-light {
          font-family: 'Nippo', sans-serif;
          font-weight: 300;
        }
      `}</style>
    </div>
  )
}

export default Contact
