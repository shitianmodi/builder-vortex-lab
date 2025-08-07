import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface HistoryRecord {
  id: string;
  clientName: string;
  type: 'video' | 'photo';
  status: 'pending' | 'generating' | 'completed';
  date: string;
  time: string;
  tags?: string[];
  hasLog: boolean;
  hasReport: boolean;
  reportStatus?: 'not_generated' | 'generating' | 'completed';
}

const mockData: HistoryRecord[] = [
  {
    id: '1',
    clientName: '来访者',
    type: 'video',
    status: 'pending',
    date: '2000-00-00',
    time: '12:00',
    tags: ['待检查'],
    hasLog: true,
    hasReport: false,
    reportStatus: 'not_generated'
  },
  {
    id: '2',
    clientName: '来访者',
    type: 'photo',
    status: 'completed',
    date: '2000-00-00',
    time: '12:00',
    tags: ['新报告'],
    hasLog: true,
    hasReport: true,
    reportStatus: 'completed'
  },
  {
    id: '3',
    clientName: '来访者',
    type: 'photo',
    status: 'completed',
    date: '2000-00-00',
    time: '12:00',
    hasLog: true,
    hasReport: true,
    reportStatus: 'completed'
  },
  {
    id: '4',
    clientName: '来访者',
    type: 'photo',
    status: 'completed',
    date: '2000-00-00',
    time: '12:00',
    hasLog: true,
    hasReport: true,
    reportStatus: 'completed'
  },
  {
    id: '5',
    clientName: '来访者',
    type: 'video',
    status: 'completed',
    date: '2000-00-00',
    time: '12:00',
    hasLog: true,
    hasReport: true,
    reportStatus: 'completed'
  },
  {
    id: '6',
    clientName: '来访者',
    type: 'video',
    status: 'completed',
    date: '2000-00-00',
    time: '12:00',
    hasLog: true,
    hasReport: true,
    reportStatus: 'completed'
  },
  {
    id: '7',
    clientName: '来访者',
    type: 'video',
    status: 'generating',
    date: '2000-00-00',
    time: '12:00',
    tags: ['生成中'],
    hasLog: true,
    hasReport: false,
    reportStatus: 'generating'
  },
  {
    id: '8',
    clientName: '来访者',
    type: 'video',
    status: 'completed',
    date: '2000-00-00',
    time: '12:00',
    tags: ['新报告'],
    hasLog: true,
    hasReport: true,
    reportStatus: 'completed'
  }
];

