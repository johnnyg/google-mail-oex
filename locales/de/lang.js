/* Google Mail Notifier - German Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by Tom Schreiber (tom@codebit.de)

SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
Diese Erweiterung informiert Sie über ungelesene Nachrichten in Ihrem Googlemail-Konto. Es werden mehrere Konten unterstützt und Mail-Links können direkt mit Googlemail geöffnet werden.

DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
Google Mail Notifier ist eine kleine und schnelle Erweiterung für Opera, welche die Anzahl der ungelesenen Nachrichten eines oder mehrerer Googlemail-Konten anzeigt. Durch einen Klick auf den Button können Sie zudem die Titel der Nachrichten und weitere Informationen anzeigen lassen. Außerdem haben Sie die Möglichkeit, dass Mail-Links (mailto:) direkt mit Googlemail geöffnet werden.

Merkmale:
* Unterstützt bis zu 5 Googlemail-Konten
* Unterstützt alle Google-Konten
* Zeigt alle ungelesenen Nachrichten oder nur aus dem Posteingang
* Option zum direkten Öffnen von Mail-Links mit Googlemail 
* Optionale Klang-Benachrichtigung
* Verwendet das sichere OAuth-Verfahren zur Autorisierung
* Unterstützt Deutsch, Englisch, Russisch, Polnisch, Chinesich
 
*/


// General Strings for Option-Page
lang.options_update         = "Aktualisierungszeit";
lang.options_update_unit    = "s";
lang.options_unread         = "alle ungelesenen";
lang.options_sound          = "Spiele Klangbenachrichtigung bei neuen Nachrichten";
lang.options_mailto         = "Öffne EMail-Links ('mailto:') mit Googlemail";
lang.options_close          = "Einstellungen übernehmen und Fenster schließen";
lang.options_choose_theme   = "Choose Theme";
lang.options_description = "Google Mail Notifier is a small, simple and fast \
extension to show the number of unread mails in your Gmail-Account(s) in front of a \
button and the titles of the messages in the button-menu. Furthermore this extension \
gives you the option to open mail-links (mailto:) directly with GMail";
lang.options_accounts_header = "Your GMail Account(s)";
lang.options_appearance_header = "Appearance";
lang.options_other_header = "Other Options";
lang.options_link_projectpage = "Project-Homepage";
lang.options_link_feedback = "Feedback/Issue-Report";

// Tooltips for Option-Page
lang.options_unread_tooltip = "Aktivieren Sie diese Funktion um alle ungelesenen Nachrichten anzuzeigen, nicht nur aus dem Posteingang";

// Strings for Popup-Page (click on button)
lang.popup_open     = "<strong>GoogleMail</strong> im neuen Tab öffnen";
lang.popup_compose  = "E-Mail schreiben";
lang.popup_pref     = "Einstellungen";
lang.popup_nomsg        = "Es gibt <strong>keine ungelesene Nachrichten</strong>";
lang.popup_onemsg       = "Es gibt <strong>eine ungelesene Nachricht</strong>";
lang.popup_msg_before   = "Es gibt <strong>";
lang.popup_msg_after    = " ungelesene Nachrichten</strong>";
lang.popup_lastupdate   = "Letztes Update : ";
lang.popup_error_occurred="Fehler ist aufgetreten";
lang.popup_from         = "Von: ";
lang.popup_to           = "An: ";

// Error-Strings
lang.error_confails = "<strong>Ein Fehler ist aufgetreten. </strong> " +
"Bitte überprüfen Sie Ihre Verbindung und die <a href='javascript:ShowPreferences();'>Einstellungen</a>";
lang.error_noActiveAccount = "<strong>Es wurde kein aktiver Google-Account gefunden</strong>, " +
"<br/>bitte <a href='http://mail.google.com'>loggen sie sich in ihren Account ein</a>.";
