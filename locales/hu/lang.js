/* Google Mail Notifier - Hungarian Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by Róbert Tóth (nekomajin42@gmail.com)


SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
Egyszerű és gyors kiegészítő, ami értesít, ha új üzeneted érkezik a GMail fiókodba. Több fiókot is képes kezelni, és beállítható az is, hogy az email linkek (mailto:) közvetlenül a GMailben nyíljanak meg.


DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
A Google Mail Notifier egy kis méretű, egyszerű és gyors kiegészítő, ami egy eszköztáron elhelyezett gomb segítségével értesít, ha új leveled érkezik a GMail fiókjaidba. A gombon mutatja az olvasatlan levelek számát, a lenyíló panelen pedig kilistázza a levelek tárgyát. Ezen túl egy olyan opciót is tartalmaz, amivel az email linkek (mailto:) közvetlenül a GMailben nyílnak meg.


Funkciók:
* Automatikusan felismeri a GMail fiókokat, amikbe be vagy jelentkezve. (Nem kell felhasználónevet és jelszót megadni!)
* Támogatja a Google többfiókos bejelentkezését.
* Minden Google fiókot kezelni tud.
* Beállítható, hogy minden olvasatlan levelet jelezzen, vagy csak a "beérkező levelek" mappában lévőket.
* Beállítható, hogy az email címre mutató linkek (mailto:) közvetlenül a GMailben nyíljanak meg.
* Beállítható, hogy az értesítéskor hangjelzést is adjon.
 
 */

// General Strings for Option-Page
lang.options_update = "Frissítési időköz:";
lang.options_update_unit = "másodperc";
lang.options_unread = "Minden olvasatlan";
lang.options_sound = "Hangjelzés új üzenet érkezésekor";
lang.options_mailto = "Az email címekre mutató linkek (mailto:) megnyitása GMailben";
lang.options_debugmode = "Debug-üzenetek engedélyezése";
lang.options_close = "Mentés és a beállítások bezárása";
lang.options_refresh = "Fiókok frissítése";
lang.options_choose_theme = "Válassz témát!";
lang.options_description = "A Google Mail Notifier egy kis méretű, egyszerű és gyors kiegészítő, \
ami egy eszköztáron elhelyezett gomb segítségével értesít, ha új leveled érkezik a GMail fiókodba. \
A gombon mutatja az olvasatlan levelek számát, a lenyíló panelen pedig kilistázza a levelek tárgyát. \
Ezen túl egy olyan opciót is tartalmaz, amivel az email linkek (mailto:) közvetlenül a GMailben nyílnak meg.";
lang.options_description_accounts = "A kiegészítő automatikusan felismeri azokat a GMail fiókokat, amibe be vagy jelentkezve. \
A kiegészítő működéséhez tehát be kell jelentkezned a GMail fiókodba. \
Ha egyszerre több fiókba is szeretnél bejelentkezni, akkor használd a <a id='ma_link'>több fiókos bejelentkezést</a>!";
lang.options_dectected_accounts = "Észlelt fiókok:";
lang.options_accounts_header = "GMail fiókjaid";
lang.options_appearance_header = "Megjelenés";
lang.options_other_header = "További beállítások";
lang.options_link_operapage = "Opera Kiegészítő Oldal"
lang.options_link_projectpage = "Projekt Weboldal";
lang.options_link_feedback = "Visszajelzés / Hibajelentés";

// Tooltips for Option-Page
lang.options_unread_tooltip = "Akkor engedélyezd ezt az opciót, ha minden olvasatlan levélről kérsz értesítést, nem csak azokról, amik a bejövő levelek mappában vannak!";

// Strings for Popup-Page (click on button)
lang.popup_open = "<strong>GMail</strong> megnyitása új fülön";
lang.popup_compose = "Levél írása";
lang.popup_pref = "Beállítások";
lang.popup_nomsg = "<strong>Nincs</strong> olvasatlan leveled.";
lang.popup_onemsg = "<strong>1</strong> olvasatlan leveled van.";
lang.popup_msg_before = "<strong>";
lang.popup_msg_after = "</strong> olvasatlan leveled van.";
lang.popup_lastupdate = "Utolsó frissítés: ";
lang.popup_error_occurred="Hiba történt!";
lang.popup_from = "Feladó: ";
lang.popup_to = "Címzett: ";
lang.popup_choose_account = "Válassz fiókot: ";

// Error-Strings
lang.error_noActiveAccount = "<strong>Nem észlelek aktív GMail fiókot.</strong>" +
"<br/><a href='http://mail.google.com'>Jelentkezz be a GMail fiókodba</a>, és próbáld újra!";

// Localized Links
lang.link_multisession_help = "http://support.google.com/accounts/bin/answer.py?hl=hu&hlrm=en&answer=1721977";