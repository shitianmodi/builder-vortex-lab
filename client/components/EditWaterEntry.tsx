import { useState } from "react";

interface EditWaterEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    time: { minutes: number; seconds: number };
    position: string;
  };
}

export default function EditWaterEntry({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditWaterEntryProps) {
  const [minutes, setMinutes] = useState(initialData?.time.minutes || 0);
  const [seconds, setSeconds] = useState(initialData?.time.seconds || 0);
  const [position, setPosition] = useState(initialData?.position || "左上");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      time: { minutes, seconds },
      position,
    });
    onClose();
  };

  const adjustTime = (
    type: "minutes" | "seconds",
    direction: "up" | "down",
    amount: number = 1,
  ) => {
    if (type === "minutes") {
      setMinutes((prev) =>
        Math.max(
          0,
          Math.min(99, prev + (direction === "up" ? amount : -amount)),
        ),
      );
    } else {
      setSeconds((prev) =>
        Math.max(
          0,
          Math.min(59, prev + (direction === "up" ? amount : -amount)),
        ),
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[468px] h-[768px] bg-white rounded-3xl relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 h-16">
          <h2 className="text-[#3D526C] text-lg font-semibold">编辑条目/水</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 text-[#3D526C] hover:text-[#324459] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 flex flex-col gap-5">
          {/* Time Section */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <span className="text-[#324459] text-base">时间</span>
              <div className="flex items-center gap-3">
                <div className="bg-[#F4F4F5] rounded-lg px-3 py-2 w-[60px] text-center">
                  <span className="text-[#3D526C] text-base">
                    {minutes.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[#324459] text-base">分</span>
                <div className="bg-[#F4F4F5] rounded-lg px-3 py-2 w-[60px] text-center">
                  <span className="text-[#3D526C] text-base">
                    {seconds.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[#324459] text-base">秒</span>
              </div>
            </div>

            {/* Time adjustment buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustTime("minutes", "down", 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.70083 2.29902C5.94979 2.54798 5.94979 2.95163 5.70083 3.20059L2.40161 6.4998L5.70083 9.79902C5.94979 10.048 5.94979 10.4516 5.70083 10.7006C5.45187 10.9495 5.04823 10.9495 4.79927 10.7006L1.04927 6.95059C0.800309 6.70163 0.800309 6.29798 1.04927 6.04902L4.79927 2.29902C5.04823 2.05006 5.45187 2.05006 5.70083 2.29902Z"
                    fill="#7E90B0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.9508 2.29902C11.1998 2.54798 11.1998 2.95163 10.9508 3.20059L7.65161 6.4998L10.9508 9.79902C11.1998 10.048 11.1998 10.4516 10.9508 10.7006C10.7019 10.9495 10.2982 10.9495 10.0493 10.7006L6.29927 6.95059C6.05031 6.70163 6.05031 6.29798 6.29927 6.04902L10.0493 2.29902C10.2982 2.05006 10.7019 2.05006 10.9508 2.29902Z"
                    fill="#7E90B0"
                  />
                </svg>
                <span className="text-[#7E90B0] text-base">10s</span>
              </button>
              <button
                onClick={() => adjustTime("seconds", "up", 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#7E90B0] text-base">10s</span>
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.29917 2.29902C6.05021 2.54798 6.05021 2.95163 6.29917 3.20059L9.59839 6.4998L6.29917 9.79902C6.05021 10.048 6.05021 10.4516 6.29917 10.7006C6.54813 10.9495 6.95177 10.9495 7.20073 10.7006L10.9507 6.95059C11.1997 6.70163 11.1997 6.29798 10.9507 6.04902L7.20073 2.29902C6.95177 2.05006 6.54813 2.05006 6.29917 2.29902Z"
                    fill="#7E90B0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.04917 2.29902C0.800212 2.54798 0.800212 2.95163 1.04917 3.20059L4.34839 6.4998L1.04917 9.79902C0.800212 10.048 0.800212 10.4516 1.04917 10.7006C1.29813 10.9495 1.70177 10.9495 1.95073 10.7006L5.70073 6.95059C5.94969 6.70163 5.94969 6.29798 5.70073 6.04902L1.95073 2.29902C1.70177 2.05006 1.29813 2.05006 1.04917 2.29902Z"
                    fill="#7E90B0"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E2E7F0]"></div>

          {/* Image Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-full h-[214px] rounded-2xl overflow-hidden">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/665b937c72435e55f250f7d50a5c7a7e91de6bf4?width=801"
                alt="Sand toys"
                className="w-full h-full object-cover"
              />

              {/* Control buttons */}
              <div className="absolute top-3 right-3 flex gap-3">
                <button className="w-10 h-10 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M21.6118 21.6701V20.3918C20.8819 21.2443 20.0101 21.9756 19.0261 22.5451C17.1275 23.6438 14.9206 24.0858 12.7456 23.8046C10.5704 23.5234 8.54767 22.5339 6.98975 20.9882C5.52936 19.5392 4.55362 17.6771 4.18872 15.6579L4.12378 15.2529L4.11523 15.0222C4.14903 14.4941 4.54997 14.045 5.09448 13.9694C5.63874 13.8943 6.14538 14.2176 6.32153 14.7163L6.37622 14.9401L6.48901 15.5639C6.81076 17.0052 7.53949 18.3283 8.59277 19.3733C9.7964 20.5674 11.3586 21.3317 13.0378 21.5488C14.7168 21.7657 16.42 21.4232 17.8862 20.5747C18.8272 20.03 19.6352 19.2949 20.2668 18.4248H18.375C17.747 18.4248 17.2372 17.9162 17.2368 17.2883C17.2368 16.6601 17.7468 16.1501 18.375 16.1501H22.75C23.3782 16.1501 23.8882 16.6601 23.8882 17.2883V21.6701C23.8882 22.2983 23.3782 22.8083 22.75 22.8083C22.1218 22.8083 21.6118 22.2983 21.6118 21.6701ZM8.97388 5.45528C10.8725 4.35656 13.0794 3.91461 15.2544 4.19576C17.4296 4.47696 19.4523 5.46649 21.0103 7.01217C22.5678 8.55761 23.5744 10.5729 23.8762 12.7475C23.9625 13.3698 23.5278 13.9447 22.9055 14.031C22.3613 14.1061 21.8546 13.7829 21.6785 13.2841L21.6238 13.0603L21.511 12.4365C21.1892 10.9952 20.4605 9.67216 19.4072 8.62716C18.2036 7.43302 16.6414 6.66871 14.9622 6.45162C13.2832 6.23472 11.58 6.5772 10.1138 7.42574C9.17276 7.97039 8.3648 8.70553 7.73315 9.57564H9.625C10.253 9.57564 10.7628 10.0842 10.7632 10.7121C10.7632 11.3403 10.2532 11.8503 9.625 11.8503H5.25C4.62178 11.8503 4.11182 11.3403 4.11182 10.7121V6.33028C4.11182 5.70206 4.62178 5.1921 5.25 5.1921C5.87822 5.1921 6.38818 5.70206 6.38818 6.33028V7.60689C7.11797 6.75479 7.99033 6.02456 8.97388 5.45528Z"
                      fill="white"
                    />
                  </svg>
                </button>
                <button className="w-10 h-10 bg-black bg-opacity-30 rounded-full flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path
                      d="M4.56367 18.0838C4.84557 18.084 5.11634 18.1961 5.31568 18.3954C5.51498 18.5949 5.62735 18.8655 5.62735 19.1475V22.3727H8.85255C9.13453 22.3727 9.40509 22.485 9.60456 22.6843C9.8039 22.8837 9.91604 23.1544 9.91622 23.4363C9.91622 23.7183 9.80385 23.9889 9.60456 24.1883C9.40506 24.3878 9.13469 24.5 8.85255 24.5H4.56367C4.28153 24.5 4.01116 24.3878 3.81166 24.1883C3.61216 23.9888 3.5 23.7185 3.5 23.4363V19.1475C3.5 18.8653 3.61216 18.5949 3.81166 18.3954C4.01113 18.1961 4.28169 18.0838 4.56367 18.0838Z"
                      fill="white"
                    />
                    <path
                      d="M23.4363 18.0838C23.7183 18.0838 23.9889 18.1961 24.1883 18.3954C24.3878 18.5949 24.5 18.8653 24.5 19.1475V23.4363C24.5 23.7185 24.3878 23.9888 24.1883 24.1883C23.9888 24.3878 23.7185 24.5 23.4363 24.5H19.1475C18.8653 24.5 18.5949 24.3878 18.3954 24.1883C18.1961 23.9889 18.0838 23.7183 18.0838 23.4363C18.084 23.1544 18.1961 22.8837 18.3954 22.6843C18.5949 22.485 18.8655 22.3727 19.1475 22.3727H22.3727V19.1475C22.3727 18.8655 22.485 18.5949 22.6843 18.3954C22.8837 18.1961 23.1544 18.084 23.4363 18.0838Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.1475 7.78887C19.4296 7.78887 19.7 7.90103 19.8995 8.10054C20.099 8.30004 20.2111 8.57041 20.2111 8.85255V19.1475C20.2111 19.4296 20.099 19.7 19.8995 19.8995C19.7 20.099 19.4296 20.2111 19.1475 20.2111H8.85255C8.57041 20.2111 8.30004 20.099 8.10054 19.8995C7.90103 19.7 7.78887 19.4296 7.78887 19.1475V8.85255C7.78887 8.57041 7.90103 8.30004 8.10054 8.10054C8.30004 7.90103 8.57041 7.78887 8.85255 7.78887H19.1475ZM9.91622 18.0838H18.0838V9.91622H9.91622V18.0838Z"
                      fill="white"
                    />
                    <path
                      d="M8.85255 3.5C9.13469 3.5 9.40506 3.61216 9.60456 3.81166C9.80385 4.01113 9.91622 4.28169 9.91622 4.56367C9.91604 4.84557 9.8039 5.11634 9.60456 5.31568C9.40509 5.51498 9.13453 5.62735 8.85255 5.62735H5.62735V8.85255C5.62735 9.13453 5.51498 9.40509 5.31568 9.60456C5.11634 9.8039 4.84557 9.91604 4.56367 9.91622C4.28169 9.91622 4.01113 9.80385 3.81166 9.60456C3.61216 9.40506 3.5 9.13469 3.5 8.85255V4.56367C3.5 4.28153 3.61216 4.01116 3.81166 3.81166C4.01116 3.61216 4.28153 3.5 4.56367 3.5H8.85255Z"
                      fill="white"
                    />
                    <path
                      d="M23.4363 3.5C23.7185 3.5 23.9888 3.61216 24.1883 3.81166C24.3878 4.01116 24.5 4.28153 24.5 4.56367V8.85255C24.5 9.13469 24.3878 9.40506 24.1883 9.60456C23.9889 9.80385 23.7183 9.91622 23.4363 9.91622C23.1544 9.91604 22.8837 9.8039 22.6843 9.60456C22.485 9.40509 22.3727 9.13453 22.3727 8.85255V5.62735H19.1475C18.8655 5.62735 18.5949 5.51498 18.3954 5.31568C18.1961 5.11634 18.084 4.84557 18.0838 4.56367C18.0838 4.28169 18.1961 4.01113 18.3954 3.81166C18.5949 3.61216 18.8653 3.5 19.1475 3.5H23.4363Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>

              {/* Selection Rectangle */}
              <svg
                className="absolute bottom-4 right-16"
                width="85"
                height="94"
                viewBox="0 0 85 94"
                fill="none"
              >
                <rect
                  x="2.5"
                  y="2"
                  width="80"
                  height="90"
                  stroke="#0D802C"
                  strokeWidth="2"
                />
                <circle cx="82" cy="2.5" r="2" fill="white" stroke="#0D802C" />
                <circle cx="3" cy="2.5" r="2" fill="white" stroke="#0D802C" />
                <circle cx="3" cy="91.5" r="2" fill="white" stroke="#0D802C" />
                <circle cx="82" cy="91.5" r="2" fill="white" stroke="#0D802C" />
              </svg>
            </div>

            <div className="text-[#7E90B0] text-sm text-center">
              拖拽移动或缩放识别框
            </div>
          </div>

          {/* Position Section */}
          <div className="flex items-center gap-8">
            <span className="text-[#324459] text-base">位置</span>
            <div className="flex-1 bg-[#F4F4F5] rounded-lg p-3 flex justify-between items-center">
              <span className="text-[#3D526C] text-base">{position}</span>
              <svg width="16" height="16" viewBox="0 0 16 17" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.6011 5.39906C13.2692 5.06711 12.731 5.06711 12.3991 5.39906L8.0001 9.79802L3.60114 5.39906C3.26919 5.06711 2.731 5.06711 2.39906 5.39906C2.06711 5.731 2.06711 6.26919 2.39906 6.60114L7.39906 11.6011C7.731 11.9331 8.26919 11.9331 8.60114 11.6011L13.6011 6.60114C13.9331 6.26919 13.9331 5.731 13.6011 5.39906Z"
                  fill="#3D526C"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#004DA9] text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M12.8271 0.75C13.0716 0.750008 13.3046 0.796049 13.5264 0.887695C13.7482 0.979362 13.9429 1.10929 14.1104 1.27734L16.7227 3.88965C16.8907 4.0577 17.0206 4.25278 17.1123 4.47461C17.2039 4.69639 17.25 4.92908 17.25 5.17285V15.417C17.2499 15.921 17.0706 16.3527 16.7119 16.7119C16.3533 17.0712 15.9216 17.2505 15.417 17.25H2.58301C2.079 17.2499 1.6477 17.0705 1.28906 16.7119C0.930418 16.3533 0.750688 15.9216 0.75 15.417V2.58301C0.750077 2.07898 0.929806 1.64771 1.28906 1.28906C1.64832 0.930418 2.07959 0.750688 2.58301 0.75H12.8271ZM2.58301 2.58301V15.417H4.27441V9C4.27441 8.46152 4.71152 8.02441 5.25 8.02441H12.75C13.2885 8.02441 13.7256 8.46152 13.7256 9V15.417H15.417V5.19629L12.8037 2.58301H2.58301ZM6.22559 15.417H11.7744V9.97559H6.22559V15.417Z"
              fill="white"
            />
          </svg>
          <span className="text-lg font-semibold">保存</span>
        </button>
      </div>
    </div>
  );
}
