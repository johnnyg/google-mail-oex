/* Google Mail Notifier - Polish Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by Michał Góral

SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
Proste i szybkie rozszerzenie informujące o nowych nieprzeczytanych wiadomościach na koncie GMail oraz pokazujące ich tytuły. Możliwe jest sprawdzanie wielu kont i otwieranie odnośników mailowych bezpośrednio w GMailu.

DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
Google Mail Notifier jest niewielkim, prostym i szybkim rozszerzeniem, które wyświetla na przycisku ilość nieprzeczytanych wiadomości na koncie (kontach) GMail oraz pokazuje ich tytuły w menu. Rozszerzenie daje również możliwość otwierania odnośników mailowych (mailto:) bezpośrednio w GMailu.

Funkcje:
* Wsparcie do 5. kont
* Wspiera wszystkie konta GMail
* Wyświetlanie wszystkich nieprzeczytanych wiadomości lub tylko ze skrzynki odbiorczej
* Możliwość otwierania odnośników mailowych bezpośrednio w GMailu
* Opcjonalne powiadamianie dźwiękowe
* Bezpieczna autoryzacja OAuth
* W języku angielskim, niemieckim, rosyjskim i polskim
* Supports English, German, Russian, Chinese, Polish
 
 */

// set default strings
lang.options_update = "Sprawdzaj co";
lang.options_update_unit = "s";
lang.options_unread = "wszystkie nowe";
lang.options_sound = "Odtwarzaj dźwięk przy nowych wiadomościach";
lang.options_mailto = "Otwieraj odnośniki mailowe (mailto) w Gmailu";
lang.options_close = "Zapisz i zamknij okno";
lang.options_choose_theme   = "Choose Theme";
lang.options_description = "Google Mail Notifier jest niewielkim, prostym i szybkim \
rozszerzeniem, które wyświetla na przycisku ilość nieprzeczytanych wiadomości na koncie \
(kontach) GMail oraz pokazuje ich tytuły w menu. Rozszerzenie daje również możliwość \
otwierania linków mailowych (mailto:) bezpośrednio w GMailu.";
lang.options_accounts_header = "Twoje konto (konta) GMail";
lang.options_appearance_header = "Appearance";
lang.options_other_header = "Other Options";
lang.options_link_projectpage = "Project-Homepage";
lang.options_link_feedback = "Feedback/Issue-Report";

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

// Error-Strings
lang.error_confails = "<strong>Wystąpił błąd. </strong> " +
  "Sprawdź swoje połączenie oraz <a href='javascript:ShowPreferences();'>ustawienia</a>";
lang.error_noActiveAccount = "<strong>There is no active Google Mail Account</strong>, " +
"<br/>please login to your Google-Account and try again.";