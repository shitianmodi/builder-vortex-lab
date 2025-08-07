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
    type: '语音',
    description: '受试者： 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字'
  },
  {
    id: '5',
    time: '00:00',
    type: '笔记',
    description: '笔记内容文本，笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本',
    noteContent: {
      thumbnails: ['thumbnail1', 'thumbnail2'],
      text: '笔记内容文本，笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔���内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本'
    }
  }
];

export default function LogView() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({
    沙具: true,
    水: true,
    语音: true,
    笔记: false
  });

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
    <div className="flex w-full px-6 py-3 items-center gap-6 rounded-[73px] bg-[#EEF1FA]">
      <div className="w-24 flex-shrink-0 text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-semibold">
        时间
      </div>
      <div className="w-24 flex-shrink-0 text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-semibold">
        类型
      </div>
      <div className="flex-1 text-[#7E90B0] font-['HONOR_Sans_CN'] text-base font-semibold">
        描述
      </div>
    </div>
  );

  const renderTableRow = (entry: LogEntry) => (
    <div key={entry.id} className="flex flex-col">
      <div className="flex px-6 py-3 items-center gap-6 min-h-[52px]">
        <div className="w-24 text-[#324459] font-['HONOR_Sans_CN'] text-base font-normal leading-7">
          {entry.time}
        </div>
        <div className="w-24 text-[#324459] font-['HONOR_Sans_CN'] text-base font-normal leading-7">
          {entry.type}
        </div>
        <div className="flex-1">
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
      </div>
      {/* Separator line */}
      <div className="w-full h-[1px] bg-[#E2E7F0] my-1 self-stretch"></div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-[#EEF1FA] flex flex-col">
      {/* Top Navigation Bar */}
      <div className="flex w-full px-6 lg:px-14 py-6 lg:py-14 justify-between items-center min-h-[80px] lg:h-32">
        <div className="flex items-center gap-4 lg:gap-9">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/data-center')}
              className="flex h-10 lg:h-12 px-3 lg:px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9] hover:bg-[#EEF1FA] transition-colors"
            >
              <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.5028 4.08329C12.9324 4.52768 12.9324 5.24818 12.5028 5.69257L7.50563 10.8621H19.15C19.7575 10.8621 20.25 11.3715 20.25 12C20.25 12.6285 19.7575 13.1379 19.15 13.1379H7.50564L12.5028 18.3074C12.9324 18.7518 12.9324 19.4723 12.5028 19.9167C12.0732 20.3611 11.3768 20.3611 10.9472 19.9167L4.07218 12.8046C3.64261 12.3602 3.64261 11.6398 4.07218 11.1954L10.9472 4.08329C11.3768 3.6389 12.0732 3.6389 12.5028 4.08329Z" fill="#004DA9"/>
              </svg>
              <div className="text-[#004DA9] text-base lg:text-lg font-semibold">返回</div>
            </button>
          </div>
          <div className="hidden lg:block w-[1px] h-6 bg-[#B6C2DA]"></div>
          <div className="text-[#3D526C] text-xl lg:text-2xl font-semibold">查看日志</div>
        </div>

        <div className="flex items-center gap-4 lg:gap-9">
          <div className="flex items-center gap-4">
            <div className="text-[#324459] text-base font-normal leading-7">显示</div>
            <div className="flex items-center gap-[6px]">
              {Object.entries(selectedFilters).map(([filter, isActive]) => (
                <button
                  key={filter}
                  onClick={() => handleFilterToggle(filter as keyof typeof selectedFilters)}
                  className={`flex h-9 px-4 py-2 items-center gap-[2px] rounded-2xl ${
                    isActive
                      ? 'bg-[#004DA9] text-white'
                      : 'border border-[#004DA9] text-[#004DA9]'
                  }`}
                >
                  <div className="text-base font-normal">{filter}</div>
                </button>
              ))}
            </div>
          </div>
          <div className="w-[1px] h-6 bg-[#B6C2DA]"></div>
          <div className="flex items-center gap-4">
            <button className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9] hover:bg-[#EEF1FA] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3.52441 16.5967V15.6328C3.52446 15.0944 3.96155 14.6572 4.5 14.6572C5.03845 14.6572 5.47554 15.0944 5.47559 15.6328V16.5967C5.47559 17.1176 5.67561 17.6113 6.02344 17.9707C6.37059 18.3291 6.83533 18.5244 7.3125 18.5244H16.6875L16.8662 18.5156C17.2792 18.4732 17.6729 18.2841 17.9766 17.9707C18.3244 17.6113 18.5244 17.1176 18.5244 16.5967V15.6284C18.5247 15.0902 18.9617 14.6543 19.5 14.6543C20.0383 14.6543 20.4753 15.0902 20.4756 15.6284V16.5967C20.4756 17.6154 20.0837 18.5991 19.377 19.3286C18.6692 20.0591 17.7021 20.4756 16.6875 20.4756H7.3125C6.29786 20.4756 5.33078 20.0591 4.62305 19.3286C3.91633 18.5991 3.52441 17.6154 3.52441 16.5967ZM11.0244 4.5C11.0244 3.96152 11.4615 3.52441 12 3.52441C12.5385 3.52441 12.9756 3.96152 12.9756 4.5V12.7368L14.5811 11.0801C14.9557 10.6933 15.5727 10.6834 15.9595 11.0581C16.3462 11.4328 16.3561 12.0498 15.9814 12.4365L12.7002 15.8232C12.5165 16.0128 12.264 16.1206 12 16.1206C11.736 16.1206 11.4835 16.0128 11.2998 15.8232L8.01855 12.4365L7.89551 12.2812C7.652 11.899 7.7023 11.3858 8.04053 11.0581C8.37898 10.7302 8.89362 10.6967 9.26807 10.9526L9.41895 11.0801L11.0244 12.7368V4.5Z" fill="#004DA9"/>
              </svg>
              <div className="text-[#004DA9] text-lg font-semibold">下载日志</div>
            </button>
            <button className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#A8BDE8] cursor-not-allowed">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 7.33696C12.3373 7.33696 12.6608 7.20297 12.8993 6.96447C13.1378 6.72598 13.2717 6.4025 13.2717 6.06522V3.52174C13.2717 3.18445 13.1378 2.86098 12.8993 2.62248C12.6608 2.38399 12.3373 2.25 12 2.25C11.6627 2.25 11.3392 2.38399 11.1007 2.62248C10.8622 2.86098 10.7283 3.18445 10.7283 3.52174V6.06522C10.7283 6.4025 10.8622 6.72598 11.1007 6.96447C11.3392 7.20297 11.6627 7.33696 12 7.33696ZM8.83761 7.0063L7.04022 5.21739C6.79744 4.97767 6.46999 4.84325 6.1288 4.84325C5.78762 4.84325 5.46017 4.97767 5.21739 5.21739C5.09851 5.33481 5.00427 5.47478 4.94021 5.62911C4.87615 5.78343 4.84356 5.949 4.84435 6.11609C4.84868 6.44995 4.98242 6.7691 5.21739 7.0063L7.04022 8.8037C7.27849 9.04226 7.60174 9.17644 7.93891 9.17674C8.19028 9.17652 8.43594 9.10181 8.64487 8.96206C8.8538 8.8223 9.01663 8.62376 9.11279 8.39152C9.20895 8.15928 9.23414 7.90375 9.18516 7.6572C9.13618 7.41066 9.01524 7.18416 8.83761 7.0063ZM2.25 12C2.25 12.3373 2.38399 12.6608 2.62248 12.8993C2.86098 13.1378 3.18445 13.2717 3.52174 13.2717H6.06522C6.4025 13.2717 6.72598 13.1378 6.96447 12.8993C7.20297 12.6608 7.33696 12.3373 7.33696 12C7.33696 11.6627 7.20297 11.3392 6.96447 11.1007C6.72598 10.8622 6.4025 10.7283 6.06522 10.7283H3.52174C3.18445 10.7283 2.86098 10.8622 2.62248 11.1007C2.38399 11.3392 2.25 11.6627 2.25 12ZM7.76087 14.9843C7.58562 14.9833 7.41209 15.019 7.25146 15.089C7.09084 15.1591 6.94667 15.2621 6.82826 15.3913L5.02239 17.1548C4.78629 17.3943 4.65393 17.7171 4.65393 18.0535C4.65393 18.3898 4.78629 18.7126 5.02239 18.9522C5.26229 19.1908 5.58692 19.3248 5.92533 19.3248C6.26373 19.3248 6.58836 19.1908 6.82826 18.9522L8.6087 17.1548C8.78361 16.98 8.9038 16.7581 8.95456 16.5161C9.00531 16.2742 8.98443 16.0226 8.89447 15.7923C8.80451 15.562 8.64938 15.363 8.44804 15.2195C8.24671 15.076 8.00791 14.9943 7.76087 14.9843ZM10.7283 20.4783C10.7283 20.8155 10.8622 21.139 11.1007 21.3775C11.3392 21.616 11.6627 21.75 12 21.75C12.3373 21.75 12.6608 21.616 12.8993 21.3775C13.1378 21.139 13.2717 20.8155 13.2717 20.4783V17.9348C13.2717 17.5975 13.1378 17.274 12.8993 17.0355C12.6608 16.797 12.3373 16.663 12 16.663C11.6627 16.663 11.3392 16.797 11.1007 17.0355C10.8622 17.274 10.7283 17.5975 10.7283 17.9348V20.4783ZM15.4337 15.3913C15.1955 15.6298 15.0618 15.953 15.0618 16.29C15.0618 16.627 15.1955 16.9502 15.4337 17.1887L17.2311 18.9861C17.4704 19.2231 17.793 19.357 18.1298 19.3591C18.4692 19.3574 18.7945 19.2236 19.037 18.9861C19.2724 18.7464 19.4035 18.4234 19.4015 18.0874C19.4034 17.9189 19.3714 17.7517 19.3073 17.5958C19.2432 17.44 19.1484 17.2986 19.0285 17.1802L17.2311 15.3913C16.9926 15.1531 16.6694 15.0194 16.3324 15.0194C15.9954 15.0194 15.6721 15.1531 15.4337 15.3913ZM21.75 12C21.75 11.6627 21.616 11.3392 21.3775 11.1007C21.139 10.8622 20.8155 10.7283 20.4783 10.7283H17.9348C17.5975 10.7283 17.274 10.8622 17.0355 11.1007C16.797 11.3392 16.663 11.6627 16.663 12C16.663 12.3373 16.797 12.6608 17.0355 12.8993C17.274 13.1378 17.5975 13.2717 17.9348 13.2717H20.4783C20.8155 13.2717 21.139 13.1378 21.3775 12.8993C21.616 12.6608 21.75 12.3373 21.75 12ZM17.9348 4.71717C17.6157 4.73215 17.3136 4.86509 17.087 5.09022L15.2726 6.91304C15.0345 7.15149 14.9007 7.47473 14.9007 7.81174C14.9007 8.14875 15.0345 8.47198 15.2726 8.71043C15.5125 8.94911 15.8371 9.08309 16.1755 9.08309C16.5139 9.08309 16.8386 8.94911 17.0785 8.71043L18.8759 6.91304C19.0657 6.73434 19.1961 6.50161 19.2492 6.24636C19.3024 5.99112 19.2758 5.7257 19.1731 5.48605C19.0704 5.24641 18.8965 5.04413 18.675 4.9066C18.4535 4.76907 18.1951 4.70294 17.9348 4.71717Z" fill="white"/>
              </svg>
              <div className="text-white text-lg font-semibold">等待报告</div>
            </button>
          </div>
        </div>
      </div>

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
                src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F35ddef349e8e49e58934cf829b588acb?format=webp&width=800"
                alt="沙盘成品1"
                className="w-full h-full object-cover"
                style={{ transform: 'scale(1.1) translate(-10%, -8%)' }}
              />
            </div>
            <div className="flex self-stretch aspect-[209/117] rounded-2xl overflow-hidden relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F35ddef349e8e49e58934cf829b588acb?format=webp&width=800"
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
