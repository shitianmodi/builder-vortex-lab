import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function InformedConsent() {
  const navigate = useNavigate();
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
        // Check if user has scrolled to within 10px of the bottom
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          setHasScrolledToBottom(true);
        }
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
      return () => contentElement.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const handleAgree = () => {
    if (hasScrolledToBottom) {
      navigate("/student-selection");
    }
  };

  const handleExit = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://api.builder.io/api/v1/image/assets/TEMP/32a3bef554ba90b476ddd7fd28c0c1d541f262ad?width=2880')",
        }}
      />

      {/* Exit Button */}
      <button
        onClick={handleExit}
        className="fixed top-14 right-14 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl border border-red-500 bg-white hover:bg-red-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z"
            fill="#CB2F2F"
          />
        </svg>
        <span className="text-lg font-semibold text-red-500">退出</span>
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[80vh] flex flex-col">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            知情同意书
          </h1>

          {/* Scrollable Content */}
          <div
            ref={contentRef}
            className="flex-1 bg-gray-100 rounded-2xl p-6 overflow-y-auto mb-6 relative"
            style={{ maxHeight: "400px" }}
          >
            <div className="text-base leading-8 text-gray-800 space-y-4">
              <p>
                知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话知情同��书内容几段话，知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话。知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话。
              </p>

              <p>
                知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话。知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话。
              </p>

              <p>
                知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段���。知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话。
              </p>

              <p>
                知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话。知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话。
              </p>

              <p>
                知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话。知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话。
              </p>

              <p>
                知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话知情同意书内容几段话。知情同意书内容几段话，知情同意书内容几段话知情同意书内容几段话。
              </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute right-2 top-2 bottom-2 w-3 bg-gray-300 rounded-full">
              <div
                className="bg-gray-400 rounded-full w-full transition-all duration-300"
                style={{
                  height: contentRef.current
                    ? `${Math.min(100, (contentRef.current.scrollTop / (contentRef.current.scrollHeight - contentRef.current.clientHeight)) * 100)}%`
                    : "0%",
                }}
              />
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-300 mb-6"></div>

          {/* Bottom Section */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleAgree}
              disabled={!hasScrolledToBottom}
              className={`px-8 py-3 rounded-2xl text-lg font-semibold min-w-[200px] transition-all ${
                hasScrolledToBottom
                  ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                  : "bg-gray-400 text-white cursor-not-allowed"
              }`}
            >
              {hasScrolledToBottom ? "同意" : "阅读完成后可点击"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
