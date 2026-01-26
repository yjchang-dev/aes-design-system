import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTable, faFolderOpen, faFileCirclePlus, faListCheck, faClipboardList, faBriefcase, faWrench, faCogs, faPlusSquare, faUser, faAddressCard, faUserPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';

// 定義權限介面，讓 React 人員知道要傳什麼結構
export interface SidebarPermissions {
  optionsMaintenance: boolean;
  memberMaintenance: boolean;
  applicationFormMaintenance: boolean;
}
@Component({
  selector: 'aes-sidebar',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
// === Inputs: 資料由父層決定 ===
  @Input() isCollapsed = false;
  @Input() ongoingJobCount: number = 0;

  // 預設權限全關，或全開方便測試，這裡設為預設介面
  @Input() permissions: SidebarPermissions = {
    optionsMaintenance: false,
    memberMaintenance: false,
    applicationFormMaintenance: false
  };

  // === Internal State: UI 狀態保留在內部 ===
  icons = {
    faTable, faFolderOpen, faFileCirclePlus,
    faListCheck, faClipboardList, faBriefcase,
    faWrench, faCogs, faPlusSquare,
    faUser, faAddressCard, faUserPlus,
    faChevronDown
  };

  menuState: { [key: string]: boolean } = {
    'application': true,
    'job': false,
    'option': false,
    'member': false
  };

  toggleMenu(menuId: string) {
    if (this.isCollapsed) return;
    const currentState = this.menuState[menuId];
    Object.keys(this.menuState).forEach(k => this.menuState[k] = false);
    this.menuState[menuId] = !currentState;
  }
}
