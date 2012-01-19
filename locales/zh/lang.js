/* Google Mail Notifier - Russian Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by 嚮陽

SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
一個簡單又快速的延伸套件提醒你 Gmail 帳號中有多少尚未讀取的郵件和顯示郵件的標題。你可以設定多個要檢查的帳號還有設定直接用 Gmail 來開啟郵件連結。

DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
Google Mail Notifier 是一個小巧、易用又快速的延伸套件，它可以讓你透過按鈕和選單的方式來顯示你的 Gmail 帳號中未讀取的郵件和郵件的標題。除此之外，這個延伸套件還可以讓你選擇自動使用 Gmail 來開啟郵件連結（mailto:）。

特色功能
* 支援 5 帳號
* 支援所有 Gmail 帳號
* 顯示所有或只顯示收件匣中的未讀取郵件
* 提供直接使用 Gmail 開啟郵件連結的選項
* 提供提示音效選項
* 使用安全的 OAuth 認證機制
* 支援英文、德文、俄文、中文


 */

// General Strings for Option-Page
lang.options_update = "更新間隔";
lang.options_update_unit = "秒";
lang.options_unread = "全部未讀";
lang.options_sound = "當有新的郵件時播放提示音效";
lang.options_mailto = "使用 Gmail 開啟郵件連結（mailto）";
lang.options_close = "套用並關閉視窗";
lang.options_choose_theme = "Choose Theme";
lang.options_description = "Google Mail Notifier 是一個小巧、易用又快速的延伸套件，它可以讓你透過 \
按鈕和選單的方式來顯示你的 Gmail 帳號中未讀取的郵件和郵件的標題。除此之外， 這個延伸套件還可以讓你選擇自動使用 \\n\
Gmail 來開啟郵件連結（mailto:）。";
lang.options_accounts_header = "你的 Gmail 帳號";
lang.options_appearance_header = "Appearance";
lang.options_other_header = "其他選項";
lang.options_link_projectpage = "Project-Homepage";
lang.options_link_feedback = "Feedback/Issue-Report";

// Tooltips for Option-Page
lang.options_unread_tooltip = "啟用這個選項後會顯示所有尚未讀取的郵件而非只有收件匣的未讀郵件";

// Strings for Popup-Page (click on button)
lang.popup_open = "在新的分頁開啟 <strong>GMail</strong>";
lang.popup_compose = "撰寫郵件";
lang.popup_pref = "偏好設定";
lang.popup_nomsg = "沒有<strong>未讀取的郵件</strong>";
lang.popup_onemsg = "有<strong>一封未讀取的郵件</strong>";
lang.popup_msg_before = "有<strong>";
lang.popup_msg_after = "封未讀取的郵件</strong>";
lang.popup_lastupdate = "上次檢查於：";
lang.popup_error_occurred="發生錯誤";
lang.popup_errors_occurred="發生多個錯誤";
lang.popup_from = "寄件者：";
lang.popup_to = "收件者：";

// Error-Strings
lang.error_confails = "<strong>發生了一個錯誤。</strong> " +
  "請檢查你的連線和<a href='javascript:ShowPreferences();'>設定</a>";
lang.error_noActiveAccount = "<strong>There is no active Google Mail Account</strong>, " +
"<br/>please login to your Google-Account and try again.";