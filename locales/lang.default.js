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
lang.options_sound = "Play notification sound on new messages";
lang.options_mailto = "Open Mail-Links (mailto) with GMail";
lang.options_debugmode = "Enable Debug-Messages";
lang.options_close = "Apply & Close Window";
lang.options_refresh = "Refresh Accounts";
lang.options_choose_theme = "Choose Theme";
lang.options_description = "Google Mail Notifier is a small, simple and fast \
extension to show the number of unread mails in your Gmail-Account(s) in front of a \
button and the titles of the messages in the button-menu. Furthermore this extension \
gives you the option to open mail-links (mailto:) directly with GMail.";
lang.options_description_accounts = "This extension detects automatically your\n\
    open GMail-Accounts. You must be logged in to your Google-Account to see your inbox. If you want to\n\
    use more than one account at time, please use the <a id='ma_link'>multiple sign-in-method</a>."
lang.options_dectected_accounts = "Detected Accounts:";
lang.options_accounts_header = "Your GMail Account(s)";
lang.options_appearance_header = "Appearance";
lang.options_other_header = "Other Options";
lang.options_link_operapage = "Opera Extension Page"
lang.options_link_projectpage = "Project-Homepage";
lang.options_link_feedback = "Feedback/Issue-Report";

// Account-Labels (built-in)
lang.options_label_inbox = "Inbox";
lang.options_label_important = "Important";
lang.options_label_unread = "All unread";

// Tooltips for Option-Page
lang.options_label_tooltip = "Choose where the extension checks for unread messages";

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
lang.popup_choose_account = "Choose your account: ";

// Strings for Mails
lang.mail_empty_subject= "(Empty Subject)";
lang.mail_empty_body = "(Empty Body)";

// Error-Strings
lang.error_noActiveAccount = "<strong>There is no active Google Mail Account</strong>, " +
"<br/>please <a href='http://mail.google.com'>login to your Google-Account</a> and try again.";

// Localized Links
lang.link_multisession_help = "http://support.google.com/accounts/bin/answer.py?hl=en&answer=1721977";