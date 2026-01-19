import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
// 1. 引入 FontAwesome 模組與圖示
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faIndustry, faRightLeft, faInfoCircle, faUserCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { HeaderUser, SystemInfo } from './header.types';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';

@Component({
  selector: 'aes-header',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

   icons = {
    faInfoCircle,
    faRightFromBracket,
    faUserCircle,
    faBars,
    faIndustry,
    faCheck,
    faRightLeft,
  };
  // --- 3. 改用 Inputs 接資料 ---
  @Input() showMenuButton = true;
  @Input() title = '子系統名稱';

  // 接收使用者資料 (原本是 userService.userName() 等等)
  @Input() user: HeaderUser | null = null;

  // 接收系統資訊
  @Input() systemInfo: SystemInfo | null = null;

  // --- 4. 改用 Output 發送事件 ---
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() switchFactory = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  // 內部 UI 狀態 (Modal 開關屬於 UI 行為，可以留在這裡)
  showSystemStatus = false;
isDropdownOpen = false;


  authToekn: string = '';
  publishDate: string = "2026/05/11"; //上版日期
  version: string = "ver.1.1.1"; //版本
  dbServerEnvironment: string = ''; //db的servername回傳正式or測試
  apiVersion: string = ''; //api版本
  apiPublishDate: string = ''; //api發行日


  ngOnInit(): void {
    this.showDBEnvironment();
    this.showAPIVersion();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  // 點擊按鈕後的動作
  onSwitchFactory() {
    // 導向你原本選擇廠區的頁面，假設路由是 '/portal' 或是 '/select-site'
   // this.router.navigateByUrl('/portal');
  }

  // async logout() {
  //   // 處理登出邏輯
  //   // 例如，清除 sessionStorage 或 cookies 並重導向到登入頁
  //   //await this.authService.logout();
  //   sessionStorage.clear();
  //   this.router.navigate(['/login']);
  // }

  //顯示db目前環境
  async showDBEnvironment() {
    try {
      //const response = await this.serverService.loadDBServerEnvironment();

     // this.dbServerEnvironment = response.environment;
    } catch (error) {
      console.error('Failed to load dbServerEnvironment', error);
    }
  }

  //顯示api版本
  async showAPIVersion() {
    try {
      //const response = await this.serverService.loadAPIVersion();

      //this.apiVersion = response.version;
     // this.apiPublishDate = response.publishDate;
    } catch (error) {
      console.error('Failed to load api version', error);
    }
  }
}
