import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ReportData {
  name: string;
  gender: string;
  class: string;
  studentId: string;
  recordType: string;
  startTime: string;
  endTime: string;
  duration: string;
  sandboxType: string;
  toolCount: number;
  firstTool: string;
  lastTool: string;
  images: string[];
}

interface CategoryData {
  name: string;
  total: number;
  items: { name: string; count: number }[];
}

interface ColorData {
  name: string;
  color: string;
  percentage: string;
  count: string;
  squares: number;
}

const mockReportData: ReportData = {
  name: "姓名一行字",
  gender: "性别",
  class: "性别",
  studentId: "性别",
  recordType: "录像",
  startTime: "2025-07-01 12:00",
  endTime: "2025-07-01 12:40",
  duration: "40分钟",
  sandboxType: "湿沙",
  toolCount: 25,
  firstTool: "红色小汽车",
  lastTool: "蓝色恐龙",
  images: [
    "https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2Fed1b931bc0324ec8b0437bab1085b08d?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2Fed1b931bc0324ec8b0437bab1085b08d?format=webp&width=800",
  ],
};

const mockCategoryData: CategoryData[] = [
  {
    name: "类别名称",
    total: 99,
    items: [
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
    ],
  },
  {
    name: "类别名称",
    total: 99,
    items: [
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
    ],
  },
  {
    name: "类别名称",
    total: 99,
    items: [
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
    ],
  },
];

const secondRowCategoryData: CategoryData[] = [
  {
    name: "类别名称",
    total: 99,
    items: [
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字��类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
    ],
  },
  {
    name: "类别名称",
    total: 99,
    items: [
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
    ],
  },
  {
    name: "类别名称",
    total: 99,
    items: [
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
      { name: "子类别名称两行字子类别名称两行字", count: 99 },
      { name: "子类别名称", count: 99 },
      { name: "子类别名称一行字", count: 99 },
    ],
  },
];

const colorData: ColorData[] = [
  {
    name: "红色",
    color: "#F55D5D",
    percentage: "100%",
    count: "99个",
    squares: 36,
  },
  {
    name: "蓝色",
    color: "#37A2E5",
    percentage: "100%",
    count: "99个",
    squares: 26,
  },
  {
    name: "绿色",
    color: "#58CA44",
    percentage: "100%",
    count: "99个",
    squares: 22,
  },
  {
    name: "黄色",
    color: "#FFDB0D",
    percentage: "100%",
    count: "99个",
    squares: 18,
  },
  {
    name: "紫色",
    color: "#BD6ECB",
    percentage: "100%",
    count: "99个",
    squares: 11,
  },
  {
    name: "橙色",
    color: "#FF8747",
    percentage: "100%",
    count: "99个",
    squares: 8,
  },
  {
    name: "灰色",
    color: "#A8ABB2",
    percentage: "100%",
    count: "99个",
    squares: 8,
  },
  {
    name: "多色",
    color:
      "linear-gradient(135deg, #FFA300 10.71%, #E20BBE 51.79%, #004DA9 92.86%)",
    percentage: "100%",
    count: "99个",
    squares: 5,
  },
];

