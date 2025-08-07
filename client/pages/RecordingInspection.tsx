import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogEntry {
  id: string;
  time: string;
  type: '沙具' | '水' | '语音' | '笔记';
  description: string;
  noteContent?: {
    thumbnails: string[];
    text: string;
  };
}

const mockLogData: LogEntry[] = [
  {
    id: '1',
    time: '00:00',
    type: '沙具',
    description: '在左上位置朝向右上放置了红色小汽车'
  },
  {
    id: '2',
    time: '00:00',
    type: '水',
    description: '在左上位置加入水'
  },
  {
    id: '3',
    time: '00:00',
    type: '语音',
    description: '受试者： 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字\n咨询师： 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字'
  },
  {
    id: '4',
    time: '00:00',
    type: '��音',
    description: '受试者： 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字'
  },
  {
    id: '5',
    time: '00:00',
    type: '笔记',
    description: '笔记内容文本，笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本',
    noteContent: {
      thumbnails: ['thumbnail1', 'thumbnail2'],
      text: '笔记内容文本，笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本'
    }
  }
];

export default function RecordingInspection() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    沙具: true,
    水: true,
    语音: true,
    笔记: false
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleFilterToggle = (filter: keyof typeof selectedFilters) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const filteredData = mockLogData.filter(entry => 
    selectedFilters[entry.type]
  );

  const renderTableHeader = () => (
    <div className="flex w-full px-6 py-2 items-center gap-6 rounded-[73px] bg-[#EEF1FA]">
      <div className="w-20 flex-shrink-0 text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-semibold">
        时间
      </div>
      <div className="w-20 flex-shrink-0 text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-semibold">
        类型
      </div>
      <div className="w-[400px] flex-shrink-0 text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-semibold">
        描述
      </div>
      <div className="w-[295px] flex-shrink-0 text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-semibold text-center">
        操作
      </div>
    </div>
  );

  const renderTableRow = (entry: LogEntry) => (
    <div key={entry.id} className="flex flex-col">
      <div className="flex px-3 py-2 items-start gap-6 min-h-[44px]">
        <div className="w-20 text-[#324459] font-['HONOR_Sans_CN'] text-base font-normal leading-7 pt-1">
          {entry.time}
        </div>
        <div className="w-20 text-[#324459] font-['HONOR_Sans_CN'] text-base font-normal leading-7 pt-1">
          {entry.type}
        </div>
        <div className="w-[400px] flex-shrink-0">
          {entry.type === '笔记' && entry.noteContent ? (
            <div className="flex flex-col justify-center items-start gap-3">
              <div className="flex items-start gap-2">
                {entry.noteContent.thumbnails.map((thumb, index) => (
                  <div 
                    key={index}
                    className="flex w-[72px] h-[64px] px-2 py-[22px] justify-center items-center rounded-2xl bg-[#B6C2DA]"
                  >
                    <div className="text-[#3D526C] font-['HONOR_Sans_CN'] text-sm font-normal leading-[14px] text-center">
                      手写内容<br />缩略图
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-[#909399] font-['HONOR_Sans_CN'] text-base font-normal leading-7 self-stretch">
                {entry.noteContent.text}
              </div>
            </div>
          ) : (
            <div className="text-[#909399] font-['HONOR_Sans_CN'] text-base font-normal leading-7 whitespace-pre-line">
              {entry.description}
            </div>
          )}
        </div>
        <div className="w-[295px] flex-shrink-0 flex justify-center items-center gap-4">
          {/* Edit Button */}
          <button className="flex w-9 h-9 p-[5px] justify-center items-center rounded-[18px] bg-[#EEF1FA] hover:bg-[#dde3f0] transition-colors">
            <svg className="w-[26px] h-[26px]" viewBox="0 0 26 26" fill="none">
              <path d="M6.0125 21.9375C5.47625 21.9375 5.01735 21.747 4.6358 21.3659C4.25425 20.9848 4.06315 20.5262 4.0625 19.9899V6.35698C4.0625 5.82139 4.2536 5.36307 4.6358 4.98199C5.018 4.60092 5.4769 4.41006 6.0125 4.40941H12.3744C12.6994 4.40941 12.9431 4.51101 13.1056 4.7142C13.2681 4.9174 13.3494 5.1404 13.3494 5.38319C13.3494 5.62599 13.2642 5.84931 13.0939 6.05316C12.9236 6.257 12.6757 6.35827 12.35 6.35698H6.0125V19.9899H19.6625V13.636C19.6625 13.3114 19.7642 13.068 19.9677 12.9057C20.1711 12.7434 20.3944 12.6622 20.6375 12.6622C20.8806 12.6622 21.1042 12.7434 21.3083 12.9057C21.5124 13.068 21.6138 13.3114 21.6125 13.636V19.9899C21.6125 20.5255 21.4217 20.9842 21.0402 21.3659C20.6586 21.7476 20.1994 21.9381 19.6625 21.9375H6.0125ZM9.9125 15.121V12.7596C9.9125 12.4999 9.96125 12.2523 10.0587 12.0166C10.1562 11.7809 10.2944 11.5742 10.4731 11.3963L18.8581 3.02177C19.0531 2.82701 19.2725 2.68095 19.5163 2.58357C19.76 2.48619 20.0038 2.4375 20.2475 2.4375C20.5075 2.4375 20.7555 2.48619 20.9914 2.58357C21.2274 2.68095 21.4425 2.82701 21.6369 3.02177L23.0019 4.40941C23.1806 4.60417 23.3188 4.81937 23.4163 5.05503C23.5138 5.29068 23.5625 5.52991 23.5625 5.77271C23.5625 6.0155 23.518 6.25505 23.4289 6.49136C23.3399 6.72766 23.1975 6.94254 23.0019 7.136L14.6169 15.5105C14.4381 15.6891 14.2311 15.8312 13.9958 15.937C13.7605 16.0429 13.5125 16.0955 13.2519 16.0948H10.8875C10.6112 16.0948 10.3799 16.0013 10.1933 15.8144C10.0068 15.6274 9.91315 15.3963 9.9125 15.121ZM11.8625 14.1472H13.2275L18.8825 8.4993L18.2 7.81765L17.4931 7.136L11.8625 12.7596V14.1472Z" fill="#004DA9"/>
            </svg>
          </button>
          
          {/* Delete Button */}
          <button className="flex w-9 h-9 p-[5px] justify-center items-center rounded-[18px] bg-[#F7E0E0] hover:bg-[#f0d0d0] transition-colors">
            <svg className="w-[26px] h-[26px]" viewBox="0 0 26 26" fill="none">
              <path d="M7.41406 22.75C6.79961 22.75 6.27379 22.538 5.8366 22.1141C5.3994 21.6901 5.18044 21.1799 5.17969 20.5833V6.5C4.86315 6.5 4.59801 6.396 4.38425 6.188C4.1705 5.98 4.06325 5.72289 4.0625 5.41667C4.06176 5.11044 4.16901 4.85333 4.38425 4.64533C4.5995 4.43733 4.86464 4.33333 5.17969 4.33333H9.64844C9.64844 4.02639 9.75569 3.76928 9.97019 3.562C10.1847 3.35472 10.4498 3.25072 10.7656 3.25H15.2344C15.5509 3.25 15.8164 3.354 16.0309 3.562C16.2454 3.77 16.3523 4.02711 16.3516 4.33333H20.8203C21.1368 4.33333 21.4024 4.43733 21.6169 4.64533C21.8314 4.85333 21.9382 5.11044 21.9375 5.41667C21.9368 5.72289 21.8295 5.98036 21.6157 6.18908C21.402 6.39781 21.1368 6.50144 20.8203 6.5V20.5833C20.8203 21.1792 20.6017 21.6894 20.1645 22.1141C19.7273 22.5387 19.2011 22.7507 18.5859 22.75H7.41406ZM18.5859 6.5H7.41406V20.5833H18.5859V6.5ZM10.7656 18.4167C11.0822 18.4167 11.3477 18.3127 11.5622 18.1047C11.7767 17.8967 11.8836 17.6396 11.8828 17.3333V9.75C11.8828 9.44306 11.7756 9.18594 11.5611 8.97867C11.3466 8.77139 11.0814 8.66739 10.7656 8.66667C10.4498 8.66594 10.1847 8.76994 9.97019 8.97867C9.75569 9.18739 9.64844 9.4445 9.64844 9.75V17.3333C9.64844 17.6403 9.65569 17.8977 9.97019 18.1057C10.1847 18.3137 10.4498 18.4174 10.7656 18.4167ZM15.2344 18.4167C15.5509 18.4167 15.8164 18.3127 16.0309 18.1047C16.2454 17.8967 16.3523 17.6396 16.3516 17.3333V9.75C16.3516 9.44306 16.2443 9.18594 16.0298 8.97867C15.8153 8.77139 15.5502 8.66739 15.2344 8.66667C14.9186 8.66594 14.6534 8.76994 14.4389 8.97867C14.2244 9.18739 14.1172 9.4445 14.1172 9.75V17.3333C14.1172 17.6403 14.2244 17.8977 14.4389 18.1057C14.6534 18.3137 14.9186 18.4174 15.2344 18.4167Z" fill="#CB2F2F"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Separator line */}
      <div className="w-full h-[1px] bg-[#E2E7F0] my-1 self-stretch"></div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-[#EEF1FA] flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex w-full px-6 lg:px-14 py-6 lg:py-14 justify-between items-center min-h-[120px]">
        <div className="flex items-center gap-4 lg:gap-9">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/data-center')}
              className="flex h-10 lg:h-12 px-3 lg:px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#CB2F2F] hover:bg-[#FFF5F5] transition-colors"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z" fill="#CB2F2F"/>
              </svg>
              <div className="text-[#CB2F2F] text-base lg:text-lg font-semibold">退出</div>
            </button>
          </div>
          <div className="hidden lg:block w-[1px] h-6 bg-[#B6C2DA]"></div>
          <div className="text-[#3D526C] text-xl lg:text-2xl font-semibold">录像检查</div>
        </div>

        <div className="flex items-center gap-4 lg:gap-9">
          {/* Mobile Filter Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex h-10 px-3 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9] text-[#004DA9]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M3 7h18M10 12h11M3 17h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-sm font-normal">筛选</span>
            </button>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <div className="text-[#324459] text-sm lg:text-base font-normal leading-7">显示</div>
            <div className="flex items-center gap-[6px] flex-wrap">
              {Object.entries(selectedFilters).map(([filter, isActive]) => (
                <button
                  key={filter}
                  onClick={() => handleFilterToggle(filter as keyof typeof selectedFilters)}
                  className={`flex h-8 lg:h-9 px-3 lg:px-4 py-2 items-center gap-[2px] rounded-2xl text-sm lg:text-base ${
                    isActive
                      ? 'bg-[#004DA9] text-white'
                      : 'border border-[#004DA9] text-[#004DA9]'
                  }`}
                >
                  <div className="font-normal">{filter}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="hidden lg:block w-[1px] h-6 bg-[#B6C2DA]"></div>
          <div className="flex items-center gap-2 lg:gap-4">
            <button className="flex h-10 lg:h-12 px-3 lg:px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9] hover:bg-[#EEF1FA] transition-colors">
              <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3.52441 16.5967V15.6328C3.52446 15.0944 3.96155 14.6572 4.5 14.6572C5.03845 14.6572 5.47554 15.0944 5.47559 15.6328V16.5967C5.47559 17.1176 5.67561 17.6113 6.02344 17.9707C6.37059 18.3291 6.83533 18.5244 7.3125 18.5244H16.6875L16.8662 18.5156C17.2792 18.4732 17.6729 18.2841 17.9766 17.9707C18.3244 17.6113 18.5244 17.1176 18.5244 16.5967V15.6284C18.5247 15.0902 18.9617 14.6543 19.5 14.6543C20.0383 14.6543 20.4753 15.0902 20.4756 15.6284V16.5967C20.4756 17.6154 20.0837 18.5991 19.377 19.3286C18.6692 20.0591 17.7021 20.4756 16.6875 20.4756H7.3125C6.29786 20.4756 5.33078 20.0591 4.62305 19.3286C3.91633 18.5991 3.52441 17.6154 3.52441 16.5967ZM11.0244 4.5C11.0244 3.96152 11.4615 3.52441 12 3.52441C12.5385 3.52441 12.9756 3.96152 12.9756 4.5V12.7368L14.5811 11.0801C14.9557 10.6933 15.5727 10.6834 15.9595 11.0581C16.3462 11.4328 16.3561 12.0498 15.9814 12.4365L12.7002 15.8232C12.5165 16.0128 12.264 16.1206 12 16.1206C11.736 16.1206 11.4835 16.0128 11.2998 15.8232L8.01855 12.4365L7.89551 12.2812C7.652 11.899 7.7023 11.3858 8.04053 11.0581C8.37898 10.7302 8.89362 10.6967 9.26807 10.9526L9.41895 11.0801L11.0244 12.7368V4.5Z" fill="#004DA9"/>
              </svg>
              <div className="hidden sm:block text-[#004DA9] text-base lg:text-lg font-semibold">下载日志</div>
            </button>
            <button className="flex h-10 lg:h-12 px-3 lg:px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors">
              <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 20 20" fill="none">
                <path d="M11.0371 4.75195H2.17383V17.0508H16.0557V9.85059H18.1289V18.1006C18.1288 18.3781 18.0191 18.6449 17.8252 18.8418C17.6311 19.0388 17.3672 19.1493 17.0918 19.1494H1.13672C0.861167 19.1494 0.596486 19.0389 0.402344 18.8418C0.208451 18.6449 0.100726 18.3781 0.100586 18.1006V3.70117C0.100586 3.42355 0.208395 3.15603 0.402344 2.95898C0.596471 2.76197 0.861241 2.65141 1.13672 2.65137H11.0371V4.75195ZM6.60449 15.5508H4.53223V11.6514H6.60449V15.5508ZM10.1514 15.5508H8.07812V6.25H10.1514V15.5508ZM13.6963 15.5508H11.623V8.95117H13.6963V15.5508ZM16.2051 0.850586C16.3258 0.85061 16.4446 0.887264 16.5439 0.956055C16.6424 1.02443 16.718 1.12156 16.7617 1.2334L16.9863 1.78125V1.78223C17.3482 2.67776 18.0343 3.39786 18.9023 3.79492H18.9033L19.5391 4.08398L19.542 4.08496C19.6492 4.13552 19.7395 4.21589 19.8027 4.31641C19.8661 4.41715 19.8994 4.53415 19.8994 4.65332C19.8993 4.77238 19.8661 4.88959 19.8027 4.99023C19.7394 5.09061 19.6491 5.17121 19.542 5.22168L19.5391 5.22363L18.8672 5.52637C18.0196 5.91233 17.3441 6.60751 16.9756 7.47461H16.9746L16.7578 7.98438L16.7559 7.9834C16.7106 8.09258 16.6358 8.18675 16.5381 8.25293C16.4398 8.31945 16.3237 8.35545 16.2051 8.35547C16.0867 8.35547 15.9713 8.31923 15.873 8.25293C15.7752 8.18669 15.6986 8.09279 15.6533 7.9834V7.98438L15.4346 7.47461C15.0659 6.60802 14.3912 5.914 13.5439 5.52832L12.8711 5.22363L12.8701 5.22168C12.7623 5.17134 12.6701 5.091 12.6064 4.99023C12.5429 4.88949 12.5099 4.7716 12.5098 4.65234C12.5099 4.53322 12.543 4.41608 12.6064 4.31543C12.6701 4.21453 12.7622 4.13437 12.8701 4.08398L12.8711 4.08203L13.5059 3.79492C14.3748 3.39826 15.0624 2.67826 15.4248 1.78223L15.6475 1.23438C15.6911 1.12171 15.7681 1.02476 15.8672 0.956055C15.9665 0.887389 16.0844 0.850586 16.2051 0.850586Z" fill="white"/>
              </svg>
              <div className="hidden sm:block text-white text-base lg:text-lg font-semibold">生成报告</div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Dropdown */}
      {showMobileFilters && (
        <div className="md:hidden w-full px-6 py-4 bg-white border-b border-[#E2E7F0]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#324459] text-sm font-normal mr-2">显示:</span>
            {Object.entries(selectedFilters).map(([filter, isActive]) => (
              <button
                key={filter}
                onClick={() => handleFilterToggle(filter as keyof typeof selectedFilters)}
                className={`flex h-8 px-3 py-1 items-center gap-1 rounded-xl text-sm ${
                  isActive
                    ? 'bg-[#004DA9] text-white'
                    : 'border border-[#004DA9] text-[#004DA9]'
                }`}
              >
                <div className="font-normal">{filter}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 gap-6 px-6 lg:px-14 pb-6 lg:pb-14 overflow-hidden">
        {/* Left Content - Table */}
        <div className="flex flex-1 min-w-0 max-w-none lg:max-w-[836px] px-3 lg:px-6 py-3 flex-col justify-center items-center rounded-3xl bg-white overflow-hidden">
          <div className="flex w-full flex-col justify-center items-center gap-4 flex-1 overflow-hidden">
            {renderTableHeader()}
            <div className="flex-1 w-full overflow-y-auto overflow-x-auto">
              {filteredData.map(renderTableRow)}
            </div>
          </div>
        </div>

        {/* Right Content - Sidebar */}
        <div className="hidden lg:flex flex-col w-[468px] gap-4">
          {/* Sandbox Products */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4 self-stretch">
              <div className="text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-normal">
                沙盘成品
              </div>
              <div className="flex-1 h-[1px] bg-[#E2E7F0]"></div>
            </div>
            <div className="flex self-stretch aspect-[209/117] rounded-2xl overflow-hidden relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2Ff9be0091124444c88c9c704b6edc45e6?format=webp&width=800"
                alt="沙盘成品1"
                className="w-full h-full object-cover"
                style={{ transform: 'scale(1.1) translate(-10%, -8%)' }}
              />
            </div>
            <div className="flex self-stretch aspect-[209/117] rounded-2xl overflow-hidden relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2Ff9be0091124444c88c9c704b6edc45e6?format=webp&width=800"
                alt="沙盘成品2"
                className="w-full h-full object-cover"
                style={{ transform: 'scale(1.1) translate(-5%, -8%)' }}
              />
            </div>
          </div>

          {/* Video Playback Control */}
          <div className="flex w-full px-5 py-3 justify-center items-center gap-4 rounded-3xl bg-white">
            <div className="flex flex-col items-start gap-3 flex-1">
              <div className="flex h-5 justify-between items-center self-stretch">
                <div className="flex items-center gap-2">
                  <div className="flex px-2 py-[2px] justify-center items-center gap-1 rounded-xl bg-[#B6C2DA]">
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path d="M4.33366 13.3332C3.32255 13.3332 2.45877 12.9832 1.74233 12.2832C1.02588 11.5832 0.667437 10.7276 0.666992 9.7165C0.666992 8.84984 0.928103 8.07762 1.45033 7.39984C1.97255 6.72206 2.65588 6.28873 3.50033 6.09984C3.7781 5.07761 4.33366 4.24984 5.16699 3.6165C6.00033 2.98317 6.94477 2.6665 8.00033 2.6665C9.30033 2.6665 10.4032 3.11939 11.309 4.02517C12.2148 4.93095 12.6674 6.03362 12.667 7.33317C13.4337 7.42206 14.0699 7.75273 14.5757 8.32517C15.0814 8.89761 15.3341 9.56695 15.3337 10.3332C15.3337 11.1665 15.0421 11.8749 14.459 12.4585C13.8759 13.0421 13.1674 13.3336 12.3337 13.3332H4.33366Z" fill="white"/>
                    </svg>
                    <div className="text-white font-['HONOR_Sans_CN'] text-sm font-normal">暂存</div>
                  </div>
                  <div className="text-[#324459] font-['HONOR_Sans_CN'] text-base font-normal leading-7">
                    视频回放
                  </div>
                </div>
                <div className="text-[#909399] font-['HONOR_Sans_CN'] text-base font-normal leading-7 text-right">
                  00:35:06/01:03:52
                </div>
              </div>
              <div className="flex h-2 items-center self-stretch rounded bg-[#F4F4F5] relative">
                <div className="absolute left-0 top-0 w-[193px] h-2 rounded bg-[#FEC619]"></div>
              </div>
            </div>
            <svg className="w-11 h-11 cursor-pointer hover:opacity-80 transition-opacity" viewBox="0 0 44 44" fill="none">
              <path d="M19.4012 29.2187L28.7856 23.2031C29.2348 22.9144 29.4594 22.5133 29.4594 22C29.4594 21.4867 29.2348 21.0856 28.7856 20.7969L19.4012 14.7812C18.92 14.4604 18.4304 14.436 17.9325 14.7081C17.4345 14.9802 17.1862 15.4056 17.1875 15.9844V28.0156C17.1875 28.5931 17.4365 29.0185 17.9344 29.2919C18.4323 29.5652 18.9213 29.5408 19.4012 29.2187ZM22 41.25C19.3371 41.25 16.8346 40.7443 14.4925 39.7331C12.1504 38.7218 10.1131 37.3506 8.38062 35.6194C6.64813 33.8881 5.27688 31.8508 4.2669 29.5075C3.25692 27.1641 2.75129 24.6616 2.75 22C2.74872 19.3384 3.25435 16.8359 4.2669 14.4925C5.27945 12.1491 6.65069 10.1118 8.38062 8.38062C10.1106 6.64941 12.1478 5.27817 14.4925 4.2669C16.8371 3.25563 19.3396 2.75 22 2.75C24.6603 2.75 27.1628 3.25563 29.5075 4.2669C31.8521 5.27817 33.8894 6.64941 35.6194 8.38062C37.3493 10.1118 38.7212 12.1491 39.735 14.4925C40.7488 16.8359 41.2538 19.3384 41.25 22C41.2461 24.6616 40.7405 27.1641 39.7331 29.5075C38.7257 31.8508 37.3544 33.8881 35.6194 35.6194C33.8843 37.3506 31.847 38.7224 29.5075 39.735C27.168 40.7475 24.6655 41.2525 22 41.25Z" fill="#004DA9"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
