import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NoteEditorProps {}

const NoteEditor: React.FC<NoteEditorProps> = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(10);
  const [tool, setTool] = useState<"pen" | "keyboard" | "eraser">("pen");
  const [textContent, setTextContent] =
    useState(`输入的内容，输入的内容输入的内容输入的内容。输入的内容输入的内容，输入的内容输入的内容。输入的内容输入的内容输入的内容输入的内容，输入��内容输入的内容输入的内容，输入的内容输入的内容。
输入的内容，输入的内容输入的内容输入的内容。输入的内容输入的内容，输入的内容输入的内容。输入的内容输入的内容输入的内容输入的内容，输入的内容输入的内容输入的内容，输入的内容输入的内容。`);
  const [currentTime, setCurrentTime] = useState({ minutes: 0, seconds: 0 });
  const [showExitModal, setShowExitModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);

  const colors = [
    "#000000",
    "#7F7F7F",
    "#880015",
    "#ED1C24",
    "#FF7F27",
    "#FFF200",
    "#22B14C",
    "#00A2E8",
    "#3F48CC",
    "#A349A4",
  ];

  const brushSizes = [10, 15, 20, 25];

  const handleExit = () => {
    // Check if there are unsaved changes
    const hasUnsavedChanges = textContent.trim() !== "" || tool === "pen";
    if (hasUnsavedChanges) {
      setShowExitModal(true);
    } else {
      navigate("/photo-capture");
    }
  };

  const handleSave = () => {
    setShowSaveModal(true);
    // Simulate save process
    setTimeout(() => {
      setShowSaveModal(false);
      navigate("/photo-capture");
    }, 1500);
  };

  const adjustTime = (seconds: number) => {
    const totalSeconds = currentTime.minutes * 60 + currentTime.seconds + seconds;
    const newMinutes = Math.floor(Math.max(0, totalSeconds) / 60);
    const newSeconds = Math.max(0, totalSeconds) % 60;
    setCurrentTime({ minutes: newMinutes, seconds: newSeconds });
  };

  const quickInputOptions = [
    { label: "上一个沙具", action: () => console.log("Previous toy") },
    { label: "上一次语音", action: () => console.log("Previous voice") },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 904;
    canvas.height = 400;

    // Set default drawing properties
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== "pen" && tool !== "eraser") return;

    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || (tool !== "pen" && tool !== "eraser")) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = brushSize * 2;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
    }
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  return (
    <div className="min-h-screen bg-[#EEF1FA] p-14">
      {/* Header */}
      <div className="flex justify-between items-center w-full h-12 mb-8">
        <div className="flex items-center gap-9">
          <div className="flex items-center gap-4">
            <button
              onClick={handleExit}
              className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl border border-[#CB2F2F]"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z"
                  fill="#CB2F2F"
                />
              </svg>
              <span className="text-[#CB2F2F] text-lg font-semibold">退出</span>
            </button>
          </div>

          <div className="w-0.5 h-6 bg-[#B6C2DA]"></div>

          <div className="flex items-center gap-2">
            <h1 className="text-[#3D526C] text-2xl font-semibold">插入笔记</h1>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9]"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8271 0.75C13.0716 0.750008 13.3046 0.796049 13.5264 0.887695C13.7482 0.979362 13.9429 1.10929 14.1104 1.27734L16.7227 3.88965C16.8907 4.0577 17.0206 4.25278 17.1123 4.47461C17.2039 4.69639 17.25 4.92908 17.25 5.17285V15.417C17.2499 15.921 17.0706 16.3527 16.7119 16.7119C16.3533 17.0712 15.9216 17.2505 15.417 17.25H2.58301C2.079 17.2499 1.6477 17.0705 1.28906 16.7119C0.930418 16.3533 0.750688 15.9216 0.75 15.417V2.58301C0.750077 2.07898 0.929806 1.64771 1.28906 1.28906C1.64832 0.930418 2.07959 0.750688 2.58301 0.75H12.8271ZM2.58301 2.58301V15.417H4.27441V9C4.27441 8.46152 4.71152 8.02441 5.25 8.02441H12.75C13.2885 8.02441 13.7256 8.46152 13.7256 9V15.417H15.417V5.19629L12.8037 2.58301H2.58301ZM6.22559 15.417H11.7744V9.97559H6.22559V15.417Z"
              fill="white"
            />
          </svg>
          <span className="text-white text-lg font-semibold">保存</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full h-[768px] bg-white rounded-3xl flex">
        {/* Left Panel - Time Controls and Image Previews */}
        <div className="w-80 p-6 flex flex-col justify-between h-full">
          {/* Time Controls Section */}
          <div className="flex flex-col gap-4">
            {/* Time Display */}
            <div className="flex justify-between items-center">
              <span className="text-[#324459] text-base">时间</span>
              <div className="flex items-center gap-3">
                <div className="flex w-15 px-3 py-3 items-center border border-[#B6C2DA] rounded-lg">
                  <span className="text-[#7E90B0] text-base">
                    {currentTime.minutes.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[#324459] text-base">分</span>
                <div className="flex w-15 px-3 py-3 items-center border border-[#B6C2DA] rounded-lg">
                  <span className="text-[#7E90B0] text-base">
                    {currentTime.seconds.toString().padStart(2, "0")}
                  </span>
                </div>
                <span className="text-[#324459] text-base">秒</span>
              </div>
            </div>

            {/* Quick Input Section */}
            <div className="flex items-center gap-4">
              <span className="text-[#7E90B0] text-base">快速输入</span>
              <div className="flex-1 h-px bg-[#E2E7F0]"></div>
            </div>

            {/* Time Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => adjustTime(-30)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors flex-1"
              >
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.20083 2.29902C6.44979 2.54798 6.44979 2.95163 6.20083 3.20059L2.90161 6.4998L6.20083 9.79902C6.44979 10.048 6.44979 10.4516 6.20083 10.7006C5.95187 10.9495 5.54823 10.9495 5.29927 10.7006L1.54927 6.95059C1.30031 6.70163 1.30031 6.29798 1.54927 6.04902L5.29927 2.29902C5.54823 2.05006 5.95187 2.05006 6.20083 2.29902Z"
                    fill="#7E90B0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4508 2.29902C11.6998 2.54798 11.6998 2.95163 11.4508 3.20059L8.15161 6.4998L11.4508 9.79902C11.6998 10.048 11.6998 10.4516 11.4508 10.7006C11.2019 10.9495 10.7982 10.9495 10.5493 10.7006L6.79927 6.95059C6.55031 6.70163 6.55031 6.29798 6.79927 6.04902L10.5493 2.29902C10.7982 2.05006 11.2019 2.05006 11.4508 2.29902Z"
                    fill="#7E90B0"
                  />
                </svg>
                <span className="text-[#7E90B0] text-base">30s</span>
              </button>
              <button
                onClick={() => adjustTime(-10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors flex-1"
              >
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.20083 2.29902C6.44979 2.54798 6.44979 2.95163 6.20083 3.20059L2.90161 6.4998L6.20083 9.79902C6.44979 10.048 6.44979 10.4516 6.20083 10.7006C5.95187 10.9495 5.54823 10.9495 5.29927 10.7006L1.54927 6.95059C1.30031 6.70163 1.30031 6.29798 1.54927 6.04902L5.29927 2.29902C5.54823 2.05006 5.95187 2.05006 6.20083 2.29902Z"
                    fill="#7E90B0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.4508 2.29902C11.6998 2.54798 11.6998 2.95163 11.4508 3.20059L8.15161 6.4998L11.4508 9.79902C11.6998 10.048 11.6998 10.4516 11.4508 10.7006C11.2019 10.9495 10.7982 10.9495 10.5493 10.7006L6.79927 6.95059C6.55031 6.70163 6.55031 6.29798 6.79927 6.04902L10.5493 2.29902C10.7982 2.05006 11.2019 2.05006 11.4508 2.29902Z"
                    fill="#7E90B0"
                  />
                </svg>
                <span className="text-[#7E90B0] text-base">10s</span>
              </button>
              <button
                onClick={() => adjustTime(10)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors flex-1"
              >
                <span className="text-[#7E90B0] text-base">10s</span>
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.79917 2.29902C6.55021 2.54798 6.55021 2.95163 6.79917 3.20059L10.0984 6.4998L6.79917 9.79902C6.55021 10.048 6.55021 10.4516 6.79917 10.7006C7.04813 10.9495 7.45177 10.9495 7.70073 10.7006L11.4507 6.95059C11.6997 6.70163 11.6997 6.29798 11.4507 6.04902L7.70073 2.29902C7.45177 2.05006 7.04813 2.05006 6.79917 2.29902Z"
                    fill="#7E90B0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.54917 2.29902C1.30021 2.54798 1.30021 2.95163 1.54917 3.20059L4.84839 6.4998L1.54917 9.79902C1.30021 10.048 1.30021 10.4516 1.54917 10.7006C1.79813 10.9495 2.20177 10.9495 2.45073 10.7006L6.20073 6.95059C6.44969 6.70163 6.44969 6.29798 6.20073 6.04902L2.45073 2.29902C2.20177 2.05006 1.79813 2.05006 1.54917 2.29902Z"
                    fill="#7E90B0"
                  />
                </svg>
              </button>
              <button
                onClick={() => adjustTime(30)}
                className="flex items-center gap-1 px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors flex-1"
              >
                <span className="text-[#7E90B0] text-base">30s</span>
                <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.79917 2.29902C6.55021 2.54798 6.55021 2.95163 6.79917 3.20059L10.0984 6.4998L6.79917 9.79902C6.55021 10.048 6.55021 10.4516 6.79917 10.7006C7.04813 10.9495 7.45177 10.9495 7.70073 10.7006L11.4507 6.95059C11.6997 6.70163 11.6997 6.29798 11.4507 6.04902L7.70073 2.29902C7.45177 2.05006 7.04813 2.05006 6.79917 2.29902Z"
                    fill="#7E90B0"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.54917 2.29902C1.30021 2.54798 1.30021 2.95163 1.54917 3.20059L4.84839 6.4998L1.54917 9.79902C1.30021 10.048 1.30021 10.4516 1.54917 10.7006C1.79813 10.9495 2.20177 10.9495 2.45073 10.7006L6.20073 6.95059C6.44969 6.70163 6.44969 6.29798 6.20073 6.04902L2.45073 2.29902C2.20177 2.05006 1.79813 2.05006 1.54917 2.29902Z"
                    fill="#7E90B0"
                  />
                </svg>
              </button>
            </div>

            {/* Quick Input Options */}
            <div className="flex gap-3">
              {quickInputOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className="flex items-center justify-center px-3 py-2 border border-[#7E90B0] rounded-full hover:bg-gray-50 transition-colors flex-1"
                >
                  <span className="text-[#7E90B0] text-base">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Image Preview Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[#7E90B0] text-base">画面预览</span>
              <div className="flex-1 h-px bg-[#E2E7F0]"></div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F996e1a311f334b90ab1e392360db3489?format=webp&width=800"
                  alt="Preview 1"
                  className="w-full h-52 object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F90929bbd021a4e9f97f949635dec58cd?format=webp&width=800"
                  alt="Preview 2"
                  className="w-full h-52 object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-0.5 bg-[#EEF1FA]"></div>

        {/* Right Panel - Note Editor */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-6">
              {/* Tool Selection */}
              <div className="flex gap-6">
                <button
                  onClick={() => setTool("keyboard")}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    tool === "keyboard" ? "bg-[#EEF1FA]" : "bg-white"
                  }`}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.00016 26.6668C3.26683 26.6668 2.63927 26.4059 2.1175 25.8842C1.59572 25.3624 1.33438 24.7344 1.3335 24.0002V8.00016C1.3335 7.26683 1.59483 6.63927 2.1175 6.1175C2.64016 5.59572 3.26772 5.33438 4.00016 5.3335H28.0002C28.7335 5.3335 29.3615 5.59483 29.8842 6.1175C30.4068 6.64016 30.6677 7.26772 30.6668 8.00016V24.0002C30.6668 24.7335 30.4059 25.3615 29.8842 25.8842C29.3624 26.4068 28.7344 26.6677 28.0002 26.6668H4.00016ZM10.6668 22.6668H21.3335V20.0002H10.6668V22.6668ZM6.66683 18.0002H9.3335V15.3335H6.66683V18.0002ZM12.0002 18.0002H14.6668V15.3335H12.0002V18.0002ZM17.3335 18.0002H20.0002V15.3335H17.3335V18.0002ZM22.6668 18.0002H25.3335V15.3335H22.6668V18.0002ZM6.66683 13.3335H9.3335V10.6668H6.66683V13.3335ZM12.0002 13.3335H14.6668V10.6668H12.0002V13.3335ZM17.3335 13.3335H20.0002V10.6668H17.3335V13.3335ZM22.6668 13.3335H25.3335V10.6668H22.6668V13.3335Z"
                      fill="#004DA9"
                    />
                  </svg>
                </button>

                <button
                  onClick={() => setTool("pen")}
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    tool === "pen" ? "bg-[#EEF1FA]" : "bg-white"
                  }`}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.3667 16.6333L15.3667 11.6L19.0667 7.93333L18.1 6.96667L11.7333 13.3333C11.4667 13.6 11.1556 13.7333 10.8 13.7333C10.4444 13.7333 10.1333 13.6 9.86667 13.3333C9.6 13.0667 9.46667 12.7502 9.46667 12.384C9.46667 12.0178 9.6 11.7009 9.86667 11.4333L16.2 5.1C16.7333 4.56667 17.3613 4.3 18.084 4.3C18.8067 4.3 19.4342 4.56667 19.9667 5.1L20.9333 6.06667L22.6 4.4C22.8667 4.13333 23.1836 4 23.5507 4C23.9178 4 24.2342 4.13333 24.5 4.4L27.6 7.5C27.8667 7.76667 28 8.08356 28 8.45067C28 8.81778 27.8667 9.13422 27.6 9.4L20.3667 16.6333ZM5.33333 28C4.95556 28 4.63911 27.872 4.384 27.616C4.12889 27.36 4.00089 27.0436 4 26.6667V24.1C4 23.7444 4.06667 23.4053 4.2 23.0827C4.33333 22.76 4.52222 22.4769 4.76667 22.2333L13.4667 13.5L18.5 18.5L9.76667 27.2333C9.52222 27.4778 9.23911 27.6667 8.91733 27.8C8.59556 27.9333 8.25644 28 7.9 28H5.33333Z"
                      fill={tool === "pen" ? "#004DA9" : "#B6C2DA"}
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Brush Size and Color Palette */}
            <div className="flex items-center gap-2">
              {/* Brush Size Dropdown */}
              <div className="flex items-center px-6 py-1.5 gap-2">
                <span className="text-[#3D526C] text-base">{brushSize} px</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.6011 4.89906C13.2692 4.56711 12.731 4.56711 12.3991 4.89906L8.0001 9.29802L3.60114 4.89906C3.26919 4.56711 2.731 4.56711 2.39906 4.89906C2.06711 5.231 2.06711 5.76919 2.39906 6.10114L7.39906 11.1011C7.731 11.4331 8.26919 11.4331 8.60114 11.1011L13.6011 6.10114C13.9331 5.76919 13.9331 5.231 13.6011 4.89906Z"
                    fill="#3D526C"
                  />
                </svg>
              </div>

              {/* Color Palette */}
              {colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    currentColor === color
                      ? "border-[#B6C2DA]"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}

              {/* Separator */}
              <div className="w-px h-4 bg-[#E2E7F0]"></div>

              {/* Eraser Tool */}
              <button
                onClick={() => setTool("eraser")}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tool === "eraser" ? "bg-[#EEF1FA]" : "bg-transparent"
                }`}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M24.4994 23.3331H9.33275C9.0251 23.3338 8.72035 23.2736 8.43603 23.1561C8.15171 23.0386 7.89344 22.866 7.67609 22.6483L3.01642 17.9828C2.57899 17.5452 2.33325 16.9518 2.33325 16.3331C2.33325 15.7144 2.57899 15.121 3.01642 14.6834L14.6831 3.01676C14.8998 2.79999 15.157 2.62803 15.4402 2.51071C15.7233 2.39339 16.0268 2.33301 16.3333 2.33301C16.6398 2.33301 16.9433 2.39339 17.2265 2.51071C17.5096 2.62803 17.7669 2.79999 17.9836 3.01676L24.9824 10.0168C25.4199 10.4543 25.6656 11.0477 25.6656 11.6664C25.6656 12.2851 25.4199 12.8785 24.9824 13.3161L14.9724 23.3331M5.92842 11.7714L16.2278 22.0708"
                    stroke="#3D526C"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-[#E2E7F0] mb-8"></div>

          {/* Content Area */}
          <div className="flex-1 relative">
            {tool === "keyboard" ? (
              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                className="w-full h-36 text-[#303133] text-base leading-8 resize-none border-none outline-none bg-transparent"
                placeholder="输入笔记内容..."
              />
            ) : (
              <canvas
                ref={canvasRef}
                className={`absolute inset-0 ${
                  tool === "eraser" ? "cursor-pointer" : "cursor-crosshair"
                }`}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
            )}
          </div>
        </div>
      </div>

      {/* Exit Modal */}
      {showExitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-[#3D526C] mb-4">
              内容未保存
            </h3>
            <p className="text-[#909399] mb-6">
              当前页面有未保存的内容，确定要退出吗？
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowExitModal(false)}
                className="px-4 py-2 border border-[#B6C2DA] rounded-lg text-[#3D526C] hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowExitModal(false);
                  navigate("/photo-capture");
                }}
                className="px-4 py-2 bg-[#CB2F2F] text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                确定退出
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="#22C55E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#3D526C] mb-2 text-center">
              内容已保存
            </h3>
            <p className="text-[#909399] text-center">
              笔记内容已成功保存
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteEditor;
