/* Translation by Роман Каштанов (staroberdansk@gmail.com) */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// init language object (do)
var lang = new Object();

// set default strings
lang.options_getverifiy  = "Запросить код";
lang.options_saveverifiy = "Применить код";
lang.options_delete = "Удалить";
lang.options_update = "Интервал проверки";
lang.options_check = "Проверено";
lang.options_wait = "Подождите пожалуйста...";
lang.options_vcode = "Код проверки";
lang.options_failverify = "Неверный код проверки.";
lang.options_unread = "Показывать все непрочитанные";
lang.options_more_vcode = "Добавить еще код проверки для использования нескольких аккаунтов."
lang.options_sound = "Воспроизводить звуковой сигнал при получении нового сообщения.";
lang.options_mailto = "Открывать ссылки mailto при помощи GMail.";
lang.options_close = "Применить и закрыть";

lang.options_unread_tooltip = "Включите, если хотите видеть количество непрочитанных сообщений не только в папке 'Входящие'";
lang.options_vcode_tooltip = "Вставьте или наберите код проверки и нажмите 'Применить'";
lang.options_delete_tooltip = "Нажмите, чтобы удалить этот аккаунт";

lang.popup_open = "Открыть <strong>GMail</strong> в новой вкладке";
lang.popup_compose = "Написать письмо";
lang.popup_pref = "Настройки";

lang.popup_nomsg = "У вас <strong>нет непрочитанных сообщений</strong>";
lang.popup_onemsg = "У вас <strong>одно непрочитанное сообщение</strong>";
lang.popup_msg_before = "У вас <strong>";
lang.popup_msg_after = " непрочитанных сообщений</strong>";
lang.popup_lastupdate = "Последнее обновление : ";
lang.popup_from = "От: ";
lang.popup_to = "Кому: ";

lang.error_confails = "<strong>Произошла ошибка. </strong> " +
  "Пожалуйста проверьте ваше подключение и <a href='javascript:ShowPreferences();'>настройки</a>";
lang.error_nocode = "<strong>Почтовый аккаунт не настроен</strong>, " +
  "<br>пожалуйста воспользуйтесь <a href='javascript:ShowPreferences();'>настройками</a>";