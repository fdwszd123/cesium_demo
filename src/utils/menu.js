import { MENU_CONFIG } from "/@/common/config/menuConfig";
const getMenuItemByPath = (path) => {
  for (let i = 0; i < MENU_CONFIG.length; i++) {
    for (let j = 0; j < MENU_CONFIG[i].children.length; j++) {
      if (MENU_CONFIG[i].children[j].path === path) {
        return MENU_CONFIG[i].children[j];
      }
    }
  }
};

export { getMenuItemByPath };
