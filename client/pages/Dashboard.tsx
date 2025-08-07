import { useState } from 'react';

export default function Dashboard() {
  const [selectedNav, setSelectedNav] = useState('home');
  const [videoOptions, setVideoOptions] = useState({
    content: 'sandbox', // 'sandbox' or 'both'
    sandType: 'wet' // 'wet' or 'dry'
  });
  const [photoOptions, setPhotoOptions] = useState({
    sandType: '' // 'wet' or 'dry'
  });

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().slice(0, 5);
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    const dayOfWeek = `周${days[now.getDay()]}`;
    
    return `${date}  ${time}    ${dayOfWeek}`;
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Navigation Sidebar */}
      <div
        className="fixed left-14 top-14 w-32 h-96 bg-blue-700 rounded-3xl flex flex-col justify-between items-center py-4 px-4 pb-6"
      >
        {/* Navigation Items */}
        <div className="flex flex-col gap-4 w-full">
          {/* Home */}
          <div
            className={`w-20 h-20 p-2 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedNav === 'home' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setSelectedNav('home')}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M12 38H18V28C18 27.4333 18.192 26.9587 18.576 26.576C18.96 26.1933 19.4347 26.0013 20 26H28C28.5667 26 29.042 26.192 29.426 26.576C29.81 26.96 30.0013 27.4347 30 28V38H36V20L24 11L12 20V38ZM8 38V20C8 19.3667 8.142 18.7667 8.426 18.2C8.71 17.6333 9.10133 17.1667 9.6 16.8L21.6 7.8C22.3 7.26667 23.1 7 24 7C24.9 7 25.7 7.26667 26.4 7.8L38.4 16.8C38.9 17.1667 39.292 17.6333 39.576 18.2C39.86 18.7667 40.0013 19.3667 40 20V38C40 39.1 39.608 40.042 38.824 40.826C38.04 41.61 37.0987 42.0013 36 42H28C27.4333 42 26.9587 41.808 26.576 41.424C26.1933 41.04 26.0013 40.5653 26 40V30H22V40C22 40.5667 21.808 41.042 21.424 41.426C21.04 41.81 20.5653 42.0013 20 42H12C10.9 42 9.95867 41.6087 9.176 40.826C8.39333 40.0433 8.00133 39.1013 8 38Z" 
                fill={selectedNav === 'home' ? 'white' : '#A8BDE8'} 
              />
            </svg>
            <span className={`text-sm ${selectedNav === 'home' ? 'text-white' : 'text-blue-300'}`}>
              主页
            </span>
          </div>

          {/* Data Center */}
          <div
            className={`w-20 h-20 p-2 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedNav === 'data' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setSelectedNav('data')}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M39 34.4444V15.5556C39 11.4604 32.1319 8 24 8C15.8681 8 9 11.4604 9 15.5556V34.4444C9 38.5396 15.8681 42 24 42C32.1319 42 39 38.5396 39 34.4444ZM24 11.7778C30.9206 11.7778 35.1206 14.6243 35.25 15.5442C35.1206 16.4868 30.9206 19.3333 24 19.3333C17.0794 19.3333 12.8794 16.4868 12.75 15.5669C12.8794 14.6243 17.0794 11.7778 24 11.7778ZM12.75 20.4799C15.5231 22.0798 19.5694 23.1111 24 23.1111C28.4306 23.1111 32.4769 22.0798 35.25 20.4799V24.9887C35.1206 25.9312 30.9206 28.7778 24 28.7778C17.0794 28.7778 12.8794 25.9312 12.75 25V20.4799ZM12.75 34.4444V29.9243C15.5231 31.5242 19.5694 32.5556 24 32.5556C28.4306 32.5556 32.4769 31.5242 35.25 29.9243V34.4331C35.1206 35.3757 30.9206 38.2222 24 38.2222C17.0794 38.2222 12.8794 35.3757 12.75 34.4444Z"
                fill="#A8BDE8"
              />
            </svg>
            <span className="text-sm text-blue-300">数据中心</span>
          </div>

          {/* Sandbox Management */}
          <div
            className={`w-20 h-20 p-2 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer ${
              selectedNav === 'sandbox' ? 'bg-blue-800' : ''
            }`}
            onClick={() => setSelectedNav('sandbox')}
          >
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 43H23.2727C22.7204 43 22.2727 42.5523 22.2727 42V31.6518C20.4245 33.3273 17.9545 34.3636 15.3636 34.3636C9.75 34.3636 5 29.6136 5 24V23.2727C5 22.7204 5.44772 22.2727 6 22.2727H16.3482C14.6727 20.4245 13.6364 17.9545 13.6364 15.3636C13.6364 9.75 18.3864 5 24 5H24.7273C25.2796 5 25.7273 5.44772 25.7273 6V16.3482C27.5755 14.6727 30.0455 13.6364 32.6364 13.6364C38.25 13.6364 43 18.3864 43 24V24.7273C43 25.2796 42.5523 25.7273 42 25.7273H31.6518C33.3273 27.5755 34.3636 30.0455 34.3636 32.6364C34.3636 38.25 29.6136 43 24 43ZM25.7273 25.9518V39.3209C28.6636 38.5264 30.9091 35.7973 30.9091 32.6364C30.9091 29.4755 28.6636 26.7464 25.7273 25.9518ZM8.67909 25.7273C9.47364 28.6636 12.2027 30.9091 15.3636 30.9091C18.5245 30.9091 21.2536 28.6636 22.0482 25.7273H8.67909ZM25.9518 22.2727H39.3209C38.5264 19.3364 35.78 17.0909 32.6364 17.0909C29.4927 17.0909 26.7464 19.3364 25.9518 22.2727ZM22.2727 8.67909C19.3364 9.47364 17.0909 12.22 17.0909 15.3636C17.0909 18.5073 19.3364 21.2536 22.2727 22.0482V8.67909Z" 
                fill="#A8BDE8" 
              />
            </svg>
            <span className="text-sm text-blue-300">沙具管理</span>
          </div>
        </div>

        {/* User Avatar */}
        <img 
          src="https://api.builder.io/api/v1/image/assets/TEMP/05114ceccd61297e06295e70e07c8025accaf9fa?width=128"
          alt="User avatar"
          className="w-16 h-16 rounded-full"
        />
      </div>

      {/* Main Content */}
      <div className="ml-44 pt-14 pr-14">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-b2)' }}>
            心理沙盘AI动态识别分析系统
          </h1>
          <div className="text-right text-base" style={{ color: 'var(--text-b3)' }}>
            <div>{getCurrentDateTime()}</div>
            <div>学校名称一行字</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Recognition Section */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8">
            {/* Hero Image */}
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/1a3db1aef1e535f2ddc0939bbb1ea8b45654f971?width=1152"
              alt="Video recognition"
              className="w-full h-60 object-cover rounded-lg mb-8"
            />
            
            <div className="flex gap-18">
              <h2 className="text-2xl font-semibold mb-8" style={{ color: 'var(--text-b1)' }}>
                录像识别
              </h2>
              
              <div className="flex-1 space-y-8">
                {/* Recording Content */}
                <div>
                  <label className="block text-base mb-4" style={{ color: 'var(--text-g2)' }}>
                    记录内容
                  </label>
                  <div className="space-y-4">
                    <div 
                      className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer border ${
                        videoOptions.content === 'sandbox' 
                          ? 'bg-blue-100 border-blue-100' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setVideoOptions({...videoOptions, content: 'sandbox'})}
                    >
                      <span className={`text-base font-semibold ${
                        videoOptions.content === 'sandbox' 
                          ? 'text-blue-800' 
                          : 'text-gray-600'
                      }`}>
                        仅沙盘
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        videoOptions.content === 'sandbox' 
                          ? 'border-blue-800 bg-blue-800' 
                          : 'border-gray-400'
                      }`}>
                        {videoOptions.content === 'sandbox' && (
                          <div className="w-2 h-2 bg-blue-800 rounded-full m-0.5"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer border ${
                        videoOptions.content === 'both' 
                          ? 'bg-blue-100 border-blue-100' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setVideoOptions({...videoOptions, content: 'both'})}
                    >
                      <span className={`text-base ${
                        videoOptions.content === 'both' 
                          ? 'text-blue-800 font-semibold' 
                          : 'text-gray-600'
                      }`}>
                        沙盘和语音
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        videoOptions.content === 'both' 
                          ? 'border-blue-800' 
                          : 'border-gray-400'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {/* Sand Type */}
                <div>
                  <label className="block text-base mb-4" style={{ color: 'var(--text-g2)' }}>
                    沙盘类型
                  </label>
                  <div className="space-y-4">
                    <div 
                      className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer border ${
                        videoOptions.sandType === 'wet' 
                          ? 'bg-blue-100 border-blue-100' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setVideoOptions({...videoOptions, sandType: 'wet'})}
                    >
                      <span className={`text-base font-semibold ${
                        videoOptions.sandType === 'wet' 
                          ? 'text-blue-800' 
                          : 'text-gray-600'
                      }`}>
                        湿沙
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        videoOptions.sandType === 'wet' 
                          ? 'border-blue-800 bg-blue-800' 
                          : 'border-gray-400'
                      }`}>
                        {videoOptions.sandType === 'wet' && (
                          <div className="w-2 h-2 bg-blue-800 rounded-full m-0.5"></div>
                        )}
                      </div>
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer border ${
                        videoOptions.sandType === 'dry' 
                          ? 'bg-blue-100 border-blue-100' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setVideoOptions({...videoOptions, sandType: 'dry'})}
                    >
                      <span className={`text-base ${
                        videoOptions.sandType === 'dry' 
                          ? 'text-blue-800 font-semibold' 
                          : 'text-gray-600'
                      }`}>
                        干沙
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        videoOptions.sandType === 'dry' 
                          ? 'border-blue-800' 
                          : 'border-gray-400'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button 
              className="w-full py-3 mt-8 rounded-2xl text-white text-2xl font-semibold"
              style={{ backgroundColor: 'var(--theme-blue-00)' }}
            >
              开始
            </button>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Photo Recognition Section */}
            <div className="bg-white rounded-3xl p-8">
              <img 
                src="https://api.builder.io/api/v1/image/assets/TEMP/a63355917a68208de2b6a340763ebbf8daa6f20d?width=808"
                alt="Photo recognition"
                className="w-full h-60 object-cover rounded-lg mb-8"
              />
              
              <div className="flex gap-18 mb-8">
                <h2 className="text-2xl font-semibold" style={{ color: 'var(--text-b1)' }}>
                  拍照识别
                </h2>
                
                <div className="flex-1">
                  <label className="block text-base mb-4" style={{ color: 'var(--text-g2)' }}>
                    沙盘类型
                  </label>
                  <div className="space-y-4">
                    <div 
                      className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer border ${
                        photoOptions.sandType === 'wet' 
                          ? 'bg-blue-100 border-blue-100' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setPhotoOptions({sandType: 'wet'})}
                    >
                      <span className={`text-base ${
                        photoOptions.sandType === 'wet' 
                          ? 'text-blue-800 font-semibold' 
                          : 'text-gray-600'
                      }`}>
                        湿沙
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        photoOptions.sandType === 'wet' 
                          ? 'border-blue-800' 
                          : 'border-gray-400'
                      }`}></div>
                    </div>
                    
                    <div 
                      className={`flex justify-between items-center p-4 rounded-2xl cursor-pointer border ${
                        photoOptions.sandType === 'dry' 
                          ? 'bg-blue-100 border-blue-100' 
                          : 'border-gray-300'
                      }`}
                      onClick={() => setPhotoOptions({sandType: 'dry'})}
                    >
                      <span className={`text-base ${
                        photoOptions.sandType === 'dry' 
                          ? 'text-blue-800 font-semibold' 
                          : 'text-gray-600'
                      }`}>
                        干沙
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        photoOptions.sandType === 'dry' 
                          ? 'border-blue-800' 
                          : 'border-gray-400'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disabled Start Button */}
              <button 
                className="w-full py-3 rounded-2xl text-white text-lg font-semibold bg-gray-400 cursor-not-allowed"
                disabled
              >
                开始
              </button>
            </div>

            {/* Recent Reports */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold" style={{ color: 'var(--text-b1)' }}>
                  过往识别
                </h3>
                <div className="flex items-center gap-1 cursor-pointer">
                  <span className="text-base" style={{ color: 'var(--text-b2)' }}>查看全部</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M8.39893 2.39886C8.06699 2.73081 8.06699 3.269 8.39893 3.60094L12.7979 7.9999L8.39893 12.3989C8.06699 12.7308 8.06699 13.269 8.39893 13.6009C8.73088 13.9329 9.26907 13.9329 9.60102 13.6009L14.601 8.60094C14.933 8.269 14.933 7.73081 14.601 7.39886L9.60102 2.39886C9.26907 2.06692 8.73088 2.06692 8.39893 2.39886Z" fill="#3D526C"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.39893 2.39886C1.06699 2.73081 1.06699 3.269 1.39893 3.60094L5.79789 7.9999L1.39893 12.3989C1.06699 12.7308 1.06699 13.269 1.39893 13.6009C1.73088 13.9329 2.26907 13.9329 2.60102 13.6009L7.60102 8.60094C7.93296 8.269 7.93296 7.73081 7.60102 7.39886L2.60102 2.39886C2.26907 2.06692 1.73088 2.06692 1.39893 2.39886Z" fill="#3D526C"/>
                  </svg>
                </div>
              </div>

              <div className="bg-white rounded-lg p-2">
                <div className="space-y-5">
                  {/* Report Item 1 */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6">
                      <span className="text-base" style={{ color: 'var(--text-b3)' }}>2000-01-00  12:00</span>
                      <span className="text-base" style={{ color: 'var(--text-b1)' }}>录像</span>
                      <span className="text-base font-semibold" style={{ color: 'var(--text-b1)' }}>张三</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-0.5 px-2 py-1 rounded-xl bg-blue-100">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.77778 12.375C6.60463 12.375 6.45959 12.315 6.34267 12.195C6.22574 12.075 6.16707 11.9267 6.16667 11.75C6.16626 11.5733 6.22493 11.425 6.34267 11.305C6.46041 11.185 6.60544 11.125 6.77778 11.125H12.8889C13.062 11.125 13.2073 11.185 13.3246 11.305C13.4419 11.425 13.5004 11.5733 13.5 11.75C13.4996 11.9267 13.4409 12.0752 13.324 12.1956C13.2071 12.316 13.062 12.3758 12.8889 12.375H6.77778ZM6.77778 8.62499C6.60463 8.62499 6.45959 8.56499 6.34267 8.44499C6.22574 8.32499 6.16707 8.17666 6.16667 7.99999C6.16626 7.82333 6.22493 7.67499 6.34267 7.55499C6.46041 7.43499 6.60544 7.37499 6.77778 7.37499H12.8889C13.062 7.37499 13.2073 7.43499 13.3246 7.55499C13.4419 7.67499 13.5004 7.82333 13.5 7.99999C13.4996 8.17666 13.4409 8.3252 13.324 8.44562C13.2071 8.56603 13.062 8.62583 12.8889 8.62499H6.77778ZM6.77778 4.875C6.60463 4.875 6.45959 4.815 6.34267 4.695C6.22574 4.575 6.16707 4.42667 6.16667 4.25C6.16626 4.07334 6.22493 3.925 6.34267 3.805C6.46041 3.685 6.60544 3.625 6.77778 3.625H12.8889C13.062 3.625 13.2073 3.685 13.3246 3.805C13.4419 3.925 13.5004 4.07334 13.5 4.25C13.4996 4.42667 13.4409 4.57521 13.324 4.69563C13.2071 4.81604 13.062 4.87583 12.8889 4.875H6.77778ZM3.72222 13C3.38611 13 3.09848 12.8777 2.85933 12.6331C2.62019 12.3885 2.50041 12.0942 2.5 11.75C2.49959 11.4058 2.61937 11.1117 2.85933 10.8675C3.0993 10.6233 3.38693 10.5008 3.72222 10.5C4.05752 10.4992 4.34535 10.6217 4.58572 10.8675C4.82609 11.1133 4.94567 11.4075 4.94444 11.75C4.94322 12.0925 4.82365 12.3869 4.58572 12.6331C4.3478 12.8794 4.05996 13.0017 3.72222 13ZM3.72222 9.24999C3.38611 9.24999 3.09848 9.1277 2.85933 8.88312C2.62019 8.63853 2.50041 8.34416 2.5 7.99999C2.49959 7.65583 2.61937 7.36166 2.85933 7.1175C3.0993 6.87333 3.38693 6.75083 3.72222 6.75C4.05752 6.74916 4.34535 6.87166 4.58572 7.1175C4.82609 7.36333 4.94567 7.65749 4.94444 7.99999C4.94322 8.34249 4.82365 8.63687 4.58572 8.88312C4.3478 9.12937 4.05996 9.25166 3.72222 9.24999ZM3.72222 5.5C3.38611 5.5 3.09848 5.37771 2.85933 5.13312C2.62019 4.88854 2.50041 4.59417 2.5 4.25C2.49959 3.90584 2.61937 3.61167 2.85933 3.3675C3.0993 3.12334 3.38693 3.00084 3.72222 3C4.05752 2.99917 4.34535 3.12167 4.58572 3.3675C4.82609 3.61334 4.94567 3.9075 4.94444 4.25C4.94322 4.5925 4.82365 4.88688 4.58572 5.13312C4.3478 5.37937 4.05996 5.50167 3.72222 5.5Z" fill="#004DA9"/>
                        </svg>
                        <span className="text-sm" style={{ color: 'var(--theme-blue-00)' }}>日志</span>
                      </div>
                      <div className="px-2 py-1">
                        <span className="text-sm" style={{ color: 'var(--text-b3)' }}>生成中</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200"></div>

                  {/* Report Item 2 */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6">
                      <span className="text-base" style={{ color: 'var(--text-b3)' }}>2000-01-00  12:00</span>
                      <span className="text-base" style={{ color: 'var(--text-b1)' }}>录像</span>
                      <span className="text-base font-semibold" style={{ color: 'var(--text-b1)' }}>李四</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-0.5 px-2 py-1 rounded-xl bg-blue-100">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.77778 12.375C6.60463 12.375 6.45959 12.315 6.34267 12.195C6.22574 12.075 6.16707 11.9267 6.16667 11.75C6.16626 11.5733 6.22493 11.425 6.34267 11.305C6.46041 11.185 6.60544 11.125 6.77778 11.125H12.8889C13.062 11.125 13.2073 11.185 13.3246 11.305C13.4419 11.425 13.5004 11.5733 13.5 11.75C13.4996 11.9267 13.4409 12.0752 13.324 12.1956C13.2071 12.316 13.062 12.3758 12.8889 12.375H6.77778ZM6.77778 8.62499C6.60463 8.62499 6.45959 8.56499 6.34267 8.44499C6.22574 8.32499 6.16707 8.17666 6.16667 7.99999C6.16626 7.82333 6.22493 7.67499 6.34267 7.55499C6.46041 7.43499 6.60544 7.37499 6.77778 7.37499H12.8889C13.062 7.37499 13.2073 7.43499 13.3246 7.55499C13.4419 7.67499 13.5004 7.82333 13.5 7.99999C13.4996 8.17666 13.4409 8.3252 13.324 8.44562C13.2071 8.56603 13.062 8.62583 12.8889 8.62499H6.77778ZM6.77778 4.875C6.60463 4.875 6.45959 4.815 6.34267 4.695C6.22574 4.575 6.16707 4.42667 6.16667 4.25C6.16626 4.07334 6.22493 3.925 6.34267 3.805C6.46041 3.685 6.60544 3.625 6.77778 3.625H12.8889C13.062 3.625 13.2073 3.685 13.3246 3.805C13.4419 3.925 13.5004 4.07334 13.5 4.25C13.4996 4.42667 13.4409 4.57521 13.324 4.69563C13.2071 4.81604 13.062 4.87583 12.8889 4.875H6.77778ZM3.72222 13C3.38611 13 3.09848 12.8777 2.85933 12.6331C2.62019 12.3885 2.50041 12.0942 2.5 11.75C2.49959 11.4058 2.61937 11.1117 2.85933 10.8675C3.0993 10.6233 3.38693 10.5008 3.72222 10.5C4.05752 10.4992 4.34535 10.6217 4.58572 10.8675C4.82609 11.1133 4.94567 11.4075 4.94444 11.75C4.94322 12.0925 4.82365 12.3869 4.58572 12.6331C4.3478 12.8794 4.05996 13.0017 3.72222 13ZM3.72222 9.24999C3.38611 9.24999 3.09848 9.1277 2.85933 8.88312C2.62019 8.63853 2.50041 8.34416 2.5 7.99999C2.49959 7.65583 2.61937 7.36166 2.85933 7.1175C3.0993 6.87333 3.38693 6.75083 3.72222 6.75C4.05752 6.74916 4.34535 6.87166 4.58572 7.1175C4.82609 7.36333 4.94567 7.65749 4.94444 7.99999C4.94322 8.34249 4.82365 8.63687 4.58572 8.88312C4.3478 9.12937 4.05996 9.25166 3.72222 9.24999ZM3.72222 5.5C3.38611 5.5 3.09848 5.37771 2.85933 5.13312C2.62019 4.88854 2.50041 4.59417 2.5 4.25C2.49959 3.90584 2.61937 3.61167 2.85933 3.3675C3.0993 3.12334 3.38693 3.00084 3.72222 3C4.05752 2.99917 4.34535 3.12167 4.58572 3.3675C4.82609 3.61334 4.94567 3.9075 4.94444 4.25C4.94322 4.5925 4.82365 4.88688 4.58572 5.13312C4.3478 5.37937 4.05996 5.50167 3.72222 5.5Z" fill="#004DA9"/>
                        </svg>
                        <span className="text-sm" style={{ color: 'var(--theme-blue-00)' }}>���志</span>
                      </div>
                      <div className="px-2 py-1">
                        <span className="text-sm" style={{ color: 'var(--text-b3)' }}>待检查</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200"></div>

                  {/* Report Item 3 */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-6">
                      <span className="text-base" style={{ color: 'var(--text-b3)' }}>2000-01-00  12:00</span>
                      <span className="text-base" style={{ color: 'var(--text-b1)' }}>拍照</span>
                      <span className="text-base font-semibold" style={{ color: 'var(--text-b1)' }}>王五</span>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-0.5 px-2 py-1 rounded-xl bg-blue-100">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.77778 12.375C6.60463 12.375 6.45959 12.315 6.34267 12.195C6.22574 12.075 6.16707 11.9267 6.16667 11.75C6.16626 11.5733 6.22493 11.425 6.34267 11.305C6.46041 11.185 6.60544 11.125 6.77778 11.125H12.8889C13.062 11.125 13.2073 11.185 13.3246 11.305C13.4419 11.425 13.5004 11.5733 13.5 11.75C13.4996 11.9267 13.4409 12.0752 13.324 12.1956C13.2071 12.316 13.062 12.3758 12.8889 12.375H6.77778ZM6.77778 8.62499C6.60463 8.62499 6.45959 8.56499 6.34267 8.44499C6.22574 8.32499 6.16707 8.17666 6.16667 7.99999C6.16626 7.82333 6.22493 7.67499 6.34267 7.55499C6.46041 7.43499 6.60544 7.37499 6.77778 7.37499H12.8889C13.062 7.37499 13.2073 7.43499 13.3246 7.55499C13.4419 7.67499 13.5004 7.82333 13.5 7.99999C13.4996 8.17666 13.4409 8.3252 13.324 8.44562C13.2071 8.56603 13.062 8.62583 12.8889 8.62499H6.77778ZM6.77778 4.875C6.60463 4.875 6.45959 4.815 6.34267 4.695C6.22574 4.575 6.16707 4.42667 6.16667 4.25C6.16626 4.07334 6.22493 3.925 6.34267 3.805C6.46041 3.685 6.60544 3.625 6.77778 3.625H12.8889C13.062 3.625 13.2073 3.685 13.3246 3.805C13.4419 3.925 13.5004 4.07334 13.5 4.25C13.4996 4.42667 13.4409 4.57521 13.324 4.69563C13.2071 4.81604 13.062 4.87583 12.8889 4.875H6.77778ZM3.72222 13C3.38611 13 3.09848 12.8777 2.85933 12.6331C2.62019 12.3885 2.50041 12.0942 2.5 11.75C2.49959 11.4058 2.61937 11.1117 2.85933 10.8675C3.0993 10.6233 3.38693 10.5008 3.72222 10.5C4.05752 10.4992 4.34535 10.6217 4.58572 10.8675C4.82609 11.1133 4.94567 11.4075 4.94444 11.75C4.94322 12.0925 4.82365 12.3869 4.58572 12.6331C4.3478 12.8794 4.05996 13.0017 3.72222 13ZM3.72222 9.24999C3.38611 9.24999 3.09848 9.1277 2.85933 8.88312C2.62019 8.63853 2.50041 8.34416 2.5 7.99999C2.49959 7.65583 2.61937 7.36166 2.85933 7.1175C3.0993 6.87333 3.38693 6.75083 3.72222 6.75C4.05752 6.74916 4.34535 6.87166 4.58572 7.1175C4.82609 7.36333 4.94567 7.65749 4.94444 7.99999C4.94322 8.34249 4.82365 8.63687 4.58572 8.88312C4.3478 9.12937 4.05996 9.25166 3.72222 9.24999ZM3.72222 5.5C3.38611 5.5 3.09848 5.37771 2.85933 5.13312C2.62019 4.88854 2.50041 4.59417 2.5 4.25C2.49959 3.90584 2.61937 3.61167 2.85933 3.3675C3.0993 3.12334 3.38693 3.00084 3.72222 3C4.05752 2.99917 4.34535 3.12167 4.58572 3.3675C4.82609 3.61334 4.94567 3.9075 4.94444 4.25C4.94322 4.5925 4.82365 4.88688 4.58572 5.13312C4.3478 5.37937 4.05996 5.50167 3.72222 5.5Z" fill="#004DA9"/>
                        </svg>
                        <span className="text-sm" style={{ color: 'var(--theme-blue-00)' }}>日志</span>
                      </div>
                      <div className="flex items-center gap-0.5 px-2 py-1 rounded-xl" style={{ backgroundColor: 'var(--theme-blue-00)' }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6.125 8C5.94792 8 5.79958 7.9424 5.68 7.8272C5.56042 7.712 5.50042 7.5696 5.5 7.4C5.49958 7.2304 5.55958 7.088 5.68 6.9728C5.80042 6.8576 5.94875 6.8 6.125 6.8H9.875C10.0521 6.8 10.2006 6.8576 10.3206 6.9728C10.4406 7.088 10.5004 7.2304 10.5 7.4C10.4996 7.5696 10.4396 7.7122 10.32 7.8278C10.2004 7.9434 10.0521 8.0008 9.875 8H6.125ZM6.125 5.6C5.94792 5.6 5.79958 5.5424 5.68 5.4272C5.56042 5.312 5.50042 5.1696 5.5 5C5.49958 4.8304 5.55958 4.688 5.68 4.5728C5.80042 4.4576 5.94875 4.4 6.125 4.4H9.875C10.0521 4.4 10.2006 4.4576 10.3206 4.5728C10.4406 4.688 10.5004 4.8304 10.5 5C10.4996 5.1696 10.4396 5.3122 10.32 5.4278C10.2004 5.5434 10.0521 5.6008 9.875 5.6H6.125ZM4.25 9.2H8.9375C9.23958 9.2 9.52083 9.2626 9.78125 9.3878C10.0417 9.513 10.2604 9.6904 10.4375 9.92L11.75 11.57V3.2H4.25V9.2ZM4.25 12.8H11.1562L9.45312 10.655C9.39062 10.575 9.31521 10.5126 9.22687 10.4678C9.13854 10.423 9.04208 10.4004 8.9375 10.4H4.25V12.8ZM11.75 14H4.25C3.90625 14 3.61208 13.8826 3.3675 13.6478C3.12292 13.413 3.00042 13.1304 3 12.8V3.2C3 2.87 3.1225 2.5876 3.3675 2.3528C3.6125 2.118 3.90667 2.0004 4.25 2H11.75C12.0937 2 12.3881 2.1176 12.6331 2.3528C12.8781 2.588 13.0004 2.8704 13 3.2V12.8C13 13.13 12.8777 13.4126 12.6331 13.6478C12.3885 13.883 12.0942 14.0004 11.75 14Z" fill="white"/>
                        </svg>
                        <span className="text-sm text-white">报告</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
