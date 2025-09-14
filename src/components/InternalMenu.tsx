import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface InternalMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function InternalMenu({ activeSection, onSectionChange }: InternalMenuProps) {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v14H8V5z" />
        </svg>
      )
    },

    {
      id: 'api',
      label: 'API',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      id: 'hands-on',
      label: 'Hands-on API',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      id: 'billing',
      label: 'Billing',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed inset-y-0 left-0 bg-black p-4" onClick={() => setShowUserDropdown(false)}>
      <div className={`fixed left-4 top-4 bottom-4 z-40 transition-all duration-500 ease-in-out ${collapsed ? 'w-20' : 'w-72'}`} onClick={(e) => e.stopPropagation()}>
        <div className="h-full relative group">
          {/* Outer glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-gray-500/10 to-white/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
          
          {/* Main container */}
          <div className="relative h-full bg-black/30 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-2xl shadow-black/50 overflow-hidden">
            {/* Inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none"></div>
            
            <div className="relative z-10 h-full flex flex-col">
              {/* Header with collapse button */}
              <div className="p-6 border-b border-white/10 relative z-10">
                <div className="flex items-center justify-between">
                  {!collapsed && (
                    <div className="flex-1 text-center">
                      <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-400 via-white to-gray-400 bg-clip-text text-transparent">
                        Main Menu
                      </h2>
                    </div>
                  )}
                  <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="relative group/collapse text-gray-400 hover:text-white transition-all duration-500 p-2 rounded-lg ml-auto"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-gray-400/10 to-white/10 rounded-lg opacity-0 group-hover/collapse:opacity-50 blur transition-all duration-500"></div>
                    <div className="relative bg-white/5 group-hover/collapse:bg-white/10 rounded-lg p-0 transition-all duration-300">
                      <svg className={`w-4 h-4 transition-transform duration-500 ${collapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 p-4 space-y-3 relative z-10">
                {menuItems.map((item) => (
                  <div key={item.id} className="relative group/item">
                    <div className="relative group/menu">
                      <div className={`absolute -inset-1 bg-gradient-to-r from-white/10 via-gray-400/10 to-white/10 rounded-xl opacity-0 blur transition-all duration-500 ${
                        activeSection === item.id ? 'opacity-20' : 'group-hover/menu:opacity-10'
                      }`}></div>
                      
                      <button
                        onClick={() => onSectionChange(item.id)}
                        className={`relative w-full flex items-center ${collapsed ? 'justify-center p-3' : 'gap-4 p-4'} rounded-xl transition-all duration-500 text-left overflow-hidden ${
                          activeSection === item.id
                            ? 'bg-white/10 text-white shadow-2xl border border-white/20 shadow-gray-500/20'
                            : 'text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 border border-transparent'
                        }`}
                      >
                        {/* Active background gradient */}
                        {activeSection === item.id && (
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-xl"></div>
                        )}
                        
                        {/* Active indicator for collapsed state */}
                        {activeSection === item.id && collapsed && (
                          <div className="absolute inset-0 bg-white/10 rounded-xl border border-white/30"></div>
                        )}
                        
                        {/* Icon */}
                        <div className={`flex-shrink-0 transition-all duration-500 relative z-10 ${
                          activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover/menu:text-white'
                        }`}>
                          {item.icon}
                        </div>
                        
                        {/* Label */}
                        {!collapsed && (
                          <span className={`font-medium transition-all duration-500 relative z-10 ${
                            activeSection === item.id ? 'text-white' : 'text-gray-400 group-hover/menu:text-white'
                          }`}>
                            {item.label}
                          </span>
                        )}

                        {/* Hover effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/3 to-transparent opacity-0 group-hover/menu:opacity-100 transition-all duration-500 rounded-xl"></div>
                      </button>
                    </div>

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-black/40 backdrop-blur-lg text-white text-sm rounded-lg opacity-0 group-hover/item:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/20 shadow-2xl shadow-black/50 z-50">
                        {item.label}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/40 rotate-45 border-l border-b border-white/20"></div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Footer - User Section */}
              <div className="p-4 border-t border-white/10 relative z-10">
                <div className="relative group/user">
                  <div className="relative group/userbutton">
                    <div className="absolute -inset-1 bg-gradient-to-r from-white/10 via-gray-400/10 to-white/10 rounded-xl opacity-0 group-hover/userbutton:opacity-10 blur transition-all duration-500"></div>
                    
                    <button 
                      onClick={() => setShowUserDropdown(!showUserDropdown)}
                      className={`relative w-full flex items-center ${collapsed ? 'justify-center p-3' : 'gap-4 p-3'} rounded-xl transition-all duration-500 ${
                        showUserDropdown ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent hover:border-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 rounded-full flex items-center justify-center shadow-2xl shadow-black/50 flex-shrink-0 border border-white/10">
                        <span className="text-white text-sm font-semibold">U</span>
                      </div>
                      {!collapsed && (
                        <div className="flex-1 min-w-0 text-left">
                          <div className="text-white font-medium text-sm truncate">User Account</div>
                          <div className="text-gray-400 text-xs truncate">user@example.com</div>
                        </div>
                      )}
                      
                      {/* Background overlay for active state */}
                      {showUserDropdown && (
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 rounded-xl"></div>
                      )}
                    </button>
                  </div>

                  {/* Dropdown menu */}
                  {showUserDropdown && (
                    <div className={`absolute ${collapsed ? 'left-full ml-4' : 'bottom-full mb-2'} ${collapsed ? 'top-0' : 'left-0 right-0'} z-50`}>
                      <div className="relative group/dropdown">
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-gray-400/20 to-white/20 rounded-xl opacity-70 blur transition-all duration-500"></div>
                        
                        <div className="relative bg-black/40 backdrop-blur-3xl rounded-xl border border-white/20 shadow-2xl shadow-black/50 p-3 overflow-hidden">
                          {/* Inner gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none"></div>
                          
                          <div className="relative z-10">
                            <div className="relative group/logout">
                              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-red-400/20 to-red-500/20 rounded-lg opacity-0 group-hover/logout:opacity-50 blur transition-all duration-500"></div>
                              
                              <button onClick={logout} className="relative w-full flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:text-red-400 transition-all duration-500 group/logoutbtn border border-transparent hover:border-red-500/20">
                                <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover/logoutbtn:opacity-100 transition-all duration-500 rounded-lg"></div>
                                
                                <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span className="font-medium relative z-10">Logout</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tooltip for user in collapsed state */}
                  {collapsed && !showUserDropdown && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-black/40 backdrop-blur-lg text-white text-sm rounded-lg opacity-0 group-hover/user:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/20 shadow-2xl shadow-black/50 z-50">
                      User Account
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-2 h-2 bg-black/40 rotate-45 border-l border-b border-white/20"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
