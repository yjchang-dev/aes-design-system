
import type { Meta, StoryObj } from '@storybook/angular';
import { Header } from './header';
import { fn } from 'storybook/test';

// 1. 使用 raw-loader 匯入原始碼字串
// 請確保路徑對應到你實際的檔案位置

// ❌ 舊的寫法 (移除 raw-loader!)
// import headerHtml from '!raw-loader!./
// header.component.html';

// ✅ 新的寫法 (加上 ?raw)
// import headerHtml from './header.component.html?raw';
// import headerScss from './header.component.scss?raw';

const htmlCode = `
<nav class="navbar">
  <div class="nav-left">
    @if (showMenuButton) {
      <button class="btn-icon" type="button" (click)="toggleSidebar.emit()">
        <fa-icon [icon]="icons.faBars"></fa-icon>
      </button>
    }
    <div class="system-logo"></div>
    <h1 class="page-title">{{ title }}</h1>
  </div>

  <div class="nav-right">

    @if (user?.canSwitchFactory && user?.currentFactory) {
      <div class="factory-wrapper">
        <button class="factory-switch-btn" type="button" (click)="switchFactory.emit()" title="點擊切換工作廠區">
          <fa-icon [icon]="icons.faIndustry" class="icon-secondary icon-left"></fa-icon>
          <span class="factory-text">{{ user?.currentFactory }}</span>
          <fa-icon [icon]="icons.faRightLeft" class="icon-muted icon-tiny"></fa-icon>
        </button>
      </div>
    } @else {
      <div class="factory-display" title="目前廠區">
        <fa-icon [icon]="icons.faIndustry" class="icon-secondary icon-left"></fa-icon>
        <span class="factory-text-static">{{ user?.currentFactory }}</span>
      </div>
    }

    <div class="divider"></div>

    <button class="btn-icon" (click)="showSystemStatus = true" title="系統資訊">
      <fa-icon [icon]="icons.faInfoCircle"></fa-icon>
    </button>

    <div class="user-dropdown">
      <a class="user-toggle" href="#" role="button" (click)="isDropdownOpen = !isDropdownOpen; $event.preventDefault()">
        <div class="user-info-group">
          <div class="user-dept">{{ user?.department }}</div>
          <div class="user-name">{{ user?.name }}</div>
        </div>
        <fa-icon [icon]="icons.faUserCircle" class="user-avatar-icon"></fa-icon>
      </a>

      <div class="custom-dropdown-menu" [class.show]="isDropdownOpen">
        <div class="profile-header">
          <div class="profile-info">
            <fa-icon [icon]="icons.faUserCircle" class="profile-avatar-large"></fa-icon>
            <div class="profile-text">
              <div class="profile-name">{{ user?.name }}</div>
              <div class="profile-dept">{{ user?.department }}</div>
            </div>
          </div>
        </div>
        <div class="menu-body">
          <button class="menu-item logout" (click)="logout.emit()">
            <fa-icon [icon]="icons.faRightFromBracket"></fa-icon>
            <span>登出系統</span>
          </button>
        </div>
      </div>

      @if(isDropdownOpen) {
        <div class="dropdown-backdrop" (click)="isDropdownOpen = false"></div>
      }
    </div>
  </div>
</nav>

@if (showSystemStatus && systemInfo) {
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h5 class="modal-title">
          <fa-icon [icon]="icons.faInfoCircle" class="icon-left"></fa-icon>系統資訊
        </h5>
        <button type="button" class="btn-close" (click)="showSystemStatus = false">×</button>
      </div>
      <div class="modal-body">
        <div class="info-row">
          <span class="label">介面版本</span>
          <span class="value">{{ systemInfo.version }} <small class="text-muted">({{ systemInfo.publishDate }})</small></span>
        </div>
        <div class="info-row">
          <span class="label">連線環境</span>
          <span class="value badge-warning">{{ systemInfo.environment }}</span>
        </div>
        <div class="info-row">
          <span class="label">API 版本</span>
          <span class="value">{{ systemInfo.apiVersion }} <small class="text-muted">({{ systemInfo.apiPublishDate }})</small></span>
        </div>
      </div>
    </div>
  </div>
}

`;