export default function DataCenter() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<'video' | 'photo' | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'generating' | 'completed' | 'all'>('all');
  const [selectedTime, setSelectedTime] = useState('2025��7月');
  const [sortBy, setSortBy] = useState('时间最近');
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const timeDropdownRef = useRef<HTMLDivElement>(null);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const formatOptions = [
    { key: 'all', label: '全部' },
    { key: 'video', label: '录像' },
    { key: 'photo', label: '拍照' }
  ];

  const statusOptions = [
    { key: 'all', label: '全部' },
    { key: 'pending', label: '未生成' },
    { key: 'generating', label: '生成中' },
    { key: 'completed', label: '已完成' }
  ];

  const timeOptions = [
    '2025年7月',
    '2025年6月',
    '2025年5月',
    '2025年4月'
  ];

  const sortOptions = [
    '时间最近',
    '时间最远',
    '姓名A-Z',
    '姓名Z-A'
  ];

  const alphabetLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  const handleRecordSelect = (recordId: string) => {
    setSelectedRecords(prev =>
      prev.includes(recordId)
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  const handleSelectAll = () => {
    if (selectedRecords.length === filteredData.length) {
      setSelectedRecords([]);
    } else {
      setSelectedRecords(filteredData.map(record => record.id));
    }
  };

  const handleCancelSelection = () => {
    setSelectedRecords([]);
  };

  // Filter the data based on selected filters
  const filteredData = mockData.filter(record => {
    // Format filter
    if (selectedFormat !== 'all' && record.type !== selectedFormat) {
      return false;
    }

    // Status filter
    if (selectedStatus !== 'all' && record.status !== selectedStatus) {
      return false;
    }

    // Search filter
    if (searchQuery && !record.clientName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  const renderTag = (tag: string) => {
    const tagStyles = {
      '待检查': 'bg-[#F7E0E0] text-[#CB2F2F]',
      '新报告': 'border border-[#CB2F2F] text-[#CB2F2F]',
      '生成中': 'bg-[#A8BDE8] text-white'
    };

    return (
      <div className={`flex px-3 py-1 justify-center items-center rounded-xl text-sm font-normal ${tagStyles[tag as keyof typeof tagStyles]}`}>
        {tag}
      </div>
    );
  };

  const renderThumbnail = (type: 'video' | 'photo') => {
    const imageUrl = type === 'video'
      ? "https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F6a13877e87804742ae027ea9d3d6fa5f?format=webp&width=800"
      : "https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2Fe72803d614184e0eb73c0ad4be906450?format=webp&width=800";

    return (
      <div className="w-[185px] h-[104px] rounded-lg overflow-hidden relative flex-shrink-0">
        <img
          src={imageUrl}
          alt="预览图"
          className="w-full h-full object-cover"
        />
        {type === 'video' && (
          <div className="absolute top-2 left-2 w-5 h-4 bg-black bg-opacity-50 rounded-sm"></div>
        )}
        {type === 'photo' && (
          <svg className="absolute top-2 left-2 w-5 h-4" viewBox="0 0 20 16" fill="none">
            <path d="M0 2C0 0.9 0.9 0 2 0H18C18.5304 0 19.0391 0.210714 19.4142 0.585786C19.7893 0.960859 20 1.46957 20 2V14C20 14.5304 19.7893 15.0391 19.4142 15.4142C19.0391 15.7893 18.5304 16 18 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V2ZM11 11L8 8L2 14H18L13 9L11 11ZM15 7C15.5304 7 16.0391 6.78929 16.4142 6.41421C16.7893 6.03914 17 5.53043 17 5C17 4.46957 16.7893 3.96086 16.4142 3.58579C16.0391 3.21071 15.5304 3 15 3C14.4696 3 13.9609 3.21071 13.5858 3.58579C13.2107 3.96086 13 4.46957 13 5C13 5.53043 13.2107 6.03914 13.5858 6.41421C13.9609 6.78929 14.4696 7 15 7Z" fill="black" fillOpacity="0.5"/>
          </svg>
        )}
      </div>
    );
  };

  const renderHistoryCard = (record: HistoryRecord) => {
    const isSelected = selectedRecords.includes(record.id);

    return (
      <div key={record.id} className="flex w-full max-w-[544px] p-6 flex-col justify-center items-start gap-4 rounded-3xl bg-white">
        <div className="flex w-full h-[22px] flex-col items-start gap-3">
          <div className="flex justify-between items-center self-stretch">
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded cursor-pointer flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#004DA9] border border-[#004DA9]'
                    : 'border border-[#004DA9]'
                }`}
                onClick={() => handleRecordSelect(record.id)}
              >
                {isSelected && (
                  <svg className="w-3 h-3" viewBox="0 0 12 9" fill="none">
                    <path d="M1.06079 4.22L3.73746 6.71667L10.9375 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              {record.tags?.map((tag, index) => (
                <React.Fragment key={index}>
                  {renderTag(tag)}
                </React.Fragment>
              ))}
              <div className="text-[#303133] text-base font-semibold">{record.clientName}</div>
            </div>
            <div className="flex justify-end items-center gap-4">
              <div className="text-[#909399] text-sm font-normal">
                {record.type === 'video' ? '录像识别' : '拍照识别'}
              </div>
              <div className="text-[#909399] text-sm font-normal">
                {record.date} {record.time}
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-4">
          {renderThumbnail(record.type)}
          
          <div className="flex h-[104px] flex-col items-start gap-3 flex-1">
            <div className="flex w-full h-[46px] px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#E2E7F0]">
              <div className="flex items-center gap-1 flex-1">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M6.77778 12.375C6.60463 12.375 6.45959 12.315 6.34267 12.195C6.22574 12.075 6.16707 11.9267 6.16667 11.75C6.16626 11.5733 6.22493 11.425 6.34267 11.305C6.46041 11.185 6.60544 11.125 6.77778 11.125H12.8889C13.062 11.125 13.2073 11.185 13.3246 11.305C13.4419 11.425 13.5004 11.5733 13.5 11.75C13.4996 11.9267 13.4409 12.0752 13.324 12.1956C13.2071 12.316 13.062 12.3758 12.8889 12.375H6.77778ZM6.77778 8.62499C6.60463 8.62499 6.45959 8.56499 6.34267 8.44499C6.22574 8.32499 6.16707 8.17666 6.16667 7.99999C6.16626 7.82333 6.22493 7.67499 6.34267 7.55499C6.46041 7.43499 6.60544 7.37499 6.77778 7.37499H12.8889C13.062 7.37499 13.2073 7.43499 13.3246 7.55499C13.4419 7.67499 13.5004 7.82333 13.5 7.99999C13.4996 8.17666 13.4409 8.3252 13.324 8.44562C13.2071 8.56603 13.062 8.62583 12.8889 8.62499H6.77778ZM6.77778 4.875C6.60463 4.875 6.45959 4.815 6.34267 4.695C6.22574 4.575 6.16707 4.42667 6.16667 4.25C6.16626 4.07334 6.22493 3.925 6.34267 3.805C6.46041 3.685 6.60544 3.625 6.77778 3.625H12.8889C13.062 3.625 13.2073 3.685 13.3246 3.805C13.4419 3.925 13.5004 4.07334 13.5 4.25C13.4996 4.42667 13.4409 4.57521 13.324 4.69563C13.2071 4.81604 13.062 4.87583 12.8889 4.875H6.77778ZM3.72222 13C3.38611 13 3.09848 12.8777 2.85933 12.6331C2.62019 12.3885 2.50041 12.0942 2.5 11.75C2.49959 11.4058 2.61937 11.1117 2.85933 10.8675C3.0993 10.6233 3.38693 10.5008 3.72222 10.5C4.05752 10.4992 4.34535 10.6217 4.58572 10.8675C4.82609 11.1133 4.94567 11.4075 4.94444 11.75C4.94322 12.0925 4.82365 12.3869 4.58572 12.6331C4.3478 12.8794 4.05996 13.0017 3.72222 13ZM3.72222 9.24999C3.38611 9.24999 3.09848 9.1277 2.85933 8.88312C2.62019 8.63853 2.50041 8.34416 2.5 7.99999C2.49959 7.65583 2.61937 7.36166 2.85933 7.1175C3.0993 6.87333 3.38693 6.75083 3.72222 6.75C4.05752 6.74916 4.34535 6.87166 4.58572 7.1175C4.82609 7.36333 4.94567 7.65749 4.94444 7.99999C4.94322 8.34249 4.82365 8.63687 4.58572 8.88312C4.3478 9.12937 4.05996 9.25166 3.72222 9.24999ZM3.72222 5.5C3.38611 5.5 3.09848 5.37771 2.85933 5.13312C2.62019 4.88854 2.50041 4.59417 2.5 4.25C2.49959 3.90584 2.61937 3.61167 2.85933 3.3675C3.0993 3.12334 3.38693 3.00084 3.72222 3C4.05752 2.99917 4.34535 3.12167 4.58572 3.3675C4.82609 3.61334 4.94567 3.9075 4.94444 4.25C4.94322 4.5925 4.82365 4.88688 4.58572 5.13312C4.3478 5.37937 4.05996 5.50167 3.72222 5.5Z" fill="#606266"/>
                </svg>
                <div className="text-[#606266] text-sm font-normal">沙盘日志</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex w-[30px] h-[30px] p-1 justify-center items-center rounded-[18px] bg-[#EEF1FA]">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none">
                    <path d="M3.34863 15.15V14.2798C3.34868 13.7937 3.74327 13.3991 4.22937 13.3991C4.71547 13.3991 5.11006 13.7937 5.11011 14.2798V15.15C5.11011 15.6203 5.29069 16.066 5.6047 16.3904C5.9181 16.7139 6.33766 16.8903 6.76843 16.8903H15.232L15.3933 16.8824C15.7662 16.8441 16.1216 16.6734 16.3957 16.3904C16.7097 16.066 16.8903 15.6203 16.8903 15.15V14.2759C16.8906 13.79 17.2851 13.3964 17.771 13.3964C18.257 13.3964 18.6515 13.79 18.6518 14.2759V15.15C18.6518 16.0697 18.298 16.9577 17.66 17.6163C17.021 18.2758 16.148 18.6518 15.232 18.6518H6.76843C5.85243 18.6518 4.97938 18.2758 4.34045 17.6163C3.70245 16.9577 3.34863 16.0697 3.34863 15.15ZM10.1195 4.22937C10.1195 3.74324 10.5141 3.34863 11.0002 3.34863C11.4863 3.34863 11.8809 3.74324 11.8809 4.22937V11.6654L13.3303 10.1697C13.6686 9.82056 14.2256 9.81164 14.5747 10.1499C14.9238 10.4881 14.9328 11.0452 14.5946 11.3943L11.6323 14.4517C11.4665 14.6229 11.2385 14.7202 11.0002 14.7202C10.7619 14.7202 10.5339 14.6229 10.3681 14.4517L7.40584 11.3943L7.29476 11.2541C7.07492 10.909 7.12034 10.4457 7.42568 10.1499C7.73123 9.85388 8.19583 9.8236 8.53387 10.0547L8.67008 10.1697L10.1195 11.6654V4.22937Z" fill="#004DA9"/>
                  </svg>
                </div>
                <div className="flex w-[30px] h-[30px] p-1 justify-center items-center rounded-[18px] bg-[#004DA9]">
                  <svg className="w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.5464 3.85314C10.1586 4.25432 10.1586 4.90477 10.5464 5.30596L15.0577 9.97286H4.54546C3.99701 9.97286 3.55241 10.4328 3.55241 11.0002C3.55241 11.5675 3.99701 12.0275 4.54546 12.0275H15.0577L10.5464 16.6944C10.1586 17.0956 10.1586 17.746 10.5464 18.1472C10.9342 18.5484 11.563 18.5484 11.9508 18.1472L18.1574 11.7266C18.5452 11.3254 18.5452 10.6749 18.1574 10.2738L11.9508 3.85314C11.563 3.45195 10.9342 3.45195 10.5464 3.85314Z" fill="white"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex w-full h-[46px] px-4 py-2 justify-between items-center rounded-2xl border border-[#E2E7F0]">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M6.125 8C5.94792 8 5.79958 7.9424 5.68 7.8272C5.56042 7.712 5.50042 7.5696 5.5 7.4C5.49958 7.2304 5.55958 7.088 5.68 6.9728C5.80042 6.8576 5.94875 6.8 6.125 6.8H9.875C10.0521 6.8 10.2006 6.8576 10.3206 6.9728C10.4406 7.088 10.5004 7.2304 10.5 7.4C10.4996 7.5696 10.4396 7.7122 10.32 7.8278C10.2004 7.9434 10.0521 8.0008 9.875 8H6.125ZM6.125 5.6C5.94792 5.6 5.79958 5.5424 5.68 5.4272C5.56042 5.312 5.50042 5.1696 5.5 5C5.49958 4.8304 5.55958 4.688 5.68 4.5728C5.80042 4.4576 5.94875 4.4 6.125 4.4H9.875C10.0521 4.4 10.2006 4.4576 10.3206 4.5728C10.4406 4.688 10.5004 4.8304 10.5 5C10.4996 5.1696 10.4396 5.3122 10.32 5.4278C10.2004 5.5434 10.0521 5.6008 9.875 5.6H6.125ZM4.25 9.2H8.9375C9.23958 9.2 9.52083 9.2626 9.78125 9.3878C10.0417 9.513 10.2604 9.6904 10.4375 9.92L11.75 11.57V3.2H4.25V9.2ZM4.25 12.8H11.1562L9.45312 10.655C9.39062 10.575 9.31521 10.5126 9.22687 10.4678C9.13854 10.423 9.04208 10.4004 8.9375 10.4H4.25V12.8ZM11.75 14H4.25C3.90625 14 3.61208 13.8826 3.3675 13.6478C3.12292 13.413 3.00042 13.1304 3 12.8V3.2C3 2.87 3.1225 2.5876 3.3675 2.3528C3.6125 2.118 3.90667 2.0004 4.25 2H11.75C12.0937 2 12.3881 2.1176 12.6331 2.3528C12.8781 2.588 13.0004 2.8704 13 3.2V12.8C13 13.13 12.8777 13.4126 12.6331 13.6478C12.3885 13.883 12.0942 14.0004 11.75 14Z" fill="#606266"/>
                </svg>
                <div className="text-[#606266] text-sm font-normal">评估报告</div>
              </div>
              <div className="flex items-center gap-2">
                {record.reportStatus === 'not_generated' && (
                  <div className="text-[#909399] text-sm font-normal">未生成</div>
                )}
                {record.reportStatus === 'generating' && (
                  <div className="text-[#909399] text-sm font-normal">生成中</div>
                )}
                {record.reportStatus === 'completed' && (
                  <>
                    <div className="flex w-[30px] h-[30px] p-1 justify-center items-center rounded-[18px] bg-[#EEF1FA]">
                      <svg className="w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none">
                        <path d="M3.34863 15.15V14.2798C3.34868 13.7937 3.74327 13.3991 4.22937 13.3991C4.71547 13.3991 5.11006 13.7937 5.11011 14.2798V15.15C5.11011 15.6203 5.29069 16.066 5.6047 16.3904C5.9181 16.7139 6.33766 16.8903 6.76843 16.8903H15.232L15.3933 16.8824C15.7662 16.8441 16.1216 16.6734 16.3957 16.3904C16.7097 16.066 16.8903 15.6203 16.8903 15.15V14.2759C16.8906 13.79 17.2851 13.3964 17.771 13.3964C18.257 13.3964 18.6515 13.79 18.6518 14.2759V15.15C18.6518 16.0697 18.298 16.9577 17.66 17.6163C17.021 18.2758 16.148 18.6518 15.232 18.6518H6.76843C5.85243 18.6518 4.97938 18.2758 4.34045 17.6163C3.70245 16.9577 3.34863 16.0697 3.34863 15.15ZM10.1195 4.22937C10.1195 3.74324 10.5141 3.34863 11.0002 3.34863C11.4863 3.34863 11.8809 3.74324 11.8809 4.22937V11.6654L13.3303 10.1697C13.6686 9.82056 14.2256 9.81164 14.5747 10.1499C14.9238 10.4881 14.9328 11.0452 14.5946 11.3943L11.6323 14.4517C11.4665 14.6229 11.2385 14.7202 11.0002 14.7202C10.7619 14.7202 10.5339 14.6229 10.3681 14.4517L7.40584 11.3943L7.29476 11.2541C7.07492 10.909 7.12034 10.4457 7.42568 10.1499C7.73123 9.85388 8.19583 9.8236 8.53387 10.0547L8.67008 10.1697L10.1195 11.6654V4.22937Z" fill="#004DA9"/>
                      </svg>
                    </div>
                    <div className="flex w-[30px] h-[30px] p-1 justify-center items-center rounded-[18px] bg-[#004DA9]">
                      <svg className="w-[22px] h-[22px]" viewBox="0 0 22 22" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10.5464 3.85314C10.1586 4.25432 10.1586 4.90477 10.5464 5.30596L15.0577 9.97286H4.54546C3.99701 9.97286 3.55241 10.4328 3.55241 11.0002C3.55241 11.5675 3.99701 12.0275 4.54546 12.0275H15.0577L10.5464 16.6944C10.1586 17.0956 10.1586 17.746 10.5464 18.1472C10.9342 18.5484 11.563 18.5484 11.9508 18.1472L18.1574 11.7266C18.5452 11.3254 18.5452 10.6749 18.1574 10.2738L11.9508 3.85314C11.563 3.45195 10.9342 3.45195 10.5464 3.85314Z" fill="white"/>
                      </svg>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen bg-[#EEF1FA] flex">
      {/* Navigation Sidebar */}
      <div className="flex w-[116px] h-full p-4 flex-col justify-between items-center bg-[#004DA9] rounded-3xl ml-14 my-14">
        <div className="flex flex-col items-start gap-4 self-stretch">
          <div 
            className="flex w-[84px] h-[84px] p-2 flex-col justify-center items-center gap-1 rounded-2xl cursor-pointer hover:bg-[#A8BDE8] hover:bg-opacity-20"
            onClick={() => navigate('/')}
          >
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M12 38H18V28C18 27.4333 18.192 26.9587 18.576 26.576C18.96 26.1933 19.4347 26.0013 20 26H28C28.5667 26 29.042 26.192 29.426 26.576C29.81 26.96 30.0013 27.4347 30 28V38H36V20L24 11L12 20V38ZM8 38V20C8 19.3667 8.142 18.7667 8.426 18.2C8.71 17.6333 9.10133 17.1667 9.6 16.8L21.6 7.8C22.3 7.26667 23.1 7 24 7C24.9 7 25.7 7.26667 26.4 7.8L38.4 16.8C38.9 17.1667 39.292 17.6333 39.576 18.2C39.86 18.7667 40.0013 19.3667 40 20V38C40 39.1 39.608 40.042 38.824 40.826C38.04 41.61 37.0987 42.0013 36 42H28C27.4333 42 26.9587 41.808 26.576 41.424C26.1933 41.04 26.0013 40.5653 26 40V30H22V40C22 40.5667 21.808 41.042 21.424 41.426C21.04 41.81 20.5653 42.0013 20 42H12C10.9 42 9.95867 41.6087 9.176 40.826C8.39333 40.0433 8.00133 39.1013 8 38Z" fill="#A8BDE8"/>
            </svg>
            <div className="self-stretch text-[#A8BDE8] text-center text-sm font-normal">主页</div>
          </div>

          <div className="flex w-[84px] h-[84px] p-2 flex-col justify-center items-center gap-1 rounded-2xl bg-[#024089]">
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M39 34.4444V15.5556C39 11.4604 32.1319 8 24 8C15.8681 8 9 11.4604 9 15.5556V34.4444C9 38.5396 15.8681 42 24 42C32.1319 42 39 38.5396 39 34.4444ZM24 11.7778C30.9206 11.7778 35.1206 14.6243 35.25 15.5442C35.1206 16.4868 30.9206 19.3333 24 19.3333C17.0794 19.3333 12.8794 16.4868 12.75 15.5669C12.8794 14.6243 17.0794 11.7778 24 11.7778ZM12.75 20.4799C15.5231 22.0798 19.5694 23.1111 24 23.1111C28.4306 23.1111 32.4769 22.0798 35.25 20.4799V24.9887C35.1206 25.9312 30.9206 28.7778 24 28.7778C17.0794 28.7778 12.8794 25.9312 12.75 25V20.4799ZM12.75 34.4444V29.9243C15.5231 31.5242 19.5694 32.5556 24 32.5556C28.4306 32.5556 32.4769 31.5242 35.25 29.9243V34.4331C35.1206 35.3757 30.9206 38.2222 24 38.2222C17.0794 38.2222 12.8794 35.3757 12.75 34.4444Z" fill="white"/>
            </svg>
            <div className="self-stretch text-white text-center text-sm font-normal">数据中心</div>
          </div>

          <div className="flex w-[84px] h-[84px] p-2 flex-col justify-center items-center gap-1 rounded-2xl cursor-pointer hover:bg-[#A8BDE8] hover:bg-opacity-20">
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M24 43H23.2727C22.7204 43 22.2727 42.5523 22.2727 42V31.6518C20.4245 33.3273 17.9545 34.3636 15.3636 34.3636C9.75 34.3636 5 29.6136 5 24V23.2727C5 22.7204 5.44772 22.2727 6 22.2727H16.3482C14.6727 20.4245 13.6364 17.9545 13.6364 15.3636C13.6364 9.75 18.3864 5 24 5H24.7273C25.2796 5 25.7273 5.44772 25.7273 6V16.3482C27.5755 14.6727 30.0455 13.6364 32.6364 13.6364C38.25 13.6364 43 18.3864 43 24V24.7273C43 25.2796 42.5523 25.7273 42 25.7273H31.6518C33.3273 27.5755 34.3636 30.0455 34.3636 32.6364C34.3636 38.25 29.6136 43 24 43ZM25.7273 25.9518V39.3209C28.6636 38.5264 30.9091 35.7973 30.9091 32.6364C30.9091 29.4755 28.6636 26.7464 25.7273 25.9518ZM8.67909 25.7273C9.47364 28.6636 12.2027 30.9091 15.3636 30.9091C18.5245 30.9091 21.2536 28.6636 22.0482 25.7273H8.67909ZM25.9518 22.2727H39.3209C38.5264 19.3364 35.78 17.0909 32.6364 17.0909C29.4927 17.0909 26.7464 19.3364 25.9518 22.2727ZM22.2727 8.67909C19.3364 9.47364 17.0909 12.22 17.0909 15.3636C17.0909 18.5073 19.3364 21.2536 22.2727 22.0482V8.67909Z" fill="#A8BDE8"/>
            </svg>
            <div className="self-stretch text-[#A8BDE8] text-center text-sm font-normal">沙具管理</div>
          </div>
        </div>

        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/05114ceccd61297e06295e70e07c8025accaf9fa?width=128" 
          alt="用户头像" 
          className="w-16 h-16 rounded-full"
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 px-14 py-14 overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-6 mb-16">
          <div className="flex flex-col">
            <h1 className="text-[#3D526C] text-[28px] font-semibold">数据中心</h1>
          </div>
          <div className="text-[#7E90B0] text-sm font-normal max-w-[270px]">
            *沙盘过程视频仅临时��存72小时<br />
            如有需要可自行下载到本地
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            {/* Evaluation Time */}
            <div className="flex items-center gap-4 relative">
              <div className="text-[#324459] text-base font-normal">评估时间</div>
              <div className="relative">
                <button
                  onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  className="flex w-[150px] px-4 py-1 justify-between items-center rounded-2xl border border-[#B6C2DA] hover:border-[#004DA9] transition-colors"
                >
                  <div className="text-[#3D526C] text-base font-normal">{selectedTime}</div>
                  <svg className={`w-4 h-4 transition-transform ${showTimeDropdown ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.6007 4.89906C13.2687 4.56711 12.7305 4.56711 12.3986 4.89906L7.99961 9.29802L3.60065 4.89906C3.2687 4.56711 2.73051 4.56711 2.39857 4.89906C2.06662 5.231 2.06662 5.76919 2.39857 6.10114L7.39857 11.1011C7.73051 11.4331 8.2687 11.4331 8.60065 11.1011L13.6007 6.10114C13.9326 5.76919 13.9326 5.231 13.6007 4.89906Z" fill="#3D526C"/>
                  </svg>
                </button>

                {showTimeDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-[150px] p-2 bg-white rounded-2xl border border-[#B6C2DA] shadow-[0_0_10px_3px_rgba(126,144,176,0.20)] z-10">
                    {timeOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelectedTime(option);
                          setShowTimeDropdown(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-2xl text-base font-normal transition-colors ${
                          selectedTime === option
                            ? 'bg-[#F4F4F5] text-[#3D526C]'
                            : 'text-[#3D526C] hover:bg-[#F4F4F5]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Format Filter */}
            <div className="flex items-center gap-4">
              <div className="text-[#324459] text-base font-normal">形式</div>
              <div className="flex items-center gap-1">
                {formatOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setSelectedFormat(option.key as 'video' | 'photo' | 'all')}
                    className={`flex h-9 px-4 py-2 items-center gap-1 rounded-2xl ${
                      selectedFormat === option.key
                        ? 'bg-[#004DA9] text-white'
                        : 'border border-[#004DA9] text-[#004DA9]'
                    }`}
                  >
                    <div className="text-base font-normal">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-4">
              <div className="text-[#324459] text-base font-normal">状态</div>
              <div className="flex items-center gap-1">
                {statusOptions.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => setSelectedStatus(option.key as 'pending' | 'generating' | 'completed' | 'all')}
                    className={`flex h-9 px-4 py-2 items-center gap-1 rounded-2xl ${
                      selectedStatus === option.key
                        ? 'bg-[#004DA9] text-white'
                        : 'border border-[#004DA9] text-[#004DA9]'
                    }`}
                  >
                    <div className="text-base font-normal">{option.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4 relative">
              <div className="text-[#324459] text-base font-normal">排序</div>
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex w-[150px] px-4 py-1 justify-between items-center rounded-2xl border border-[#B6C2DA] hover:border-[#004DA9] transition-colors"
                >
                  <div className="text-[#3D526C] text-base font-normal">{sortBy}</div>
                  <svg className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M13.6007 4.89906C13.2687 4.56711 12.7305 4.56711 12.3986 4.89906L7.99961 9.29802L3.60065 4.89906C3.2687 4.56711 2.73051 4.56711 2.39857 4.89906C2.06662 5.231 2.06662 5.76919 2.39857 6.10114L7.39857 11.1011C7.73051 11.4331 8.2687 11.4331 8.60065 11.1011L13.6007 6.10114C13.9326 5.76919 13.9326 5.231 13.6007 4.89906Z" fill="#3D526C"/>
                  </svg>
                </button>

                {showSortDropdown && (
                  <div className="absolute top-full left-0 mt-1 w-[150px] p-2 bg-white rounded-2xl border border-[#B6C2DA] shadow-[0_0_10px_3px_rgba(126,144,176,0.20)] z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSortBy(option);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-2xl text-base font-normal transition-colors ${
                          sortBy === option
                            ? 'bg-[#F4F4F5] text-[#3D526C]'
                            : 'text-[#3D526C] hover:bg-[#F4F4F5]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="flex w-[200px] h-9 px-6 py-3 items-center rounded-2xl border border-[#B6C2DA]">
              <input
                type="text"
                placeholder="输入姓名"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-base text-[#7E90B0] placeholder-[#7E90B0]"
              />
            </div>
            <button className="flex h-9 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9]">
              <div className="text-white text-lg font-semibold">搜索</div>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex gap-6">
          {/* History Records */}
          <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredData.map(renderHistoryCard)}
          </div>

          {/* Index Sidebar */}
          <div className="flex flex-col w-7 gap-1">
            {alphabetLetters.map((letter, index) => (
              <div
                key={letter}
                className={`flex h-7 flex-col justify-center items-center aspect-square rounded-2xl cursor-pointer ${
                  index === 0 ? 'bg-[#A8BDE8]' : ''
                }`}
              >
                <div className={`text-sm font-normal ${
                  index === 0 ? 'text-white' : 'text-[#7E90B0]'
                }`}>
                  {letter}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Selection Action Bar */}
        {selectedRecords.length > 0 && (
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex w-full max-w-[1204px] mx-4 p-3 justify-between items-center rounded-3xl bg-white shadow-[0_0_20px_7px_rgba(126,144,176,0.20)] z-50">
            <div className="flex items-center gap-6">
              <button
                onClick={handleCancelSelection}
                className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#CB2F2F]"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z" fill="#CB2F2F"/>
                </svg>
                <div className="text-[#CB2F2F] text-lg font-semibold">取消</div>
              </button>
              <div className="text-[#303133] text-base font-normal">
                已选择 <span className="text-[#CB2F2F] font-semibold">{selectedRecords.length}</span> 条记录
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3.52441 16.5967V15.6328C3.52446 15.0944 3.96155 14.6572 4.5 14.6572C5.03845 14.6572 5.47554 15.0944 5.47559 15.6328V16.5967C5.47559 17.1176 5.67561 17.6113 6.02344 17.9707C6.37059 18.3291 6.83533 18.5244 7.3125 18.5244H16.6875L16.8662 18.5156C17.2792 18.4732 17.6729 18.2841 17.9766 17.9707C18.3244 17.6113 18.5244 17.1176 18.5244 16.5967V15.6284C18.5247 15.0902 18.9617 14.6543 19.5 14.6543C20.0383 14.6543 20.4753 15.0902 20.4756 15.6284V16.5967C20.4756 17.6154 20.0837 18.5991 19.377 19.3286C18.6692 20.0591 17.7021 20.4756 16.6875 20.4756H7.3125C6.29786 20.4756 5.33078 20.0591 4.62305 19.3286C3.91633 18.5991 3.52441 17.6154 3.52441 16.5967ZM11.0244 4.5C11.0244 3.96152 11.4615 3.52441 12 3.52441C12.5385 3.52441 12.9756 3.96152 12.9756 4.5V12.7368L14.5811 11.0801C14.9557 10.6933 15.5727 10.6834 15.9595 11.0581C16.3462 11.4328 16.3561 12.0498 15.9814 12.4365L12.7002 15.8232C12.5165 16.0128 12.264 16.1206 12 16.1206C11.736 16.1206 11.4835 16.0128 11.2998 15.8232L8.01855 12.4365L7.89551 12.2812C7.652 11.899 7.7023 11.3858 8.04053 11.0581C8.37898 10.7302 8.89362 10.6967 9.26807 10.9526L9.41895 11.0801L11.0244 12.7368V4.5Z" fill="#004DA9"/>
                </svg>
                <div className="text-[#004DA9] text-lg font-semibold">下载日志</div>
              </button>

              <button className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M3.52441 16.5967V15.6328C3.52446 15.0944 3.96155 14.6572 4.5 14.6572C5.03845 14.6572 5.47554 15.0944 5.47559 15.6328V16.5967C5.47559 17.1176 5.67561 17.6113 6.02344 17.9707C6.37059 18.3291 6.83533 18.5244 7.3125 18.5244H16.6875L16.8662 18.5156C17.2792 18.4732 17.6729 18.2841 17.9766 17.9707C18.3244 17.6113 18.5244 17.1176 18.5244 16.5967V15.6284C18.5247 15.0902 18.9617 14.6543 19.5 14.6543C20.0383 14.6543 20.4753 15.0902 20.4756 15.6284V16.5967C20.4756 17.6154 20.0837 18.5991 19.377 19.3286C18.6692 20.0591 17.7021 20.4756 16.6875 20.4756H7.3125C6.29786 20.4756 5.33078 20.0591 4.62305 19.3286C3.91633 18.5991 3.52441 17.6154 3.52441 16.5967ZM11.0244 4.5C11.0244 3.96152 11.4615 3.52441 12 3.52441C12.5385 3.52441 12.9756 3.96152 12.9756 4.5V12.7368L14.5811 11.0801C14.9557 10.6933 15.5727 10.6834 15.9595 11.0581C16.3462 11.4328 16.3561 12.0498 15.9814 12.4365L12.7002 15.8232C12.5165 16.0128 12.264 16.1206 12 16.1206C11.736 16.1206 11.4835 16.0128 11.2998 15.8232L8.01855 12.4365L7.89551 12.2812C7.652 11.899 7.7023 11.3858 8.04053 11.0581C8.37898 10.7302 8.89362 10.6967 9.26807 10.9526L9.41895 11.0801L11.0244 12.7368V4.5Z" fill="white"/>
                </svg>
                <div className="text-white text-lg font-semibold">下载报告</div>
              </button>

              <button className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#CB2F2F]">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                  <path d="M6.84375 21C6.27656 21 5.79119 20.8043 5.38763 20.413C4.98407 20.0217 4.78194 19.5507 4.78125 19V6C4.48907 6 4.24432 5.904 4.047 5.712C3.84969 5.52 3.75069 5.28267 3.75 5C3.74932 4.71733 3.84832 4.48 4.047 4.288C4.24569 4.096 4.49044 4 4.78125 4H8.90625C8.90625 3.71667 9.00525 3.47933 9.20325 3.288C9.40125 3.09667 9.646 3.00067 9.9375 3H14.0625C14.3547 3 14.5998 3.096 14.7978 3.288C14.9958 3.48 15.0944 3.71733 15.0937 4H19.2187C19.5109 4 19.756 4.096 19.954 4.288C20.152 4.48 20.2507 4.71733 20.25 5C20.2493 5.28267 20.1503 5.52033 19.953 5.713C19.7557 5.90567 19.5109 6.00133 19.2187 6V19C19.2187 19.55 19.017 20.021 18.6134 20.413C18.2098 20.805 17.7241 21.0007 17.1562 21H6.84375ZM17.1562 6H6.84375V19H17.1562V6ZM9.9375 17C10.2297 17 10.4748 16.904 10.6728 16.712C10.8708 16.52 10.9694 16.2827 10.9688 16V9C10.9688 8.71667 10.8698 8.47933 10.6718 8.288C10.4738 8.09667 10.229 8.00067 9.9375 8C9.646 7.99933 9.40125 8.09533 9.20325 8.288C9.00525 8.48067 8.90625 8.718 8.90625 9V16C8.90625 16.2833 9.00525 16.521 9.20325 16.713C9.40125 16.905 9.646 17.0007 9.9375 17ZM14.0625 17C14.3547 17 14.5998 16.904 14.7978 16.712C14.9958 16.52 15.0944 16.2827 15.0937 16V9C15.0937 8.71667 14.9947 8.47933 14.7967 8.288C14.5987 8.09667 14.354 8.00067 14.0625 8C13.771 7.99933 13.5262 8.09533 13.3282 8.288C13.1302 8.48067 13.0312 8.718 13.0312 9V16C13.0312 16.2833 13.1302 16.521 13.3282 16.713C13.5262 16.905 13.771 17.0007 14.0625 17Z" fill="white"/>
                </svg>
                <div className="text-white text-lg font-semibold">删除记录</div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
