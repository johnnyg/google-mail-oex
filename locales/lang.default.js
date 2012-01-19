/* Google Mail Notifier - English Translation (Default)
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * by Tom Schreiber (tom@codebit.de)
 */

// Init Language-Object
// Note: This is only done here, the translation-files under locales/ overrides
// this object (so we have always a fallback for new/untranslated strings)
var lang = new Object();

// General Strings for Option-Page
lang.options_update = "Update-Time";
lang.options_update_unit = "s";
lang.options_unread = "all unread";
lang.options_sound = "Play notification sound on new messages";
lang.options_mailto = "Open Mail-Links (mailto) with GMail";
lang.options_close = "Apply & Close Window";
lang.options_choose_theme = "Choose Theme";
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
lang.options_unread_tooltip = "enable this option if you want to show all unread mails, not just from inbox";

// Strings for Popup-Page (click on button)
lang.popup_open = "Open <strong>GMail</strong> in new tab";
lang.popup_compose = "Compose Mail";
lang.popup_pref = "Preferences";
lang.popup_nomsg = "There are <strong>no unread messages</strong>";
lang.popup_onemsg = "There is <strong>one unread message</strong>";
lang.popup_msg_before = "There are <strong>";
lang.popup_msg_after = " unread messages</strong>";
lang.popup_lastupdate = "Last Update : ";
lang.popup_error_occurred="error occurred";
lang.popup_from = "From: ";
lang.popup_to = "To: ";

// Error-Strings
lang.error_confails = "<strong>An error occurred.</strong> " +
"Please check your connection and your <a href='javascript:ShowPreferences();'>settings</a>";
lang.error_noActiveAccount = "<strong>There is no active Google Mail Account</strong>, " +
"<br/>please login to your Google-Account and try again.";

