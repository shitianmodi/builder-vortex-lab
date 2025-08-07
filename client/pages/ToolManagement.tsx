import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ToolItem {
  id: string;
  name: string;
  color: string;
  colorName: string;
  category: string;
  subCategory: string;
  image: string;
  selected?: boolean;
}

interface CategoryItem {
  name: string;
  count: number;
  expanded: boolean;
  subCategories?: { name: string; count: number }[];
}

const mockTools: ToolItem[] = [
  {
    id: '1',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '2',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '3',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '4',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '5',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '6',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '7',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '8',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '9',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '10',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F06b4710a09b04a72b9bbf1460daf50dc?format=webp&width=800',
  },
  {
    id: '11',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F7fabbd312612410484e8edfa284b74c8?format=webp&width=800',
  },
  {
    id: '12',
    name: '沙具名称一行字',
    color: '#F55D5D',
    colorName: '红色',
    category: '类型名称',
    subCategory: '子类型名称',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F633abf5e59cd4a2c979cb3a5ea2346f6%2F7fabbd312612410484e8edfa284b74c8?format=webp&width=800',
  }
];

const mockCategories: CategoryItem[] = [
  {
    name: '类型名称',
    count: 100,
    expanded: true,
    subCategories: [
      { name: '子类型名称', count: 20 },
      { name: '子类型名称', count: 20 },
      { name: '子类型名称', count: 20 }
    ]
  },
  {
    name: '类型���称',
    count: 100,
    expanded: false
  },
  {
    name: '类型名称',
    count: 100,
    expanded: false
  },
  {
    name: '类型名称',
    count: 100,
    expanded: false
  }
];

