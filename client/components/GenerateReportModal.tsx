import React from 'react';

interface GenerateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const GenerateReportModal: React.FC<GenerateReportModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-6 w-[400px]">
        <h3 className="text-[#3D526C] text-2xl font-semibold text-center">生成报告</h3>
        
        <div className="w-35 h-35 flex items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M74.4931 89.5723C79.4435 86.7041 83.7681 82.8683 87.21 78.2927C86.1007 76.564 85.3114 74.6492 84.88 72.64L84.7178 71.8875C84.253 69.739 83.158 67.7786 81.5734 66.2579C79.9888 64.7373 77.9869 63.7257 75.8246 63.353C58.1404 60.2744 58.1404 34.8418 75.8246 31.7547C77.9132 31.3945 79.8536 30.4379 81.4129 28.9999C82.9723 27.5619 84.0843 25.7034 84.6154 23.6477C80.457 19.1074 75.3682 15.5213 69.6977 13.1352C64.0271 10.7491 57.9088 9.6193 51.7619 9.82323C45.6149 10.0272 39.5846 11.56 34.084 14.3167C28.5834 17.0735 23.7425 20.9889 19.893 25.795C16.0434 30.601 13.2761 36.184 11.7807 42.1614C10.2852 48.1389 10.097 54.3697 11.2289 60.4269C12.3607 66.484 14.7859 72.2245 18.3383 77.255C21.8908 82.2855 26.4864 86.4872 31.8105 89.5723V99.5691C31.8105 101.837 32.7097 104.012 34.3103 105.616C35.9109 107.22 38.0818 108.121 40.3454 108.121H65.9498C68.2134 108.121 70.3842 107.22 71.9848 105.616C73.5854 104.012 74.4846 101.837 74.4846 99.5691L74.4931 89.5723ZM31.8191 123.086C31.8191 121.385 32.4935 119.754 33.6939 118.551C34.8944 117.348 36.5225 116.672 38.2202 116.672H68.092C69.7897 116.672 71.4179 117.348 72.6183 118.551C73.8187 119.754 74.4931 121.385 74.4931 123.086C74.4931 124.787 73.8187 126.418 72.6183 127.621C71.4179 128.824 69.7897 129.5 68.092 129.5H38.2202C36.5225 129.5 34.8944 128.824 33.6939 127.621C32.4935 126.418 31.8191 124.787 31.8191 123.086ZM93.9525 24.4602C95.5144 17.311 105.671 17.2682 107.292 24.4003L107.369 24.7424L107.523 25.4094C108.444 29.3157 110.488 32.8655 113.402 35.6197C116.316 38.3739 119.973 40.2114 123.918 40.9049C131.361 42.2048 131.361 52.9114 123.918 54.2113C119.95 54.9079 116.274 56.7617 113.352 59.5407C110.43 62.3197 108.39 65.9005 107.489 69.8351L107.292 70.7074C105.671 77.848 95.5059 77.8052 93.9354 70.6475L93.7733 69.9035C92.9128 65.9538 90.898 62.3504 87.9856 59.5525C85.0732 56.7547 81.3952 54.8893 77.4206 54.1942C69.9868 52.9029 69.9868 42.2133 77.4206 40.9135C81.3813 40.2234 85.0486 38.3712 87.9581 35.5914C90.8675 32.8117 92.8884 29.2294 93.7647 25.2982L93.8928 24.7424L93.9525 24.4602Z" fill="#A8BDE8"/>
          </svg>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#324459] text-lg text-center">是否上传识别结果并生成报告？</p>
          <p className="text-[#CB2F2F] text-base text-center">上传后，日志和笔记内容将无法修改。</p>
        </div>
        
        <div className="w-full h-px bg-[#E2E7F0]"></div>
        
        <div className="flex gap-6 w-full">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl border border-[#004DA9] text-[#004DA9] text-lg font-semibold text-center"
          >
            取消
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#004DA9] text-white text-lg font-semibold text-center"
          >
            确认
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateReportModal;
