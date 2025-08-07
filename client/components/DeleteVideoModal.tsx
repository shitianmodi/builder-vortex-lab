import React from 'react';

interface DeleteVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isExpired?: boolean;
  expiryDate?: string;
}

const DeleteVideoModal: React.FC<DeleteVideoModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isExpired = false,
  expiryDate = "2025-00-00 12:00"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 flex flex-col items-center gap-6 w-[400px]">
        <h3 className="text-[#3D526C] text-2xl font-semibold text-center">删除本地视频</h3>
        
        <div className="w-35 h-35 flex items-center justify-center">
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2016_2600)">
              <path d="M22.3613 120.65C22.3613 126.408 26.6853 131.112 32.0281 131.112H109.295C114.615 131.112 118.961 126.432 118.961 120.65V52.7119H22.3613V120.65ZM94.8057 68.3919H104.472V115.432H94.8057V68.3919ZM65.8279 68.3919H75.4947V115.432H65.8279V68.3919ZM36.8502 68.3919H46.517V115.432H36.8502V68.3919Z" fill="#FF9899"/>
              <path d="M98.1439 34.2632L125.974 42.0332C128.539 42.7495 130.022 45.4134 129.284 47.9729L127.991 52.604C127.275 55.1696 124.633 56.6584 122.067 55.9421L20.0313 27.4542C17.4657 26.7379 15.9769 24.0957 16.6932 21.5301L17.9861 16.8991C18.7024 14.3335 21.3507 12.8229 23.9102 13.561L51.7401 21.3309L54.3321 12.047C55.7647 6.9159 61.0986 3.92865 66.208 5.35516L94.038 13.1251C99.1474 14.5517 102.162 19.8699 100.73 25.0011L98.1439 34.2632Z" fill="#FF9899"/>
            </g>
            <defs>
              <clipPath id="clip0_2016_2600">
                <rect width="140" height="140" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </div>
        
        <div className="flex flex-col items-center gap-2">
          <p className="text-[#324459] text-lg text-center">是否删除本沙盘的本地视频记录？</p>
          <p className="text-[#CB2F2F] text-base text-center">
            {isExpired 
              ? "云存档已到期，删除后的记录将无法恢复。"
              : `您可在${expiryDate}前重新下载文件。`
            }
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

export default DeleteVideoModal;
