"use client"

import { useState } from "react"

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src || "/placeholder.svg"} alt="decorative" />
  </div>
)

const AnimatedTitle = ({ title, className }) => <h1 className={className} dangerouslySetInnerHTML={{ __html: title }} />

const Button = ({ title, containerClass, onClick, disabled, children }) => (
  <button className={containerClass} onClick={onClick} disabled={disabled}>
    {children || title}
  </button>
)

const Contact = ({ web3FormsAccessKey }) => {
  const [showForm, setShowForm] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
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

  const handleShowForm = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowForm(true)
      setIsAnimating(false)
    }, 300)
  }

  const handleHideForm = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowForm(false)
      setIsAnimating(false)
    }, 300)
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
          setTimeout(() => handleHideForm(), 2000)
        } else {
          setSubmitStatus("error")
        }
      } else {
        // Fallback simulation
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Form submitted:", formData)
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => handleHideForm(), 2000)
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
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden min-h-[800px] transition-all duration-700 ease-in-out">
        {/* Background Images - Always Present */}
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox src="/img/contact-1.webp" clipClass="contact-clip-path-1" />
          <ImageClipBox src="/img/contact-2.webp" clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60" />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox src="/img/swordman-partial.webp" clipClass="absolute md:scale-125" />
          <ImageClipBox src="/img/swordman.webp" clipClass="sword-man-clip-path md:scale-125" />
        </div>

        {/* Content Container - Maintains consistent positioning */}
        <div className="flex flex-col items-center text-center relative z-10 min-h-[600px]">
          {/* Title and Button - Fade out but maintain space */}
          <div
            className={`transition-all duration-700 ease-in-out transform ${showForm || isAnimating ? "opacity-0 -translate-y-8 scale-95" : "opacity-100 translate-y-0 scale-100"
              }`}
          >
            <p className="mb-10 font-nippo-light text-[20px] uppercase">Join SCR Gaming</p>

            <AnimatedTitle
              title="let&#39;s b<b>u</b>ild the <br /> new era of <br /> g<b>a</b>ming t<b>o</b>gether."
              className="special-font !md:text-[6.2rem] w-full font-zentry !text-5xl !font-black !leading-[.9] mb-8"
            />

            <Button
              title="Contact Us"
              containerClass="bg-white text-black px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer transform hover:shadow-2xl hover:bg-gray-100"
              onClick={handleShowForm}
            />
          </div>

          {/* Form - Slides in from the same position */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out transform ${showForm && !isAnimating
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-8 scale-95 pointer-events-none"
              }`}
          >
            <div className="w-full max-w-4xl mx-auto px-4">
              <div className="bg-black/60 backdrop-blur-lg rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                {/* Form Header */}
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black text-blue-50 mb-2">GET IN TOUCH</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-[#ECFE66] to-[#ECFE66] mx-auto rounded-full"></div>
                </div>

                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg text-green-300 text-center animate-bounce">
                    ✅ Message sent successfully! We'll get back to you soon.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-center animate-shake">
                    ❌ Failed to send message. Please try again.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2 transform transition-all duration-300 hover:scale-105">
                      <label
                        htmlFor="name"
                        className="block text-blue-50 font-semibold uppercase tracking-wider text-sm"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black/70 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg px-4 py-3 outline-none transition-all duration-300 hover:border-gray-500"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="space-y-2 transform transition-all duration-300 hover:scale-105">
                      <label
                        htmlFor="email"
                        className="block text-blue-50 font-semibold uppercase tracking-wider text-sm"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black/70 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg px-4 py-3 outline-none transition-all duration-300 hover:border-gray-500"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 transform transition-all duration-300 hover:scale-105">
                    <label
                      htmlFor="subject"
                      className="block text-blue-50 font-semibold uppercase tracking-wider text-sm"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 rounded-lg px-4 py-3 outline-none transition-all duration-300 hover:border-gray-500"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="space-y-2 transform transition-all duration-300 hover:scale-105">
                    <label
                      htmlFor="message"
                      className="block text-blue-50 font-semibold uppercase tracking-wider text-sm"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-black/70 border border-gray-600 text-blue-50 placeholder:text-gray-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 resize-none rounded-lg px-4 py-3 outline-none transition-all duration-300 hover:border-gray-500"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>

                  <div className="flex justify-center gap-4 pt-6">
                    <Button
                      title="Cancel"
                      containerClass="bg-gray-700/80 hover:bg-gray-600 text-white px-6 py-3 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer transform hover:shadow-lg"
                      onClick={handleHideForm}
                    />
                    <Button
                      containerClass={`px-8 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer transform hover:shadow-2xl ${isSubmitting
                        ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                        : "bg-white text-black hover:scale-110 hover:bg-gray-100"
                        }`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                          Sending...
                        </span>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </div>
                </form>

                {!web3FormsAccessKey && (
                  <p className="text-gray-400 text-sm text-center mt-6 animate-pulse">
                    💡 Add your Web3Forms access key to enable form submissions
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .contact-clip-path-1 {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        .contact-clip-path-2 {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        .sword-man-clip-path {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
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
