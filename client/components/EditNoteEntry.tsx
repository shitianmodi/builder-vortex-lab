import { useState } from 'react';

interface EditNoteEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    time: { minutes: number; seconds: number };
    content: string;
    thumbnails: string[];
  };
}

export default function EditNoteEntry({ isOpen, onClose, onSave, initialData }: EditNoteEntryProps) {
  const [minutes, setMinutes] = useState(initialData?.time.minutes || 0);
  const [seconds, setSeconds] = useState(initialData?.time.seconds || 0);
  const [content, setContent] = useState(initialData?.content || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      time: { minutes, seconds },
      content,
      thumbnails: initialData?.thumbnails || []
    });
    onClose();
  };

  const adjustTime = (type: 'minutes' | 'seconds', direction: 'up' | 'down', amount: number = 1) => {
    if (type === 'minutes') {
      setMinutes(prev => Math.max(0, Math.min(99, prev + (direction === 'up' ? amount : -amount))));
    } else {
      setSeconds(prev => Math.max(0, Math.min(59, prev + (direction === 'up' ? amount : -amount))));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[468px] h-[768px] bg-white rounded-3xl relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 h-16">
          <h2 className="text-[#3D526C] text-lg font-semibold">编辑条目/笔记</h2>
          <button
            onClick={onClose}
            className="w-6 h-6 text-[#3D526C] hover:text-[#324459] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z" fill="currentColor"/>
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
                  <span className="text-[#3D526C] text-base">{minutes.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[#324459] text-base">分</span>
                <div className="bg-[#F4F4F5] rounded-lg px-3 py-2 w-[60px] text-center">
                  <span className="text-[#3D526C] text-base">{seconds.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[#324459] text-base">秒</span>
              </div>
            </div>
            
            {/* Time adjustment buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustTime('minutes', 'down', 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.70083 2.29902C5.94979 2.54798 5.94979 2.95163 5.70083 3.20059L2.40161 6.4998L5.70083 9.79902C5.94979 10.048 5.94979 10.4516 5.70083 10.7006C5.45187 10.9495 5.04823 10.9495 4.79927 10.7006L1.04927 6.95059C0.800309 6.70163 0.800309 6.29798 1.04927 6.04902L4.79927 2.29902C5.04823 2.05006 5.45187 2.05006 5.70083 2.29902Z" fill="#7E90B0"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9508 2.29902C11.1998 2.54798 11.1998 2.95163 10.9508 3.20059L7.65161 6.4998L10.9508 9.79902C11.1998 10.048 11.1998 10.4516 10.9508 10.7006C10.7019 10.9495 10.2982 10.9495 10.0493 10.7006L6.29927 6.95059C6.05031 6.70163 6.05031 6.29798 6.29927 6.04902L10.0493 2.29902C10.2982 2.05006 10.7019 2.05006 10.9508 2.29902Z" fill="#7E90B0"/>
                </svg>
                <span className="text-[#7E90B0] text-base">10s</span>
              </button>
              <button
                onClick={() => adjustTime('seconds', 'up', 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#7E90B0] text-base">10s</span>
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.29917 2.29902C6.05021 2.54798 6.05021 2.95163 6.29917 3.20059L9.59839 6.4998L6.29917 9.79902C6.05021 10.048 6.05021 10.4516 6.29917 10.7006C6.54813 10.9495 6.95177 10.9495 7.20073 10.7006L10.9507 6.95059C11.1997 6.70163 11.1997 6.29798 10.9507 6.04902L7.20073 2.29902C6.95177 2.05006 6.54813 2.05006 6.29917 2.29902Z" fill="#7E90B0"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.04917 2.29902C0.800212 2.54798 0.800212 2.95163 1.04917 3.20059L4.34839 6.4998L1.04917 9.79902C0.800212 10.048 0.800212 10.4516 1.04917 10.7006C1.29813 10.9495 1.70177 10.9495 1.95073 10.7006L5.70073 6.95059C5.94969 6.70163 5.94969 6.29798 5.70073 6.04902L1.95073 2.29902C1.70177 2.05006 1.29813 2.05006 1.04917 2.29902Z" fill="#7E90B0"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E2E7F0]"></div>

          {/* Handwriting Thumbnails */}
          <div className="flex flex-col gap-3">
            <span className="text-[#324459] text-base">手写内容</span>
            <div className="flex gap-2">
              {[0, 1].map((index) => (
                <div
                  key={index}
                  className="w-16 h-16 bg-[#B6C2DA] rounded-2xl flex items-center justify-center"
                >
                  <span className="text-[#3D526C] text-xs text-center leading-3">
                    手写内容<br/>缩略图
                  </span>
                </div>
              ))}
              <button className="w-16 h-16 border-2 border-dashed border-[#B6C2DA] rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="#7E90B0" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex flex-col gap-3">
            <span className="text-[#324459] text-base">文字内容</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[200px] p-4 border border-[#E2E7F0] rounded-2xl resize-none outline-none text-[#324459] text-base leading-7"
              placeholder="输入笔记内容..."
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#004DA9] text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12.8271 0.75C13.0716 0.750008 13.3046 0.796049 13.5264 0.887695C13.7482 0.979362 13.9429 1.10929 14.1104 1.27734L16.7227 3.88965C16.8907 4.0577 17.0206 4.25278 17.1123 4.47461C17.2039 4.69639 17.25 4.92908 17.25 5.17285V15.417C17.2499 15.921 17.0706 16.3527 16.7119 16.7119C16.3533 17.0712 15.9216 17.2505 15.417 17.25H2.58301C2.079 17.2499 1.6477 17.0705 1.28906 16.7119C0.930418 16.3533 0.750688 15.9216 0.75 15.417V2.58301C0.750077 2.07898 0.929806 1.64771 1.28906 1.28906C1.64832 0.930418 2.07959 0.750688 2.58301 0.75H12.8271ZM2.58301 2.58301V15.417H4.27441V9C4.27441 8.46152 4.71152 8.02441 5.25 8.02441H12.75C13.2885 8.02441 13.7256 8.46152 13.7256 9V15.417H15.417V5.19629L12.8037 2.58301H2.58301ZM6.22559 15.417H11.7744V9.97559H6.22559V15.417Z" fill="white"/>
          </svg>
          <span className="text-lg font-semibold">保存</span>
        </button>
      </div>
    </div>
  );
}
