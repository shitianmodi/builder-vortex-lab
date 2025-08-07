import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CompleteRecordingModal from '../components/CompleteRecordingModal';

interface PhotoCaptureProps {}

const PhotoCapture: React.FC<PhotoCaptureProps> = () => {
  const navigate = useNavigate();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showRetakeModal, setShowRetakeModal] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleExit = () => {
    navigate('/dashboard');
  };

  const handleInsertNote = () => {
    navigate('/note-editor');
  };

  const handleCapture = () => {
    // Simulate photo capture
    setIsCaptured(true);
    setCapturedImage('https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F996e1a311f334b90ab1e392360db3489?format=webp&width=800');
  };

  const handleRetake = () => {
    setShowRetakeModal(true);
  };

  const handleRetakeConfirm = () => {
    setIsCaptured(false);
    setCapturedImage(null);
    setShowRetakeModal(false);
  };

  const handleRetakeCancel = () => {
    setShowRetakeModal(false);
  };

  const handleCompleteCapture = () => {
    setShowCompleteModal(true);
  };

  const handleCompleteRecording = (option: 'direct' | 'review' | 'save') => {
    setShowCompleteModal(false);
    
    if (option === 'direct') {
      navigate('/dashboard');
    } else if (option === 'review') {
      navigate('/log-viewer');
    } else {
      navigate('/dashboard');
    }
  };

  const handleCompleteModalClose = () => {
    setShowCompleteModal(false);
  };

  return (
    <div className="min-h-screen bg-[#EEF1FA] p-14">
      {/* Header */}
      <div className="flex justify-between items-center w-full h-12 mb-6">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleExit}
              className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#CB2F2F]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z" fill="white"/>
              </svg>
              <span className="text-white text-lg font-semibold">退出</span>
            </button>
          </div>
          
          <div className="w-0.5 h-6 bg-[#B6C2DA]"></div>
          
          <h1 className="text-[#3D526C] text-2xl font-semibold">拍照识别</h1>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleInsertNote}
            className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.30643 9.306V19.2009H15.603V16.5023C15.603 16.2474 15.6893 16.0339 15.862 15.8618C16.0347 15.6897 16.2482 15.6034 16.5025 15.6028H19.201V9.306H9.30643ZM7.50742 19.2009V9.28351C7.50742 8.78877 7.68732 8.36898 8.04712 8.02416C8.40693 7.67934 8.83419 7.50693 9.32892 7.50693H19.201C19.6957 7.50693 20.1194 7.68294 20.472 8.03495C20.8246 8.38697 21.0006 8.81066 21 9.306V15.7602C21 16.0001 20.955 16.2288 20.8651 16.4465C20.7751 16.6642 20.6477 16.8552 20.4828 17.0195L17.0197 20.4828C16.8548 20.6477 16.6635 20.7751 16.4458 20.8651C16.2281 20.955 15.9996 21 15.7604 21H9.30643C8.8117 21 8.38834 20.824 8.03633 20.472C7.68432 20.12 7.50802 19.6963 7.50742 19.2009ZM3.03238 6.83227C2.94243 6.33753 3.03988 5.89166 3.32472 5.49466C3.60956 5.09766 3.99935 4.85389 4.49408 4.76333L14.2537 3.03172C14.7334 2.94177 15.1682 3.04312 15.558 3.33577C15.9478 3.62842 16.2026 4.01432 16.3226 4.49347L16.48 5.19062C16.5549 5.49046 16.51 5.73034 16.3451 5.91025C16.1802 6.09015 15.9853 6.1951 15.7604 6.22508C15.5355 6.25507 15.322 6.21399 15.1199 6.10185C14.9178 5.98971 14.779 5.78341 14.7035 5.48296L14.546 4.80831L4.80891 6.53992L6.15816 14.276C6.20314 14.5308 6.15816 14.7593 6.02324 14.9614C5.88831 15.1635 5.69342 15.2873 5.43856 15.3329C5.1837 15.3785 4.95882 15.3299 4.76393 15.1872C4.56904 15.0445 4.4491 14.8457 4.40413 14.5908L3.03238 6.83227Z" fill="#004DA9"/>
            </svg>
            <span className="text-[#004DA9] text-lg font-semibold">插入笔记</span>
          </button>
          
          <button 
            onClick={handleCompleteCapture}
            className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1205 13.7083L15.7636 9L14.5977 7.8125L11.1205 11.3542L9.38182 9.58333L8.23636 10.75L11.1205 13.7083ZM3 19.5V17.8333H21V19.5H3ZM5.45455 17C5.00455 17 4.61945 16.8369 4.29927 16.5108C3.97909 16.1847 3.81873 15.7922 3.81818 15.3333V6.16667C3.81818 5.70833 3.97855 5.31611 4.29927 4.99C4.62 4.66389 5.00509 4.50056 5.45455 4.5H18.5455C18.9955 4.5 19.3808 4.66333 19.7015 4.99C20.0223 5.31667 20.1824 5.70889 20.1818 6.16667V15.3333C20.1818 15.7917 20.0217 16.1842 19.7015 16.5108C19.3814 16.8375 18.996 17.0006 18.5455 17H5.45455ZM5.45455 15.3333H18.5455V6.16667H5.45455V15.3333Z" fill="white"/>
            </svg>
            <span className="text-white text-lg font-semibold">完成拍摄</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E2E7F0] mb-6"></div>

      {/* Main Camera Area */}
      <div className="relative w-full h-[746px] bg-[#C7D4E8] rounded-lg overflow-hidden">
        {/* Main camera view */}
        <img 
          src={capturedImage || "https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F996e1a311f334b90ab1e392360db3489?format=webp&width=800"}
          alt="Camera view"
          className="w-full h-full object-cover"
        />
        
        {/* Right overlay gradient */}
        <div className="absolute right-0 top-0 w-[370px] h-full bg-gradient-to-r from-transparent to-[rgba(48,49,51,0.6)]"></div>

        {/* Secondary camera view */}
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
                <path d="M21.6118 21.6701V20.3918C20.8819 21.2443 20.0101 21.9756 19.0261 22.5451C17.1275 23.6438 14.9206 24.0858 12.7456 23.8046C10.5704 23.5234 8.54767 22.5339 6.98975 20.9882C5.52936 19.5392 4.55362 17.6771 4.18872 15.6579L4.12378 15.2529L4.11523 15.0222C4.14903 14.4941 4.54997 14.045 5.09448 13.9694C5.63874 13.8943 6.14538 14.2176 6.32153 14.7163L6.37622 14.9401L6.48901 15.5639C6.81076 17.0052 7.53949 18.3283 8.59277 19.3733C9.7964 20.5674 11.3586 21.3317 13.0378 21.5488C14.7168 21.7657 16.42 21.4232 17.8862 20.5747C18.8272 20.03 19.6352 19.2949 20.2668 18.4248H18.375C17.747 18.4248 17.2372 17.9162 17.2368 17.2883C17.2368 16.6601 17.7468 16.1501 18.375 16.1501H22.75C23.3782 16.1501 23.8882 16.6601 23.8882 17.2883V21.6701C23.8882 22.2983 23.3782 22.8083 22.75 22.8083C22.1218 22.8083 21.6118 22.2983 21.6118 21.6701ZM8.97388 5.45528C10.8725 4.35656 13.0794 3.91461 15.2544 4.19576C17.4296 4.47696 19.4523 5.46649 21.0103 7.01217C22.5678 8.55761 23.5744 10.5729 23.8762 12.7475C23.9625 13.3698 23.5278 13.9447 22.9055 14.031C22.3613 14.1061 21.8546 13.7829 21.6785 13.2841L21.6238 13.0603L21.511 12.4365C21.1892 10.9952 20.4605 9.67216 19.4072 8.62716C18.2036 7.43302 16.6414 6.66871 14.9622 6.45162C13.2832 6.23472 11.58 6.5772 10.1138 7.42574C9.17276 7.97039 8.3648 8.70553 7.73315 9.57564H9.625C10.253 9.57564 10.7628 10.0842 10.7632 10.7121C10.7632 11.3403 10.2532 11.8503 9.625 11.8503H5.25C4.62178 11.8503 4.11182 11.3403 4.11182 10.7121V6.33028C4.11182 5.70206 4.62178 5.1921 5.25 5.1921C5.87822 5.1921 6.38818 5.70206 6.38818 6.33028V7.60689C7.11797 6.75479 7.99033 6.02456 8.97388 5.45528Z" fill="white"/>
              </svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 15.8631L7.47909 22.384C7.23511 22.628 6.92459 22.75 6.54753 22.75C6.17047 22.75 5.85995 22.628 5.61597 22.384C5.37199 22.14 5.25 21.8295 5.25 21.4525C5.25 21.0754 5.37199 20.7649 5.61597 20.5209L12.1369 14L5.61597 7.47909C5.37199 7.23511 5.25 6.92459 5.25 6.54753C5.25 6.17047 5.37199 5.85995 5.61597 5.61597C5.85995 5.37199 6.17047 5.25 6.54753 5.25C6.92459 5.25 7.23511 5.37199 7.47909 5.61597L14 12.1369L20.5209 5.61597C20.7649 5.37199 21.0754 5.25 21.4525 5.25C21.8295 5.25 22.14 5.37199 22.384 5.61597C22.628 5.85995 22.75 6.17047 22.75 6.54753C22.75 6.92459 22.628 7.23511 22.384 7.47909L15.8631 14L22.384 20.5209C22.628 20.7649 22.75 21.0754 22.75 21.4525C22.75 21.8295 22.628 22.14 22.384 22.384C22.14 22.628 21.8295 22.75 21.4525 22.75C21.0754 22.75 20.7649 22.628 20.5209 22.384L14 15.8631Z" fill="white"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Capture button or retake button */}
        {!isCaptured ? (
          <button 
            onClick={handleCapture}
            className="absolute bottom-32 right-32 w-32 h-32 rounded-full border-6 border-white bg-transparent flex items-center justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-white"></div>
          </button>
        ) : (
          <button 
            onClick={handleRetake}
            className="absolute bottom-32 right-40 w-28 h-30 px-4 py-4 flex flex-col items-center gap-2 rounded-3xl border-2 border-white bg-transparent"
          >
            <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M38.4739 22.638H22.0919C19.3615 22.638 16.9883 23.487 14.9722 25.1851C12.9561 26.8832 11.9489 29.0059 11.9506 31.553C11.9524 34.1002 12.9604 36.2229 14.9748 37.921C16.9892 39.6191 19.3615 40.4681 22.0919 40.4681H37.9538C38.6906 40.4681 39.3086 40.7127 39.8078 41.2017C40.3071 41.6908 40.5559 42.2953 40.5541 43.0153C40.5524 43.7353 40.3028 44.3407 39.8052 44.8314C39.3077 45.3222 38.6906 45.5659 37.9538 45.5625H22.0919C17.888 45.5625 14.2797 44.2252 11.2668 41.5507C8.25385 38.8762 6.74827 35.5436 6.75 31.553C6.75174 27.5625 8.25819 24.2299 11.2694 21.5554C14.2805 18.8809 17.888 17.5436 22.0919 17.5436H38.4739L33.5333 12.704C33.0566 12.237 32.8182 11.6427 32.8182 10.921C32.8182 10.1993 33.0566 9.60495 33.5333 9.13797C34.01 8.67099 34.6167 8.4375 35.3535 8.4375C36.0903 8.4375 36.697 8.67099 37.1737 9.13797L46.5349 18.3078C46.7949 18.5625 46.9795 18.8384 47.0887 19.1356C47.198 19.4328 47.2517 19.7512 47.25 20.0908C47.2482 20.4304 47.1945 20.7488 47.0887 21.046C46.983 21.3431 46.7984 21.6191 46.5349 21.8738L37.1737 31.0436C36.697 31.5106 36.0903 31.7441 35.3535 31.7441C34.6167 31.7441 34.01 31.5106 33.5333 31.0436C33.0566 30.5766 32.8182 29.9823 32.8182 29.2606C32.8182 28.5389 33.0566 27.9446 33.5333 27.4776L38.4739 22.638Z" fill="white"/>
            </svg>
            <span className="text-white text-lg font-semibold text-center">重新拍摄</span>
          </button>
        )}
      </div>

      {/* Retake Confirmation Modal */}
      {showRetakeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-6 w-96">
            <h3 className="text-[#3D526C] text-2xl font-semibold text-center">重新拍摄</h3>
            
            <div className="w-35 h-35 flex items-center justify-center">
              <svg width="122" height="119" viewBox="0 0 124 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.19826 57.6894C11.0581 57.1543 14.6347 59.7427 15.3594 63.5273C15.3619 63.5405 15.365 63.554 15.3672 63.5673L15.4151 63.8574C15.4163 63.8649 15.4178 63.8733 15.419 63.8808L15.5684 64.8789C17.1689 74.8426 21.9027 84.0526 29.0996 91.166C36.5329 98.5128 46.1814 103.217 56.5576 104.554C66.934 105.89 77.4636 103.784 86.5225 98.5605C90.0829 96.5075 93.3389 94.0171 96.2237 91.166C100.678 86.7631 104.249 81.4975 106.69 75.6484C108.028 72.4457 111.444 70.6321 114.848 71.3115C118.253 71.9914 120.707 74.9781 120.707 78.4492V101.483C120.707 101.5 120.707 101.517 120.706 101.533L120.695 101.891L120.693 101.94C120.55 104.212 119.348 106.295 117.433 107.558C115.39 108.903 112.806 109.136 110.556 108.177L102.798 104.868C100.009 107.215 97.0042 109.325 93.8125 111.165C81.9855 117.984 68.2394 120.734 54.6934 118.989C41.1473 117.245 28.5514 111.102 18.8457 101.51C9.14012 91.917 2.86294 79.4054 0.982441 65.9013C0.427858 61.9176 3.21368 58.2423 7.19826 57.6894ZM78.6602 35.4951H88.1797C89.863 35.4951 91.4777 36.1731 92.668 37.3798C93.858 38.5866 94.5264 40.2232 94.5264 41.9296V80.539C94.5264 82.2455 93.8581 83.8821 92.668 85.0888C91.4777 86.2956 89.863 86.9736 88.1797 86.9736H37.4063C35.723 86.9736 34.1082 86.2956 32.918 85.0888C31.7279 83.8821 31.0596 82.2455 31.0596 80.539V41.9296C31.0596 40.2232 31.7279 38.5866 32.918 37.3798C34.1082 36.1731 35.723 35.4951 37.4063 35.4951H46.9258L53.2725 29.0595H72.3135L78.6602 35.4951ZM62.793 45.1474C58.5848 45.1474 54.5489 46.8424 51.5733 49.8593C48.5978 52.8762 46.9258 56.9679 46.9258 61.2343C46.9258 65.5008 48.5978 69.5924 51.5733 72.6093C54.5489 75.6263 58.5848 77.3212 62.793 77.3212C67.0011 77.3212 71.0371 75.6263 74.0127 72.6093C76.9882 69.5924 78.6601 65.5008 78.6602 61.2343C78.6602 56.9679 76.9881 52.8762 74.0127 49.8593C71.0371 46.8424 67.0011 45.1474 62.793 45.1474ZM62.793 51.582C65.3178 51.582 67.7391 52.599 69.5244 54.4091C71.3098 56.2193 72.3135 58.6744 72.3135 61.2343C72.3135 63.7943 71.3098 66.2494 69.5244 68.0595C67.7391 69.8696 65.3178 70.8867 62.793 70.8867C60.2682 70.8867 57.8469 69.8696 56.0615 68.0595C54.2762 66.2494 53.2725 63.7943 53.2725 61.2343C53.2725 58.6744 54.2762 56.2193 56.0615 54.4091C57.8469 52.599 60.2681 51.582 62.793 51.582ZM29.5752 8.83296C41.4798 2.01529 55.3141 -0.734008 68.9473 1.00972C82.5808 2.75362 95.2605 8.8944 105.031 18.4863C114.802 28.0783 121.123 40.591 123.017 54.0976C123.576 58.0921 120.763 61.7596 116.766 62.3105C112.895 62.8435 109.294 60.2664 108.563 56.4746C108.56 56.4612 108.558 56.447 108.556 56.4336L108.508 56.1445C108.507 56.1369 108.505 56.1287 108.504 56.1211L108.355 55.1386L108.196 54.206C106.448 44.5967 101.754 35.7334 94.7295 28.8378C87.2447 21.4901 77.5278 16.7833 67.0762 15.4462C56.6244 14.1094 46.0188 16.2167 36.8955 21.4414C33.5337 23.3667 30.4417 25.6767 27.6748 28.3076L27.126 28.8378C22.6406 33.2413 19.0457 38.506 16.5879 44.3545C15.2404 47.5606 11.8061 49.3652 8.39162 48.6884C4.97474 48.0108 2.49904 45.0301 2.49904 41.5507V18.4668L2.51076 18.1093L2.51369 18.0595C2.65778 15.7837 3.86947 13.6995 5.79494 12.4394C7.84736 11.0963 10.4405 10.8645 12.7002 11.8212L20.5225 15.1347C23.3323 12.7859 26.3595 10.6746 29.5752 8.83296Z" fill="#A8BDE8"/>
              </svg>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-[#324459] text-lg text-center">是否保留原先的笔记内容？</p>
              <p className="text-[#CB2F2F] text-base text-center">弃用的笔记不可恢复，请谨慎操作！</p>
            </div>
            
            <div className="w-full h-px bg-[#E2E7F0]"></div>
            
            <div className="flex gap-6 w-full">
              <button 
                onClick={handleRetakeConfirm}
                className="flex-1 py-3 px-4 rounded-2xl border border-[#004DA9] text-[#004DA9] text-lg font-semibold text-center"
              >
                确认
              </button>
              <button 
                onClick={handleRetakeCancel}
                className="flex-1 py-3 px-4 rounded-2xl bg-[#004DA9] text-white text-lg font-semibold text-center"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complete Recording Modal */}
      <CompleteRecordingModal
        isOpen={showCompleteModal}
        onClose={handleCompleteModalClose}
        onConfirm={handleCompleteRecording}
        mode="photo"
      />
    </div>
  );
};

export default PhotoCapture;
