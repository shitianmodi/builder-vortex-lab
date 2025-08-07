import { useState } from 'react';

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    schoolCode: '',
    username: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/2a0a7ce7d4a0d5848c8121f506c9ac49ff2fd82e?width=2880')"
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-between px-8 lg:px-16 xl:px-24">
        {/* Left Section - Branding */}
        <div className="flex flex-col items-start gap-4 max-w-md">
          {/* Decorative Icon */}
          <div className="mb-8">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/95148d1d1e4fa8a979be1c985ab71a04a0a44f93?width=400"
              alt="Heart icon"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-50 xl:h-50 object-contain"
            />
          </div>
          
          {/* Title and Subtitle */}
          <div className="flex flex-col gap-4 w-full">
            <h1 
              className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-wider"
              style={{ fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif', letterSpacing: '4.8px' }}
            >
              心理沙盘
            </h1>
            
            <h2 
              className="text-white text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wider"
              style={{ fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif', letterSpacing: '3.6px' }}
            >
              AI动态识别分析系统
            </h2>
            
            {/* Version Badge */}
            <div 
              className="inline-flex px-4 py-2 justify-center items-center rounded-full self-start"
              style={{ backgroundColor: 'var(--bg-b3)' }}
            >
              <span 
                className="text-lg sm:text-xl lg:text-2xl font-semibold"
                style={{ 
                  color: 'var(--theme-blue-1)',
                  fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
                }}
              >
                MindAI-PSD M1
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="bg-white rounded-3xl p-8 w-full max-w-2xl ml-8">
          <h3 
            className="text-2xl font-semibold mb-8"
            style={{ 
              color: 'var(--text-b2)',
              fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
            }}
          >
            初次使用前请绑定学校
          </h3>
          
          <div className="space-y-6">
            {/* School Code Input */}
            <div className="flex items-center gap-6">
              <label 
                className="text-base min-w-fit"
                style={{ 
                  color: 'var(--text-g2)',
                  fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
                }}
              >
                学校代码
              </label>
              <div 
                className="flex-1 h-16 px-3 flex items-center rounded-2xl"
                style={{ backgroundColor: 'var(--bg-w2)' }}
              >
                <input
                  type="text"
                  placeholder="请输入学校代码"
                  value={formData.schoolCode}
                  onChange={(e) => handleInputChange('schoolCode', e.target.value)}
                  className="w-full bg-transparent outline-none text-base"
                  style={{ 
                    color: 'var(--text-g4)',
                    fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
                  }}
                />
              </div>
            </div>

            {/* Username Input */}
            <div className="flex items-center gap-6">
              <label 
                className="text-base min-w-fit text-right w-16"
                style={{ 
                  color: 'var(--text-g2)',
                  fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
                }}
              >
                账号
              </label>
              <div 
                className="flex-1 h-16 px-3 flex items-center gap-3 rounded-2xl"
                style={{ backgroundColor: 'var(--bg-w2)' }}
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M22.6666 7.99999C22.6666 11.6819 19.6819 14.6667 16 14.6667C12.3181 14.6667 9.33331 11.6819 9.33331 7.99999C9.33331 4.3181 12.3181 1.33333 16 1.33333C19.6819 1.33333 22.6666 4.3181 22.6666 7.99999Z" fill="#A8ABB2"/>
                  <path d="M5.33331 25.3333C5.33331 20.1787 9.51199 16 14.6666 16H17.3333C22.488 16 26.6666 20.1787 26.6666 25.3333V28C26.6666 28.7364 26.0697 29.3333 25.3333 29.3333H6.66665C5.93027 29.3333 5.33331 28.7364 5.33331 28V25.3333Z" fill="#A8ABB2"/>
                </svg>
                <input
                  type="text"
                  placeholder="请输入您的云平台账号"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="flex-1 bg-transparent outline-none text-base"
                  style={{ 
                    color: 'var(--text-g4)',
                    fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
                  }}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="flex items-center gap-6">
              <label 
                className="text-base min-w-fit text-right w-16"
                style={{ 
                  color: 'var(--text-g2)',
                  fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
                }}
              >
                密码
              </label>
              <div 
                className="flex-1 h-16 px-3 flex items-center justify-between rounded-2xl"
                style={{ backgroundColor: 'var(--bg-w2)' }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 10.6667V8C20 5.79086 18.2091 3.99999 16 3.99999C13.7908 3.99999 12 5.79086 12 8V10.6667H20ZM16 1.33333C12.3181 1.33333 9.33331 4.3181 9.33331 8V13.3333H22.6666V8C22.6666 4.3181 19.6819 1.33333 16 1.33333Z" fill="#A8ABB2"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.66665 10.6667C5.93027 10.6667 5.33331 11.2636 5.33331 12V28C5.33331 28.7364 5.93027 29.3333 6.66665 29.3333H25.3333C26.0697 29.3333 26.6666 28.7364 26.6666 28V12C26.6666 11.2636 26.0697 10.6667 25.3333 10.6667H6.66665ZM16 22.6667C17.4727 22.6667 18.6666 21.4728 18.6666 20C18.6666 18.5272 17.4727 17.3333 16 17.3333C14.5272 17.3333 13.3333 18.5272 13.3333 20C13.3333 21.4728 14.5272 22.6667 16 22.6667Z" fill="#A8ABB2"/>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="请输入您的云平台密码"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="flex-1 bg-transparent outline-none text-base"
                    style={{ 
                      color: 'var(--text-g4)',
                      fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
                    }}
                  />
                </div>
                <button 
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1"
                >
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M2.66669 16C3.8252 9.93185 9.354 5.33333 15.9994 5.33333C22.6448 5.33333 28.1736 9.93185 29.3334 16C28.1748 22.0681 22.6448 26.6667 15.9994 26.6667C9.354 26.6667 3.8252 22.0681 2.66669 16ZM15.9994 21.9259C17.6337 21.9259 19.2011 21.3016 20.3568 20.1903C21.5124 19.0789 22.1617 17.5716 22.1617 16C22.1617 14.4283 21.5124 12.9211 20.3568 11.8097C19.2011 10.6984 17.6337 10.0741 15.9994 10.0741C14.3651 10.0741 12.7977 10.6984 11.642 11.8097C10.4864 12.9211 9.83712 14.4283 9.83712 16C9.83712 17.5716 10.4864 19.0789 11.642 20.1903C12.7977 21.3016 14.3651 21.9259 15.9994 21.9259ZM15.9994 19.5556C15.0188 19.5556 14.0784 19.181 13.385 18.5142C12.6916 17.8474 12.302 16.943 12.302 16C12.302 15.057 12.6916 14.1526 13.385 13.4858C14.0784 12.819 15.0188 12.4444 15.9994 12.4444C16.98 12.4444 17.9204 12.819 18.6138 13.4858C19.3072 14.1526 19.6968 15.057 19.6968 16C19.6968 16.943 19.3072 17.8474 18.6138 18.5142C17.9204 19.181 16.98 19.5556 15.9994 19.5556Z" fill="#A8ABB2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-8">
            <div 
              className="h-px w-full"
              style={{ backgroundColor: 'var(--frame-b1)' }}
            ></div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <span 
              className="text-base"
              style={{ 
                color: 'var(--text-b3)',
                fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
              }}
            >
              验证通过后不可修改绑定的学校
            </span>
            
            <button 
              className="px-4 py-3 rounded-2xl text-white text-lg font-semibold min-w-[200px]"
              style={{ 
                backgroundColor: 'var(--theme-blue-00)',
                fontFamily: 'HONOR Sans CN, -apple-system, Roboto, Helvetica, sans-serif'
              }}
            >
              验证
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