const colors = [
  { name: '红色', color: '#F55D5D', count: 100 },
  { name: '橙色', color: '#FF8747', count: 100 },
  { name: '黄色', color: '#FFDB0D', count: 100 },
  { name: '绿色', color: '#58CA44', count: 100 },
  { name: '蓝色', color: '#37A2E5', count: 100 },
  { name: '紫色', color: '#BD6ECB', count: 100 },
  { name: '灰色', color: '#A8ABB2', count: 100 },
  { name: '多色', color: 'linear-gradient(135deg, #FFA300 10.71%, #E20BBE 51.79%, #004DA9 92.86%)', count: 100 }
];

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export default function ToolManagement() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<'category' | 'color'>('category');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('名称A-Z');
  const [activeCategory, setActiveCategory] = useState('类型名称');
  const [activeColor, setActiveColor] = useState('红色');
  const [activeAlphabet, setActiveAlphabet] = useState('A');
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('类型名称');
  const [selectedSubCategory, setSelectedSubCategory] = useState('子类型名称');

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(mockTools.map(tool => tool.id));
    } else {
      setSelectedItems([]);
    }
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSearch = () => {
    // Implement search functionality
    console.log('Searching for:', searchTerm);
  };

  const toggleCategory = (categoryName: string) => {
    // Toggle category expansion
  };

  return (
    <div className="w-full h-screen bg-[#EEF1FA] flex">
      {/* Navigation Sidebar */}
      <div className="w-[116px] h-full p-4 pt-4 pb-6 flex flex-col justify-between items-center bg-[#004DA9] rounded-3xl ml-14 mt-14 mb-14">
        <div className="flex flex-col items-start gap-4 w-full">
          {/* Home */}
          <button 
            onClick={() => navigate('/')}
            className="w-[84px] h-[84px] p-2 flex flex-col justify-center items-center gap-1 rounded-2xl"
          >
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M12 38H18V28C18 27.4333 18.192 26.9587 18.576 26.576C18.96 26.1933 19.4347 26.0013 20 26H28C28.5667 26 29.042 26.192 29.426 26.576C29.81 26.96 30.0013 27.4347 30 28V38H36V20L24 11L12 20V38ZM8 38V20C8 19.3667 8.142 18.7667 8.426 18.2C8.71 17.6333 9.10133 17.1667 9.6 16.8L21.6 7.8C22.3 7.26667 23.1 7 24 7C24.9 7 25.7 7.26667 26.4 7.8L38.4 16.8C38.9 17.1667 39.292 17.6333 39.576 18.2C39.86 18.7667 40.0013 19.3667 40 20V38C40 39.1 39.608 40.042 38.824 40.826C38.04 41.61 37.0987 42.0013 36 42H28C27.4333 42 26.9587 41.808 26.576 41.424C26.1933 41.04 26.0013 40.5653 26 40V30H22V40C22 40.5667 21.808 41.042 21.424 41.426C21.04 41.81 20.5653 42.0013 20 42H12C10.9 42 9.95867 41.6087 9.176 40.826C8.39333 40.0433 8.00133 39.1013 8 38Z" fill="#A8BDE8"/>
            </svg>
            <div className="text-[#A8BDE8] text-center text-sm">主页</div>
          </button>

          {/* Data Center */}
          <button 
            onClick={() => navigate('/data-center')}
            className="w-[84px] h-[84px] p-2 flex flex-col justify-center items-center gap-1 rounded-2xl"
          >
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M39 34.4444V15.5556C39 11.4604 32.1319 8 24 8C15.8681 8 9 11.4604 9 15.5556V34.4444C9 38.5396 15.8681 42 24 42C32.1319 42 39 38.5396 39 34.4444ZM24 11.7778C30.9206 11.7778 35.1206 14.6243 35.25 15.5442C35.1206 16.4868 30.9206 19.3333 24 19.3333C17.0794 19.3333 12.8794 16.4868 12.75 15.5669C12.8794 14.6243 17.0794 11.7778 24 11.7778ZM12.75 20.4799C15.5231 22.0798 19.5694 23.1111 24 23.1111C28.4306 23.1111 32.4769 22.0798 35.25 20.4799V24.9887C35.1206 25.9312 30.9206 28.7778 24 28.7778C17.0794 28.7778 12.8794 25.9312 12.75 25V20.4799ZM12.75 34.4444V29.9243C15.5231 31.5242 19.5694 32.5556 24 32.5556C28.4306 32.5556 32.4769 31.5242 35.25 29.9243V34.4331C35.1206 35.3757 30.9206 38.2222 24 38.2222C17.0794 38.2222 12.8794 35.3757 12.75 34.4444Z" fill="#A8BDE8"/>
            </svg>
            <div className="text-[#A8BDE8] text-center text-sm">数据中心</div>
          </button>

          {/* Tool Management - Active */}
          <div className="w-[84px] h-[84px] p-2 flex flex-col justify-center items-center gap-1 rounded-2xl bg-[#024089]">
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
              <path d="M24 43H23.2727C22.7204 43 22.2727 42.5523 22.2727 42V31.6518C20.4245 33.3273 17.9545 34.3636 15.3636 34.3636C9.75 34.3636 5 29.6136 5 24V23.2727C5 22.7204 5.44772 22.2727 6 22.2727H16.3482C14.6727 20.4245 13.6364 17.9545 13.6364 15.3636C13.6364 9.75 18.3864 5 24 5H24.7273C25.2796 5 25.7273 5.44772 25.7273 6V16.3482C27.5755 14.6727 30.0455 13.6364 32.6364 13.6364C38.25 13.6364 43 18.3864 43 24V24.7273C43 25.2796 42.5523 25.7273 42 25.7273H31.6518C33.3273 27.5755 34.3636 30.0455 34.3636 32.6364C34.3636 38.25 29.6136 43 24 43ZM25.7273 25.9518V39.3209C28.6636 38.5264 30.9091 35.7973 30.9091 32.6364C30.9091 29.4755 28.6636 26.7464 25.7273 25.9518ZM8.67909 25.7273C9.47364 28.6636 12.2027 30.9091 15.3636 30.9091C18.5245 30.9091 21.2536 28.6636 22.0482 25.7273H8.67909ZM25.9518 22.2727H39.3209C38.5264 19.3364 35.78 17.0909 32.6364 17.0909C29.4927 17.0909 26.7464 19.3364 25.9518 22.2727ZM22.2727 8.67909C19.3364 9.47364 17.0909 12.22 17.0909 15.3636C17.0909 18.5073 19.3364 21.2536 22.2727 22.0482V8.67909Z" fill="white"/>
            </svg>
            <div className="text-white text-center text-sm">沙具管理</div>
          </div>
        </div>

        {/* User Avatar */}
        <img 
          className="w-16 h-16 rounded-full" 
          src="https://api.builder.io/api/v1/image/assets/TEMP/05114ceccd61297e06295e70e07c8025accaf9fa?width=128" 
          alt="User" 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-6 px-14 pt-14 pb-8">
          <h1 className="text-[#3D526C] text-3xl font-semibold">沙具管理</h1>
          <div className="text-[#7E90B0] text-sm">模型版本 1.0.2</div>
        </div>

        {/* Separator Line */}
        <div className="w-full h-[1px] bg-[#E2E7F0] mx-14 mb-6" />

        <div className="flex gap-8 px-14 pb-14 flex-1">
          {/* Left Filter Panel */}
          <div className="w-[220px] flex flex-col gap-4">
            {/* Filter Tabs */}
            <div className="flex p-1 items-center gap-1 bg-white rounded-3xl">
              <button
                onClick={() => setFilterType('category')}
                className={`flex-1 h-8 px-4 py-2 text-sm rounded-2xl ${
                  filterType === 'category' 
                    ? 'bg-[#DAE4F9] text-[#004DA9]' 
                    : 'text-[#7E90B0]'
                }`}
              >
                按分类
              </button>
              <button
                onClick={() => setFilterType('color')}
                className={`flex-1 h-8 px-4 py-2 text-sm rounded-2xl ${
                  filterType === 'color' 
                    ? 'bg-[#DAE4F9] text-[#004DA9]' 
                    : 'text-[#7E90B0]'
                }`}
              >
                按颜色
              </button>
            </div>

            {/* Filter Content */}
            <div className="flex flex-col gap-1">
              {filterType === 'category' ? (
                // Category Filter
                mockCategories.map((category, index) => (
                  <div key={index}>
                    <div 
                      className={`flex px-3 py-3 px-2 justify-between items-center rounded-2xl cursor-pointer ${
                        category.name === activeCategory ? 'bg-[#DAE4F9]' : ''
                      }`}
                      onClick={() => {
                        setActiveCategory(category.name);
                        toggleCategory(category.name);
                      }}
                    >
                      <div className="flex px-1 items-center gap-2">
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path 
                            d={category.expanded 
                              ? "M8.86603 11.5C8.48113 12.1667 7.51887 12.1667 7.13397 11.5L3.66987 5.5C3.28497 4.83333 3.7661 4 4.5359 4L11.4641 4C12.2339 4 12.715 4.83333 12.3301 5.5L8.86603 11.5Z"
                              : "M12.5 8.86603C13.1667 8.48113 13.1667 7.51887 12.5 7.13397L6.5 3.66987C5.83333 3.28497 5 3.7661 5 4.5359L5 11.4641C5 12.2339 5.83333 12.715 6.5 12.3301L12.5 8.86603Z"
                            } 
                            fill={category.expanded ? "#004DA9" : "#B6C2DA"}
                          />
                        </svg>
                        <div className="text-[#324459] text-base">{category.name}</div>
                      </div>
                      <div className="text-[#7E90B0] text-base">{category.count}</div>
                    </div>
                    {category.expanded && category.subCategories && (
                      <div className="flex flex-col gap-1 ml-8">
                        {category.subCategories.map((sub, subIndex) => (
                          <div key={subIndex} className="flex px-4 py-3 justify-between items-center rounded-2xl">
                            <div className="text-[#324459] text-base">{sub.name}</div>
                            <div className="text-[#7E90B0] text-base">{sub.count}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                // Color Filter
                colors.map((color, index) => (
                  <div 
                    key={index}
                    className={`flex px-3 py-3 px-2 justify-between items-center rounded-2xl cursor-pointer ${
                      color.name === activeColor ? 'bg-[#DAE4F9]' : ''
                    }`}
                    onClick={() => setActiveColor(color.name)}
                  >
                    <div className="flex px-1 items-center gap-2">
                      <div 
                        className="w-3.5 h-3.5 rounded-sm"
                        style={color.color.includes('gradient') ? 
                          { background: color.color } : 
                          { backgroundColor: color.color }
                        }
                      />
                      <div className="text-[#324459] text-base">{color.name}</div>
                    </div>
                    <div className="text-[#7E90B0] text-base">{color.count}</div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Main Grid Area */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Top Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-14">
                {/* Select All */}
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-4 h-4 rounded border cursor-pointer ${
                      selectAll ? 'bg-[#004DA9] border-[#004DA9]' : 'border-[#004DA9]'
                    }`}
                    onClick={toggleSelectAll}
                  >
                    {selectAll && (
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div className="text-[#324459] text-base">全选</div>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-4">
                  <div className="text-[#324459] text-base">排序</div>
                  <div className="flex w-[150px] px-4 py-1 justify-between items-center rounded-2xl border border-[#B6C2DA]">
                    <div className="text-[#3D526C] text-base">{sortBy}</div>
                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.6007 4.89906C13.2687 4.56711 12.7305 4.56711 12.3986 4.89906L7.99961 9.29802L3.60065 4.89906C3.2687 4.56711 2.73051 4.56711 2.39857 4.89906C2.06662 5.231 2.06662 5.76919 2.39857 6.10114L7.39857 11.1011C7.73051 11.4331 8.2687 11.4331 8.60065 11.1011L13.6007 6.10114C13.9326 5.76919 13.9326 5.231 13.6007 4.89906Z" fill="#3D526C"/>
                    </svg>
                  </div>
                </div>

                {/* Search */}
                <div className="flex items-center gap-2">
                  <div className="flex w-[200px] h-9 px-6 py-3 items-center rounded-2xl border border-[#B6C2DA]">
                    <input
                      type="text"
                      placeholder="输入名称"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 text-[#7E90B0] text-base bg-transparent outline-none"
                    />
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="flex h-9 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors"
                  >
                    <div className="text-white text-lg font-semibold">搜索</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="grid grid-cols-2 gap-4 max-h-[600px] overflow-y-auto">
              {mockTools.map((tool) => (
                <div key={tool.id} className="flex w-full p-5 px-6 justify-center items-center gap-4 rounded-3xl bg-white">
                  {/* Tool Image */}
                  <div className="w-16 h-16 rounded-lg bg-[#F4F4F5] relative overflow-hidden">
                    <img 
                      src={tool.image} 
                      alt={tool.name}
                      className="w-full h-full object-cover scale-[3.9] translate-x-[-1px] translate-y-[-19px]"
                    />
                    {/* Checkbox */}
                    <div 
                      className={`absolute top-1.5 left-1.5 w-4 h-4 rounded border cursor-pointer ${
                        selectedItems.includes(tool.id) 
                          ? 'bg-[#004DA9] border-[#004DA9]' 
                          : 'border-[#004DA9] bg-white/60'
                      }`}
                      onClick={() => toggleItemSelection(tool.id)}
                    >
                      {selectedItems.includes(tool.id) && (
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                          <path d="M13 4L6 11L3 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Tool Info */}
                  <div className="flex flex-col justify-between items-start flex-1 h-16">
                    {/* Top Row */}
                    <div className="flex justify-between items-center w-full">
                      <div className="text-[#303133] text-base">{tool.name}</div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3"
                          style={{ backgroundColor: tool.color }}
                        />
                        <div className="text-[#909399] text-base">{tool.colorName}</div>
                      </div>
                    </div>

                    {/* Separator */}
                    <div className="w-full h-[1px] bg-[#E2E7F0]" />

                    {/* Bottom Row */}
                    <div className="flex justify-end items-center gap-1 w-full">
                      <div className="text-[#909399] text-base">{tool.category}</div>
                      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.39857 2.39886C5.06662 2.73081 5.06662 3.269 5.39857 3.60094L9.79753 7.9999L5.39857 12.3989C5.06662 12.7308 5.06662 13.269 5.39857 13.6009C5.73051 13.9329 6.2687 13.9329 6.60065 13.6009L11.6007 8.60094C11.9326 8.269 11.9326 7.73081 11.6007 7.39886L6.60065 2.39886C6.2687 2.06692 5.73051 2.06692 5.39857 2.39886Z" fill="#909399"/>
                      </svg>
                      <div className="text-[#909399] text-base">{tool.subCategory}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alphabet Index */}
          <div className="w-7 flex flex-col items-center gap-0">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => setActiveAlphabet(letter)}
                className={`flex w-7 h-7 flex-col justify-center items-center rounded-2xl ${
                  letter === activeAlphabet ? 'bg-[#A8BDE8]' : ''
                }`}
              >
                <div className={`text-sm ${
                  letter === activeAlphabet ? 'text-white' : 'text-[#7E90B0]'
                }`}>
                  {letter}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Action Bar */}
        {selectedItems.length > 0 && (
          <div className="fixed bottom-8 left-[204px] w-[1204px] h-[72px] flex px-6 py-3 justify-between items-center rounded-3xl bg-white shadow-[0_0_20px_7px_rgba(126,144,176,0.2)]">
            <div className="text-base">
              <span className="text-[#303133]">已选择 </span>
              <span className="text-[#CB2F2F] font-bold">{selectedItems.length}</span>
              <span className="text-[#303133]"> 个沙具</span>
            </div>
            <button className="flex h-12 px-4 py-2 justify-center items-center gap-2 rounded-2xl bg-[#004DA9] hover:bg-[#003d8c] transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M11.4972 4.08329C11.0676 4.52768 11.0676 5.24818 11.4972 5.69257L16.4944 10.8621H4.85C4.24249 10.8621 3.75 11.3715 3.75 12C3.75 12.6285 4.24249 13.1379 4.85 13.1379H16.4944L11.4972 18.3074C11.0676 18.7518 11.0676 19.4723 11.4972 19.9167C11.9268 20.3611 12.6232 20.3611 13.0528 19.9167L19.9278 12.8046C20.3574 12.3602 20.3574 11.6398 19.9278 11.1954L13.0528 4.08329C12.6232 3.6389 11.9268 3.6389 11.4972 4.08329Z" fill="white"/>
              </svg>
              <div className="text-white text-lg font-semibold">移动到分类</div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
