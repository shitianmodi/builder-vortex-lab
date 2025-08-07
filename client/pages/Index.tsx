export default function Index() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image - Responsive */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/2a0a7ce7d4a0d5848c8121f506c9ac49ff2fd82e?width=2880')"
        }}
      >
        {/* Optional overlay for content readability if needed later */}
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Content Area - Ready for future content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Content can be added here later */}
      </div>
    </div>
  );
}
