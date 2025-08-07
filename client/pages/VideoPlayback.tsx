import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteVideoModal from '../components/DeleteVideoModal';

interface VideoPlaybackProps {}

type VideoStatus = 'temporary' | 'downloaded' | 'expired';

const VideoPlayback: React.FC<VideoPlaybackProps> = () => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [videoStatus, setVideoStatus] = useState<VideoStatus>('temporary');

  const handleBack = () => {
    navigate('/log-viewer');
  };

  const handleDownloadVideo = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      setVideoStatus('downloaded');
    }, 3000);
  };

  const handleDeleteVideo = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setShowDeleteModal(false);
    // Handle video deletion
    navigate('/log-viewer');
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  const renderVideoControls = () => {
    const controls = [
      {
        status: 'temporary' as VideoStatus,
        statusDisplay: (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl bg-[#B6C2DA]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.33335 13.3337C3.32224 13.3337 2.45846 12.9837 1.74202 12.2837C1.02558 11.5837 0.667131 10.7281 0.666687 9.71699C0.666687 8.85033 0.927798 8.0781 1.45002 7.40033C1.97224 6.72255 2.65558 6.28921 3.50002 6.10033C3.7778 5.0781 4.33335 4.25033 5.16669 3.61699C6.00002 2.98366 6.94447 2.66699 8.00002 2.66699C9.30002 2.66699 10.4029 3.11988 11.3087 4.02566C12.2145 4.93144 12.6671 6.0341 12.6667 7.33366C13.4334 7.42255 14.0696 7.75321 14.5754 8.32566C15.0811 8.8981 15.3338 9.56744 15.3334 10.3337C15.3334 11.167 15.0418 11.8754 14.4587 12.459C13.8756 13.0425 13.1671 13.3341 12.3334 13.3337H4.33335Z" fill="white"/>
            </svg>
            <span className="text-white text-sm">暂存</span>
          </div>
        ),
        progress: '00:35:06/01:03:52',
        buttonDisabled: false
      },
      {
        status: 'downloaded' as VideoStatus,
        statusDisplay: (
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl border border-[#0D802C]">
            <div className="w-4 h-4 relative">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0C10.866 0 14 3.13401 14 7C14 10.866 10.866 14 7 14C3.13401 14 0 10.866 0 7C0 3.13401 3.13401 0 7 0ZM10.8057 4.64453C10.5688 4.43303 10.2084 4.45672 10 4.69727L6.18945 9.09668L3.95117 7.07031C3.71557 6.8574 3.35437 6.87893 3.14453 7.11816C2.93485 7.35756 2.95592 7.72423 3.19141 7.9375L5.85742 10.3525C5.97097 10.4554 6.12064 10.5083 6.27246 10.499C6.42436 10.4897 6.56646 10.4188 6.66699 10.3027L10.8574 5.46387C11.0658 5.22312 11.0425 4.85634 10.8057 4.64453Z" fill="#0D802C"/>
              </svg>
            </div>
            <span className="text-[#0D802C] text-sm">已下载</span>
          </div>
        ),
        progress: '00:35:06/01:03:52',
        buttonDisabled: false
      },
      {
        status: 'expired' as VideoStatus,
        statusDisplay: null,
        progress: '01:03:52',
        buttonDisabled: true
      }
    ];

    const currentControl = controls.find(c => c.status === videoStatus);
    
    return (
      <div className="bg-white rounded-3xl p-3 flex items-center gap-4">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex justify-between items-center h-5">
            <div className="flex items-center gap-2">
              {currentControl?.statusDisplay}
              <span className="text-[#324459] text-base">
                {videoStatus === 'expired' ? '视频已过期' : '视频回放'}
              </span>
            </div>
            <span className="text-[#909399] text-base text-right">
              {currentControl?.progress}
            </span>
          </div>
          <div className="h-2 bg-[#F4F4F5] rounded">
            {videoStatus !== 'expired' && (
              <div 
                className="h-2 bg-[#FEC619] rounded" 
                style={{ width: '51%' }}
              />
            )}
          </div>
        </div>
        <button 
          disabled={currentControl?.buttonDisabled}
          className={`w-11 h-11 rounded-full flex items-center justify-center ${
            currentControl?.buttonDisabled ? 'opacity-50' : ''
          }`}
        >
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.4012 29.2187L28.7856 23.2031C29.2348 22.9144 29.4594 22.5133 29.4594 22C29.4594 21.4867 29.2348 21.0856 28.7856 20.7969L19.4012 14.7812C18.92 14.4604 18.4304 14.436 17.9325 14.7081C17.4345 14.9802 17.1862 15.4056 17.1875 15.9844V28.0156C17.1875 28.5931 17.4365 29.0185 17.9344 29.2919C18.4323 29.5652 18.9213 29.5408 19.4012 29.2187ZM22 41.25C19.3371 41.25 16.8346 40.7443 14.4925 39.7331C12.1504 38.7218 10.1131 37.3506 8.38062 35.6194C6.64813 33.8881 5.27688 31.8508 4.2669 29.5075C3.25692 27.1641 2.75129 24.6616 2.75 22C2.74872 19.3384 3.25435 16.8359 4.2669 14.4925C5.27945 12.1491 6.65069 10.1118 8.38062 8.38062C10.1106 6.64941 12.1478 5.27817 14.4925 4.2669C16.8371 3.25563 19.3396 2.75 22 2.75C24.6603 2.75 27.1628 3.25563 29.5075 4.2669C31.8521 5.27817 33.8894 6.64941 35.6194 8.38062C37.3493 10.1118 38.7212 12.1491 39.735 14.4925C40.7488 16.8359 41.2538 19.3384 41.25 22C41.2461 24.6616 40.7405 27.1641 39.7331 29.5075C38.7257 31.8508 37.3544 33.8881 35.6194 35.6194C33.8843 37.3506 31.847 38.7224 29.5075 39.735C27.168 40.7475 24.6655 41.2525 22 41.25Z" fill={currentControl?.buttonDisabled ? "#C7C9CC" : "#004DA9"}/>
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#EEF1FA] p-14">
      {/* Header */}
      <div className="flex justify-between items-center w-full h-12 mb-6">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleBack}
              className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#CB2F2F]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.5028 4.08329C12.9324 4.52768 12.9324 5.24818 12.5028 5.69257L7.50563 10.8621H19.15C19.7575 10.8621 20.25 11.3715 20.25 12C20.25 12.6285 19.7575 13.1379 19.15 13.1379H7.50564L12.5028 18.3074C12.9324 18.7518 12.9324 19.4723 12.5028 19.9167C12.0732 20.3611 11.3768 20.3611 10.9472 19.9167L4.07218 12.8046C3.64261 12.3602 3.64261 11.6398 4.07218 11.1954L10.9472 4.08329C11.3768 3.6389 12.0732 3.6389 12.5028 4.08329Z" fill="#CB2F2F"/>
              </svg>
              <span className="text-[#CB2F2F] text-lg font-semibold">返回</span>
            </button>
          </div>
          
          <div className="w-0.5 h-6 bg-[#B6C2DA]"></div>
          
          <div className="flex items-center gap-2">
            <h1 className="text-[#3D526C] text-2xl font-semibold">录像检查</h1>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.39893 2.39935C5.06699 2.7313 5.06699 3.26949 5.39893 3.60143L9.79789 8.00039L5.39893 12.3994C5.06699 12.7313 5.06699 13.2695 5.39893 13.6014C5.73088 13.9334 6.26907 13.9334 6.60102 13.6014L11.601 8.60143C11.933 8.26949 11.933 7.7313 11.601 7.39935L6.60102 2.39935C6.26907 2.0674 5.73088 2.0674 5.39893 2.39935Z" fill="#3D526C"/>
            </svg>
            <h2 className="text-[#3D526C] text-2xl font-semibold">视频回放</h2>
          </div>
          
          <div className="text-[#7E90B0] text-sm leading-tight">
            *沙盘过程视频仅临时保存72小时<br/>
            如有需要可自行下载到本地
          </div>
        </div>

        <button 
          onClick={handleDownloadVideo}
          disabled={isDownloading}
          className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] disabled:bg-[#A8BDE8]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {isDownloading ? (
              <path d="M12 7.33696C12.3373 7.33696 12.6608 7.20297 12.8993 6.96447C13.1378 6.72598 13.2717 6.4025 13.2717 6.06522V3.52174C13.2717 3.18445 13.1378 2.86098 12.8993 2.62248C12.6608 2.38399 12.3373 2.25 12 2.25C11.6627 2.25 11.3392 2.38399 11.1007 2.62248C10.8622 2.86098 10.7283 3.18445 10.7283 3.52174V6.06522C10.7283 6.4025 10.8622 6.72598 11.1007 6.96447C11.3392 7.20297 11.6627 7.33696 12 7.33696Z" fill="white"/>
            ) : (
              <path d="M3.52441 16.5967V15.6328C3.52446 15.0944 3.96155 14.6572 4.5 14.6572C5.03845 14.6572 5.47554 15.0944 5.47559 15.6328V16.5967C5.47559 17.1176 5.67561 17.6113 6.02344 17.9707C6.37059 18.3291 6.83533 18.5244 7.3125 18.5244H16.6875L16.8662 18.5156C17.2792 18.4732 17.6729 18.2841 17.9766 17.9707C18.3244 17.6113 18.5244 17.1176 18.5244 16.5967V15.6284C18.5247 15.0902 18.9617 14.6543 19.5 14.6543C20.0383 14.6543 20.4753 15.0902 20.4756 15.6284V16.5967C20.4756 17.6154 20.0837 18.5991 19.377 19.3286C18.6692 20.0591 17.7021 20.4756 16.6875 20.4756H7.3125C6.29786 20.4756 5.33078 20.0591 4.62305 19.3286C3.91633 18.5991 3.52441 17.6154 3.52441 16.5967ZM11.0244 4.5C11.0244 3.96152 11.4615 3.52441 12 3.52441C12.5385 3.52441 12.9756 3.96152 12.9756 4.5V12.7368L14.5811 11.0801C14.9557 10.6933 15.5727 10.6834 15.9595 11.0581C16.3462 11.4328 16.3561 12.0498 15.9814 12.4365L12.7002 15.8232C12.5165 16.0128 12.264 16.1206 12 16.1206C11.736 16.1206 11.4835 16.0128 11.2998 15.8232L8.01855 12.4365L7.89551 12.2812C7.652 11.899 7.7023 11.3858 8.04053 11.0581C8.37898 10.7302 8.89362 10.6967 9.26807 10.9526L9.41895 11.0801L11.0244 12.7368V4.5Z" fill="white"/>
            )}
          </svg>
          <span className="text-white text-lg font-semibold">
            {isDownloading ? '下载中' : '下载视频'}
          </span>
        </button>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E2E7F0] mb-6"></div>

      {/* Main Content Area */}
      <div className="relative w-full h-[746px] bg-[#C7D4E8] rounded-lg overflow-hidden">
        {/* Background Image */}
        <img 
          src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F996e1a311f334b90ab1e392360db3489?format=webp&width=800"
          alt="Sandbox video"
          className="w-full h-full object-cover"
        />
        
        {/* Real-time Log Panel */}
        <div className="absolute left-0 top-0 w-[306px] h-full bg-black/30 p-6 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.1667 18.5625C9.90694 18.5625 9.68939 18.4725 9.514 18.2925C9.33861 18.1125 9.25061 17.89 9.25 17.625C9.24939 17.36 9.33739 17.1375 9.514 16.9575C9.69061 16.7775 9.90817 16.6875 10.1667 16.6875H19.3333C19.5931 16.6875 19.8109 16.7775 19.9869 16.9575C20.1629 17.1375 20.2506 17.36 20.25 17.625C20.2494 17.89 20.1614 18.1128 19.986 18.2934C19.8106 18.474 19.5931 18.5637 19.3333 18.5625H10.1667Z" fill="white"/>
              </svg>
              <span className="text-white text-lg">实时日志</span>
            </div>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.4515 3.29837C10.9079 3.7548 10.9079 4.49481 10.4515 4.95124L4.40291 10.9998L10.4515 17.0484C10.9079 17.5048 10.9079 18.2448 10.4515 18.7012C9.99505 19.1577 9.25504 19.1577 8.79862 18.7012L1.92362 11.8262C1.46719 11.3698 1.46719 10.6298 1.92362 10.1734L8.79862 3.29837C9.25504 2.84195 9.99505 2.84195 10.4515 3.29837Z" fill="white"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M20.0765 3.29837C20.5329 3.7548 20.5329 4.49481 20.0765 4.95124L14.0279 10.9998L20.0765 17.0484C20.5329 17.5048 20.5329 18.2448 20.0765 18.7012C19.6201 19.1577 18.88 19.1577 18.4236 18.7012L11.5486 11.8262C11.0922 11.3698 11.0922 10.6298 11.5486 10.1734L18.4236 3.29837C18.88 2.84195 19.6201 2.84195 20.0765 3.29837Z" fill="white"/>
            </svg>
          </div>
          
          <div className="w-full h-px bg-[#C7C9CC]"></div>
          
          <div className="flex flex-col gap-4 text-white text-base">
            <div className="flex gap-4">
              <span className="w-12 shrink-0">00:00</span>
              <span>在左上位置朝向右上放置了红色小汽车</span>
            </div>
            <div className="flex gap-4">
              <span className="w-12 shrink-0">01:00</span>
              <span>在左上位置加入水</span>
            </div>
            <div className="flex gap-4">
              <span className="w-12 shrink-0">02:00</span>
              <span>来访者与咨询师发生对话</span>
            </div>
            <div className="flex gap-4">
              <span className="w-12 shrink-0">03:00</span>
              <span>来访者自言自语</span>
            </div>
            <div className="flex gap-4">
              <span className="w-12 shrink-0">04:00</span>
              <span>咨询师插入笔记</span>
            </div>
          </div>
        </div>

        {/* Secondary Camera View */}
        <div className="absolute top-0 right-0 w-80 h-45 border-3 border-white">
          <img 
            src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F90929bbd021a4e9f97f949635dec58cd?format=webp&width=800"
            alt="Secondary camera view"
            className="w-full h-full object-cover"
          />
          
          {/* Camera controls */}
          <div className="absolute top-2.5 right-2.5 flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.6118 21.6701V20.3918C20.8819 21.2443 20.0101 21.9756 19.0261 22.5451C17.1275 23.6438 14.9206 24.0858 12.7456 23.8046C10.5704 23.5234 8.54767 22.5339 6.98975 20.9882C5.52936 19.5392 4.55362 17.6771 4.18872 15.6579L4.12378 15.2529L4.11523 15.0222C4.14903 14.4941 4.54997 14.045 5.09448 13.9694C5.63874 13.8943 6.14538 14.2176 6.32153 14.7163L6.37622 14.9401L6.48901 15.5639C6.81076 17.0052 7.53949 18.3283 8.59277 19.3733C9.7964 20.5674 11.3586 21.3317 13.0378 21.5488C14.7168 21.7657 16.42 21.4232 17.8862 20.5747C18.8272 20.03 19.6352 19.2949 20.2668 18.4248H18.375C17.747 18.4248 17.2372 17.9162 17.2368 17.2883C17.2368 16.6601 17.7468 16.1501 18.375 16.1501H22.75C23.3782 16.1501 23.8882 16.6601 23.8882 17.2883V21.6701C23.8882 22.2983 23.3782 22.8083 22.75 22.8083C22.1218 22.8083 21.6118 22.2983 21.6118 21.6701Z" fill="white"/>
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 15.8631L7.47909 22.384C7.23511 22.628 6.92459 22.75 6.54753 22.75C6.17047 22.75 5.85995 22.628 5.61597 22.384C5.37199 22.14 5.25 21.8295 5.25 21.4525C5.25 21.0754 5.37199 20.7649 5.61597 20.5209L12.1369 14L5.61597 7.47909C5.37199 7.23511 5.25 6.92459 5.25 6.54753C5.25 6.17047 5.37199 5.85995 5.61597 5.61597C5.85995 5.37199 6.17047 5.25 6.54753 5.25C6.92459 5.25 7.23511 5.37199 7.47909 5.61597L14 12.1369L20.5209 5.61597C20.7649 5.37199 21.0754 5.25 21.4525 5.25C21.8295 5.25 22.14 5.37199 22.384 5.61597C22.628 5.85995 22.75 6.17047 22.75 6.54753C22.75 6.92459 22.628 7.23511 22.384 7.47909L15.8631 14L22.384 20.5209C22.628 20.7649 22.75 21.0754 22.75 21.4525C22.75 21.8295 22.628 22.14 22.384 22.384C22.14 22.628 21.8295 22.75 21.4525 22.75C21.0754 22.75 20.7649 22.628 20.5209 22.384L14 15.8631Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[468px]">
          {renderVideoControls()}
        </div>

        {/* Additional Control Buttons */}
        <div className="absolute bottom-8 right-8 flex gap-4">
          {videoStatus === 'downloaded' && (
            <button 
              onClick={handleDeleteVideo}
              className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#CB2F2F]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.84375 21C6.27656 21 5.79119 20.8043 5.38763 20.413C4.98407 20.0217 4.78194 19.5507 4.78125 19V6C4.48907 6 4.24432 5.904 4.047 5.712C3.84969 5.52 3.75069 5.28267 3.75 5C3.74932 4.71733 3.84832 4.48 4.047 4.288C4.24569 4.096 4.49044 4 4.78125 4H8.90625C8.90625 3.71667 9.00525 3.47933 9.20325 3.288C9.40125 3.09667 9.646 3.00067 9.9375 3H14.0625C14.3547 3 14.5998 3.096 14.7978 3.288C14.9958 3.48 15.0944 3.71733 15.0937 4H19.2187C19.5109 4 19.756 4.096 19.954 4.288C20.152 4.48 20.2507 4.71733 20.25 5C20.2493 5.28267 20.1503 5.52033 19.953 5.713C19.7557 5.90567 19.5109 6.00133 19.2187 6V19C19.2187 19.55 19.017 20.021 18.6134 20.413C18.2098 20.805 17.7241 21.0007 17.1562 21H6.84375Z" fill="white"/>
              </svg>
              <span className="text-white text-lg font-semibold">删除本地视频</span>
            </button>
          )}
        </div>
      </div>

      {/* Delete Video Modal */}
      <DeleteVideoModal
        isOpen={showDeleteModal}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        isExpired={videoStatus === 'expired'}
        expiryDate="2025-00-00 12:00"
      />
    </div>
  );
};

export default VideoPlayback;
