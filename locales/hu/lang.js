/* Google Mail Notifier - Hungarian Translation
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by R�bert T�th (nekomajin42@gmail.com)

 SHORT DESCRIPTION FOR ADDONS.OPERA.COM (max 220):
 Egyszer� �s gyors kieg�sz�t�, ami �rtes�t, ha �j �zeneted �rkezik a GMail fi�kodba. 
 T�bb fi�kot is k�pes kezelni, �s be�ll�that� az is, hogy az email linkek (mailto:) k�zvetlen�l a GMailben ny�ljanak meg.
 
 DETAILED DESCRIPTION FOR ADDONS.OPERA.COM:
 A Google Mail Notifier egy kis m�ret�, egyszer� �s gyors kieg�sz�t�, ami egy eszk�zt�ron elhelyezett gomb seg�ts�g�vel �rtes�t, ha �j leveled �rkezik a GMail fi�kjaidba. 
 A gombon mutatja az olvasatlan levelek sz�m�t, a leny�l� panelen pedig kilist�zza a levelek t�rgy�t. 
 Ezen t�l egy olyan opci�t is tartalmaz, amivel az email linkek (mailto:) k�zvetlen�l a GMailben ny�lnak meg.
 
 Funkci�k:
 * Automatikusan felismeri a GMail fi�kokat, amikbe be vagy jelentkezve. (Nem kell felhaszn�l�nevet �s jelsz�t megadni!)
 * T�mogatja a Google t�bbfi�kos bejelentkez�s�t.
 * Minden Google fi�kot kezelni tud.
 * Be�ll�that�, hogy minden olvasatlan levelet jelezzen, vagy csak a "be�rkez� levelek" mapp�ban l�v�ket.
 * Be�ll�that�, hogy az email c�mre mutat� linkek (mailto:) k�zvetlen�l a GMailben ny�ljanak meg.
 * Be�ll�that�, hogy az �rtes�t�skor hangjelz�st is adjon.
 * Be�ll�that�, hogy a fi�k "alap HTML" m�dban ny�ljon meg.
 * Be�ll�that�, hogy a fi�kban ne jelenjenek meg a rekl�mok.
 * A leny�l� panelen alapvet� m�veleteket is el tud v�gezni a levelekkel (olvasottnak jel�l�s, t�rl�s, stb).
 */

// Init Language-Object
// Note: This is only done here, the translation-files under locales/ overrides
// this object (so we have always a fallback for new/untranslated strings)

var lang = new Object();

// General Strings for Option-Page
lang.options_update = "Friss�t�si id�k�z";
lang.options_update_unit = "m�sodperc";
lang.options_sound = "Hangjelz�s �j �zenet �rkez�sekor";
lang.options_enable_messageactions = "Lev�l m�veletek enged�lyez�se (Megjel�l�s olvasottk�nt, t�rl�s, stb)";
lang.options_mailto = "Az email c�mekre mutat� linkek (mailto:) megnyit�sa GMailben";
lang.options_debugmode = "Debug-�zenetek enged�lyez�se";
lang.options_htmlmode = "\"Alap HTML n�zet\" haszn�lata";
lang.options_adfree = "Hirdet�sek elrejt�se a GMail oldalon"
lang.options_tooltip = "Lev�l inform�ci�k mutat�sa, ha az egeret az �zenet f�l� viszem";
lang.options_close = "Ment�s �s a be�ll�t�sok bez�r�sa";
lang.options_refresh = "Fi�kok friss�t�se";
lang.options_choose_theme = "Megjelen�s kiv�laszt�sa:";
lang.options_description = "A Google Mail Notifier egy kis m�ret�, egyszer� �s gyors kieg�sz�t�, \
ami egy eszk�zt�ron elhelyezett gomb seg�ts�g�vel �rtes�t, ha �j leveled �rkezik a GMail fi�kodba. \
A gombon mutatja az olvasatlan levelek sz�m�t, a leny�l� panelen pedig kilist�zza a levelek t�rgy�t, \
�s megjelen�t n�h�ny alapvet� lev�l m�veletet. \
Ezen t�l olyan opci�kat is tartalmaz, mint p�ld�ul az email linkek (mailto:) k�zvetlen megnyit�sa a GMailben, \
a hangjelz�s �j �zenet �rkez�sekor vagy a fi�k HTML m�dban t�rt�n� bet�lt�se.";
lang.options_description_accounts = "A kieg�sz�t� automatikusan felismeri azokat a GMail fi�kokat, amibe be vagy jelentkezve. \
A kieg�sz�t� m�k�d�s�hez teh�t be kell jelentkezned a GMail fi�kodba. \
Ha egyszerre t�bb fi�kba is szeretn�l bejelentkezni, akkor haszn�ld a <a id='ma_link'>t�bb fi�kos bejelentkez�st</a>!";
lang.options_dectected_accounts = "�szlelt fi�kok:";
lang.options_accounts_header = "GMail fi�kjaid";
lang.options_appearance_header = "Megjelen�s";
lang.options_other_header = "Tov�bbi be�ll�t�sok";
lang.options_link_operapage = "Opera Kieg�sz�t� Oldal";
lang.options_link_projectpage = "Projekt Weboldal";
lang.options_link_feedback = "Visszajelz�s / Hibajelent�s";

// Account-Labels (built-in)
lang.options_label_inbox = "Be�rkez� levelek";
lang.options_label_important = "Fontos";
lang.options_label_unread = "Minden olvasatlan";
lang.options_label_ignore= "Fi�k figyelmen k�v�l hagy�sa";

// Tooltips for Option-Page
lang.options_label_tooltip = "�ll�tsd be, hogy milyen �zenetekr�l k�rsz �rtes�t�st!";

// Strings for Popup-Page (click on button)
lang.popup_open = "<strong>GMail</strong> megnyit�sa �j f�l�n";
lang.popup_compose = "Lev�l �r�sa";
lang.popup_pref = "Be�ll�t�sok";
lang.popup_nomsg = "<strong>Nincs</strong> olvasatlan leveled.";
lang.popup_onemsg = "<strong>1</strong> olvasatlan leveled van.";
lang.popup_msg_before = "<strong>";
lang.popup_msg_after = "</strong> olvasatlan leveled van.";
lang.popup_lastupdate = "Utols� friss�t�s: ";
lang.popup_error_occurred = "Hiba t�rt�nt!";
lang.popup_from = "Felad�: ";
lang.popup_to = "C�mzett: ";
lang.popup_choose_account = "V�lassz fi�kot: ";

// Tooltip-Strings
lang.tooltip_open = "Lev�l megnyit�sa";
lang.tooltip_mark = "Megjel�l�s olvasottk�nt";
lang.tooltip_archive = "Archiv�l�s";
lang.tooltip_spam = "Spam bejelent�se";
lang.tooltip_delete = "T�rl�s";

// Strings for Mails
lang.mail_empty_subject= "(Nincs megadva t�rgy.)";
lang.mail_empty_body = "(A lev�l nem tartalmaz sz�veget.)";

// Error-Strings
lang.error_noActiveAccount = "<strong>Nem �szlelek akt�v GMail fi�kot.</strong>" +
"<br/><a href='http://mail.google.com'>Jelentkezz be a GMail fi�kodba</a>, �s pr�b�ld �jra!";

// Localized Links
lang.link_multisession_help = "http://support.google.com/accounts/bin/answer.py?hl=hu&answer=1721977";