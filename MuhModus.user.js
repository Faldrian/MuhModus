// ==UserScript==
// @name        Muh-Modus
// @namespace   Mein eigener
// @description Weitersagen -> Weiderkäuen
// @include     https://*/stream
// @include     https://*/notifications
// @include     https://*/activity
// @include     https://*/followed_tags
// @include     https://*/aspects
// @include     https://*/mentions
// @include     https://*/tags/*
// @include     https://*/people/*
// @version     1.0.0
// ==/UserScript==


function wrapper() {
window.muhmodus = function() {} // Namespace machen
window.muhmodus.setup = function() {

	// Einmalig ausführen
	window.muhmodus.muhfikation();
	
	// Listener setzen
	window.app.stream.on('fetched', window.muhmodus.muhfikation);
	
	// Okay!
	console.log("MuhModus aktiv.");
}

window.muhmodus.muhfikation = function() {
	// "Weitersagen" unterm Beitrag
	jQuery('div.feedback a.reshare').html('Wiederkäuen');
	
	// In den Beiträgen, die Wiedergekäut wurden
	jQuery(".details.grey").contents().each(function() {
		if(this.nodeType === 3 && this.nodeValue.indexOf("weitergesagt") != -1) {
			this.nodeValue = this.nodeValue.replace("weitergesagt", "wiedergekäut");
		}
    });
    
    // Benachrichtigungsübersicht
	jQuery("div.notifications_for_day div.bd").contents().each(function() {
		if(this.nodeType === 3 && this.nodeValue.indexOf("weitergesagt") != -1) {
			this.nodeValue = this.nodeValue.replace("weitergesagt", "wiedergekäut");
		}
    });
    
    // Benachrichtigungs-Dropdown
	jQuery("#notification_dropdown div.notification_element").contents().each(function() {
		if(this.nodeType === 3 && this.nodeValue.indexOf("weitergesagt") != -1) {
			this.nodeValue = this.nodeValue.replace("weitergesagt", "wiedergekäut");
		}
    });
}

setTimeout(window.muhmodus.setup, 2000); // Ein bisschen warten, bis wir uns aktivieren.

} // end of wrapper


// Check if the page is a Diaspora-Pod (all Pods have a meta-element with "Diaspora*" as content)
var isValidPod = false;
var meta_elements = window.document.getElementsByTagName('meta');
for(key in meta_elements) {
	if(meta_elements[key].getAttribute("content") == 'Diaspora*') {
		isValidPod = true;
		break;
	}
}

// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

