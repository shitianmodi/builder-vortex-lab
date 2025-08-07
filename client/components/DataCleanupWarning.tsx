import React from 'react';

interface DataCleanupWarningProps {
  onClose?: () => void;
  className?: string;
}

export default function DataCleanupWarning({ onClose, className = '' }: DataCleanupWarningProps) {
  return (
    <div className={`flex items-center justify-center p-6 bg-[#FEC619] rounded-2xl ${className}`}>
      <div className="text-[#324459] font-['HONOR_Sans_CN'] text-lg font-medium text-center">
        在【清除本地数据】中，不会清除未检查的沙盘日志（不包含视频）
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M12 4L4 12M4 4L12 12" stroke="#324459" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
