import React from "react";

interface ExitCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ExitCheckModal: React.FC<ExitCheckModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-6 w-[400px]">
        <h3 className="text-[#3D526C] text-2xl font-semibold text-center">
          退出检查
        </h3>

        <div className="w-35 h-35 flex items-center justify-center">
          <svg
            width="129"
            height="134"
            viewBox="0 0 130 135"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M24.5625 2.06839C26.2342 0.508718 28.5748 0.0630018 30.6924 0.954131C32.6986 1.84541 34.0361 3.85094 34.0361 6.07913V19.9473H67.4951C74.3937 19.9475 79.9862 25.5581 79.9863 32.4795V43.2217C79.9863 47.6713 76.391 51.2783 71.9561 51.2784C67.5211 51.2783 63.9258 47.6713 63.9258 43.2217V36.0606H34.0361V97.8291H63.9258V90.667C63.9259 86.2175 67.5212 82.6104 71.9561 82.6104C76.3909 82.6104 79.9862 86.2176 79.9863 90.667V101.409C79.9863 108.331 74.3938 113.942 67.4951 113.942H34.0361V128.63C34.036 130.858 32.6985 132.864 30.6924 133.755C29.9125 134.089 29.2438 134.2 28.4639 134.2C27.015 134.2 25.677 133.643 24.5625 132.641L2.27148 111.139C1.24291 110.051 0.648164 108.624 0.599609 107.128V27.5811C0.599609 26.1329 1.2685 24.6844 2.27148 23.5703L24.5625 2.06839ZM101.606 39.2793C103.724 38.3882 106.065 38.9452 107.625 40.5049L126.237 59.4444C130.473 63.7893 130.473 70.8084 126.126 75.1534L107.736 93.5352C107.239 94.0702 106.635 94.4954 105.963 94.7832C105.291 95.071 104.566 95.216 103.835 95.2071C103.166 95.207 102.386 95.0949 101.718 94.7608C100.7 94.3429 99.8287 93.6336 99.2139 92.7217C98.599 91.8097 98.2682 90.7355 98.2627 89.6358L98.2266 75.0479H50.6143C46.2562 75.0478 42.7236 71.601 42.7236 67.3496C42.7238 63.0984 46.2563 59.6524 50.6143 59.6524H98.1885L98.1514 44.4043C98.1514 42.1761 99.4888 40.0592 101.606 39.2793Z"
              fill="#A8BDE8"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p className="text-[#324459] text-lg text-center">内容已保存。</p>
          <p className="text-[#CB2F2F] text-base text-center">
            您可从"数据中心"的相应条目中再次进入。
          </p>
        </div>

        <div className="w-full h-px bg-[#E2E7F0]"></div>

        <div className="flex gap-6 w-full">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-2xl border border-[#004DA9] text-[#004DA9] text-lg font-semibold text-center"
          >
            确认
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#004DA9] text-white text-lg font-semibold text-center"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitCheckModal;
