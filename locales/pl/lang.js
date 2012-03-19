/* Google Mail Notifier - Polish Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by Michał Góral

SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
Proste i szybkie rozszerzenie informujące o nowych nieprzeczytanych wiadomościach na koncie GMail oraz pokazujące ich tytuły. Możliwa jest obsługa wielu kont i otwieranie odnośników mailowych bezpośrednio w GMailu.

DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
Google Mail Notifier jest niewielkim, prostym i szybkim rozszerzeniem, które wyświetla na przycisku ilość nieprzeczytanych wiadomości na koncie (kontach) GMail oraz pokazuje ich tytuły w menu. Rozszerzenie daje również możliwość otwierania odnośników mailowych (mailto:) bezpośrednio w GMailu.

Funkcje:
* Wsparcie do 5. kont
* Wspiera wszystkie konta GMail
* Wyświetlanie wszystkich nieprzeczytanych wiadomości lub tylko ze skrzynki odbiorczej
* Możliwość otwierania odnośników mailowych bezpośrednio w GMailu
* Opcjonalne powiadamianie dźwiękowe
* Bezpieczna autoryzacja OAuth
* W języku angielskim, niemieckim, rosyjskim, chińskim i polskim
 
 */

// set default strings
lang.options_update = "Sprawdzaj co";
lang.options_update_unit = "s";
lang.options_sound = "Odtwarzaj dźwięk przy nowych wiadomościach";
lang.options_mailto = "Otwieraj odnośniki mailowe (mailto) w Gmailu";
lang.options_debugmode = "Włącz informacje debugowania";
lang.options_close = "Zapisz i zamknij okno";
lang.options_refresh = "Odśwież konta";
lang.options_choose_theme   = "Wybierz temat";
lang.options_description = "Google Mail Notifier jest niewielkim, prostym i szybkim \
rozszerzeniem, które wyświetla na przycisku ilość nieprzeczytanych wiadomości na koncie \
(kontach) GMail oraz pokazuje ich tytuły w menu. Rozszerzenie daje również możliwość \
otwierania linków mailowych (mailto:) bezpośrednio w GMailu.";
lang.options_description_accounts = "To rozszerzenie automatycznie wykrywa Twoje\n\
    otwarte konta GMail. Aby podejrzeć skrzynkę, musisz być zalogowany do swojego konta Google.\n\
    Jeśli chcesz używać więcej niż jednego konta naraz, użyj metody <a id='ma_link'>wielokrotnego logowania</a>."
lang.options_dectected_accounts = "Wykryte konta:";
lang.options_accounts_header = "Twoje konto (konta) GMail";
lang.options_appearance_header = "Wygląd";
lang.options_other_header = "Inne opcje";
lang.options_link_projectpage = "Strona domowa projektu";
lang.options_link_feedback = "Opinie/raport błędu";

// Account-Labels (built-in)
lang.options_label_unread = "wszystkie nowe";

// Tooltips for Option-Page			       
lang.options_unread_tooltip = "zaznacz to pole aby pokazywać wszystkie nowe wiadomości, nie tylko ze skrzynki odbiorczej";

// Strings for Popup-Page (click on button)
lang.popup_open = "Otwórz <strong>GMail</strong> w nowej karcie";
lang.popup_compose = "Utwórz wiadomość";
lang.popup_pref = "Ustawienia";
lang.popup_nomsg = "<strong>Brak nowych wiadomości</strong>";
lang.popup_onemsg = "Jest <strong>jedna nowa wiadomość</strong>";
lang.popup_msg_before = "Są <strong>nowe (";
lang.popup_msg_after = ") wiadomości</strong>";
lang.popup_lastupdate = "Ostatnia aktualizacja : ";
lang.popup_error_occurred="wystąpił błąd";
lang.popup_from = "Od: ";
lang.popup_to = "Do: ";
lang.popup_choose_account = "Wybierz swoje konto: ";

// Error-Strings
lang.error_noActiveAccount = "<strong>Brak aktywnych kont Google Mail</strong>, " +
"<br/>zaloguj się na swoje konto Google po czym spróbuj ponownie.";

// Localized Links
lang.link_multisession_help = "http://support.google.com/accounts/bin/answer.py?hl=pl&answer=1721977";
