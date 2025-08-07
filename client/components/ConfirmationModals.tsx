interface ConfirmationModalProps {
  type: 'save' | 'delete' | 'unsaved';
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  logTime?: string;
}

export default function ConfirmationModals({ type, isOpen, onClose, onConfirm, logTime }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const renderSaveModal = () => (
    <div className="w-[260px] p-8 bg-white rounded-3xl flex flex-col items-center gap-6">
      <h3 className="text-[#3D526C] text-2xl font-semibold text-center">内容已保存</h3>
      
      <div className="w-[120px] h-[120px] flex items-center justify-center">
        <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
          <path d="M48 0C74.5097 1.03082e-06 96 21.4903 96 48C96 74.5097 74.5097 96 48 96C21.4903 96 0 74.5097 0 48C0 21.4903 21.4903 0 48 0ZM76.0732 33.0469C73.8238 30.7975 70.1762 30.7975 67.9268 33.0469L42.2402 58.7334L28.3926 44.8867L28.1777 44.6826C25.9167 42.6399 22.4262 42.7078 20.2471 44.8867C18.068 47.0658 17.9991 50.5573 20.042 52.8184L20.2471 53.0332L35.9043 68.6895C39.4034 72.1886 45.0761 72.1885 48.5752 68.6895L76.0732 41.1934C78.3226 38.944 78.3225 35.2963 76.0732 33.0469Z" fill="#0D802C"/>
        </svg>
      </div>

      <div className="h-px w-full bg-[#E2E7F0]"></div>

      <button
        onClick={onClose}
        className="w-full bg-[#004DA9] text-white py-3 px-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-colors"
      >
        确认
      </button>
    </div>
  );

  const renderDeleteModal = () => (
    <div className="w-[400px] p-8 bg-white rounded-3xl flex flex-col items-center gap-6">
      <h3 className="text-[#3D526C] text-2xl font-semibold text-center">删除条目</h3>
      
      <div className="w-[140px] h-[140px] flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <g clipPath="url(#clip0_2016_99)">
            <path d="M22.3614 120.65C22.3614 126.408 26.6854 131.112 32.0282 131.112H109.295C114.615 131.112 118.961 126.432 118.961 120.65V52.7119H22.3614V120.65ZM94.8057 68.3919H104.473V115.432H94.8057V68.3919ZM65.828 68.3919H75.4948V115.432H65.828V68.3919ZM36.8503 68.3919H46.517V115.432H36.8503V68.3919Z" fill="#FF9899"/>
            <path d="M98.1438 34.2632L125.974 42.0332C128.539 42.7495 130.022 45.4134 129.284 47.9729L127.991 52.604C127.275 55.1696 124.633 56.6584 122.067 55.9421L20.0312 27.4542C17.4656 26.7379 15.9768 24.0957 16.6931 21.5301L17.9861 16.8991C18.7024 14.3335 21.3506 12.8229 23.9101 13.561L51.74 21.3309L54.3321 12.047C55.7647 6.9159 61.0986 3.92865 66.208 5.35516L94.0379 13.1251C99.1473 14.5517 102.162 19.8699 100.73 25.0011L98.1438 34.2632Z" fill="#FF9899"/>
          </g>
          <defs>
            <clipPath id="clip0_2016_99">
              <rect width="140" height="140" fill="white"/>
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-[#324459] text-lg text-center">
          是否删除{logTime}时间点的日志内容？
        </p>
        <p className="text-[#CB2F2F] text-base text-center">
          删除后不可恢复，请谨慎操作！
        </p>
      </div>

      <div className="h-px w-full bg-[#E2E7F0]"></div>

      <div className="flex gap-6 w-full">
        <button
          onClick={onConfirm}
          className="flex-1 border border-[#004DA9] text-[#004DA9] py-3 px-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          确认
        </button>
        <button
          onClick={onClose}
          className="flex-1 bg-[#004DA9] text-white py-3 px-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          取消
        </button>
      </div>
    </div>
  );

  const renderUnsavedModal = () => (
    <div className="w-[400px] p-8 bg-white rounded-3xl flex flex-col items-center gap-6">
      <h3 className="text-[#3D526C] text-2xl font-semibold text-center">内容未保存</h3>
      
      <div className="w-[140px] h-[140px] flex items-center justify-center">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
          <path d="M84.7631 135.1C78.1357 135.1 72.7631 129.727 72.7631 123.1V120.8C72.7631 117.621 74.0247 114.571 76.2708 112.321L107.164 81.3774C108.097 80.4377 109.135 79.759 110.277 79.3413C111.418 78.9236 112.56 78.7148 113.701 78.7148C114.946 78.7148 116.14 78.9508 117.281 79.4228C118.423 79.8947 119.46 80.5985 120.394 81.5341L126.154 87.3292C126.984 88.2689 127.634 89.3131 128.103 90.4617C128.572 91.6103 128.804 92.7588 128.8 93.9074C128.796 95.056 128.588 96.2318 128.177 97.4346C127.766 98.6375 127.092 99.7067 126.154 100.642L95.4282 131.559C93.1757 133.825 90.1122 135.1 86.9167 135.1H84.7631ZM29.1789 53.6548H85.2158V28.5948H29.1789V53.6548ZM113.701 100.016L119.46 93.9074L113.701 88.1123L107.786 94.0641L113.701 100.016ZM60.3105 116.57C60.3105 119.884 57.6242 122.57 54.3105 122.57H22.9526C19.5282 122.57 16.5976 121.344 14.1611 118.892C11.7245 116.441 10.5042 113.49 10.5 110.04V22.3298C10.5 18.8841 11.7204 15.9353 14.1611 13.4836C16.6018 11.0319 19.5323 9.80398 22.9526 9.7998H92.676C95.8715 9.7998 98.935 11.0743 101.188 13.3408L119.085 31.3496C121.32 33.5979 122.574 36.6389 122.574 39.8086V61.6826C122.574 64.7098 119.433 66.789 116.428 66.4229C114.303 66.1639 112.201 66.189 110.121 66.4981C108.041 66.8071 106.018 67.4608 104.05 68.459C102.083 69.4572 100.267 70.7353 98.6023 72.2932L85.2158 85.7629V84.9798C85.2158 79.759 83.3997 75.3213 79.7677 71.6667C76.1357 68.0121 71.7254 66.1848 66.5368 66.1848C61.3482 66.1848 56.9379 68.0121 53.3059 71.6667C49.6739 75.3213 47.8579 79.759 47.8579 84.9798C47.8579 90.2006 49.6739 94.6383 53.3059 98.2929C56.9379 101.948 61.3482 103.775 66.5368 103.775H67.1595L60.3105 110.666V116.57Z" fill="#A8BDE8"/>
        </svg>
      </div>

      <div className="text-center">
        <p className="text-[#324459] text-lg">是否保存已编辑的条目</p>
      </div>

      <div className="h-px w-full bg-[#E2E7F0]"></div>

      <div className="flex gap-6 w-full">
        <button
          onClick={onClose}
          className="flex-1 border border-[#004DA9] text-[#004DA9] py-3 px-4 rounded-2xl text-lg font-semibold hover:bg-blue-50 transition-colors"
        >
          取消
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-[#004DA9] text-white py-3 px-4 rounded-2xl text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          确认
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {type === 'save' && renderSaveModal()}
      {type === 'delete' && renderDeleteModal()}
      {type === 'unsaved' && renderUnsavedModal()}
    </div>
  );
}
