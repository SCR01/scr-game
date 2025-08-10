import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} alt="decorative" />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className="my-20 min-h-96 w-screen px-10">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-60 sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute md:scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path md:scale-125"
          />
        </div>

        <div className="flex flex-col items-center text-center relative z-10">
          <p className="mb-10 font-nippo-light text-[20px] uppercase tracking-wider">
            Join SCR Gaming
          </p>

          {/* Reduced thickness and glow with tighter spacing */}
          <div 
            className="mb-10 px-4"
            style={{
              textShadow: '0 0 15px rgba(59, 130, 246, 0.4), 1px 1px 4px rgba(0, 0, 0, 0.7)',
              filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))',
            }}
          >
            <AnimatedTitle
              title="let&#39;s b<b>u</b>ild the <br /> n<b>e</b>w <b>e</b>ra of <br /> g<b>a</b>ming t<b>o</b>gether"
              className="special-font !md:text-[5.8rem] w-full font-zentry !text-4xl !font-semibold !leading-[0.8] text-blue-50 tracking-tight"
            />
          </div>

          {/* Contact Us Button */}
          <a href="mailto:sharadreddy11@gmail.com">
            <Button
              title="Contact Us"
              containerClass="mt-6 mb-12 bg-white text-black px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform font-semibold"
            />
          </a>

          {/* Contact Form */}
          <div className="w-full max-w-md mt-8 z-10 relative">
            <div className="bg-gray-900/90 backdrop-blur-md rounded-xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-center font-zentry text-white">
                Get In T<span className="text-blue-400">o</span>uch
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-blue-50 mb-2">
                    Gamer Tag / Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-blue-50 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all backdrop-blur-sm"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-blue-50 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-800/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none backdrop-blur-sm"
                    placeholder="Tell us about your gaming journey..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
