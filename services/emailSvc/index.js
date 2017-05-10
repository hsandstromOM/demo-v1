const mandrill = require('mandrill-api/mandrill')
const mandrill_client = new mandrill.Mandrill('OqwCA1IJ1Ks7ssRmnfFJlw')
const response = require('palmettoflow-event').response
const responseError = require('palmettoflow-event').responseError


module.exports = function() {
	return function(ee) {

		ee.on('/email/send', function(event) {
			// var toEmail = getToEmail(event.object.reason);
			var toEmail = "";

			switch (event.object.reason) {
				case "I'd like information about how to plan an event in a park":
					toEmail = "info@charlestonparksconservancy.com";
					break;
				case "I have a question about volunteering":
					toEmail = "info@charlestonparksconservancy.org";
					break;
				case "I have a question about a Conservancy event":
					toEmail = "info@charlestonparksconservancy.org";
					break;
				case "I have a question about a class or other program":
					toEmail = "info@charlestonparksconservancy.org";
					break;
				case "I am interested in becoming a sponsor or vendor":
					toEmail = "events@charlestonparksconservancy.com";
					break;
				case "I have a question about Community Gardens":
					toEmail = "lwade@charlestonparksconservancy.com";
					break;
				case "I have a question about donating to the Conservancy":
					toEmail = "acarter@charlestonparksconservancy.com";
					break;
				default:
					toEmail = "info@charlestonparksconservancy.org";
					break;
			}
			var message = {
				"html": "<p>" + event.object.firstName + " " + event.object.lastName + "</p>" + event.object.company + "<br>" + event.object.extraInfo,
				"text": event.object,
				"subject": event.object.reason,
				"from_email": event.object.email,
				"from_name": "Charleston Parks Conservatory",
				"to": [{
					"email": toEmail,
					"name": "Recipient Name",
					"type": "to"
                }],
				"headers": {
					"Reply-To": "info@lincs.io"
				},
				"important": false,
				"track_opens": null,
				"track_clicks": null,
				"auto_text": null,
				"auto_html": null,
				"inline_css": null,
				"url_strip_qs": null,
				"preserve_recipients": null,
				"view_content_link": null,
				"bcc_address": "message.bcc_address@example.com",
				"tracking_domain": null,
				"signing_domain": null,
				"return_path_domain": null,
				"merge": true,
				"merge_language": "mailchimp",
				"global_merge_vars": [{
					"name": "merge1",
					"content": "merge1 content"
                }],
				"merge_vars": [{
					"rcpt": "recipient.email@example.com",
					"vars": [{
						"name": "merge2",
						"content": "merge2 content"
                    }]
                }],
				"tags": [
                    "password-resets"
                ]
			}
			var async = false
			var ip_pool = "Main Pool"
			var send_at = new Date()
			mandrill_client.messages.send({
				"message": message,
				"async": async,
				"ip_pool": ip_pool,
				"send_at": send_at
			}, function(result) {
				return (result)
					/*
					[{
					  "email": "recipient.email@example.com",
					  "status": "sent",
					  "reject_reason": "hard-bounce",
					  "_id": "abc123abc123abc123abc123abc123"
					}]
					*/
			}, function(e) {
				// Mandrill returns the error as an object with name and message keys
				console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
				// A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
			})
		})
	}
}

function getToEmail(reason) {
	switch (reason) {
		case "I'd like information about how to plan an event in a park":
			return "info@charlestonparksconservancy.com";
		case "I have a question about volunteering":
			return "mike@launchpeer.com";
		case "I have a question about a Conservancy event":
			return "mcfausz@gmail.com";
		case "I have a question about a class or other program":
			return "info@charlestonparksconservancy.org";
		case "I am interested in becoming a sponsor or vendor":
			return "events@charlestonparksconservancy.com";
		case "I have a question about Community Gardens":
			return "lwade@charlestonparksconservancy.com";
		case "I have a question about donating to the Conservancy":
			return "acarter@charlestonparksconservancy.com";
		default:
			return "info@charlestonparksconservancy.org";
	}
}
