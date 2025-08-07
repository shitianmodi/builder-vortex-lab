import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AppState = 'binding' | 'success' | 'failure' | 'login';

export default function Index() {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState<AppState>('binding');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    schoolCode: '',
    username: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleVerification = () => {
    // Simulate verification - you can add real logic here
    if (formData.schoolCode && formData.username && formData.password) {
      setCurrentState('success');
    } else {
      setCurrentState('failure');
    }
  };

  const handleStartUsing = () => {
    setCurrentState('login');
  };

  const handleLogin = () => {
    // Navigate to dashboard after login
    navigate('/dashboard');
  };

  const handleRetryInput = () => {
    setCurrentState('binding');
  };

  const renderBindingForm = () => (
    <div className="bg-white rounded-3xl p-6 lg:p-8 w-full max-w-2xl ml-4 sm:ml-8">
      <h3 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8 text-gray-700">
        初次使用前请绑定学校
      </h3>
      
      <div className="space-y-6">
        {/* School Code Input */}
        <div className="flex items-center gap-4 lg:gap-6">
          <label className="text-base min-w-fit text-gray-600">
            学校代码
          </label>
          <div className="flex-1 h-14 lg:h-16 px-3 flex items-center rounded-2xl bg-gray-100">
            <input
              type="text"
              placeholder="请输入学校代码"
              value={formData.schoolCode}
              onChange={(e) => handleInputChange('schoolCode', e.target.value)}
              className="w-full bg-transparent outline-none text-base text-gray-500"
            />
          </div>
        </div>

        {/* Username Input */}
        <div className="flex items-center gap-4 lg:gap-6">
          <label className="text-base min-w-fit text-right w-12 lg:w-16 text-gray-600">
            账号
          </label>
          <div className="flex-1 h-14 lg:h-16 px-3 flex items-center gap-3 rounded-2xl bg-gray-100">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M22.6666 7.99999C22.6666 11.6819 19.6819 14.6667 16 14.6667C12.3181 14.6667 9.33331 11.6819 9.33331 7.99999C9.33331 4.3181 12.3181 1.33333 16 1.33333C19.6819 1.33333 22.6666 4.3181 22.6666 7.99999Z" fill="#A8ABB2"/>
              <path d="M5.33331 25.3333C5.33331 20.1787 9.51199 16 14.6666 16H17.3333C22.488 16 26.6666 20.1787 26.6666 25.3333V28C26.6666 28.7364 26.0697 29.3333 25.3333 29.3333H6.66665C5.93027 29.3333 5.33331 28.7364 5.33331 28V25.3333Z" fill="#A8ABB2"/>
            </svg>
            <input
              type="text"
              placeholder="请输入您的云平台账号"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="flex-1 bg-transparent outline-none text-base text-gray-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex items-center gap-4 lg:gap-6">
          <label className="text-base min-w-fit text-right w-12 lg:w-16 text-gray-600">
            密码
          </label>
          <div className="flex-1 h-14 lg:h-16 px-3 flex items-center justify-between rounded-2xl bg-gray-100">
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
                className="flex-1 bg-transparent outline-none text-base text-gray-500"
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
      <div className="my-6 lg:my-8">
        <div className="h-px w-full bg-gray-300"></div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-base text-gray-500">
          验证通过后不可修改绑定的学校
        </span>
        
        <button 
          onClick={handleVerification}
          className="px-6 py-3 rounded-2xl bg-blue-700 text-white text-lg font-semibold min-w-[160px] lg:min-w-[200px]"
        >
          验证
        </button>
      </div>
    </div>
  );

  const renderSuccessState = () => (
    <div className="bg-white rounded-3xl p-6 lg:p-8 w-full max-w-2xl ml-4 sm:ml-8">
      <h3 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8" style={{ color: 'var(--text-b2)' }}>
        初次使用前请绑定学校
      </h3>
      
      {/* Success Message */}
      <div 
        className="flex justify-center items-center gap-4 flex-1 rounded-2xl p-6 mb-8"
        style={{ backgroundColor: 'rgba(13, 128, 44, 0.08)' }}
      >
        <div className="w-30 h-30 relative">
          <svg width="96" height="96" viewBox="0 0 97 96" fill="none">
            <path d="M48.5 0C75.0097 1.03082e-06 96.5 21.4903 96.5 48C96.5 74.5097 75.0097 96 48.5 96C21.9903 96 0.5 74.5097 0.5 48C0.5 21.4903 21.9903 0 48.5 0ZM76.5732 33.0469C74.3238 30.7975 70.6762 30.7975 68.4268 33.0469L42.7402 58.7334L28.8926 44.8867L28.6777 44.6826C26.4167 42.6399 22.9262 42.7078 20.7471 44.8867C18.568 47.0658 18.4991 50.5573 20.542 52.8184L20.7471 53.0332L36.4043 68.6895C39.9034 72.1886 45.5761 72.1885 49.0752 68.6895L76.5732 41.1934C78.8226 38.944 78.8225 35.2963 76.5732 33.0469Z" fill="#0D802C"/>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl lg:text-3xl font-semibold" style={{ color: 'var(--text-b1)' }}>
            验证通过！
          </h4>
          <p className="text-lg" style={{ color: 'var(--text-b2)' }}>
            已绑定： 学校名称一行字
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-base" style={{ color: 'var(--text-b3)' }}>
          验证通过后不可修改绑定的学校
        </span>
        
        <button 
          onClick={handleStartUsing}
          className="px-6 py-3 rounded-2xl text-white text-lg font-semibold min-w-[160px] lg:min-w-[200px]"
          style={{ backgroundColor: 'var(--theme-blue-00)' }}
        >
          开始使用
        </button>
      </div>
    </div>
  );

  const renderFailureState = () => (
    <div className="bg-white rounded-3xl p-6 lg:p-8 w-full max-w-2xl ml-4 sm:ml-8">
      <h3 className="text-xl lg:text-2xl font-semibold mb-6 lg:mb-8" style={{ color: 'var(--text-b2)' }}>
        初次使用前请绑定学校
      </h3>
      
      {/* Failure Message */}
      <div 
        className="flex justify-center items-center gap-4 flex-1 rounded-2xl p-6 mb-8"
        style={{ backgroundColor: 'rgba(203, 47, 47, 0.08)' }}
      >
        <div className="w-30 h-30 relative">
          <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
            <circle cx="48" cy="48" r="48" fill="#CB2F2F"/>
            <path d="M32 32l32 32m0-32L32 64" stroke="white" strokeWidth="6" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-2xl lg:text-3xl font-semibold" style={{ color: 'var(--text-b1)' }}>
            验证未通过！
          </h4>
          <p className="text-base" style={{ color: 'var(--text-b2)' }}>
            请检查学校ID或激活码是否输入正确
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-base" style={{ color: 'var(--text-b3)' }}>
          验证通过后不可修改绑定的学校
        </span>
        
        <button 
          onClick={handleRetryInput}
          className="px-6 py-3 rounded-2xl text-white text-lg font-semibold min-w-[160px] lg:min-w-[200px]"
          style={{ backgroundColor: 'var(--info-r1)' }}
        >
          重新输入
        </button>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <div className="bg-white rounded-3xl p-6 lg:p-8 w-full max-w-2xl ml-4 sm:ml-8">
      <div className="flex items-center gap-6 mb-6 lg:mb-8">
        <h3 className="text-xl lg:text-2xl font-semibold" style={{ color: 'var(--text-b2)' }}>
          登录
        </h3>
        <span className="text-base tracking-widest" style={{ color: 'var(--text-b3)' }}>
          /LOGIN
        </span>
      </div>
      
      <div className="space-y-6">
        {/* Username Input */}
        <div className="flex items-center gap-4 lg:gap-6">
          <label className="text-base min-w-fit text-gray-600">
            账号
          </label>
          <div className="flex-1 h-14 lg:h-16 px-3 flex items-center gap-3 rounded-2xl bg-gray-100">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M22.6666 8.00004C22.6666 11.6819 19.6819 14.6667 16 14.6667C12.3181 14.6667 9.33331 11.6819 9.33331 8.00004C9.33331 4.31814 12.3181 1.33337 16 1.33337C19.6819 1.33337 22.6666 4.31814 22.6666 8.00004Z" fill="#A8ABB2"/>
              <path d="M5.33331 25.3333C5.33331 20.1787 9.51199 16 14.6666 16H17.3333C22.488 16 26.6666 20.1787 26.6666 25.3333V28C26.6666 28.7364 26.0697 29.3333 25.3333 29.3333H6.66665C5.93027 29.3333 5.33331 28.7364 5.33331 28V25.3333Z" fill="#A8ABB2"/>
            </svg>
            <input
              type="text"
              placeholder="请输入您的云平台账号"
              className="flex-1 bg-transparent outline-none text-base text-gray-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="flex items-center gap-4 lg:gap-6">
          <label className="text-base min-w-fit text-gray-600">
            密码
          </label>
          <div className="flex-1 h-14 lg:h-16 px-3 flex items-center justify-between rounded-2xl bg-gray-100">
            <div className="flex items-center gap-3 flex-1">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M20 10.6667V8.00004C20 5.7909 18.2091 4.00004 16 4.00004C13.7908 4.00004 12 5.7909 12 8.00004V10.6667H20ZM16 1.33337C12.3181 1.33337 9.33331 4.31814 9.33331 8.00004V13.3334H22.6666V8.00004C22.6666 4.31814 19.6819 1.33337 16 1.33337Z" fill="#A8ABB2"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M6.66665 10.6666C5.93027 10.6666 5.33331 11.2636 5.33331 12V28C5.33331 28.7363 5.93027 29.3333 6.66665 29.3333H25.3333C26.0697 29.3333 26.6666 28.7363 26.6666 28V12C26.6666 11.2636 26.0697 10.6666 25.3333 10.6666H6.66665ZM16 22.6666C17.4727 22.6666 18.6666 21.4727 18.6666 20C18.6666 18.5272 17.4727 17.3333 16 17.3333C14.5272 17.3333 13.3333 18.5272 13.3333 20C13.3333 21.4727 14.5272 22.6666 16 22.6666Z" fill="#A8ABB2"/>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="请输入您的云平台密码"
                className="flex-1 bg-transparent outline-none text-base text-gray-500"
              />
            </div>
            <button 
              onClick={() => setShowPassword(!showPassword)}
              className="p-1"
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M2.66669 16C3.8252 9.93189 9.354 5.33337 15.9994 5.33337C22.6448 5.33337 28.1736 9.93189 29.3334 16C28.1748 22.0682 22.6448 26.6667 15.9994 26.6667C9.354 26.6667 3.8252 22.0682 2.66669 16ZM15.9994 21.926C17.6337 21.926 19.2011 21.3016 20.3568 20.1903C21.5124 19.079 22.1617 17.5717 22.1617 16C22.1617 14.4284 21.5124 12.9211 20.3568 11.8098C19.2011 10.6985 17.6337 10.0741 15.9994 10.0741C14.3651 10.0741 12.7977 10.6985 11.642 11.8098C10.4864 12.9211 9.83712 14.4284 9.83712 16C9.83712 17.5717 10.4864 19.079 11.642 20.1903C12.7977 21.3016 14.3651 21.926 15.9994 21.926ZM15.9994 19.5556C15.0188 19.5556 14.0784 19.181 13.385 18.5142C12.6916 17.8474 12.302 16.943 12.302 16C12.302 15.057 12.6916 14.1527 13.385 13.4859C14.0784 12.8191 15.0188 12.4445 15.9994 12.4445C16.98 12.4445 17.9204 12.8191 18.6138 13.4859C19.3072 14.1527 19.6968 15.057 19.6968 16C19.6968 16.943 19.3072 17.8474 18.6138 18.5142C17.9204 19.181 16.98 19.5556 15.9994 19.5556Z" fill="#A8ABB2"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 lg:my-8">
        <div className="h-px w-full" style={{ backgroundColor: 'var(--frame-b1)' }}></div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-base" style={{ color: 'var(--text-b3)' }}>
          忘记密码请联系学校设备管理员
        </span>
        
        <button
          onClick={handleLogin}
          className="px-6 py-3 rounded-2xl text-white text-lg font-semibold min-w-[160px] lg:min-w-[200px]"
          style={{ backgroundColor: 'var(--theme-blue-00)' }}
        >
          登录
        </button>
      </div>
    </div>
  );

  const getCurrentForm = () => {
    switch (currentState) {
      case 'binding':
        return renderBindingForm();
      case 'success':
        return renderSuccessState();
      case 'failure':
        return renderFailureState();
      case 'login':
        return renderLoginForm();
      default:
        return renderBindingForm();
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/2a0a7ce7d4a0d5848c8121f506c9ac49ff2fd82e?width=2880')"
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-between px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {/* Left Section - Branding */}
        <div className="flex flex-col items-start gap-4 max-w-md">
          {/* Decorative Icon */}
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <img 
              src="https://api.builder.io/api/v1/image/assets/TEMP/95148d1d1e4fa8a979be1c985ab71a04a0a44f93?width=400"
              alt="心理沙盘图标"
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 xl:w-50 xl:h-50 object-contain"
            />
          </div>
          
          {/* Title and Subtitle */}
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-white text-4xl lg:text-5xl xl:text-6xl font-bold tracking-widest">
              心理沙盘
            </h1>
            
            <h2 className="text-white text-2xl lg:text-3xl xl:text-4xl font-medium tracking-wider">
              AI动态识别分析系统
            </h2>
            
            {/* Version Badge */}
            <div className="inline-flex px-4 py-2 justify-center items-center rounded-full bg-blue-300 self-start">
              <span className="text-lg lg:text-xl xl:text-2xl font-semibold text-blue-900">
                MindAI-PSD M1
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Dynamic Form */}
        {getCurrentForm()}
      </div>
    </div>
  );
}