const scssCode = `
/* --- 變數定義 (可根據 Design System 調整) --- */
:host {
  --nav-height: 48px;
  --nav-bg: #ffffff;
  --nav-border: #e9ecef;
  --text-primary: #212529;
  --text-secondary: #6c757d;
  --text-muted: #adb5bd;
  --primary-color: #0d6efd;
  --danger-color: #dc3545;
  --bg-hover: rgba(0, 0, 0, 0.05);
}

/* =========================================
   1. Navbar Container
   ========================================= */
.navbar {
  background-color: var(--nav-bg);
  height: var(--nav-height);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid var(--nav-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
}

/* 左側區域 */
.nav-left {
  display: flex;
  align-items: center;
}

/* 右側區域 */
.nav-right {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 取代 gap-2 */
}

/* =========================================
   2. 元件：Logo 與 標題
   ========================================= */
.system-logo {
  width: 100px;
  height: 36px;
  background-image: url('../assets/e-services-logo.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 4px;
}

.page-title {
  color: var(--text-secondary); /* 取代 text-secondary */
  font-weight: 700;
  font-size: 1.1rem;
  margin: 0 0 0 0.5rem; /* 取代 ms-2 */
  line-height: 1;
  white-space: nowrap;
}

/* 共用 Icon 按鈕樣式 */
.btn-icon {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  width: 32px;
  height: 32px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;

  /* 如果是在左側 sidebar toggle，右邊留點空隙 */
  &:first-child {
    margin-right: 0.5rem;
  }

  &:hover {
    background-color: var(--bg-hover);
    color: var(--text-primary);
  }
}

/* =========================================
   3. 元件：廠區切換
   ========================================= */
.factory-wrapper {
  margin-right: 0.25rem; /* 取代 me-1 */
}

.factory-switch-btn {
  height: 30px;
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 0 12px;
  font-size: 0.85rem;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #f0f7ff;
    border-color: var(--primary-color);
    color: var(--primary-color) !important;

    /* 讓裡面的 icon 也跟著變色 */
    .icon-secondary { color: var(--primary-color); }
  }
}

.factory-display {
  display: flex;
  align-items: center;
  padding: 0 8px; /* 取代 px-2 */
  color: var(--text-secondary);
}

.factory-text {
  font-weight: 700; /* fw-bold */
}

.factory-text-static {
  font-weight: 700;
  color: var(--text-primary); /* text-dark */
  font-family: monospace;     /* font-monospace */
}

/* Icon 輔助 class */
.icon-left { margin-right: 0.5rem; }
.icon-secondary { color: var(--text-secondary); transition: color 0.2s; }
.icon-muted { color: var(--text-muted); opacity: 0.5; }
.icon-tiny { font-size: 0.8rem; margin-left: 0.25rem; }

/* 垂直分隔線 */
.divider {
  width: 1px;
  height: 24px; /* h-50 roughly */
  background-color: var(--text-secondary);
  opacity: 0.25;
  margin: 0 0.25rem; /* mx-1 */
}

/* =========================================
   4. 元件：User Dropdown
   ========================================= */
.user-dropdown {
  position: relative; /* 為了讓 menu 絕對定位 */
  margin-left: 0.25rem; /* ms-1 */
}

.user-toggle {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  text-decoration: none;
  height: 36px;
  padding: 0 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    background-color: var(--bg-hover);
    color: var(--text-primary);
  }
}

.user-info-group {
  display: none; /* 手機版預設隱藏 (d-none) */
  margin-right: 0.5rem; /* me-2 */
  text-align: right;
  line-height: 1.2;

  /* 桌機版顯示 (d-md-block) */
  @media (min-width: 768px) {
    display: block;
  }
}

.user-dept { font-size: 0.7rem; color: #888; }
.user-name { font-size: 0.85rem; font-weight: bold; color: #333; }
.user-avatar-icon { font-size: 1.5rem; color: var(--text-secondary); }

/* 下拉選單本體 */
.custom-dropdown-menu {
  display: none; /* 預設隱藏 */
  position: absolute;
  top: 100%;
  right: 0; /* dropdown-menu-end */
  z-index: 1000;
  min-width: 260px;
  margin-top: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  &.show {
    display: block; /* 控制顯示 */
    animation: fadeIn 0.2s ease-out;
  }
}

.dropdown-backdrop {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 999;
  cursor: default;
}

.profile-header {
  background-color: #f8f9fa; /* bg-light */
  padding: 1rem; /* p-3 */
  border-bottom: 1px solid #e9ecef;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.profile-avatar-large {
  font-size: 2.5rem;
  color: var(--text-secondary);
}

.profile-text {
  overflow: hidden;
}

.profile-name { font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.profile-dept { font-size: 0.875rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.menu-body {
  padding: 0.5rem; /* p-2 */
}

.menu-item {
  width: 100%;
  border: none;
  background: none;
  padding: 0.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &.logout {
    color: var(--danger-color);
    &:hover {
      background-color: #fee2e2;
    }
  }
}

/* =========================================
   5. Modal (Dialog) - 取代 Bootstrap Modal
   ========================================= */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* backdrop */
  z-index: 1050;
  display: flex;
  align-items: center; /* 垂直置中 */
  justify-content: center; /* 水平置中 */
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px; /* modal-dialog 預設寬度 */
  margin: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0 1rem;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
}

.btn-close {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: #000;
  opacity: 0.5;
  cursor: pointer;
  padding: 0;
  &:hover { opacity: 0.75; }
}

.modal-body {
  padding: 1.5rem 1rem; /* pt-4 equivalent */
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px dashed #eee;

  &:last-child { border-bottom: none; }
}

.label { font-weight: 500; }
.text-muted { color: var(--text-muted); font-size: 0.875em; }

.badge-warning {
  background-color: #ffc107;
  color: #212529;
  padding: 0.25em 0.6em;
  font-size: 0.75em;
  font-weight: 700;
  border-radius: 0.25rem;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
}

/* 動畫 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

`;

const meta: Meta<Header> = {
  title: 'Layout/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `
<!-- header.component.html -->
${htmlCode}

----------------------

/* header.component.scss */
 ${scssCode}
        `,
        language: 'html'
      }
    }
  },
  args: {
    toggleSidebar: fn(),
    switchFactory: fn(),
    logout: fn(),
  },
};

export default meta;
type Story = StoryObj<Header>;

// 模擬的資料
const mockUser = {
  name: 'YJ.Chang',
  department: 'role',
  currentFactory: 'TWM8',
  canSwitchFactory: true
};

const mockSystemInfo = {
  version: 'v1.2.0',
  publishDate: '2026-01-19',
  environment: 'Development',
  apiVersion: 'v1.5.0',
  apiPublishDate: '2026-01-15'
};

export const MultiFactory: Story = {
  args: {
    user: mockUser,
    systemInfo: mockSystemInfo
  },
};

export const SingleFactory: Story = {
  args: {
    user: { ...mockUser, canSwitchFactory: false, currentFactory: 'TWM8' },
    systemInfo: mockSystemInfo
  },
};
