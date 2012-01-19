/* Google Mail Notifier - Russian Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by Роман Каштанов

SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
Простое и быстрое расширение которое сообщает вам количество непрочитанных сообщений в ящике Gmail и показывает их заголовки.

DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
Простое и быстрое расширение которое сообщает вам количество непрочитанных сообщений в ящике Gmail и показывает их заголовки. Расширение может работать с несколькими аккаунтами и позволяет открывать ссылки mailto: с помощью Gmail.

ВОЗМОЖНОСТИ
* Поддержка до 5 аккаунтов
* Поддержка всех аккаунтов GMail
* Показывает все входящие или сообщения только из папки Inbox
* Позволяет открывать ссылки mailto: с помощью Gmail
* Воспроизведение звукового сигнала при входящих сообщениях
* Использование безопасной авторизации OAuth
* Поддержка английского, немецкого и русского языков
 
 */


// General Strings for Option-Page
lang.options_update = "Интервал проверки";
lang.options_update_unit = "s";
lang.options_unread = "Показывать все непрочитанные";
lang.options_sound = "Воспроизводить звуковой сигнал при получении нового сообщения.";
lang.options_mailto = "Открывать ссылки mailto: при помощи GMail.";
lang.options_close = "Применить и закрыть";
lang.options_choose_theme = "Choose Theme";
lang.options_description = "Google Mail Notifier это маленькое, простое и быстрое \
расширение которое показывает количество непрочитанных сообщений в вашем почтовом \
ящике Gmail при помощи значка на тулбаре и их заголовки во всплывающем окне.";
lang.options_accounts_header = "Ваши почтовые аккаунты";
lang.options_appearance_header = "Appearance";
lang.options_other_header = "Дополнительные настройки";
lang.options_link_projectpage = "Project-Homepage";
lang.options_link_feedback = "Feedback/Issue-Report";

// Tooltips for Option-Page
lang.options_unread_tooltip = "Включите, если хотите видеть количество непрочитанных сообщений не только в папке 'Входящие'";

// Strings for Popup-Page (click on button)
lang.popup_open = "Открыть <strong>GMail</strong> в новой вкладке";
lang.popup_compose = "Написать письмо";
lang.popup_pref = "Настройки";
lang.popup_nomsg = "У вас <strong>нет непрочитанных сообщений</strong>";
lang.popup_onemsg = "У вас <strong>одно непрочитанное сообщение</strong>";
lang.popup_msg_before = "У вас <strong>";
lang.popup_msg_after = " непрочитанных сообщений</strong>";
lang.popup_lastupdate = "Последнее обновление : ";
lang.popup_error_occurred="произошла ошибка";
lang.popup_from = "От: ";
lang.popup_to = "Кому: ";

// Error-Strings
lang.error_confails = "<strong>Произошла ошибка. </strong> " +
  "Пожалуйста проверьте ваше подключение и <a href='javascript:ShowPreferences();'>настройки</a>";
lang.error_noActiveAccount = "<strong>There is no active Google Mail Account</strong>, " +
"<br/>please login to your Google-Account and try again.";