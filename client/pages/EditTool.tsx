import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface EditToolProps {
  tool?: {
    id: string;
    name: string;
    color: string;
    colorName: string;
    category: string;
    subCategory: string;
    image: string;
  };
}

export default function EditTool({ tool }: EditToolProps) {
  const navigate = useNavigate();
  const [toolName, setToolName] = useState(tool?.name || '');
  const [selectedCategory, setSelectedCategory] = useState(tool?.category || '类型名称');
  const [selectedSubCategory, setSelectedSubCategory] = useState(tool?.subCategory || '子类型名称');
  const [selectedColor, setSelectedColor] = useState(tool?.colorName || '红色');
  const [intent, setIntent] = useState('意向说明一段话，意向说明一段话意向说明一段话，意向说明一段话意向说明一段话。意向说明一段话意向说明一段话。意向说明一段话，意向说明一段话意���说明一段话，意向说明一段话意向说明一段话。意向说明一段话意向说明一段话。\n意向说明一段话，意向说明一段话意向说明一段话，意向说明一段话意向说明一段话。意向说明一段话意向说明一段话意向说明一段话，意向说明一段话意向说明一段话，意向说明一段话意向说明一段话。意向说明一段话意向说明一段话。');
  const [selectedImage, setSelectedImage] = useState<number | null>(1); // 1-indexed, null for no selection
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const images = Array.from({ length: 6 }, (_, i) => tool?.image || 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800');

  const handleExit = () => {
    setShowExitModal(true);
  };

  const handleSave = () => {
    setShowSaveModal(true);
    // Simulate save delay
    setTimeout(() => {
      setShowSaveModal(false);
      navigate(-1); // Go back to previous page
    }, 2000);
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate(-1);
  };

  const handleExitCancel = () => {
    setShowExitModal(false);
  };

  const handleImageClick = (index: number) => {
    setSelectedImage(index === selectedImage ? null : index);
  };

  return (
    <div className="w-full h-screen bg-[#EEF1FA]">
      {/* Header */}
      <div className="w-full h-[1px] bg-[#E2E7F0] mt-32" />
      <div className="flex w-full justify-between items-center px-14 py-4">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleExit}
              className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#CB2F2F] hover:bg-red-50 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z" fill="#CB2F2F"/>
              </svg>
              <span className="text-[#CB2F2F] text-lg font-semibold">退出</span>
            </button>
          </div>
          <div className="w-[1px] h-6 bg-[#B6C2DA]" />
          <h1 className="text-[#3D526C] text-2xl font-semibold">编辑沙具</h1>
        </div>
        <button 
          onClick={handleSave}
          className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
            <path d="M12.8271 0.75C13.0716 0.750008 13.3046 0.796049 13.5264 0.887695C13.7482 0.979362 13.9429 1.10929 14.1104 1.27734L16.7227 3.88965C16.8907 4.0577 17.0206 4.25278 17.1123 4.47461C17.2039 4.69639 17.25 4.92908 17.25 5.17285V15.417C17.2499 15.921 17.0706 16.3527 16.7119 16.7119C16.3533 17.0712 15.9216 17.2505 15.417 17.25H2.58301C2.079 17.2499 1.6477 17.0705 1.28906 16.7119C0.930418 16.3533 0.750688 15.9216 0.75 15.417V2.58301C0.750077 2.07898 0.929806 1.64771 1.28906 1.28906C1.64832 0.930418 2.07959 0.750688 2.58301 0.75H12.8271ZM2.58301 2.58301V15.417H4.27441V9C4.27441 8.46152 4.71152 8.02441 5.25 8.02441H12.75C13.2885 8.02441 13.7256 8.46152 13.7256 9V15.417H15.417V5.19629L12.8037 2.58301H2.58301ZM6.22559 15.417H11.7744V9.97559H6.22559V15.417Z" fill="white"/>
          </svg>
          <span className="text-white text-lg font-semibold">保存</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex px-14 pb-14 gap-8">
        {/* Left Form Section */}
        <div className="flex flex-col gap-6 w-[812px]">
          {/* Name Field */}
          <div className="flex w-[456px] items-center gap-6">
            <div className="w-8 text-[#7E90B0] text-base">名称</div>
            <div className="flex w-[400px] h-12 px-4 items-center rounded-2xl bg-white">
              <input
                type="text"
                placeholder="输入沙具名称"
                value={toolName}
                onChange={(e) => setToolName(e.target.value)}
                className="flex-1 text-base bg-transparent outline-none text-[#3D526C]"
              />
            </div>
          </div>

          {/* Category Fields */}
          <div className="flex w-[456px] items-center gap-6">
            <div className="w-8 text-[#7E90B0] text-base">分类</div>
            <div className="flex justify-end items-center gap-2 flex-1">
              <div className="flex h-12 px-4 justify-between items-center flex-1 rounded-2xl bg-white">
                <span className="text-[#3D526C] text-base">{selectedCategory}</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.6007 4.89906C13.2687 4.56711 12.7305 4.56711 12.3986 4.89906L7.99961 9.29802L3.60065 4.89906C3.2687 4.56711 2.73051 4.56711 2.39857 4.89906C2.06662 5.231 2.06662 5.76919 2.39857 6.10114L7.39857 11.1011C7.73051 11.4331 8.2687 11.4331 8.60065 11.1011L13.6007 6.10114C13.9326 5.76919 13.9326 5.231 13.6007 4.89906Z" fill="#3D526C"/>
                </svg>
              </div>
              <div className="flex h-12 px-4 justify-between items-center flex-1 rounded-2xl bg-white">
                <span className="text-[#3D526C] text-base">{selectedSubCategory}</span>
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.6007 4.89906C13.2687 4.56711 12.7305 4.56711 12.3986 4.89906L7.99961 9.29802L3.60065 4.89906C3.2687 4.56711 2.73051 4.56711 2.39857 4.89906C2.06662 5.231 2.06662 5.76919 2.39857 6.10114L7.39857 11.1011C7.73051 11.4331 8.2687 11.4331 8.60065 11.1011L13.6007 6.10114C13.9326 5.76919 13.9326 5.231 13.6007 4.89906Z" fill="#3D526C"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Color Field */}
          <div className="flex w-[456px] items-center gap-6">
            <div className="w-8 text-[#7E90B0] text-base">颜色</div>
            <div className="flex w-[196px] h-12 px-4 justify-between items-center rounded-2xl bg-white">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#F55D5D]" />
                <span className="text-[#3D526C] text-base">{selectedColor}</span>
              </div>
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M13.6007 4.89906C13.2687 4.56711 12.7305 4.56711 12.3986 4.89906L7.99961 9.29802L3.60065 4.89906C3.2687 4.56711 2.73051 4.56711 2.39857 4.89906C2.06662 5.231 2.06662 5.76919 2.39857 6.10114L7.39857 11.1011C7.73051 11.4331 8.2687 11.4331 8.60065 11.1011L13.6007 6.10114C13.9326 5.76919 13.9326 5.231 13.6007 4.89906Z" fill="#3D526C"/>
              </svg>
            </div>
          </div>

          {/* Intent Field */}
          <div className="flex flex-col gap-4 flex-1">
            <div className="text-[#7E90B0] text-base">意向</div>
            <div className="flex p-6 rounded-3xl bg-white flex-1">
              <textarea
                value={intent}
                onChange={(e) => setIntent(e.target.value)}
                className="w-full h-full text-[#606266] text-base leading-8 bg-transparent outline-none resize-none"
                rows={8}
              />
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex flex-col gap-6 w-[468px]">
          {/* Image Grid */}
          <div className="flex flex-col gap-6">
            {/* First Row */}
            <div className="flex items-center gap-6">
              {images.slice(0, 3).map((image, index) => (
                <div 
                  key={index}
                  className={`relative w-[140px] h-[140px] rounded-2xl overflow-hidden cursor-pointer ${
                    selectedImage === index + 1 ? 'ring-2 ring-[#B6C2DA] ring-offset-2' : ''
                  }`}
                  onClick={() => handleImageClick(index + 1)}
                >
                  <img 
                    src={image}
                    alt={`Tool image ${index + 1}`}
                    className="w-full h-full object-cover transform scale-[1.8] translate-x-[-18px] translate-y-[-1px]"
                  />
                  {index === 0 && (
                    <div className="absolute top-0 left-3">
                      <svg className="w-5 h-6 fill-[#004DA9] stroke-white stroke-1" viewBox="0 0 20 26">
                        <path d="M19.5 -0.5V24.7695L18.7969 24.457L10 20.5469L1.20312 24.457L0.5 24.7695V-0.5H19.5Z" fill="#004DA9" stroke="white"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Second Row */}
            <div className="flex items-center gap-6">
              {images.slice(3, 6).map((image, index) => (
                <div 
                  key={index + 3}
                  className={`relative w-[140px] h-[140px] rounded-2xl overflow-hidden cursor-pointer ${
                    selectedImage === index + 4 ? 'ring-2 ring-[#B6C2DA] ring-offset-2' : ''
                  }`}
                  onClick={() => handleImageClick(index + 4)}
                >
                  <img 
                    src={image}
                    alt={`Tool image ${index + 4}`}
                    className="w-full h-full object-cover transform scale-[1.8] translate-x-[-18px] translate-y-[-1px]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <button className="flex justify-center items-center gap-1 text-[#324459] hover:text-[#004DA9] transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M5.00065 16.6667C4.54232 16.6667 4.1501 16.5036 3.82398 16.1775C3.49787 15.8514 3.33454 15.4589 3.33398 15V13.3333C3.33398 13.0972 3.41398 12.8995 3.57398 12.74C3.73398 12.5806 3.93176 12.5006 4.16732 12.5C4.40287 12.4995 4.60093 12.5795 4.76148 12.74C4.92204 12.9006 5.00176 13.0983 5.00065 13.3333V15H15.0007V13.3333C15.0007 13.0972 15.0807 12.8995 15.2407 12.74C15.4007 12.5806 15.5984 12.5006 15.834 12.5C16.0695 12.4995 16.2676 12.5795 16.4281 12.74C16.5887 12.9006 16.6684 13.0983 16.6673 13.3333V15C16.6673 15.4583 16.5043 15.8508 16.1782 16.1775C15.852 16.5042 15.4595 16.6672 15.0007 16.6667H5.00065ZM9.16732 6.54168L7.60482 8.10418C7.43815 8.27085 7.24037 8.35085 7.01148 8.34418C6.7826 8.33751 6.58454 8.25057 6.41732 8.08335C6.26454 7.91668 6.18454 7.72224 6.17732 7.50001C6.1701 7.27779 6.2501 7.08335 6.41732 6.91668L9.41732 3.91668C9.50065 3.83335 9.59093 3.77446 9.68815 3.74001C9.78537 3.70557 9.88954 3.68807 10.0007 3.68751C10.1118 3.68696 10.2159 3.70446 10.3132 3.74001C10.4104 3.77557 10.5007 3.83446 10.584 3.91668L13.584 6.91668C13.7506 7.08335 13.8306 7.27779 13.824 7.50001C13.8173 7.72224 13.7373 7.91668 13.584 8.08335C13.4173 8.25001 13.2195 8.33696 12.9907 8.34418C12.7618 8.3514 12.5637 8.2714 12.3965 8.10418L10.834 6.54168V12.5C10.834 12.7361 10.754 12.9342 10.594 13.0942C10.434 13.2542 10.2362 13.3339 10.0007 13.3333C9.76509 13.3328 9.56732 13.2528 9.40732 13.0933C9.24732 12.9339 9.16732 12.7361 9.16732 12.5V6.54168Z" fill="currentColor"/>
              </svg>
              <span className="text-base underline">上传图片</span>
            </button>

            <div className="flex items-center gap-4">
              <button className="flex justify-center items-center gap-1 text-[#324459] hover:text-[#004DA9] transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path d="M15.8333 4.81445C15.8331 4.45678 15.5432 4.16686 15.1855 4.16667H4.81445C4.45678 4.16686 4.16686 4.45678 4.16667 4.81445V15.1855C4.16686 15.5432 4.45678 15.8331 4.81445 15.8333H15.1855C15.5432 15.8331 15.8331 15.5432 15.8333 15.1855V4.81445ZM17.5 15.1855C17.4998 16.4637 16.4637 17.4998 15.1855 17.5H4.81445C3.5363 17.4998 2.5002 16.4637 2.5 15.1855V4.81445C2.5002 3.5363 3.5363 2.5002 4.81445 2.5H15.1855C16.4637 2.5002 17.4998 3.5363 17.5 4.81445V15.1855Z" fill="currentColor"/>
                  <path d="M5.71484 3.35715C5.71484 2.88376 6.10229 2.5 6.58023 2.5C7.05817 2.5 7.44561 2.88376 7.44561 3.35715V8.69984L9.01976 7.76456L9.12568 7.71211C9.3784 7.60534 9.67024 7.62226 9.90993 7.76456L11.4841 8.69984V3.35715C11.4841 2.88376 11.8715 2.5 12.3495 2.5C12.8274 2.5 13.2148 2.88376 13.2148 3.35715V10.2144C13.2148 10.5232 13.0467 10.8078 12.7754 10.9599C12.5042 11.1119 12.1716 11.1085 11.9044 10.9499L9.46484 9.50007L7.02532 10.9499C6.75809 11.1085 6.42546 11.1119 6.1543 10.9599C5.88299 10.8078 5.71484 10.5232 5.71484 10.2144V3.35715Z" fill="currentColor"/>
                </svg>
                <span className="text-base underline">设为封面</span>
              </button>

              <button className="flex justify-center items-center gap-1 text-[#CB2F2F] hover:text-red-700 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                  <path d="M5.70313 17.5C5.23047 17.5 4.82599 17.3369 4.48969 17.0108C4.15339 16.6847 3.98495 16.2922 3.98438 15.8333V5C3.74089 5 3.53693 4.92 3.3725 4.76C3.20808 4.6 3.12558 4.40222 3.125 4.16667C3.12443 3.93111 3.20693 3.73333 3.3725 3.57333C3.53808 3.41333 3.74203 3.33333 3.98438 3.33333H7.42188C7.42188 3.09722 7.50438 2.89944 7.66938 2.74C7.83438 2.58056 8.03833 2.50056 8.28125 2.5H11.7187C11.9622 2.5 12.1665 2.58 12.3315 2.74C12.4965 2.9 12.5787 3.09778 12.5781 3.33333H16.0156C16.2591 3.33333 16.4634 3.41333 16.6284 3.57333C16.7934 3.73333 16.8756 3.93111 16.875 4.16667C16.8744 4.40222 16.7919 4.60028 16.6275 4.76083C16.4631 4.92139 16.2591 5.00111 16.0156 5V15.8333C16.0156 16.2917 15.8475 16.6842 15.5112 17.0108C15.1749 17.3375 14.7701 17.5006 14.2969 17.5H5.70313ZM14.2969 5H5.70313V15.8333H14.2969V5ZM8.28125 14.1667C8.52474 14.1667 8.72898 14.0867 8.89398 13.9267C9.05898 13.7667 9.1412 13.5689 9.14062 13.3333V7.5C9.14062 7.26389 9.05813 7.06611 8.89313 6.90667C8.72813 6.74722 8.52417 6.66722 8.28125 6.66667C8.03833 6.66611 7.83438 6.74611 7.66938 6.90667C7.50438 7.06722 7.42188 7.265 7.42188 7.5V13.3333C7.42188 13.5694 7.50438 13.7675 7.66938 13.9275C7.83438 14.0875 8.03833 14.1672 8.28125 14.1667ZM11.7187 14.1667C11.9622 14.1667 12.1665 14.0867 12.3315 13.9267C12.4965 13.7667 12.5787 13.5689 12.5781 13.3333V7.5C12.5781 7.26389 12.4956 7.06611 12.3306 6.90667C12.1656 6.74722 11.9617 6.66722 11.7187 6.66667C11.4758 6.66611 11.2719 6.74611 11.1069 6.90667C10.9419 7.06722 10.8594 7.265 10.8594 7.5V13.3333C10.8594 13.5694 10.9419 13.7675 11.1069 13.9275C11.2719 14.0875 11.4758 14.1672 11.7187 14.1667Z" fill="currentColor"/>
                </svg>
                <span className="text-base underline">删除图片</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[400px] bg-white rounded-3xl p-8 flex flex-col items-center gap-6">
            <h2 className="text-[#3D526C] text-2xl font-semibold text-center">内容未保存</h2>
            
            <svg className="w-[140px] h-[140px]" viewBox="0 0 140 140" fill="none">
              <path d="M84.7631 135.1C78.1357 135.1 72.7631 129.727 72.7631 123.1V120.8C72.7631 117.621 74.0247 114.571 76.2708 112.321L107.164 81.3774C108.097 80.4377 109.135 79.759 110.277 79.3413C111.418 78.9236 112.56 78.7148 113.701 78.7148C114.946 78.7148 116.14 78.9508 117.281 79.4228C118.423 79.8947 119.46 80.5985 120.394 81.5341L126.154 87.3292C126.984 88.2689 127.634 89.3131 128.103 90.4617C128.572 91.6103 128.804 92.7588 128.8 93.9074C128.796 95.056 128.588 96.2318 128.177 97.4346C127.766 98.6375 127.092 99.7067 126.154 100.642L95.4282 131.559C93.1757 133.825 90.1122 135.1 86.9167 135.1H84.7631ZM29.1789 53.6548H85.2158V28.5948H29.1789V53.6548ZM113.701 100.016L119.46 93.9074L113.701 88.1123L107.786 94.0641L113.701 100.016ZM60.3105 116.57C60.3105 119.884 57.6242 122.57 54.3105 122.57H22.9526C19.5282 122.57 16.5976 121.344 14.1611 118.892C11.7245 116.441 10.5042 113.49 10.5 110.04V22.3298C10.5 18.8841 11.7204 15.9353 14.1611 13.4836C16.6018 11.0319 19.5323 9.80398 22.9526 9.7998H92.676C95.8715 9.7998 98.935 11.0743 101.188 13.3408L119.085 31.3496C121.32 33.5979 122.574 36.6389 122.574 39.8086V61.6826C122.574 64.7098 119.433 66.789 116.428 66.4229C114.303 66.1639 112.201 66.189 110.121 66.4981C108.041 66.8071 106.018 67.4608 104.05 68.459C102.083 69.4572 100.267 70.7353 98.6023 72.2932L85.2158 85.7629V84.9798C85.2158 79.759 83.3997 75.3213 79.7677 71.6667C76.1357 68.0121 71.7254 66.1848 66.5368 66.1848C61.3482 66.1848 56.9379 68.0121 53.3059 71.6667C49.6739 75.3213 47.8579 79.759 47.8579 84.9798C47.8579 90.2006 49.6739 94.6383 53.3059 98.2929C56.9379 101.948 61.3482 103.775 66.5368 103.775H67.1595L60.3105 110.666V116.57Z" fill="#A8BDE8"/>
            </svg>

            <p className="text-[#324459] text-lg text-center">是否保存已编辑的条目</p>
            
            <div className="w-full h-[1px] bg-[#E2E7F0]" />
            
            <div className="flex justify-center items-center gap-6 w-full">
              <button 
                onClick={handleExitCancel}
                className="flex-1 flex px-4 py-3 justify-center items-center rounded-2xl border border-[#004DA9] hover:bg-[#f0f4ff] transition-colors"
              >
                <span className="text-[#004DA9] text-lg font-semibold">取消</span>
              </button>
              <button 
                onClick={handleExitConfirm}
                className="flex-1 flex px-4 py-3 justify-center items-center rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors"
              >
                <span className="text-white text-lg font-semibold">确认</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-[260px] bg-white rounded-3xl p-8 flex flex-col items-center gap-6">
            <h2 className="text-[#3D526C] text-2xl font-semibold text-center">内容已保存</h2>
            
            <div className="w-[120px] h-[120px] flex items-center justify-center">
              <svg className="w-24 h-24" viewBox="0 0 96 96" fill="none">
                <path d="M48 0C74.5097 1.03082e-06 96 21.4903 96 48C96 74.5097 74.5097 96 48 96C21.4903 96 0 74.5097 0 48C0 21.4903 21.4903 0 48 0ZM76.0732 33.0469C73.8238 30.7975 70.1762 30.7975 67.9268 33.0469L42.2402 58.7334L28.3926 44.8867L28.1777 44.6826C25.9167 42.6399 22.4262 42.7078 20.2471 44.8867C18.068 47.0658 17.9991 50.5573 20.042 52.8184L20.2471 53.0332L35.9043 68.6895C39.4034 72.1886 45.0761 72.1885 48.5752 68.6895L76.0732 41.1934C78.3226 38.944 78.3225 35.2963 76.0732 33.0469Z" fill="#0D802C"/>
              </svg>
            </div>
            
            <div className="w-full h-[1px] bg-[#E2E7F0]" />
            
            <button 
              onClick={() => setShowSaveModal(false)}
              className="w-full flex px-4 py-3 justify-center items-center rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors"
            >
              <span className="text-white text-lg font-semibold">确认</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
