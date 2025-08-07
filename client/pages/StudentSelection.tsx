import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentSelection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');

  const handleSearch = () => {
    setHasSearched(true);
    // Simulate search - in real app, this would call an API
    if (searchQuery.trim()) {
      // For demo, show some sample results if search term is "test" or "学生"
      if (searchQuery.toLowerCase().includes('test') || searchQuery.includes('学生')) {
        setSearchResults(['张三', '李四', '王五']);
      } else {
        setSearchResults([]);
      }
    }
  };

  const handleExit = () => {
    navigate('/dashboard');
  };

  const handleStart = () => {
    if (selectedStudent) {
      // Navigate to video recording page
      navigate('/video-recording');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://api.builder.io/api/v1/image/assets/TEMP/32a3bef554ba90b476ddd7fd28c0c1d541f262ad?width=2880')"
        }}
      />
      
      {/* Exit Button */}
      <button 
        onClick={handleExit}
        className="fixed top-14 right-14 z-20 flex items-center gap-2 px-4 py-2 rounded-2xl border border-red-500 bg-white hover:bg-red-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 13.597L6.41065 19.1863C6.20152 19.3954 5.93536 19.5 5.61217 19.5C5.28897 19.5 5.02281 19.3954 4.81369 19.1863C4.60456 18.9772 4.5 18.711 4.5 18.3878C4.5 18.0646 4.60456 17.7985 4.81369 17.5894L10.403 12L4.81369 6.41065C4.60456 6.20152 4.5 5.93536 4.5 5.61217C4.5 5.28897 4.60456 5.02281 4.81369 4.81369C5.02281 4.60456 5.28897 4.5 5.61217 4.5C5.93536 4.5 6.20152 4.60456 6.41065 4.81369L12 10.403L17.5894 4.81369C17.7985 4.60456 18.0646 4.5 18.3878 4.5C18.711 4.5 18.9772 4.60456 19.1863 4.81369C19.3954 5.02281 19.5 5.28897 19.5 5.61217C19.5 5.93536 19.3954 6.20152 19.1863 6.41065L13.597 12L19.1863 17.5894C19.3954 17.7985 19.5 18.0646 19.5 18.3878C19.5 18.711 19.3954 18.9772 19.1863 19.1863C18.9772 19.3954 18.711 19.5 18.3878 19.5C18.0646 19.5 17.7985 19.3954 17.5894 19.1863L12 13.597Z" fill="#CB2F2F"/>
        </svg>
        <span className="text-lg font-semibold text-red-500">退出</span>
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-3xl p-8 w-full max-w-3xl">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            选择对象
          </h1>

          {/* Search Section */}
          <div className="flex items-center gap-3 bg-gray-100 rounded-3xl px-6 py-4 mb-6">
            <input
              type="text"
              placeholder="输入姓名或拼音首字母"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-base text-gray-600 placeholder-gray-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-700 text-white rounded-2xl font-semibold hover:bg-blue-800"
            >
              搜索
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-300 mb-6"></div>

          {/* Search Results or No Results */}
          {hasSearched && (
            <div className="flex flex-col items-center justify-center py-12 mb-6">
              {searchResults.length === 0 ? (
                <>
                  {/* No Results State */}
                  <div className="flex items-center gap-6 mb-6">
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <path d="M61.5133 12C64.8053 12 67.6726 12.6085 70.115 13.8254C72.5575 15.0952 74.4956 16.8413 75.9292 19.0635C77.3097 21.3386 78 23.8783 78 26.6825C78 29.2751 77.3894 31.709 76.1681 33.9841C74.9469 36.1534 72.7965 38.6402 69.7168 41.4444C68.1239 42.873 66.9292 44.1164 66.1327 45.1746C65.4425 46.0212 64.9911 46.8677 64.7788 47.7143C64.6195 48.455 64.5398 49.4074 64.5398 50.5714C64.5398 52.237 63.1896 53.5873 61.5239 53.5873H59.8269C57.6792 53.5873 55.9381 51.8462 55.9381 49.6984C55.9381 47.6878 56.0973 46.0741 56.4159 44.8571C56.7345 43.746 57.3451 42.6085 58.2478 41.4444C59.3097 40.1217 60.8496 38.4815 62.8673 36.5238C64.5133 34.7249 65.6549 33.2698 66.292 32.1587C67.0885 30.7302 67.4867 29.2487 67.4867 27.7143C67.4867 25.7037 66.9027 24.0635 65.7345 22.7936C64.5664 21.5767 63.0265 20.9683 61.115 20.9683C58.4602 20.9683 56.3363 21.7354 54.7434 23.2698C54.3393 23.6336 53.9607 24.0148 53.6078 24.4136C51.7878 26.4704 49.0303 27.9066 46.4239 27.0408C43.9132 26.2069 42.4212 23.5472 43.8356 21.3115C44.291 20.5916 44.8207 19.8687 45.4248 19.1429C47.2301 17.0265 49.4867 15.3069 52.1947 13.9841C54.9027 12.6614 58.0088 12 61.5133 12ZM53.9469 65.8889C53.9469 64.037 54.5044 62.5556 55.6195 61.4444C56.7345 60.2804 58.2478 59.6984 60.1593 59.6984C62.0177 59.6984 63.5044 60.2804 64.6195 61.4444C65.7876 62.6085 66.3717 64.0899 66.3717 65.8889C66.3717 67.5291 65.7611 68.9577 64.5398 70.1746C63.3186 71.3915 61.8584 72 60.1593 72C58.4071 72 56.9204 71.3915 55.6991 70.1746C54.531 69.0106 53.9469 67.582 53.9469 65.8889Z" fill="#A8BDE8"/>
                      <path d="M91.6429 29.7002C93.0414 29.7003 94.3326 30.4493 95.0272 31.6631L117.085 70.2061C117.422 70.7958 117.6 71.4637 117.6 72.1432V103.8C117.6 105.954 115.854 107.7 113.7 107.7H6.2999C4.14599 107.7 2.3999 105.954 2.3999 103.8V72.1432C2.39994 71.4637 2.57745 70.7958 2.91494 70.2061L24.9726 31.6631C25.6673 30.4492 26.9589 29.7002 28.3575 29.7002H34.8544C37.3096 29.7002 39.2999 31.6905 39.2999 34.1457C39.2999 36.6009 37.3096 38.5912 34.8544 38.5912H32.3911C31.6244 38.5912 30.9188 39.0093 30.5501 39.6816L13.9229 70.0016C13.8134 70.2015 13.9581 70.4457 14.186 70.4457H30.4071C31.4417 70.4458 32.4338 70.8571 33.1651 71.5889L45.5829 84.0119C45.9767 84.4059 46.5107 84.6277 47.0677 84.6277H72.9321C73.4891 84.6277 74.0231 84.4059 74.4169 84.0119L86.8347 71.5889C87.566 70.8571 88.5581 70.4458 89.5927 70.4457H105.814C106.042 70.4457 106.186 70.2015 106.077 70.0016L89.4497 39.6816C89.081 39.0094 88.3754 38.5913 87.6087 38.5912H85.7454C83.2902 38.5912 81.2999 36.6009 81.2999 34.1457C81.2999 31.6905 83.2902 29.7002 85.7454 29.7002H91.6429Z" fill="#A8BDE8"/>
                    </svg>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        无搜索结果
                      </h3>
                      <p className="text-base text-gray-600">
                        请更换关键词尝试
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                // Results would be displayed here
                <div className="space-y-4">
                  {searchResults.map((student, index) => (
                    <div 
                      key={index}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedStudent === student 
                          ? 'bg-blue-100 border-blue-300' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <span className="text-base text-gray-700">{student}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="h-px bg-gray-300 mb-6"></div>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStart}
              disabled={!selectedStudent}
              className={`px-8 py-3 rounded-2xl text-2xl font-semibold min-w-[200px] transition-all ${
                selectedStudent 
                  ? 'bg-blue-700 text-white hover:bg-blue-800 cursor-pointer' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              开始
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
