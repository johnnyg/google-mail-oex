/* Google Mail Notifier - German Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by Tom Schreiber (tom@codebit.de)

SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
Diese Erweiterung informiert Sie über ungelesene Nachrichten in Ihrem Googlemail-Konto. Es werden mehrere Konten unterstützt und Mail-Links können direkt mit Googlemail geöffnet werden.

DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
Google Mail Notifier ist eine kleine und schnelle Erweiterung für Opera, welche die Anzahl der ungelesenen Nachrichten eines oder mehrerer Googlemail-Konten anzeigt. Durch einen Klick auf den Button können Sie zudem die Titel der Nachrichten und weitere Informationen anzeigen lassen. Außerdem haben Sie die Möglichkeit, dass Mail-Links (mailto:) direkt mit Googlemail geöffnet werden.

Merkmale:
* Erkennt automatisch die aktiven Google-Konten
* Unterstützt mehrere Konten
* Unterstützt alle Google-Konten
* Zeigt alle ungelesenen Nachrichten oder nur die aus dem Posteingang
* Option zum direkten Öffnen von Mail-Links mit Googlemail 
* Optionale Klang-Benachrichtigung
 
*/

// General Strings for Option-Page
lang.options_update         = "Aktualisierungszeit";
lang.options_update_unit    = "s";
lang.options_unread         = "alle ungelesenen";
lang.options_sound          = "Spiele Klangbenachrichtigung bei neuen Nachrichten";
lang.options_mailto         = "Öffne EMail-Links ('mailto:') mit Googlemail";
lang.options_debugmode      = "Enable Debug-Messages";
lang.options_close          = "Einstellungen übernehmen und Fenster schließen";
lang.options_refresh        = "Konten aktualisieren";
lang.options_choose_theme   = "Design auswählen";
lang.options_description    = "Google Mail Notifier ist eine kleine und schnelle \n\
Erweiterung für Opera, welche die Anzahl der ungelesenen Nachrichten eines oder \n\
mehrerer Googlemail-Konten anzeigt. Durch einen Klick auf den Button können Sie \n\
zudem die Titel der Nachrichten und weitere Informationen anzeigen lassen. Außerdem \n\
haben Sie die Möglichkeit, dass Mail-Links (mailto:) direkt mit Googlemail geöffnet werden.";
lang.options_description_accounts = "Diese Erweiterung erkennt automatisch Ihre aktiven\n\
    Google-Konten. Sie müssen sich deshalb einloggen, um Ihre Nachrichten zu sehen. Falls Sie\n\
    mehrere Konten überwachen wollen, benutzen Sie bitte die offizielle Methode der <a id='ma_link'>Mehrfach-Anmeldung</a>."
lang.options_dectected_accounts = "Erkannte Konten:";
lang.options_accounts_header    = "Google Konten";
lang.options_appearance_header  = "Aussehen";
lang.options_other_header       = "Weitere Optionen";
lang.options_link_projectpage   = "Projekt-Homepage";
lang.options_link_feedback      = "Feedback/Fehlerreport";

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
lang.popup_choose_account = "Wählen Sie Ihr Konto: ";

// Error-Strings
lang.error_noActiveAccount = "<strong>Es wurde kein aktiver Google-Account gefunden</strong>, " +
"<br/>bitte <a href='http://mail.google.com'>loggen sie sich in ihren Account ein</a>.";

// Localized Links
lang.link_multisession_help = "http://support.google.com/accounts/bin/answer.py?hl=de&answer=1721977";
