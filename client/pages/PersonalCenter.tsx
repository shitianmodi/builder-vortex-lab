import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DownloadTask {
  id: string;
  name: string;
  type: 'video' | 'log' | 'report';
  status: 'downloading' | 'completed';
  progress?: number;
  speed?: string;
  size: string;
  completed?: boolean;
}

interface NotificationSettings {
  newReport: boolean;
  downloadComplete: boolean;
  videoExpiry: boolean;
  newModel: boolean;
}

interface LocalDataItem {
  name: string;
  size: string;
  checked: boolean;
  warning?: string;
}

const PersonalCenter: React.FC = () => {
  const navigate = useNavigate();
  const [autoSync, setAutoSync] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('recent');

  // Modal states
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showLocalDataModal, setShowLocalDataModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskForDelete, setSelectedTaskForDelete] = useState<string | null>(null);

  // Modal data states
  const [feedbackText, setFeedbackText] = useState('');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    newReport: true,
    downloadComplete: true,
    videoExpiry: false,
    newModel: true
  });

  const [localDataItems, setLocalDataItems] = useState<LocalDataItem[]>([
    { name: '系统缓存', size: '56MB', checked: false },
    { name: '沙盘日志图文', size: '30MB', checked: true },
    { name: '沙盘录像视频', size: '3096MB', checked: false, warning: '*已到期的云存档视频无法恢复。' },
    { name: '报告文件', size: '56MB', checked: false }
  ]);

  const downloadTasks: DownloadTask[] = [
    {
      id: '1',
      name: '文件名称一行字',
      type: 'video',
      status: 'downloading',
      progress: 70,
      speed: '2.7MB/S',
      size: '10MB/15MB'
    },
    {
      id: '2',
      name: '文件名称一行字',
      type: 'log',
      status: 'downloading',
      progress: 70,
      speed: '2.7MB/S',
      size: '10MB/15MB'
    },
    {
      id: '3',
      name: '文件名称一行字',
      type: 'report',
      status: 'downloading',
      progress: 70,
      speed: '2.7MB/S',
      size: '10MB/15MB'
    },
    {
      id: '4',
      name: '文件名称一行字',
      type: 'video',
      status: 'completed',
      size: '15MB',
      completed: true
    },
    {
      id: '5',
      name: '文件名称一行字',
      type: 'report',
      status: 'completed',
      size: '15MB',
      completed: true
    },
    {
      id: '6',
      name: '文件名称一行字',
      type: 'log',
      status: 'completed',
      size: '15MB',
      completed: true
    },
    {
      id: '7',
      name: '日志-来访者-时间',
      type: 'log',
      status: 'completed',
      size: '15MB',
      completed: true
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 3.993C3 3.445 3.445 3 3.993 3H20.007C20.555 3 21 3.445 21 3.993V20.007C20.9997 20.2703 20.895 20.5227 20.7089 20.7089C20.5227 20.895 20.2703 20.9997 20.007 21H3.993C3.72964 21 3.47707 20.8954 3.29084 20.7092C3.10462 20.5229 3 20.2704 3 20.007V3.993ZM5 5V19H19V5H5ZM10.622 8.415L15.501 11.667C15.5559 11.7035 15.6009 11.753 15.632 11.8111C15.6631 11.8692 15.6794 11.9341 15.6794 12C15.6794 12.0659 15.6631 12.1308 15.632 12.1889C15.6009 12.247 15.5559 12.2965 15.501 12.333L10.621 15.585C10.5608 15.6249 10.491 15.6477 10.4189 15.6512C10.3468 15.6546 10.2751 15.6384 10.2114 15.6043C10.1477 15.5703 10.0945 15.5197 10.0573 15.4578C10.02 15.396 10.0003 15.3252 10 15.253V8.747C10.0001 8.67465 10.0199 8.60369 10.0572 8.54168C10.0944 8.47967 10.1478 8.42893 10.2116 8.39486C10.2755 8.36079 10.3473 8.34467 10.4196 8.34822C10.4919 8.35177 10.5618 8.37485 10.622 8.415Z" fill="#324459"/>
          </svg>
        );
      case 'log':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M10.1667 18.5625C9.90694 18.5625 9.68939 18.4725 9.514 18.2925C9.33861 18.1125 9.25061 17.89 9.25 17.625C9.24939 17.36 9.33739 17.1375 9.514 16.9575C9.69061 16.7775 9.90817 16.6875 10.1667 16.6875H19.3333C19.5931 16.6875 19.8109 16.7775 19.9869 16.9575C20.1629 17.1375 20.2506 17.36 20.25 17.625C20.2494 17.89 20.1614 18.1128 19.986 18.2934C19.8106 18.474 19.5931 18.5637 19.3333 18.5625H10.1667ZM10.1667 12.9375C9.90694 12.9375 9.68939 12.8475 9.514 12.6675C9.33861 12.4875 9.25061 12.265 9.25 12C9.24939 11.735 9.33739 11.5125 9.514 11.3325C9.69061 11.1525 9.90817 11.0625 10.1667 11.0625H19.3333C19.5931 11.0625 19.8109 11.1525 19.9869 11.3325C20.1629 11.5125 20.2506 11.735 20.25 12C20.2494 12.265 20.1614 12.4878 19.986 12.6684C19.8106 12.8491 19.5931 12.9387 19.3333 12.9375H10.1667ZM10.1667 7.3125C9.90694 7.3125 9.68939 7.2225 9.514 7.0425C9.33861 6.8625 9.25061 6.64 9.25 6.375C9.24939 6.11 9.33739 5.8875 9.514 5.7075C9.69061 5.5275 9.90817 5.4375 10.1667 5.4375H19.3333C19.5931 5.4375 19.8109 5.5275 19.9869 5.7075C20.1629 5.8875 20.2506 6.11 20.25 6.375C20.2494 6.64 20.1614 6.86281 19.986 7.04344C19.8106 7.22406 19.5931 7.31375 19.3333 7.3125H10.1667ZM5.58333 19.5C5.07917 19.5 4.64772 19.3165 4.289 18.9497C3.93028 18.5828 3.75061 18.1412 3.75 17.625C3.74939 17.1087 3.92906 16.6675 4.289 16.3012C4.64895 15.935 5.08039 15.7512 5.58333 15.75C6.08628 15.7487 6.51803 15.9325 6.87858 16.3012C7.23914 16.67 7.4185 17.1112 7.41667 17.625C7.41483 18.1387 7.23547 18.5803 6.87858 18.9497C6.5217 19.319 6.08995 19.5025 5.58333 19.5ZM5.58333 13.875C5.07917 13.875 4.64772 13.6915 4.289 13.3247C3.93028 12.9578 3.75061 12.5162 3.75 12C3.74939 11.4837 3.92906 11.0425 4.289 10.6762C4.64895 10.31 5.08039 10.1262 5.58333 10.125C6.08628 10.1237 6.51803 10.3075 6.87858 10.6762C7.23914 11.045 7.4185 11.4862 7.41667 12C7.41483 12.5137 7.23547 12.9553 6.87858 13.3247C6.5217 13.694 6.08995 13.8775 5.58333 13.875ZM5.58333 8.25C5.07917 8.25 4.64772 8.06656 4.289 7.69969C3.93028 7.33281 3.75061 6.89125 3.75 6.375C3.74939 5.85875 3.92906 5.4175 4.289 5.05125C4.64895 4.68501 5.08039 4.50126 5.58333 4.50001C6.08628 4.49876 6.51803 4.68251 6.87858 5.05125C7.23914 5.42 7.4185 5.86125 7.41667 6.375C7.41483 6.88875 7.23547 7.33031 6.87858 7.69969C6.5217 8.06906 6.08995 8.2525 5.58333 8.25Z" fill="#324459"/>
          </svg>
        );
      case 'report':
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9.1875 12C8.92187 12 8.69937 11.9136 8.52 11.7408C8.34062 11.568 8.25062 11.3544 8.25 11.1C8.24937 10.8456 8.33937 10.632 8.52 10.4592C8.70062 10.2864 8.92312 10.2 9.1875 10.2H14.8125C15.0781 10.2 15.3009 10.2864 15.4809 10.4592C15.6609 10.632 15.7506 10.8456 15.75 11.1C15.7494 11.3544 15.6594 11.5683 15.48 11.7417C15.3006 11.9151 15.0781 12.0012 14.8125 12H9.1875ZM9.1875 8.4C8.92187 8.4 8.69937 8.3136 8.52 8.1408C8.34062 7.968 8.25062 7.7544 8.25 7.5C8.24937 7.2456 8.33937 7.032 8.52 6.8592C8.70062 6.6864 8.92312 6.6 9.1875 6.6H14.8125C15.0781 6.6 15.3009 6.6864 15.4809 6.8592C15.6609 7.032 15.7506 7.2456 15.75 7.5C15.7494 7.7544 15.6594 7.9683 15.48 8.1417C15.3006 8.3151 15.0781 8.4012 14.8125 8.4H9.1875ZM6.375 13.8H13.4062C13.8594 13.8 14.2812 13.8939 14.6719 14.0817C15.0625 14.2695 15.3906 14.5356 15.6562 14.88L17.625 17.355V4.8H6.375V13.8ZM6.375 19.2H16.7344L14.1797 15.9825C14.0859 15.8625 13.9728 15.7689 13.8403 15.7017C13.7078 15.6345 13.5631 15.6006 13.4062 15.6H6.375V19.2ZM17.625 21H6.375C5.85937 21 5.41812 20.8239 5.05125 20.4717C4.68437 20.1195 4.50062 19.6956 4.5 19.2V4.8C4.5 4.305 4.68375 3.8814 5.05125 3.5292C5.41875 3.177 5.86 3.0006 6.375 3H17.625C18.1406 3 18.5822 3.1764 18.9497 3.5292C19.3172 3.882 19.5006 4.3056 19.5 4.8V19.2C19.5 19.695 19.3166 20.1189 18.9497 20.4717C18.5828 20.8245 18.1412 21.0006 17.625 21Z" fill="#324459"/>
          </svg>
        );
      default:
        return null;
    }
  };

  const ActionButton = ({ type, onClick }: { type: 'more' | 'pause' | 'cancel' | 'open' | 'delete', onClick?: () => void }) => {
    const getIcon = () => {
      switch (type) {
        case 'more':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M8.14988 21.6668C7.84495 21.6668 7.55606 21.5899 7.28322 21.4361C7.01038 21.2822 6.78569 21.0703 6.60914 20.8002L2.27581 14.3002C2.01902 13.921 1.89062 13.4877 1.89062 13.0002C1.89062 12.5127 2.01902 12.0793 2.27581 11.7002L6.60914 5.20016C6.78569 4.92933 7.01038 4.71736 7.28322 4.56425C7.55606 4.41113 7.84495 4.33422 8.14988 4.3335H18.7425C19.2721 4.3335 19.7257 4.54583 20.1031 4.9705C20.4806 5.39516 20.669 5.90505 20.6684 6.50016V19.5002C20.6684 20.096 20.48 20.6062 20.1031 21.0309C19.7263 21.4556 19.2727 21.6676 18.7425 21.6668H8.14988ZM8.14988 19.5002H18.7425V6.50016H8.14988L3.81655 13.0002L8.14988 19.5002ZM9.11285 14.0835C9.38569 14.0835 9.61455 13.9795 9.79944 13.7715C9.98433 13.5635 10.0765 13.3064 10.0758 13.0002C10.0752 12.6939 9.98272 12.4368 9.79848 12.2288C9.61423 12.0208 9.38569 11.9168 9.11285 11.9168C8.84001 11.9168 8.61146 12.0208 8.42722 12.2288C8.24297 12.4368 8.15053 12.6939 8.14988 13.0002C8.14924 13.3064 8.24169 13.5639 8.42722 13.7726C8.61275 13.9813 8.84129 14.0849 9.11285 14.0835ZM12.4832 14.0835C12.7561 14.0835 12.9849 13.9795 13.1698 13.7715C13.3547 13.5635 13.4468 13.3064 13.4462 13.0002C13.4455 12.6939 13.3531 12.4368 13.1688 12.2288C12.9846 12.0208 12.7561 11.9168 12.4832 11.9168C12.2104 11.9168 11.9818 12.0208 11.7976 12.2288C11.6133 12.4368 11.5209 12.6939 11.5203 13.0002C11.5196 13.3064 11.6121 13.5639 11.7976 13.7726C11.9831 13.9813 12.2117 14.0849 12.4832 14.0835ZM15.8536 14.0835C16.1264 14.0835 16.3553 13.9795 16.5402 13.7715C16.7251 13.5635 16.8172 13.3064 16.8166 13.0002C16.8159 12.6939 16.7235 12.4368 16.5392 12.2288C16.355 12.0208 16.1264 11.9168 15.8536 11.9168C15.5807 11.9168 15.3522 12.0208 15.168 12.2288C14.9837 12.4368 14.8913 12.6939 14.8906 13.0002C14.89 13.3064 14.9824 13.5639 15.168 13.7726C15.3535 13.9813 15.582 14.0849 15.8536 14.0835Z" fill="#004DA9"/>
            </svg>
          );
        case 'pause':
          return (
            <div className="flex items-center justify-center w-6 h-6">
              <div className="w-1 h-4 bg-[#004DA9] rounded-sm mr-1"></div>
              <div className="w-1 h-4 bg-[#004DA9] rounded-sm"></div>
            </div>
          );
        case 'cancel':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12.0015 13.5376L6.61918 18.92C6.4178 19.1213 6.1615 19.222 5.85027 19.222C5.53905 19.222 5.28275 19.1213 5.08137 18.92C4.87999 18.7186 4.7793 18.4623 4.7793 18.1511C4.7793 17.8398 4.87999 17.5835 5.08137 17.3821L10.4637 11.9998L5.08137 6.61747C4.87999 6.41609 4.7793 6.15979 4.7793 5.84856C4.7793 5.53734 4.87999 5.28104 5.08137 5.07966C5.28275 4.87828 5.53905 4.77759 5.85027 4.77759C6.1615 4.77759 6.4178 4.87828 6.61918 5.07966L12.0015 10.462L17.3839 5.07966C17.5852 4.87828 17.8415 4.77759 18.1528 4.77759C18.464 4.77759 18.7203 4.87828 18.9217 5.07966C19.123 5.28104 19.2237 5.53734 19.2237 5.84856C19.2237 6.15979 19.123 6.41609 18.9217 6.61747L13.5393 11.9998L18.9217 17.3821C19.123 17.5835 19.2237 17.8398 19.2237 18.1511C19.2237 18.4623 19.123 18.7186 18.9217 18.92C18.7203 19.1213 18.464 19.222 18.1528 19.222C17.8415 19.222 17.5852 19.1213 17.3839 18.92L12.0015 13.5376Z" fill="#CB2F2F"/>
            </svg>
          );
        case 'open':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4.29507 21.6668C3.76544 21.6668 3.3122 21.4549 2.93536 21.0309C2.55852 20.607 2.36978 20.0967 2.36914 19.5002V6.50016C2.36914 5.90433 2.55788 5.39444 2.93536 4.9705C3.31284 4.54655 3.76608 4.33422 4.29507 4.3335H9.2784C9.53519 4.3335 9.7801 4.38766 10.0131 4.496C10.2462 4.60433 10.4506 4.7578 10.6265 4.95641L11.9988 6.50016H20.6654C20.9383 6.50016 21.1671 6.60416 21.352 6.81216C21.5369 7.02016 21.629 7.27727 21.6284 7.5835C21.6278 7.88972 21.5353 8.14719 21.3511 8.35591C21.1668 8.56463 20.9383 8.66827 20.6654 8.66683H11.2043L9.2784 6.50016H4.29507V19.5002L6.19692 12.3772C6.32531 11.9078 6.5622 11.5333 6.90758 11.2538C7.25297 10.9743 7.63398 10.8342 8.05062 10.8335H20.4728C21.1309 10.8335 21.6486 11.1271 22.0261 11.7142C22.4036 12.3014 22.5037 12.9377 22.3265 13.6231L20.5932 20.1231C20.4648 20.5925 20.2283 20.9674 19.8835 21.2476C19.5388 21.5278 19.1574 21.6676 18.7395 21.6668H4.29507ZM6.31729 19.5002H18.7395L20.4728 13.0002H8.05062L6.31729 19.5002Z" fill="#004DA9"/>
            </svg>
          );
        case 'delete':
          return (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M7.03581 20.6666C6.48963 20.6666 6.02223 20.4782 5.63362 20.1013C5.245 19.7245 5.05036 19.2709 5.0497 18.7407V6.22214C4.76833 6.22214 4.53265 6.1297 4.34264 5.94481C4.15264 5.75992 4.05731 5.53137 4.05664 5.25918C4.05598 4.98698 4.15132 4.75844 4.34264 4.57355C4.53397 4.38866 4.76966 4.29621 5.0497 4.29621H9.02192C9.02192 4.02338 9.11725 3.79483 9.30792 3.61059C9.49859 3.42634 9.73427 3.33389 10.015 3.33325H13.9872C14.2686 3.33325 14.5046 3.4257 14.6952 3.61059C14.8859 3.79547 14.9809 4.02402 14.9803 4.29621H18.9525C19.2338 4.29621 19.4699 4.38866 19.6605 4.57355C19.8512 4.75844 19.9462 4.98698 19.9455 5.25918C19.9449 5.53137 19.8495 5.76024 19.6595 5.94577C19.4695 6.1313 19.2338 6.22342 18.9525 6.22214V18.7407C18.9525 19.2703 18.7582 19.7238 18.3695 20.1013C17.9809 20.4788 17.5132 20.6672 16.9664 20.6666H7.03581ZM16.9664 6.22214H7.03581V18.7407H16.9664V6.22214ZM10.015 16.8147C10.2963 16.8147 10.5324 16.7223 10.723 16.5374C10.9137 16.3525 11.0087 16.124 11.008 15.8518V9.11103C11.008 8.83819 10.9127 8.60965 10.722 8.4254C10.5314 8.24115 10.2957 8.14871 10.015 8.14807C9.73427 8.14742 9.49859 8.23987 9.30792 8.4254C9.11725 8.61093 9.02192 8.83947 9.02192 9.11103V15.8518C9.02192 16.1246 9.11725 16.3535 9.30792 16.5384C9.49859 16.7232 9.73427 16.8154 10.015 16.8147ZM13.9872 16.8147C14.2686 16.8147 14.5046 16.7223 14.6952 16.5374C14.8859 16.3525 14.9809 16.124 14.9803 15.8518V9.11103C14.9803 8.83819 14.8849 8.60965 14.6943 8.4254C14.5036 8.24115 14.2679 8.14871 13.9872 8.14807C13.7065 8.14742 13.4708 8.23987 13.2801 8.4254C13.0895 8.61093 12.9941 8.83947 12.9941 9.11103V15.8518C12.9941 16.1246 13.0895 16.3535 13.2801 16.5384C13.4708 16.7232 13.7065 16.8154 13.9872 16.8147Z" fill="#CB2F2F"/>
            </svg>
          );
        default:
          return null;
      }
    };

    const bgColor = type === 'cancel' || type === 'delete' ? 'bg-[#F7E0E0]' : 'bg-[#EEF1FA]';
    
    return (
      <button
        onClick={onClick}
        className={`flex w-8 h-8 justify-center items-center rounded-full ${bgColor} hover:opacity-80 transition-opacity`}
      >
        {getIcon()}
      </button>
    );
  };

  return (
    <div className="w-full h-screen bg-[#EEF1FA]">
      {/* Header */}
      <div className="flex items-center gap-9 px-14 pt-14">
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9] hover:bg-[#004DA9] hover:text-white transition-colors group"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:stroke-white">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5028 4.08329C12.9324 4.52768 12.9324 5.24818 12.5028 5.69257L7.50563 10.8621H19.15C19.7575 10.8621 20.25 11.3715 20.25 12C20.25 12.6285 19.7575 13.1379 19.15 13.1379H7.50564L12.5028 18.3074C12.9324 18.7518 12.9324 19.4723 12.5028 19.9167C12.0732 20.3611 11.3768 20.3611 10.9472 19.9167L4.07218 12.8046C3.64261 12.3602 3.64261 11.6398 4.07218 11.1954L10.9472 4.08329C11.3768 3.6389 12.0732 3.6389 12.5028 4.08329Z"
                fill="#004DA9"
                className="group-hover:fill-white"
              />
            </svg>
            <span className="text-[#004DA9] text-lg font-semibold group-hover:text-white">返回</span>
          </button>
          <div className="w-px h-6 bg-[#B6C2DA]"></div>
          <h1 className="text-[#3D526C] text-2xl font-semibold">我的</h1>
        </div>
      </div>

      <div className="flex gap-8 px-14 pt-12 pb-14">
        {/* Left Panel - User Profile */}
        <div className="w-[411px] flex flex-col">
          {/* User Info */}
          <div className="flex items-center gap-6 mb-8">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/96abcb664f6d7c88a6c972d58ceae920136d7fe3"
              alt="用户头像"
              className="w-25 h-25 rounded-full border-4 border-white"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-[#3D526C] text-2xl font-semibold">用户昵称</h2>
                <div className="px-4 py-1 bg-[#DAE4F9] rounded-2xl">
                  <span className="text-[#004DA9] text-lg">心理老师</span>
                </div>
              </div>
              <p className="text-[#7E90B0] text-base">学校名称一行字</p>
            </div>
          </div>

          {/* Logout Button */}
          <button className="flex w-full h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#CB2F2F] text-[#CB2F2F] hover:bg-[#CB2F2F] hover:text-white transition-colors group mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="group-hover:fill-white">
              <path d="M5.54545 21C4.98295 21 4.50159 20.8043 4.10136 20.413C3.70114 20.0217 3.50068 19.5507 3.5 19V5C3.5 4.45 3.70045 3.97933 4.10136 3.588C4.50227 3.19667 4.98364 3.00067 5.54545 3H11.6818C11.9716 3 12.2147 3.096 12.411 3.288C12.6074 3.48 12.7052 3.71733 12.7045 4C12.7039 4.28267 12.6057 4.52033 12.41 4.713C12.2143 4.90567 11.9716 5.00133 11.6818 5H5.54545V19H11.6818C11.9716 19 12.2147 19.096 12.411 19.288C12.6074 19.48 12.7052 19.7173 12.7045 20C12.7039 20.2827 12.6057 20.5203 12.41 20.713C12.2143 20.9057 11.9716 21.0013 11.6818 21H5.54545ZM17.9972 13H10.6591C10.3693 13 10.1266 12.904 9.93091 12.712C9.73523 12.52 9.63705 12.2827 9.63636 12C9.63568 11.7173 9.73386 11.48 9.93091 11.288C10.128 11.096 10.3707 11 10.6591 11H17.9972L16.0795 9.125C15.892 8.94166 15.7983 8.71666 15.7983 8.45C15.7983 8.18333 15.892 7.95 16.0795 7.75C16.267 7.55 16.5057 7.44566 16.7955 7.437C17.0852 7.42833 17.3324 7.52433 17.5369 7.725L21.1932 11.3C21.3977 11.5 21.5 11.7333 21.5 12C21.5 12.2667 21.3977 12.5 21.1932 12.7L17.5369 16.275C17.3324 16.475 17.0897 16.571 16.8088 16.563C16.5278 16.555 16.2848 16.4507 16.0795 16.25C15.892 16.05 15.8027 15.8127 15.8116 15.538C15.8205 15.2633 15.9183 15.034 16.1051 14.85L17.9972 13Z" fill="#CB2F2F" className="group-hover:fill-white"/>
            </svg>
            <span className="text-lg font-semibold">登出账号</span>
          </button>

          {/* System Menu */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center py-4 border-b border-[#B6C2DA] cursor-pointer hover:bg-white/50 rounded transition-colors">
              <span className="text-[#324459] text-lg">消息通知</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4972 4.08329C11.0676 4.52768 11.0676 5.24818 11.4972 5.69257L16.4944 10.8621H4.85C4.24249 10.8621 3.75 11.3715 3.75 12C3.75 12.6285 4.24249 13.1379 4.85 13.1379H16.4944L11.4972 18.3074C11.0676 18.7518 11.0676 19.4723 11.4972 19.9167C11.9268 20.3611 12.6232 20.3611 13.0528 19.9167L19.9278 12.8046C20.3574 12.3602 20.3574 11.6398 19.9278 11.1954L13.0528 4.08329C12.6232 3.6389 11.9268 3.6389 11.4972 4.08329Z" fill="#3D526C"/>
              </svg>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-[#B6C2DA] cursor-pointer hover:bg-white/50 rounded transition-colors">
              <span className="text-[#324459] text-lg">本地数据</span>
              <div className="flex items-center gap-2">
                <span className="text-[#7E90B0] text-base">3096MB</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.4972 4.08329C11.0676 4.52768 11.0676 5.24818 11.4972 5.69257L16.4944 10.8621H4.85C4.24249 10.8621 3.75 11.3715 3.75 12C3.75 12.6285 4.24249 13.1379 4.85 13.1379H16.4944L11.4972 18.3074C11.0676 18.7518 11.0676 19.4723 11.4972 19.9167C11.9268 20.3611 12.6232 20.3611 13.0528 19.9167L19.9278 12.8046C20.3574 12.3602 20.3574 11.6398 19.9278 11.1954L13.0528 4.08329C12.6232 3.6389 11.9268 3.6389 11.4972 4.08329Z" fill="#3D526C"/>
                </svg>
              </div>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-[#B6C2DA] cursor-pointer hover:bg-white/50 rounded transition-colors">
              <span className="text-[#324459] text-lg">反馈和建议</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4972 4.08329C11.0676 4.52768 11.0676 5.24818 11.4972 5.69257L16.4944 10.8621H4.85C4.24249 10.8621 3.75 11.3715 3.75 12C3.75 12.6285 4.24249 13.1379 4.85 13.1379H16.4944L11.4972 18.3074C11.0676 18.7518 11.0676 19.4723 11.4972 19.9167C11.9268 20.3611 12.6232 20.3611 13.0528 19.9167L19.9278 12.8046C20.3574 12.3602 20.3574 11.6398 19.9278 11.1954L13.0528 4.08329C12.6232 3.6389 11.9268 3.6389 11.4972 4.08329Z" fill="#3D526C"/>
              </svg>
            </div>
          </div>

          {/* Footer Text */}
          <div className="mt-12 text-center">
            <p className="text-[#7E90B0] text-base leading-7">
              版本信息及版权信息几行字<br />
              企业名称及联系方式几行字企业名称及联系方式几行字
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Top Cards Row */}
          <div className="flex gap-8">
            {/* Model Management Card */}
            <div className="flex-1 bg-white rounded-3xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#303133] text-lg font-semibold">模型管理</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#CB2F2F] rounded-full"></div>
                  <span className="text-[#7E90B0] text-base">模型可更新</span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E7F0] mb-3"></div>
              <div className="flex items-center gap-14">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#7E90B0] text-base">当前版本</span>
                    <span className="text-[#324459] text-base">1.0.2</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7E90B0] text-base">上次更新</span>
                    <span className="text-[#324459] text-base">30天前</span>
                  </div>
                </div>
                <button className="flex w-25 h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.5234 18.5741V17.4784C17.8978 18.2092 17.1505 18.836 16.3071 19.3241C14.6797 20.2659 12.7881 20.6447 10.9238 20.4037C9.05934 20.1627 7.3256 19.3145 5.99023 17.9896C4.73847 16.7476 3.90213 15.1515 3.58936 13.4208L3.53369 13.0736L3.52637 12.8759C3.55534 12.4233 3.89899 12.0383 4.36572 11.9735C4.83223 11.9091 5.26649 12.1862 5.41748 12.6137L5.46436 12.8056L5.56104 13.3402C5.83682 14.5756 6.46145 15.7097 7.36426 16.6054C8.39594 17.6289 9.73492 18.284 11.1743 18.4701C12.6135 18.656 14.0733 18.3625 15.3301 17.6352C16.1367 17.1683 16.8292 16.5382 17.3706 15.7924H15.749C15.2107 15.7924 14.7738 15.3565 14.7734 14.8183C14.7734 14.2798 15.2105 13.8427 15.749 13.8427H19.499C20.0375 13.8427 20.4746 14.2798 20.4746 14.8183V18.5741C20.4746 19.1126 20.0375 19.5497 19.499 19.5497C18.9605 19.5497 18.5234 19.1126 18.5234 18.5741ZM7.69092 4.67568C9.31834 3.73392 11.21 3.3551 13.0742 3.59609C14.9387 3.83712 16.6724 4.68529 18.0078 6.01015C19.3429 7.33482 20.2057 9.06222 20.4644 10.9262C20.5383 11.4595 20.1657 11.9523 19.6323 12.0263C19.1658 12.0907 18.7316 11.8136 18.5806 11.3861L18.5337 11.1942L18.437 10.6596C18.1612 9.42421 17.5366 8.29014 16.6338 7.39443C15.6021 6.37088 14.2631 5.71576 12.8237 5.52968C11.3846 5.34377 9.92471 5.63732 8.66797 6.36464C7.86139 6.83149 7.16885 7.46161 6.62744 8.20742H8.24902C8.7873 8.20742 9.22429 8.64333 9.22461 9.18154C9.22461 9.72002 8.7875 10.1571 8.24902 10.1571H4.49902C3.96055 10.1571 3.52344 9.72002 3.52344 9.18154V5.42568C3.52344 4.8872 3.96055 4.45009 4.49902 4.45009C5.0375 4.45009 5.47461 4.8872 5.47461 5.42568V6.51992C6.10014 5.78954 6.84787 5.16363 7.69092 4.67568Z" fill="white"/>
                  </svg>
                  <span className="text-white text-lg font-semibold">更新</span>
                </button>
              </div>
            </div>

            {/* Data Sync Card */}
            <div className="flex-1 bg-white rounded-3xl p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#303133] text-lg font-semibold">数据同步</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#CB2F2F] rounded-full"></div>
                  <span className="text-[#7E90B0] text-base">新数据待同步</span>
                </div>
              </div>
              <div className="w-full h-px bg-[#E2E7F0] mb-3"></div>
              <div className="flex items-center gap-14">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#7E90B0] text-base">上次更新</span>
                    <span className="text-[#324459] text-base">30天前</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#7E90B0] text-base">自动同步</span>
                    <button
                      onClick={() => setAutoSync(!autoSync)}
                      className={`flex w-10 h-5 p-0.5 rounded-full transition-colors ${
                        autoSync ? 'bg-[#004DA9] justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                    </button>
                  </div>
                </div>
                <button className="flex w-25 h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.5234 18.5741V17.4784C17.8978 18.2092 17.1505 18.836 16.3071 19.3241C14.6797 20.2659 12.7881 20.6447 10.9238 20.4037C9.05934 20.1627 7.3256 19.3145 5.99023 17.9896C4.73847 16.7476 3.90213 15.1515 3.58936 13.4208L3.53369 13.0736L3.52637 12.8759C3.55534 12.4233 3.89899 12.0383 4.36572 11.9735C4.83223 11.9091 5.26649 12.1862 5.41748 12.6137L5.46436 12.8056L5.56104 13.3402C5.83682 14.5756 6.46145 15.7097 7.36426 16.6054C8.39594 17.6289 9.73492 18.284 11.1743 18.4701C12.6135 18.656 14.0733 18.3625 15.3301 17.6352C16.1367 17.1683 16.8292 16.5382 17.3706 15.7924H15.749C15.2107 15.7924 14.7738 15.3565 14.7734 14.8183C14.7734 14.2798 15.2105 13.8427 15.749 13.8427H19.499C20.0375 13.8427 20.4746 14.2798 20.4746 14.8183V18.5741C20.4746 19.1126 20.0375 19.5497 19.499 19.5497C18.9605 19.5497 18.5234 19.1126 18.5234 18.5741ZM7.69092 4.67568C9.31834 3.73392 11.21 3.3551 13.0742 3.59609C14.9387 3.83712 16.6724 4.68529 18.0078 6.01015C19.3429 7.33482 20.2057 9.06222 20.4644 10.9262C20.5383 11.4595 20.1657 11.9523 19.6323 12.0263C19.1658 12.0907 18.7316 11.8136 18.5806 11.3861L18.5337 11.1942L18.437 10.6596C18.1612 9.42421 17.5366 8.29014 16.6338 7.39443C15.6021 6.37088 14.2631 5.71576 12.8237 5.52968C11.3846 5.34377 9.92471 5.63732 8.66797 6.36464C7.86139 6.83149 7.16885 7.46161 6.62744 8.20742H8.24902C8.7873 8.20742 9.22429 8.64333 9.22461 9.18154C9.22461 9.72002 8.7875 10.1571 8.24902 10.1571H4.49902C3.96055 10.1571 3.52344 9.72002 3.52344 9.18154V5.42568C3.52344 4.8872 3.96055 4.45009 4.49902 4.45009C5.0375 4.45009 5.47461 4.8872 5.47461 5.42568V6.51992C6.10014 5.78954 6.84787 5.16363 7.69092 4.67568Z" fill="white"/>
                  </svg>
                  <span className="text-white text-lg font-semibold">同步</span>
                </button>
              </div>
            </div>
          </div>

          {/* Download Management Section */}
          <div className="bg-white rounded-3xl p-6 flex gap-6 flex-1 min-h-0">
            {/* Sidebar */}
            <div className="w-[183px] flex flex-col gap-6">
              <h3 className="text-[#303133] text-lg font-semibold">下载管理</h3>
              
              {/* Direct Access */}
              <div>
                <div className="flex items-center h-3 px-1 mb-4">
                  <span className="text-[#7E90B0] text-sm">直达</span>
                  <div className="flex-1 h-px bg-[#E2E7F0] ml-2"></div>
                </div>
                <div
                  className={`flex justify-between items-center h-13 px-4 py-3 rounded-2xl cursor-pointer transition-colors ${
                    selectedCategory === 'recent' ? 'bg-[#EEF1FA]' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedCategory('recent')}
                >
                  <span className="text-[#324459] text-base">近期任务</span>
                  <span className="text-[#7E90B0] text-base">99</span>
                </div>
              </div>

              {/* Downloading */}
              <div>
                <div className="flex items-center h-3 px-1 mb-4">
                  <span className="text-[#7E90B0] text-sm">下载中（2）</span>
                  <div className="flex-1 h-px bg-[#E2E7F0] ml-2"></div>
                </div>
                <div className="space-y-0">
                  {['视频', '图文日志', '报告'].map((item) => (
                    <div key={item} className="flex justify-between items-center h-13 px-4 py-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className="text-[#324459] text-base">{item}</span>
                      <span className="text-[#7E90B0] text-base">-</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completed */}
              <div>
                <div className="flex items-center h-3 px-1 mb-4">
                  <span className="text-[#7E90B0] text-sm">下载完成（25）</span>
                  <div className="flex-1 h-px bg-[#E2E7F0] ml-2"></div>
                </div>
                <div className="space-y-0">
                  {['视频', '图文日志', '报告'].map((item) => (
                    <div key={item} className="flex justify-between items-center h-13 px-4 py-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <span className="text-[#324459] text-base">{item}</span>
                      <span className="text-[#7E90B0] text-base">99</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px bg-[#EEF1FA]"></div>

            {/* Download Tasks */}
            <div className="flex-1 flex flex-col gap-6 min-h-0">
              <div className="flex-1 overflow-y-auto space-y-6">
                {downloadTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-6 p-6 border border-[#E2E7F0] rounded-2xl">
                    <div className="flex-1">
                      <div className="flex justify-between items-center h-7 mb-3">
                        <div className="flex items-center gap-1">
                          {getFileIcon(task.type)}
                          <span className="text-[#324459] text-base font-semibold">{task.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          {task.status === 'downloading' ? (
                            <>
                              <span className="text-[#909399] text-base">{task.speed}</span>
                              <span className="text-[#909399] text-base">{task.size}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-[#909399] text-base">已完成</span>
                              <span className="text-[#909399] text-base">{task.size}</span>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      {task.status === 'downloading' ? (
                        <div className="h-2.5 bg-[#F4F4F5] rounded-lg overflow-hidden">
                          <div 
                            className="h-full bg-[#FFA300] rounded-lg transition-all duration-300"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      ) : (
                        <div className="h-2.5 bg-[#0D802C] rounded-lg"></div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-start gap-3">
                      <ActionButton type="more" />
                      {task.status === 'downloading' ? (
                        <>
                          <ActionButton type="pause" />
                          <ActionButton type="cancel" />
                        </>
                      ) : (
                        <>
                          <ActionButton type="open" />
                          <ActionButton type="delete" />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalCenter;
