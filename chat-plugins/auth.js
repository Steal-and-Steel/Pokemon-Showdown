///^\+/mi
'use strict';
let color = require('../config/color');
let fs = require('fs');
exports.commands = {
		auth: 'staff',
		authority: 'staff',
    	staff: function(target, room, user, connection) {
		fs.readFile('config/usergroups.csv', 'utf8', function(err, data) {
			var staff = {
				"admins": [],
				"developers": [],
				"leaders": [],
				"bots": [],
				"mods": [],
				"drivers": [],
				"voices": [],
				"vip": []
			};
			var row = ('' + data).split('\n');
			for (var i = row.length; i > -1; i--) {
				if (!row[i]) continue;
				var rank = row[i].split(',')[1].replace("\r", '');
				var person = row[i].split(',')[0];
				function nameColor (name) {
					if (Users.getExact(name) && Users(name).connected) {
						return '<b><i><font color="' + color(name) + '">' + Chat.escapeHTML(Users.getExact(name).name) + '</font></i></b>';
					} else {
						return '<font color="' + color(name) + '">' + Chat.escapeHTML(name) + '</font>';
					}
				}
				switch (rank) {
					case '~':
						staff['admins'].push(nameColor(person));
						break;
					case '$':
						staff['developers'].push(nameColor(person));
						break;
					case '&':
						if (toId(person) === 'tintins') break;
						staff['leaders'].push(nameColor(person));
						break;
					case '*':
						staff['bots'].push(nameColor(person));
						break;
					case '@':
						staff['mods'].push(nameColor(person));
						break;
					case '%':
						staff['drivers'].push(nameColor(person));
						break;
					case '+':
						staff['voices'].push(nameColor(person));
						break;
					case '=':
						staff['vip'].push(nameColor(person));
					default:
						continue;
				}
			}
			connection.popup('|html|' +
				'<h3>Server Authority List</h3>' +
				'<br /><b>~ Administrators (' + staff['admins'].length + ')</b>:<br />' + staff['admins'].join(', ') +
				//'<br /><b>$ Developer (' + staff['developers'].length + ')</b>:<br />' + staff['developers'].join(', ') +
				'<br /><b>& Leaders (' + staff['leaders'].length + ')</b>:<br />' + staff['leaders'].join(', ') +
				'<br /><b>* Bots (' + staff['bots'].length + ')</b>:<br />' + staff['bots'].join(', ') +
				'<br /><b>@ Moderators (' + staff['mods'].length + ')</b>:<br />' + staff['mods'].join(', ') +
				'<br /><b>% Drivers (' + staff['drivers'].length + ')</b>:<br />' + staff['drivers'].join(', ') +
				'<br /><b>+ Voices (' + staff['voices'].length + ')</b>:<br />' + staff['voices'].join(', ') +
				'<br /><b>= V.I.P (' + staff['vip'].length + ')</b>:<br />' + staff['vip'].join(', ') 
			);
		});
	},
}
