import { useState } from 'react';

interface EditVoiceEntryProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: {
    startTime: { minutes: number; seconds: number };
    endTime: { minutes: number; seconds: number };
    transcription: string;
  };
}

export default function EditVoiceEntry({ isOpen, onClose, onSave, initialData }: EditVoiceEntryProps) {
  const [startMinutes, setStartMinutes] = useState(initialData?.startTime.minutes || 0);
  const [startSeconds, setStartSeconds] = useState(initialData?.startTime.seconds || 0);
  const [endMinutes, setEndMinutes] = useState(initialData?.endTime.minutes || 0);
  const [endSeconds, setEndSeconds] = useState(initialData?.endTime.seconds || 0);
  const [transcription, setTranscription] = useState(initialData?.transcription || '- 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文���\n- 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      startTime: { minutes: startMinutes, seconds: startSeconds },
      endTime: { minutes: endMinutes, seconds: endSeconds },
      transcription
    });
    onClose();
  };

  const adjustTime = (type: 'startMinutes' | 'startSeconds' | 'endMinutes' | 'endSeconds', direction: 'up' | 'down', amount: number = 1) => {
    const adjustment = direction === 'up' ? amount : -amount;
    
    switch (type) {
      case 'startMinutes':
        setStartMinutes(prev => Math.max(0, Math.min(99, prev + adjustment)));
        break;
      case 'startSeconds':
        setStartSeconds(prev => Math.max(0, Math.min(59, prev + adjustment)));
        break;
      case 'endMinutes':
        setEndMinutes(prev => Math.max(0, Math.min(99, prev + adjustment)));
        break;
      case 'endSeconds':
        setEndSeconds(prev => Math.max(0, Math.min(59, prev + adjustment)));
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[468px] h-[768px] bg-white rounded-3xl relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 h-16">
          <h2 className="text-[#3D526C] text-lg font-semibold">编辑条目/语音</h2>
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
        <div className="px-6 flex flex-col gap-5 h-[597px] justify-center">
          {/* Start Time Section */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <span className="text-[#324459] text-base">开始</span>
              <div className="flex items-center gap-3">
                <div className="bg-[#F4F4F5] rounded-lg px-3 py-2 w-[60px] text-center">
                  <span className="text-[#3D526C] text-base">{startMinutes.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[#324459] text-base">分</span>
                <div className="bg-[#F4F4F5] rounded-lg px-3 py-2 w-[60px] text-center">
                  <span className="text-[#3D526C] text-base">{startSeconds.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[#324459] text-base">秒</span>
              </div>
            </div>
            
            {/* Start time adjustment buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustTime('startSeconds', 'down', 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.70058 2.29902C5.94954 2.54798 5.94954 2.95163 5.70058 3.20059L2.40137 6.4998L5.70058 9.79902C5.94954 10.048 5.94954 10.4516 5.70058 10.7006C5.45163 10.9495 5.04798 10.9495 4.79902 10.7006L1.04902 6.95059C0.800065 6.70163 0.800065 6.29798 1.04902 6.04902L4.79902 2.29902C5.04798 2.05006 5.45163 2.05006 5.70058 2.29902Z" fill="#7E90B0"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9506 2.29902C11.1995 2.54798 11.1995 2.95163 10.9506 3.20059L7.65137 6.4998L10.9506 9.79902C11.1995 10.048 11.1995 10.4516 10.9506 10.7006C10.7016 10.9495 10.298 10.9495 10.049 10.7006L6.29902 6.95059C6.05006 6.70163 6.05006 6.29798 6.29902 6.04902L10.049 2.29902C10.298 2.05006 10.7016 2.05006 10.9506 2.29902Z" fill="#7E90B0"/>
                </svg>
                <span className="text-[#7E90B0] text-base">10s</span>
              </button>
              <button
                onClick={() => adjustTime('startSeconds', 'up', 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#7E90B0] text-base">10s</span>
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.29941 2.29902C6.05046 2.54798 6.05046 2.95163 6.29941 3.20059L9.59863 6.4998L6.29941 9.79902C6.05046 10.048 6.05046 10.4516 6.29941 10.7006C6.54837 10.9495 6.95202 10.9495 7.20098 10.7006L10.951 6.95059C11.1999 6.70163 11.1999 6.29798 10.951 6.04902L7.20098 2.29902C6.95202 2.05006 6.54837 2.05006 6.29941 2.29902Z" fill="#7E90B0"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.04942 2.29902C0.800456 2.54798 0.800456 2.95163 1.04942 3.20059L4.34863 6.4998L1.04942 9.79902C0.800456 10.048 0.800456 10.4516 1.04942 10.7006C1.29837 10.9495 1.70202 10.9495 1.95098 10.7006L5.70098 6.95059C5.94994 6.70163 5.94994 6.29798 5.70098 6.04902L1.95098 2.29902C1.70202 2.05006 1.29837 2.05006 1.04942 2.29902Z" fill="#7E90B0"/>
                </svg>
              </button>
            </div>
          </div>

          {/* End Time Section */}
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-6">
              <span className="text-[#324459] text-base">结束</span>
              <div className="flex items-center gap-3">
                <div className="bg-[#F4F4F5] rounded-lg px-3 py-2 w-[60px] text-center">
                  <span className="text-[#3D526C] text-base">{endMinutes.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[#324459] text-base">分</span>
                <div className="bg-[#F4F4F5] rounded-lg px-3 py-2 w-[60px] text-center">
                  <span className="text-[#3D526C] text-base">{endSeconds.toString().padStart(2, '0')}</span>
                </div>
                <span className="text-[#324459] text-base">秒</span>
              </div>
            </div>
            
            {/* End time adjustment buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustTime('endSeconds', 'down', 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.70058 2.29902C5.94954 2.54798 5.94954 2.95163 5.70058 3.20059L2.40137 6.4998L5.70058 9.79902C5.94954 10.048 5.94954 10.4516 5.70058 10.7006C5.45163 10.9495 5.04798 10.9495 4.79902 10.7006L1.04902 6.95059C0.800065 6.70163 0.800065 6.29798 1.04902 6.04902L4.79902 2.29902C5.04798 2.05006 5.45163 2.05006 5.70058 2.29902Z" fill="#7E90B0"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.9506 2.29902C11.1995 2.54798 11.1995 2.95163 10.9506 3.20059L7.65137 6.4998L10.9506 9.79902C11.1995 10.048 11.1995 10.4516 10.9506 10.7006C10.7016 10.9495 10.298 10.9495 10.049 10.7006L6.29902 6.95059C6.05006 6.70163 6.05006 6.29798 6.29902 6.04902L10.049 2.29902C10.298 2.05006 10.7016 2.05006 10.9506 2.29902Z" fill="#7E90B0"/>
                </svg>
                <span className="text-[#7E90B0] text-base">10s</span>
              </button>
              <button
                onClick={() => adjustTime('endSeconds', 'up', 10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors"
              >
                <span className="text-[#7E90B0] text-base">10s</span>
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.29941 2.29902C6.05046 2.54798 6.05046 2.95163 6.29941 3.20059L9.59863 6.4998L6.29941 9.79902C6.05046 10.048 6.05046 10.4516 6.29941 10.7006C6.54837 10.9495 6.95202 10.9495 7.20098 10.7006L10.951 6.95059C11.1999 6.70163 11.1999 6.29798 10.951 6.04902L7.20098 2.29902C6.95202 2.05006 6.54837 2.05006 6.29941 2.29902Z" fill="#7E90B0"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.04942 2.29902C0.800456 2.54798 0.800456 2.95163 1.04942 3.20059L4.34863 6.4998L1.04942 9.79902C0.800456 10.048 0.800456 10.4516 1.04942 10.7006C1.29837 10.9495 1.70202 10.9495 1.95098 10.7006L5.70098 6.95059C5.94994 6.70163 5.94994 6.29798 5.70098 6.04902L1.95098 2.29902C1.70202 2.05006 1.29837 2.05006 1.04942 2.29902Z" fill="#7E90B0"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-[#E2E7F0]"></div>

          {/* Audio Waveform Section */}
          <div className="flex justify-center items-center gap-6">
            {/* Audio waveform with play button */}
            <div className="flex-1 bg-[#F4F4F5] rounded-[32px] h-[52px] flex items-center px-4 gap-4">
              <button className="w-9 h-9 bg-[#004DA9] rounded-full flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.64 13.7V2.3C3.64 1.958 3.774 1.688 4.042 1.49C4.31 1.292 4.598 1.262 4.906 1.4L12.946 6.1C13.254 6.238 13.408 6.478 13.408 6.82V9.18C13.408 9.522 13.254 9.762 12.946 9.9L4.906 14.6C4.598 14.738 4.31 14.708 4.042 14.51C3.774 14.312 3.64 14.042 3.64 13.7Z" fill="white"/>
                </svg>
              </button>
              
              {/* Waveform visualization */}
              <div className="flex-1 flex items-center justify-center h-8">
                <svg width="280" height="32" viewBox="0 0 280 32" fill="none">
                  <g>
                    {/* Active waveform (blue) */}
                    <rect x="40" y="6" width="2" height="20" fill="#004DA9"/>
                    <rect x="44" y="10" width="2" height="12" fill="#004DA9"/>
                    <rect x="48" y="8" width="2" height="16" fill="#004DA9"/>
                    <rect x="52" y="6" width="2" height="20" fill="#004DA9"/>
                    <rect x="56" y="4" width="2" height="24" fill="#004DA9"/>
                    <rect x="60" y="10" width="2" height="12" fill="#004DA9"/>
                    <rect x="64" y="8" width="2" height="16" fill="#004DA9"/>
                    <rect x="68" y="12" width="2" height="8" fill="#004DA9"/>
                    <rect x="72" y="6" width="2" height="20" fill="#004DA9"/>
                    <rect x="76" y="8" width="2" height="16" fill="#004DA9"/>
                    <rect x="80" y="4" width="2" height="24" fill="#004DA9"/>
                    <rect x="84" y="10" width="2" height="12" fill="#004DA9"/>
                    <rect x="88" y="6" width="2" height="20" fill="#004DA9"/>
                    <rect x="92" y="8" width="2" height="16" fill="#004DA9"/>
                    <rect x="96" y="12" width="2" height="8" fill="#004DA9"/>
                    <rect x="100" y="6" width="2" height="20" fill="#004DA9"/>
                    <rect x="104" y="8" width="2" height="16" fill="#004DA9"/>
                    <rect x="108" y="10" width="2" height="12" fill="#004DA9"/>
                    <rect x="112" y="6" width="2" height="20" fill="#004DA9"/>
                    <rect x="116" y="4" width="2" height="24" fill="#004DA9"/>
                    <rect x="120" y="8" width="2" height="16" fill="#004DA9"/>
                    <rect x="124" y="10" width="2" height="12" fill="#004DA9"/>
                    <rect x="128" y="6" width="2" height="20" fill="#004DA9"/>
                    <rect x="132" y="12" width="2" height="8" fill="#004DA9"/>
                    <rect x="136" y="8" width="2" height="16" fill="#004DA9"/>
                    
                    {/* Inactive waveform (gray) */}
                    <rect x="140" y="6" width="2" height="20" fill="#C7C9CC"/>
                    <rect x="144" y="10" width="2" height="12" fill="#C7C9CC"/>
                    <rect x="148" y="8" width="2" height="16" fill="#C7C9CC"/>
                    <rect x="152" y="6" width="2" height="20" fill="#C7C9CC"/>
                    <rect x="156" y="12" width="2" height="8" fill="#C7C9CC"/>
                    <rect x="160" y="8" width="2" height="16" fill="#C7C9CC"/>
                    <rect x="164" y="10" width="2" height="12" fill="#C7C9CC"/>
                    <rect x="168" y="6" width="2" height="20" fill="#C7C9CC"/>
                    <rect x="172" y="8" width="2" height="16" fill="#C7C9CC"/>
                    <rect x="176" y="12" width="2" height="8" fill="#C7C9CC"/>
                    <rect x="180" y="6" width="2" height="20" fill="#C7C9CC"/>
                    <rect x="184" y="10" width="2" height="12" fill="#C7C9CC"/>
                    <rect x="188" y="8" width="2" height="16" fill="#C7C9CC"/>
                    <rect x="192" y="6" width="2" height="20" fill="#C7C9CC"/>
                    <rect x="196" y="4" width="2" height="24" fill="#C7C9CC"/>
                    <rect x="200" y="8" width="2" height="16" fill="#C7C9CC"/>
                    <rect x="204" y="10" width="2" height="12" fill="#C7C9CC"/>
                    <rect x="208" y="6" width="2" height="20" fill="#C7C9CC"/>
                    <rect x="212" y="12" width="2" height="8" fill="#C7C9CC"/>
                    <rect x="216" y="8" width="2" height="16" fill="#C7C9CC"/>
                    <rect x="220" y="4" width="2" height="24" fill="#C7C9CC"/>
                    <rect x="224" y="10" width="2" height="12" fill="#C7C9CC"/>
                    <rect x="228" y="6" width="2" height="20" fill="#C7C9CC"/>
                    <rect x="232" y="8" width="2" height="16" fill="#C7C9CC"/>
                    <rect x="236" y="12" width="2" height="8" fill="#C7C9CC"/>
                    <rect x="240" y="6" width="2" height="20" fill="#C7C9CC"/>
                  </g>
                </svg>
              </div>
            </div>

            {/* Convert to text button */}
            <div className="flex flex-col items-center gap-1">
              <svg width="24" height="24" viewBox="0 0 24 25" fill="none">
                <path d="M7.10809 22.8912C7.61038 22.8912 7.95195 22.6297 8.55452 22.0876L12.0302 19.004H18.4687C21.4618 19.004 23.0689 17.3467 23.0689 14.4033V6.70917C23.0689 3.76617 21.4618 2.10889 18.4687 2.10889H5.53095C2.54809 2.10889 0.930664 3.75632 0.930664 6.70917V14.4033C0.930664 17.3566 2.54766 19.004 5.53095 19.004H6.01309V21.6153C6.01309 22.3889 6.41509 22.8912 7.10809 22.8912ZM7.51952 21.053V18.14C7.51952 17.5979 7.31895 17.3866 6.76652 17.3866H5.54081C3.50209 17.3866 2.54766 16.352 2.54766 14.3935V6.70917C2.54766 4.7506 3.50209 3.72632 5.54124 3.72632H18.4687C20.4975 3.72632 21.4515 4.7506 21.4515 6.70917V14.3935C21.4515 16.352 20.4975 17.3866 18.4687 17.3866H11.9595C11.4071 17.3866 11.1161 17.4672 10.7338 17.8589L7.51952 21.053ZM6.88695 8.00517H17.1127C17.4341 8.00517 17.6955 7.75403 17.6955 7.42232C17.6955 7.10089 17.4341 6.84974 17.1127 6.84974H6.88695C6.8115 6.84882 6.73664 6.86301 6.66675 6.89145C6.59687 6.9199 6.53338 6.96204 6.48003 7.0154C6.42668 7.06875 6.38454 7.13223 6.35609 7.20212C6.32764 7.272 6.31346 7.34687 6.31438 7.42232C6.31438 7.75403 6.56552 8.00517 6.88695 8.00517ZM6.88695 11.2696H17.1127C17.4341 11.2696 17.6955 11.0185 17.6955 10.6867C17.6955 10.3756 17.4341 10.1043 17.1127 10.1043H6.88695C6.56552 10.1043 6.31438 10.3756 6.31438 10.6872C6.31438 11.0185 6.56552 11.2696 6.88695 11.2696ZM6.88695 14.5439H13.5367C13.8581 14.5439 14.1195 14.2932 14.1195 13.9717C14.1195 13.64 13.8581 13.379 13.5367 13.379H6.88695C6.56552 13.379 6.31438 13.6405 6.31438 13.9717C6.31438 14.2932 6.56552 14.5439 6.88695 14.5439Z" fill="#004DA9"/>
              </svg>
              <span className="text-[#004DA9] text-base">转文字</span>
            </div>
          </div>

          {/* Text Area */}
          <div className="flex-1 border border-[#B6C2DA] rounded-[32px] p-6">
            <textarea
              value={transcription}
              onChange={(e) => setTranscription(e.target.value)}
              className="w-full h-full resize-none outline-none text-[#909399] text-base leading-7 bg-transparent"
              placeholder="对话内容转文字..."
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
