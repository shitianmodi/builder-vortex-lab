import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditWaterEntry from '../components/EditWaterEntry';
import EditVoiceEntry from '../components/EditVoiceEntry';
import EditNoteEntry from '../components/EditNoteEntry';
import ConfirmationModals from '../components/ConfirmationModals';
import ExitCheckModal from '../components/ExitCheckModal';
import GenerateReportModal from '../components/GenerateReportModal';

type FilterType = 'all' | '沙具' | '水' | '语音' | '笔记';

interface LogEntry {
  id: string;
  time: string;
  type: '沙具' | '水' | '语音' | '笔记';
  description: string;
  noteContent?: string;
  noteThumbnails?: string[];
}

export default function LogViewer() {
  const navigate = useNavigate();
  const [activeFilters, setActiveFilters] = useState<FilterType[]>(['沙具', '水', '语音']);
  const [editingLog, setEditingLog] = useState<LogEntry | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);

  const mockLogs: LogEntry[] = [
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
      description: '- 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字\n-  对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字'
    },
    {
      id: '4',
      time: '00:00',
      type: '语音',
      description: '- 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字 对话内容转文字'
    },
    {
      id: '5',
      time: '00:00',
      type: '笔记',
      description: '笔记内容文本，笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本笔记内容文本',
      noteThumbnails: ['thumbnail1', 'thumbnail2']
    }
  ];

  const handleClose = () => {
    // In a real app, check if there are unsaved changes
    const hasUnsavedChanges = false; // This would be determined by checking edit state

    if (hasUnsavedChanges) {
      setShowUnsavedModal(true);
    } else {
      navigate('/video-recording');
    }
  };

  const toggleFilter = (filter: FilterType) => {
    if (filter === 'all') {
      setActiveFilters(['��具', '水', '语���', '笔记']);
      return;
    }

    if (activeFilters.includes(filter)) {
      setActiveFilters(prev => prev.filter(f => f !== filter));
    } else {
      setActiveFilters(prev => [...prev, filter]);
    }
  };

  const filteredLogs = mockLogs.filter(log => activeFilters.includes(log.type));

  const handleEdit = (logId: string) => {
    const logToEdit = mockLogs.find(log => log.id === logId);
    if (logToEdit) {
      setEditingLog(logToEdit);
    }
  };

  const handleDelete = (logId: string) => {
    setShowDeleteModal(logId);
  };

  const handleSaveEdit = (data: any) => {
    console.log('Saving edit:', data);
    setShowSaveModal(true);
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate('/dashboard');
  };

  const handleGenerateReport = () => {
    setShowGenerateReportModal(true);
  };

  const handleGenerateReportConfirm = () => {
    setShowGenerateReportModal(false);
    navigate('/dashboard');
  };

  const handleDownloadLog = () => {
    // Handle log download
    console.log('Downloading log...');
  };

  const handleViewVideo = () => {
    navigate('/video-playback');
  };

  const handleConfirmDelete = () => {
    console.log('Deleting log:', showDeleteModal);
    setShowDeleteModal(null);
  };

  const handleCloseModal = () => {
    setEditingLog(null);
    setShowDeleteModal(null);
    setShowSaveModal(false);
    setShowUnsavedModal(false);
  };

  return (
    <div className="w-full h-screen bg-[#EEF1FA] overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-14 py-14 h-32">
        <div className="flex items-center gap-9">
          {/* Close Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleExit}
              className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#CB2F2F] hover:bg-red-50 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z" fill="#CB2F2F"/>
              </svg>
              <span className="text-[#CB2F2F] text-lg font-semibold">关闭</span>
            </button>
          </div>

          {/* Separator */}
          <div className="w-px h-6 bg-[#B6C2DA]"></div>

          {/* Title */}
          <h1 className="text-[#3D526C] text-2xl font-semibold">查看日志</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleDownloadLog}
            className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9] hover:bg-blue-50 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.52441 16.5967V15.6328C3.52446 15.0944 3.96155 14.6572 4.5 14.6572C5.03845 14.6572 5.47554 15.0944 5.47559 15.6328V16.5967C5.47559 17.1176 5.67561 17.6113 6.02344 17.9707C6.37059 18.3291 6.83533 18.5244 7.3125 18.5244H16.6875L16.8662 18.5156C17.2792 18.4732 17.6729 18.2841 17.9766 17.9707C18.3244 17.6113 18.5244 17.1176 18.5244 16.5967V15.6284C18.5247 15.0902 18.9617 14.6543 19.5 14.6543C20.0383 14.6543 20.4753 15.0902 20.4756 15.6284V16.5967C20.4756 17.6154 20.0837 18.5991 19.377 19.3286C18.6692 20.0591 17.7021 20.4756 16.6875 20.4756H7.3125C6.29786 20.4756 5.33078 20.0591 4.62305 19.3286C3.91633 18.5991 3.52441 17.6154 3.52441 16.5967ZM11.0244 4.5C11.0244 3.96152 11.4615 3.52441 12 3.52441C12.5385 3.52441 12.9756 3.96152 12.9756 4.5V12.7368L14.5811 11.0801C14.9557 10.6933 15.5727 10.6834 15.9595 11.0581C16.3462 11.4328 16.3561 12.0498 15.9814 12.4365L12.7002 15.8232C12.5165 16.0128 12.264 16.1206 12 16.1206C11.736 16.1206 11.4835 16.0128 11.2998 15.8232L8.01855 12.4365L7.89551 12.2812C7.652 11.899 7.7023 11.3858 8.04053 11.0581C8.37898 10.7302 8.89362 10.6967 9.26807 10.9526L9.41895 11.0801L11.0244 12.7368V4.5Z" fill="#004DA9"/>
            </svg>
            <span className="text-[#004DA9] text-lg font-semibold">下载日志</span>
          </button>

          <button
            onClick={handleGenerateReport}
            className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-blue-700 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.1205 13.7083L15.7636 9L14.5977 7.8125L11.1205 11.3542L9.38182 9.58333L8.23636 10.75L11.1205 13.7083ZM3 19.5V17.8333H21V19.5H3ZM5.45455 17C5.00455 17 4.61945 16.8369 4.29927 16.5108C3.97909 16.1847 3.81873 15.7922 3.81818 15.3333V6.16667C3.81818 5.70833 3.97855 5.31611 4.29927 4.99C4.62 4.66389 5.00509 4.50056 5.45455 4.5H18.5455C18.9955 4.5 19.3808 4.66333 19.7015 4.99C20.0223 5.31667 20.1824 5.70889 20.1818 6.16667V15.3333C20.1818 15.7917 20.0217 16.1842 19.7015 16.5108C19.3814 16.8375 18.996 17.0006 18.5455 17H5.45455ZM5.45455 15.3333H18.5455V6.16667H5.45455V15.3333Z" fill="white"/>
            </svg>
            <span className="text-white text-lg font-semibold">生成报告</span>
          </button>
        </div>

        {/* Filter Tags */}
        <div className="flex items-center gap-4">
          <span className="text-[#324459] text-base">显示</span>
          <div className="flex items-center gap-1.5">
            {(['沙具', '水', '语音', '笔记'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={`flex h-9 px-4 py-2 items-center gap-0.5 rounded-2xl transition-colors ${
                  activeFilters.includes(filter)
                    ? 'bg-[#004DA9] text-white'
                    : 'border border-[#004DA9] text-[#004DA9] hover:bg-blue-50'
                }`}
              >
                <span className="text-base">{filter}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6 px-14">
        {/* Main Logs Table */}
        <div className="flex-1 bg-white rounded-3xl p-6">
          {/* Table Header */}
          <div className="flex items-center gap-6 px-5 py-2 rounded-full bg-[#EEF1FA] mb-4">
            <div className="w-20 text-[#7E90B0] text-base font-semibold">时间</div>
            <div className="w-20 text-[#7E90B0] text-base font-semibold">类型</div>
            <div className="w-96 text-[#7E90B0] text-base font-semibold">描述</div>
            <div className="flex-1 text-[#7E90B0] text-base font-semibold text-center">操作</div>
          </div>

          {/* Table Rows */}
          <div className="space-y-0">
            {filteredLogs.map((log, index) => (
              <div key={log.id}>
                <div className="flex items-center gap-6 px-3 py-2">
                  <div className="w-20 text-[#324459] text-base">{log.time}</div>
                  <div className="w-20 text-[#324459] text-base">{log.type}</div>
                  
                  {/* Description Column */}
                  <div className="w-96">
                    {log.type === '笔记' ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-2">
                          {log.noteThumbnails?.map((_, thumbIndex) => (
                            <div
                              key={thumbIndex}
                              className="flex w-16 h-16 justify-center items-center rounded-2xl bg-[#B6C2DA]"
                            >
                              <span className="text-[#3D526C] text-sm leading-3.5 text-center">
                                手写内容<br/>缩略图
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="text-[#909399] text-base leading-7">
                          {log.description}
                        </div>
                      </div>
                    ) : (
                      <div className="text-[#909399] text-base leading-7 whitespace-pre-line">
                        {log.description}
                      </div>
                    )}
                  </div>

                  {/* Actions Column */}
                  <div className="flex-1 flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(log.id)}
                      className="flex w-9 h-9 p-1.5 justify-center items-center rounded-full bg-[#EEF1FA] hover:bg-blue-100 transition-colors"
                    >
                      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                        <path d="M6.0125 21.9375C5.47625 21.9375 5.01735 21.747 4.6358 21.3659C4.25425 20.9848 4.06315 20.5262 4.0625 19.9899V6.35698C4.0625 5.82139 4.2536 5.36307 4.6358 4.98199C5.018 4.60092 5.4769 4.41006 6.0125 4.40941H12.3744C12.6994 4.40941 12.9431 4.51101 13.1056 4.7142C13.2681 4.9174 13.3494 5.1404 13.3494 5.38319C13.3494 5.62599 13.2642 5.84931 13.0939 6.05316C12.9236 6.257 12.6757 6.35827 12.35 6.35698H6.0125V19.9899H19.6625V13.636C19.6625 13.3114 19.7642 13.068 19.9677 12.9057C20.1711 12.7434 20.3944 12.6622 20.6375 12.6622C20.8806 12.6622 21.1042 12.7434 21.3083 12.9057C21.5124 13.068 21.6138 13.3114 21.6125 13.636V19.9899C21.6125 20.5255 21.4217 20.9842 21.0402 21.3659C20.6586 21.7476 20.1994 21.9381 19.6625 21.9375H6.0125ZM9.9125 15.121V12.7596C9.9125 12.4999 9.96125 12.2523 10.0587 12.0166C10.1562 11.7809 10.2944 11.5742 10.4731 11.3963L18.8581 3.02177C19.0531 2.82701 19.2725 2.68095 19.5163 2.58357C19.76 2.48619 20.0038 2.4375 20.2475 2.4375C20.5075 2.4375 20.7555 2.48619 20.9914 2.58357C21.2274 2.68095 21.4425 2.82701 21.6369 3.02177L23.0019 4.40941C23.1806 4.60417 23.3188 4.81937 23.4163 5.05503C23.5138 5.29068 23.5625 5.52991 23.5625 5.77271C23.5625 6.0155 23.518 6.25505 23.4289 6.49136C23.3399 6.72766 23.1975 6.94254 23.0019 7.136L14.6169 15.5105C14.4381 15.6891 14.2311 15.8312 13.9958 15.937C13.7605 16.0429 13.5125 16.0955 13.2519 16.0948H10.8875C10.6112 16.0948 10.3799 16.0013 10.1933 15.8144C10.0068 15.6274 9.91315 15.3963 9.9125 15.121ZM11.8625 14.1472H13.2275L18.8825 8.4993L18.2 7.81765L17.4931 7.136L11.8625 12.7596V14.1472Z" fill="#004DA9"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="flex w-9 h-9 p-1.5 justify-center items-center rounded-full bg-[#F7E0E0] hover:bg-red-200 transition-colors"
                    >
                      <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                        <path d="M7.41406 22.75C6.79961 22.75 6.27379 22.538 5.8366 22.1141C5.3994 21.6901 5.18044 21.1799 5.17969 20.5833V6.5C4.86315 6.5 4.59801 6.396 4.38425 6.188C4.1705 5.98 4.06325 5.72289 4.0625 5.41667C4.06176 5.11044 4.16901 4.85333 4.38425 4.64533C4.5995 4.43733 4.86464 4.33333 5.17969 4.33333H9.64844C9.64844 4.02639 9.75569 3.76928 9.97019 3.562C10.1847 3.35472 10.4498 3.25072 10.7656 3.25H15.2344C15.5509 3.25 15.8164 3.354 16.0309 3.562C16.2454 3.77 16.3523 4.02711 16.3516 4.33333H20.8203C21.1368 4.33333 21.4024 4.43733 21.6169 4.64533C21.8314 4.85333 21.9382 5.11044 21.9375 5.41667C21.9368 5.72289 21.8295 5.98036 21.6157 6.18908C21.402 6.39781 21.1368 6.50144 20.8203 6.5V20.5833C20.8203 21.1792 20.6017 21.6894 20.1645 22.1141C19.7273 22.5387 19.2011 22.7507 18.5859 22.75H7.41406ZM18.5859 6.5H7.41406V20.5833H18.5859V6.5ZM10.7656 18.4167C11.0822 18.4167 11.3477 18.3127 11.5622 18.1047C11.7767 17.8967 11.8836 17.6396 11.8828 17.3333V9.75C11.8828 9.44306 11.7756 9.18594 11.5611 8.97867C11.3466 8.77139 11.0814 8.66739 10.7656 8.66667C10.4498 8.66594 10.1847 8.76994 9.97019 8.97867C9.75569 9.18739 9.64844 9.4445 9.64844 9.75V17.3333C9.64844 17.6403 9.75569 17.8977 9.97019 18.1057C10.1847 18.3137 10.4498 18.4174 10.7656 18.4167ZM15.2344 18.4167C15.5509 18.4167 15.8164 18.3127 16.0309 18.1047C16.2454 17.8967 16.3523 17.6396 16.3516 17.3333V9.75C16.3516 9.44306 16.2443 9.18594 16.0298 8.97867C15.8153 8.77139 15.5502 8.66739 15.2344 8.66667C14.9186 8.66594 14.6534 8.76994 14.4389 8.97867C14.2244 9.18739 14.1172 9.4445 14.1172 9.75V17.3333C14.1172 17.6403 14.2244 17.8977 14.4389 18.1057C14.6534 18.3137 14.9186 18.4174 15.2344 18.4167Z" fill="#CB2F2F"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Divider */}
                {index < filteredLogs.length - 1 && (
                  <div className="h-px bg-[#E2E7F0] mx-3"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Video Feeds */}
        <div className="w-[468px] flex flex-col gap-4">
          {/* Section Header */}
          <div className="flex items-center gap-4">
            <span className="text-[#7E90B0] text-base">实时画面</span>
            <div className="flex-1 h-px bg-[#E2E7F0]"></div>
          </div>

          {/* Video Feed 1 */}
          <div className="w-full aspect-[209/117] rounded-2xl bg-[#EEF1FA] relative overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/bdf479a5316a38d61c815b9ad0816400ef4ee3bd?width=1028"
              alt="Video feed 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Video Feed 2 */}
          <div className="w-full aspect-[209/117] rounded-2xl bg-[#EEF1FA] relative overflow-hidden">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/53df59e60d55144b3c18caf338afa1f915d7b380?width=1028"
              alt="Video feed 2"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Video Playback Controls */}
      <div className="fixed bottom-6 right-[484px] w-[468px] bg-white rounded-3xl p-3 flex items-center gap-4 shadow-lg">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#B6C2DA] text-white px-2 py-1 rounded-xl text-sm flex items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4.33335 13.3337C3.32224 13.3337 2.45846 12.9837 1.74202 12.2837C1.02558 11.5837 0.667131 10.7281 0.666687 9.71699C0.666687 8.85033 0.927798 8.0781 1.45002 7.40033C1.97224 6.72255 2.65558 6.28921 3.50002 6.10033C3.7778 5.0781 4.33335 4.25033 5.16669 3.61699C6.00002 2.98366 6.94447 2.66699 8.00002 2.66699C9.30002 2.66699 10.4029 3.11988 11.3087 4.02566C12.2145 4.93144 12.6671 6.0341 12.6667 7.33366C13.4334 7.42255 14.0696 7.75321 14.5754 8.32566C15.0811 8.8981 15.3338 9.56744 15.3334 10.3337C15.3334 11.167 15.0418 11.8754 14.4587 12.459C13.8756 13.0425 13.1671 13.3341 12.3334 13.3337H4.33335Z" fill="white"/>
                </svg>
                <span>暂存</span>
              </div>
              <span className="text-[#324459] text-base">视频回放</span>
            </div>
            <span className="text-[#909399] text-base">00:35:06/01:03:52</span>
          </div>
          <div className="relative h-2 bg-[#F4F4F5] rounded-full">
            <div className="absolute left-0 top-0 h-2 bg-[#FEC619] rounded-full" style={{ width: '55%' }}></div>
          </div>
        </div>
        <button className="w-11 h-11 bg-[#004DA9] rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M8.43426 13.5625L16.2536 8.58472C16.7171 8.29583 16.9488 7.91944 16.9488 7.45556C16.9488 6.99167 16.7171 6.61528 16.2536 6.32639L8.43426 1.34861C7.94097 1.01528 7.43821 0.988889 6.92597 1.27222C6.41374 1.55556 6.15804 1.99306 6.15903 2.58472V12.3264C6.15903 12.9194 6.41474 13.3569 6.92615 13.6389C7.43757 13.9208 7.94032 13.8944 8.43426 13.5625ZM10 18.75C8.65069 18.75 7.39757 18.4965 6.24063 17.9896C5.08368 17.4826 4.08681 16.7986 3.25 15.9375C2.41319 15.0764 1.72917 14.0795 1.19792 12.9469C0.666667 11.8142 0.401042 10.5639 0.4 9.19583C0.398958 7.82778 0.664583 6.57639 1.19792 5.44167C1.73125 4.30694 2.41458 3.30903 3.24792 2.44792C4.08125 1.58681 5.07812 0.902777 6.23854 0.395833C7.39896 -0.111111 8.65347 -0.364583 10.0021 -0.364583C11.3507 -0.364583 12.6052 -0.111111 13.7656 0.395833C14.9261 0.902777 15.9229 1.58681 16.7562 2.44792C17.5896 3.30903 18.2736 4.30694 18.8083 5.44167C19.3431 6.57639 19.6076 7.82778 19.6021 9.19583C19.5965 10.5639 19.3309 11.8142 18.8052 12.9469C18.2795 14.0795 17.5965 15.0764 16.7562 15.9375C15.9159 16.7986 14.9194 17.4826 13.7667 17.9896C12.6139 18.4965 11.3611 18.75 10 18.75Z" fill="white"/>
          </svg>
        </button>
      </div>

      {/* Edit Modals */}
      {editingLog && editingLog.type === '水' && (
        <EditWaterEntry
          isOpen={true}
          onClose={() => setEditingLog(null)}
          onSave={handleSaveEdit}
          initialData={{
            time: { minutes: 0, seconds: 0 },
            position: '左上'
          }}
        />
      )}

      {editingLog && editingLog.type === '语音' && (
        <EditVoiceEntry
          isOpen={true}
          onClose={() => setEditingLog(null)}
          onSave={handleSaveEdit}
          initialData={{
            startTime: { minutes: 0, seconds: 0 },
            endTime: { minutes: 0, seconds: 0 },
            transcription: editingLog.description
          }}
        />
      )}

      {editingLog && editingLog.type === '笔记' && (
        <EditNoteEntry
          isOpen={true}
          onClose={() => setEditingLog(null)}
          onSave={handleSaveEdit}
          initialData={{
            time: { minutes: 0, seconds: 0 },
            content: editingLog.description,
            thumbnails: editingLog.noteThumbnails || []
          }}
        />
      )}

      {/* Confirmation Modals */}
      <ConfirmationModals
        type="delete"
        isOpen={!!showDeleteModal}
        onClose={() => setShowDeleteModal(null)}
        onConfirm={handleConfirmDelete}
        logTime={mockLogs.find(log => log.id === showDeleteModal)?.time || '00:00'}
      />

      <ConfirmationModals
        type="save"
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
      />

      <ConfirmationModals
        type="unsaved"
        isOpen={showUnsavedModal}
        onClose={() => setShowUnsavedModal(false)}
        onConfirm={() => {
          setShowUnsavedModal(false);
          navigate('/video-recording');
        }}
      />
    </div>
  );
}
