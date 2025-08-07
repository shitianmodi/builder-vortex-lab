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
      
      {/* Content Area with Icon */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Decorative Icon - positioned responsively */}
        <div className="absolute top-16 left-8 sm:top-20 sm:left-12 md:top-24 md:left-16 lg:top-32 lg:left-20 xl:top-64 xl:left-34">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/95148d1d1e4fa8a979be1c985ab71a04a0a44f93?width=400"
            alt="Decorative icon"
            className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 xl:w-48 xl:h-48 2xl:w-52 2xl:h-52 object-contain"
          />
        </div>

        {/* Content can be added here later */}
      </div>
    </div>
  );
}