export default function ReportDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("report");
  const [noteContent, setNoteContent] = useState("");

  const tabs = [
    { id: "report", label: "报告说明", active: true },
    { id: "basic", label: "基本信息", active: false },
    { id: "statistics", label: "沙盘统计", active: false },
    { id: "analysis", label: "分析结果", active: false },
  ];

  const renderColorSquares = (count: number, color: string) => {
    const squares = [];
    const rows = Math.ceil(count / 22);

    for (let row = 0; row < rows; row++) {
      const squaresInRow = Math.min(22, count - row * 22);
      const rowSquares = [];

      for (let i = 0; i < squaresInRow; i++) {
        if (color.includes("gradient")) {
          rowSquares.push(
            <div
              key={`${row}-${i}`}
              className="w-6 h-6"
              style={{ background: color }}
            />,
          );
        } else {
          rowSquares.push(
            <div
              key={`${row}-${i}`}
              className="w-6 h-6"
              style={{ backgroundColor: color }}
            />,
          );
        }
      }

      squares.push(
        <div key={row} className="flex items-center gap-2">
          {rowSquares}
        </div>,
      );
    }

    return squares;
  };

  return (
    <div className="w-full min-h-screen bg-[#EEF1FA] flex flex-col px-14 py-14 gap-8">
      {/* Top Navigation Bar */}
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/data-center")}
              className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#004DA9] hover:bg-[#EEF1FA] transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5028 4.08329C12.9324 4.52768 12.9324 5.24818 12.5028 5.69257L7.50563 10.8621H19.15C19.7575 10.8621 20.25 11.3715 20.25 12C20.25 12.6285 19.7575 13.1379 19.15 13.1379H7.50564L12.5028 18.3074C12.9324 18.7518 12.9324 19.4723 12.5028 19.9167C12.0732 20.3611 11.3768 20.3611 10.9472 19.9167L4.07218 12.8046C3.64261 12.3602 3.64261 11.6398 4.07218 11.1954L10.9472 4.08329C11.3768 3.6389 12.0732 3.6389 12.5028 4.08329Z"
                  fill="#004DA9"
                />
              </svg>
              <div className="text-[#004DA9] text-lg font-semibold">返回</div>
            </button>
          </div>
          <div className="w-[1px] h-6 bg-[#B6C2DA]"></div>
          <div className="text-[#3D526C] text-2xl font-semibold">查看报告</div>
        </div>

        <div className="flex items-center gap-9">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-[100px] h-12 pt-3 flex-col justify-between items-center rounded-t-3xl ${
                  activeTab === tab.id ? "text-[#324459]" : "text-[#7E90B0]"
                }`}
              >
                <div className="text-lg font-semibold">{tab.label}</div>
                {activeTab === tab.id && (
                  <div className="w-16 h-1 bg-[#004DA9] rounded"></div>
                )}
              </button>
            ))}
          </div>

          <div className="w-[1px] h-6 bg-[#B6C2DA]"></div>

          <button className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
              <path
                d="M3.52441 16.5967V15.6328C3.52446 15.0944 3.96155 14.6572 4.5 14.6572C5.03845 14.6572 5.47554 15.0944 5.47559 15.6328V16.5967C5.47559 17.1176 5.67561 17.6113 6.02344 17.9707C6.37059 18.3291 6.83533 18.5244 7.3125 18.5244H16.6875L16.8662 18.5156C17.2792 18.4732 17.6729 18.2841 17.9766 17.9707C18.3244 17.6113 18.5244 17.1176 18.5244 16.5967V15.6284C18.5247 15.0902 18.9617 14.6543 19.5 14.6543C20.0383 14.6543 20.4753 15.0902 20.4756 15.6284V16.5967C20.4756 17.6154 20.0837 18.5991 19.377 19.3286C18.6692 20.0591 17.7021 20.4756 16.6875 20.4756H7.3125C6.29786 20.4756 5.33078 20.0591 4.62305 19.3286C3.91633 18.5991 3.52441 17.6154 3.52441 16.5967ZM11.0244 4.5C11.0244 3.96152 11.4615 3.52441 12 3.52441C12.5385 3.52441 12.9756 3.96152 12.9756 4.5V12.7368L14.5811 11.0801C14.9557 10.6933 15.5727 10.6834 15.9595 11.0581C16.3462 11.4328 16.3561 12.0498 15.9814 12.4365L12.7002 15.8232C12.5165 16.0128 12.264 16.1206 12 16.1206C11.736 16.1206 11.4835 16.0128 11.2998 15.8232L8.01855 12.4365L7.89551 12.2812C7.652 11.899 7.7023 11.3858 8.04053 11.0581C8.37898 10.7302 8.89362 10.6967 9.26807 10.9526L9.41895 11.0801L11.0244 12.7368V4.5Z"
                fill="white"
              />
            </svg>
            <div className="text-white text-lg font-semibold">下载报告</div>
          </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div
        className="w-[1328px] bg-white rounded-3xl relative"
        style={{ height: "4053px" }}
      >
        {/* Background Decorations */}
        <div className="absolute left-[-48px] top-0 w-[198px] h-[198px] opacity-20">
          <svg className="w-full h-full" viewBox="0 0 150 198" fill="none">
            <g opacity="0.2">
              <path
                d="M53.8184 145.387C54.0102 145.537 54.2106 145.676 54.4184 145.803C54.2097 145.678 54.0093 145.539 53.8184 145.387Z"
                fill="#FEC619"
              />
              <path
                d="M115.251 82.3433C114.752 83.9694 114.142 85.5593 113.425 87.102C112.766 88.508 112.021 89.8718 111.194 91.1857C101.605 91.4069 89.3917 89.4457 75.9444 85.2983C72.2013 84.1366 68.5583 82.6743 65.0508 80.9258C66.4283 80.3408 67.7508 79.7908 69.0182 79.2758C79.0606 75.1996 96.0104 67.8835 115.251 82.3433Z"
                fill="#FEC619"
              />
              <path
                d="M11.8756 168.209L9.55439 169.218C8.60787 169.63 7.58667 169.843 6.55442 169.843C5.52217 169.843 4.50098 169.63 3.55446 169.218L1.22949 168.209L2.23823 170.534C2.6501 171.481 2.86265 172.502 2.86265 173.534C2.86265 174.567 2.6501 175.588 2.23823 176.534L1.22949 178.856L3.55446 177.847C4.50144 177.437 5.52245 177.225 6.55442 177.225C7.5864 177.225 8.60741 177.437 9.55439 177.847L11.8756 178.856L10.8669 176.534C10.4567 175.587 10.2451 174.566 10.2451 173.534C10.2451 172.502 10.4567 171.481 10.8669 170.534L11.8756 168.209Z"
                fill="#FFA300"
              />
              <path
                d="M4.79342 150.465L6.10591 147.131C6.64183 145.774 7.45091 144.54 8.483 143.508C9.51509 142.476 10.7482 141.667 12.1058 141.131L15.4395 139.819L12.1058 138.503C10.748 137.967 9.51466 137.158 8.48252 136.126C7.45039 135.094 6.64144 133.861 6.10591 132.503L4.79342 129.169L3.47719 132.503C2.94166 133.861 2.13271 135.094 1.10057 136.126C0.0684338 137.158 -1.16486 137.967 -2.52274 138.503L-5.85645 139.819L-2.52274 141.131C-1.16509 141.667 0.0680051 142.476 1.10009 143.508C2.13218 144.54 2.94127 145.774 3.47719 147.131L4.79342 150.465Z"
                fill="#FFA300"
              />
              <path
                d="M23.8489 150.24L22.5364 146.906L21.2202 150.24C20.6845 151.598 19.8755 152.831 18.8433 153.863C17.8112 154.895 16.578 155.704 15.2203 156.24L11.8828 157.556L15.2203 158.872C16.5784 159.407 17.8119 160.216 18.8441 161.248C19.8762 162.281 20.6851 163.514 21.2202 164.872L22.5364 168.206L23.8489 164.872C24.3839 163.514 25.1926 162.28 26.2248 161.248C27.257 160.216 28.4906 159.407 29.8488 158.872L33.1825 157.556L29.8488 156.24C28.491 155.704 27.2577 154.895 26.2255 153.863C25.1934 152.831 24.3844 151.598 23.8489 150.24Z"
                fill="#FFA300"
              />
              <path
                d="M111.865 19.25L115.214 27.7436C116.578 31.2036 118.64 34.3462 121.27 36.9762C123.9 39.6062 127.042 41.6675 130.502 43.0322L139 46.3847L130.502 49.7409C127.042 51.1047 123.9 53.1653 121.27 55.7947C118.64 58.4241 116.578 61.5661 115.214 65.0257L111.865 73.5231L108.513 65.0257C107.148 61.5661 105.086 58.4241 102.456 55.7947C99.8264 53.1653 96.6838 51.1047 93.224 49.7409L84.7266 46.3884L93.224 43.0359C96.6843 41.6709 99.8271 39.609 102.457 36.9783C105.087 34.3476 107.148 31.2043 108.513 27.7436L111.865 19.25Z"
                fill="#004DA9"
              />
            </g>
          </svg>
        </div>

        <img
          className="absolute left-[1px] top-[150px] w-[1330px] h-[221px] opacity-20"
          src="https://api.builder.io/api/v1/image/assets/TEMP/7a3bf534d4114fa51a6b2af3c7ad76b0fa342c17?width=2660"
          alt=""
        />

        {/* Foreword Section */}
        <div className="absolute left-0 top-0 w-full h-[375px]">
          <div className="flex w-full max-w-[1232px] mx-auto justify-center items-end gap-16 px-12 pt-8 h-[241px]">
            {/* Title Section */}
            <div className="flex w-[221px] flex-col items-start gap-1 flex-shrink-0">
              <div className="text-[#3D526C] text-center text-2xl font-semibold w-full">
                心理沙盘AI动态识别
              </div>
              <div className="text-[#303133] text-[48px] font-bold tracking-[9.6px] w-full text-center">
                分析报告
              </div>
            </div>

            {/* Separator */}
            <div className="w-[1px] h-[241px] bg-[#E2E7F0]"></div>

            {/* Description Text */}
            <div className="flex-1 text-[#3D526C] text-base leading-8">
              心理沙盘游戏治疗，又称箱庭疗法或沙箱疗法，是一种以荣格心理学原理为基础，由多拉卡尔夫·发展创立的心理治疗方法。沙盘游戏是运用意象(积极想象)进行治疗��创造形式，沙盘中所表现的系列沙盘意象，营造
              出沙盘游戏者心灵深处意识和无意识之间的持续性对话，以及由此而激发的治愈过程和人格(灵性与自性化的)发展。
              <br />
              <br />
              智能心理沙盘作为一种非言语的心理治疗工具，能够直观地反映出个体的内心世界、情绪状态、人际关系和自我认知等方面。本报告旨在详细记录心理沙盘治疗过程中的信息，辅助心理师更加全面地了解来访者的内心世界和治疗进展，从而制定更加精准和有效的治疗计划。同时，这些记录也为后续的治疗效果评估和科研研究提供了宝贵的数据支持。本次测试遵循专业伦理，确保来访的隐私得到严格保护。
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="absolute left-12 top-[368px] w-[1232px] flex flex-col gap-16">
          {/* Basic Information Section */}
          <div className="w-[936px] flex flex-col gap-8">
            {/* Section Header */}
            <div className="flex items-center gap-4 w-full">
              <h2 className="text-[#7E90B0] text-2xl font-semibold">
                基本信息
              </h2>
              <div className="flex-1 h-[1px] bg-[#B6C2DA]"></div>
            </div>

            {/* Information Grid */}
            <div className="flex items-center gap-24">
              {/* Left Column */}
              <div className="w-[136px] flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-8 text-[#7E90B0] text-base leading-7">
                    姓名
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.name}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-8 text-[#7E90B0] text-base leading-7">
                    性别
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.gender}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-8 text-[#7E90B0] text-base leading-7">
                    班级
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.class}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-8 text-[#7E90B0] text-base leading-7">
                    学号
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.studentId}
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="w-[1px] h-[160px] bg-[#E2E7F0]"></div>

              {/* Middle Column */}
              <div className="w-[230px] flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 text-[#7E90B0] text-base leading-7">
                    记录形式
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.recordType}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-[#7E90B0] text-base leading-7">
                    开始时间
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.startTime}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 text-[#7E90B0] text-base leading-7">
                    结束时间
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.endTime}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 text-[#7E90B0] text-base leading-7">
                    总耗时
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.duration}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="w-[184px] flex flex-col gap-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 text-[#7E90B0] text-base leading-7">
                    沙盘类型
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.sandboxType}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 text-[#7E90B0] text-base leading-7">
                    模具总数
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.toolCount}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-[#7E90B0] text-base leading-7">
                    第一个模具
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.firstTool}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-[#7E90B0] text-base leading-7">
                    最后一个模具
                  </div>
                  <div className="text-[#303133] text-base font-semibold">
                    {mockReportData.lastTool}
                  </div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="flex h-[342px] items-start gap-4 w-full">
              {mockReportData.images.map((image, index) => (
                <div
                  key={index}
                  className="flex-1 aspect-[148/83] rounded-2xl overflow-hidden relative"
                >
                  <img
                    src={image}
                    alt={`沙盘成品${index + 1}`}
                    className="w-full h-full object-cover"
                    style={{
                      transform: `scale(1.1) translate(${index % 2 === 0 ? "-10%" : "-5%"}, -8%)`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="w-[936px] flex flex-col gap-12">
            {/* Section Header */}
            <div className="flex items-center gap-4 w-full">
              <h2 className="text-[#7E90B0] text-2xl font-semibold">
                沙盘统计
              </h2>
              <div className="flex-1 h-[1px] bg-[#B6C2DA]"></div>
            </div>

            {/* First Row of Categories */}
            <div className="flex items-start gap-8 w-full">
              {mockCategoryData.map((category, index) => (
                <div key={index} className="flex-1 flex flex-col gap-3">
                  {/* Category Header */}
                  <div className="h-[60px] px-4 flex justify-between items-center bg-[#EEF1FA] rounded-3xl">
                    <div className="text-[#7E90B0] text-lg font-semibold">
                      {category.name}
                    </div>
                    <div className="px-3 py-0.5 bg-[#004DA9] rounded-2xl">
                      <div className="text-white text-xl font-semibold">
                        {category.total}
                      </div>
                    </div>
                  </div>

                  {/* Category Items */}
                  <div className="flex flex-col gap-1">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex px-4 py-2 items-center gap-2"
                      >
                        <div className="text-[#3D526C] text-base leading-7">
                          {item.name}
                        </div>
                        <div className="flex-1 h-[1px] bg-[#E2E7F0]"></div>
                        <div className="text-[#004DA9] text-base font-semibold">
                          {item.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row of Categories */}
            <div className="flex items-start gap-8 w-full">
              {secondRowCategoryData.map((category, index) => (
                <div key={index} className="flex-1 flex flex-col gap-3">
                  {/* Category Header */}
                  <div className="h-[60px] px-4 flex justify-between items-center bg-[#EEF1FA] rounded-3xl">
                    <div className="text-[#7E90B0] text-lg font-semibold">
                      {category.name}
                    </div>
                    <div className="px-3 py-0.5 bg-[#004DA9] rounded-2xl">
                      <div className="text-white text-xl font-semibold">
                        {category.total}
                      </div>
                    </div>
                  </div>

                  {/* Category Items */}
                  <div className="flex flex-col gap-1">
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex px-4 py-2 items-center gap-2"
                      >
                        <div className="text-[#3D526C] text-base leading-7">
                          {item.name}
                        </div>
                        <div className="flex-1 h-[1px] bg-[#E2E7F0]"></div>
                        <div className="text-[#004DA9] text-base font-semibold">
                          {item.count}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Separator Line */}
            <div className="w-[936px] h-[1px] bg-[#E2E7F0]"></div>

            {/* Color Statistics */}
            <div className="flex flex-col items-start gap-8 w-full">
              {colorData.map((color, index) => (
                <div
                  key={index}
                  className="flex px-3 justify-center items-start gap-6 w-full"
                >
                  <div className="flex justify-between items-start flex-1">
                    <div className="flex w-14 items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 flex-shrink-0"
                        style={
                          color.color.includes("gradient")
                            ? { background: color.color }
                            : { backgroundColor: color.color }
                        }
                      />
                      <div className="text-[#7E90B0] text-base leading-7">
                        {color.name}
                      </div>
                    </div>
                    <div className="text-[#3D526C] text-base font-semibold">
                      {color.percentage}
                    </div>
                    <div className="text-[#3D526C] text-base font-semibold">
                      {color.count}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-start gap-2">
                    {renderColorSquares(color.squares, color.color)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Results Section */}
          <div className="w-[936px] flex flex-col gap-12">
            {/* Section Header */}
            <div className="flex items-center gap-4 w-full">
              <h2 className="text-[#7E90B0] text-2xl font-semibold">
                分析结果
              </h2>
              <div className="flex-1 h-[1px] bg-[#B6C2DA]"></div>
            </div>

            {/* Analysis Content */}
            <div className="flex flex-col justify-center items-end gap-4 w-full">
              <div className="text-[#324459] text-lg font-semibold w-full">
                沙具选择及象征
              </div>
              <div className="text-[#3D526C] text-base leading-8 w-full">
                来访在第一个沙具摆放之前大概用时XX分。在第X个和第X个沙具之间的时间较长，用时为X分。来访使用的沙具总数为
                ，其中，XX种类占比做多。这可能代表了来访内心的想法、感受或者曾经的经历。来访在第一个沙具摆放之前大概用时XX分。在第X个和第X个沙具之间的时间较长，用时为X分。来访使用的沙具总数为
                ，其中，XX种类占比做多。这可能代表了来访内心的想法、感受或者曾经的经历。
              </div>

              {/* Special Note */}
              <div className="w-[912px] px-6 py-4 flex flex-col items-start gap-2 border-l-[5px] border-[#CB2F2F] bg-[#F4F4F5]">
                <div className="text-[#CB2F2F] text-base font-semibold w-full">
                  特��情况
                </div>
                <div className="text-[#324459] text-base leading-8 w-full">
                  来访在摆放过程中，在将沙具X摆放沙盘之后，可能又将其移回到摆架上；或将沙具X埋在沙子里；或进行了其他处理，这个沙具可能对来访有着特殊意义，需要一定的关注。来访在摆放过程中，在将沙具X摆放沙盘之后，可能又将其移回到摆架上；或将沙具X埋在沙子里；或进行了其他处理，这个沙具可能对来访有着特殊意义，需要一定的关注。
                </div>
              </div>
            </div>

            {/* Layout Analysis */}
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="text-[#324459] text-lg font-semibold w-full">
                整体布局分析
              </div>
              <div className="text-[#3D526C] text-base leading-8 w-full">
                沙具摆放的位置大都集中在XX/沙具均衡地分散在沙盘各处，占据了较大的面积/占据了较小的面积，这可能表示来访者内心世界丰富，有较多的想法、情感或经历需要表达。/这可能表明来访者内心相对封闭或保守，在某些方面缺乏自信或安全感，不愿意过多地展示自己的内心世界。
                <br />
                沙具的���向指向左边/右边，这说明来访目前的某些方面进展不多/有一定的进展/还处于思考阶段。
              </div>
            </div>

            {/* Color Analysis */}
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="text-[#324459] text-lg font-semibold w-full">
                色彩搭配分析
              </div>
              <div className="text-[#3D526C] text-base leading-8 w-full">
                沙具的选择以XX颜色巨多，这可能表示来访的人格特点是
                ，对应的情绪特点是。
              </div>
            </div>

            {/* Self-awareness Analysis */}
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="text-[#324459] text-lg font-semibold w-full">
                自我认知及安全感分析
              </div>
              <div className="text-[#3D526C] text-base leading-8 w-full">
                来访在制作沙盘的过程中，有/没有言语表达，这是来访对自己内心世界进行认知和整合的过程，并且可能会通过言语表达来释放内心的压力、痛苦或焦虑。沙盘制作过程中的言语表达能更直接地揭示来访者的内心世界，包括他们的情感、想法、经历以及潜意识的冲突和愿望。/这可能表明来访正在思考，或者是还未建立良好的信任关系，或是来访还未完成内在的整合，不知道该如何表达，来访者可能不知道该说什么，或者不确定什么是治疗师希望知道的，什么是重要的叙述内容。
              </div>
            </div>
          </div>

          {/* Final Separator Line */}
          <div className="w-[1229px] h-[1px] bg-[#E2E7F0]"></div>
        </div>

        {/* Disclaimer */}
        <div className="absolute left-[196px] top-[3808px] w-[936px] h-7 text-[#7E90B0] text-center text-base leading-7">
          *报告内容由AI生成，免责声明一段话，免责声明一段话，免责声明一段话，免责声明一段话，免责声明一段话。
        </div>

        {/* Side Widgets */}
        <div className="absolute right-[18px] top-[664px] w-24 flex flex-col gap-6">
          {/* Highlight Tool */}
          <div className="w-24 h-24 rounded-full bg-[#FFA300] flex items-center justify-center">
            <svg className="w-[54px] h-[54px]" viewBox="0 0 53 54" fill="none">
              <path
                d="M10.125 3.375C9.22989 3.375 8.37145 3.73058 7.73851 4.36351C7.10558 4.99645 6.75 5.85489 6.75 6.75V15.1875C6.75 16.5302 7.28337 17.8178 8.23277 18.7672C9.18217 19.7166 10.4698 20.25 11.8125 20.25C11.7562 20.25 11.7 20.2534 11.6438 20.2601H11.988L11.8125 20.25H12.6428V20.2601H41.4821V20.25H42.1909L42.0187 20.2601H42.363L42.1875 20.25H42.1909C43.5335 20.25 44.8212 19.7166 45.7706 18.7672C46.72 17.8178 47.2534 16.5302 47.2534 15.1875V6.75C47.2534 5.85489 46.8978 4.99645 46.2649 4.36351C45.6319 3.73058 44.7735 3.375 43.8784 3.375H10.125ZM10.1284 23.6351C10.1311 25.4236 10.8434 27.1379 12.109 28.4016C13.3746 29.6652 15.0899 30.375 16.8784 30.375H37.1284C38.9168 30.375 40.6322 29.6652 41.8978 28.4016C43.1633 27.1379 43.8757 25.4236 43.8784 23.6351H10.1284ZM16.8851 48.9375V33.75H37.1318V36.2475C37.1335 37.0971 36.9215 37.9335 36.5151 38.6796C36.1087 39.4257 35.5211 40.0575 34.8064 40.5169L19.4839 50.3584C19.2289 50.522 18.9345 50.6139 18.6318 50.6245C18.329 50.6351 18.0289 50.564 17.7631 50.4187C17.4973 50.2734 17.2755 50.0591 17.121 49.7985C16.9665 49.5379 16.885 49.2405 16.8851 48.9375Z"
                fill="white"
              />
            </svg>
          </div>

          {/* Note Tool */}
          <div className="w-24 h-24 rounded-full bg-[#FFA300] flex items-center justify-center">
            <svg className="w-[54px] h-[54px]" viewBox="0 0 53 54" fill="none">
              <path
                d="M42.75 29.25C44.325 29.25 45.8325 29.5425 47.25 30.0375V20.25L33.75 6.75H11.25C8.7525 6.75 6.75 8.7525 6.75 11.25V42.75C6.75 43.9435 7.22411 45.0881 8.06802 45.932C8.91193 46.7759 10.0565 47.25 11.25 47.25H30.0375C29.5425 45.8325 29.25 44.325 29.25 42.75C29.25 35.3025 35.3025 29.25 42.75 29.25ZM31.5 10.125L43.875 22.5H31.5V10.125ZM51.75 40.5V45H45V51.75H40.5V45H33.75V40.5H40.5V33.75H45V40.5H51.75Z"
                fill="white"
              />
            </svg>
          </div>
        </div>

        {/* Sticky Notes */}
        <div className="absolute right-[20px] top-[1075px] w-[260px] border-t-[6px] border-[#FEC619] bg-[#FCF3D6] px-6 py-6 pb-4">
          <div className="text-[#606266] text-base leading-7">
            便签内容文本，便签内容文本便签内容文本便签内容文本便签内容文本便签内容文本便签内容文本便签内容文本便签内容文本。
          </div>
        </div>

        <div className="absolute right-[20px] top-[1775px] w-[260px] border-t-[6px] border-[#FEC619] bg-[#FCF3D6] px-6 py-6 pb-4">
          <textarea
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            placeholder="请输入便签内容……"
            className="w-full text-[#909399] bg-transparent resize-none outline-none text-base leading-7 placeholder-[#909399]"
            rows={1}
          />
        </div>
      </div>
    </div>
  );
}
