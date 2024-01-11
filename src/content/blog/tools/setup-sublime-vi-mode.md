---
title: Set Sublime into Vi mode
pubDate: '2021-09-17-'
tags:
  - sublime
  - vim
---

How to
---
- Enable Vi mode
	1. Click `Preferences > Settings`
	1. Copy and past code below into setting file
		```json
		{
			"ignored_packages": [],
			"vintage_ctrl_keys": true,
			"vintage_start_in_command_mode": true
		}
		```
- Enable `ctrl+c` to switch insert/visual mode
	1. Click `Preferences > Key Bindings`
	1. Copy and past for adding code below into original setting file. Other more vi mode keymap can be found in [here](https://github.com/sublimehq/Vintage/blob/master/Default.sublime-keymap#L3)
		```json
		[
			{ "keys": ["escape"], "command": "exit_insert_mode",
				"context":
				[
					{ "key": "setting.command_mode", "operand": false },
					{ "key": "setting.is_widget", "operand": false }
				]
			},
			{ "keys": ["escape"], "command": "exit_visual_mode",
				"context":
				[
					{ "key": "setting.command_mode"},
					{ "key": "num_selections", "operand": 1},
					{ "key": "selection_empty", "operator": "equal", "operand": false, "match_all": false }
				]
			},
		]
		```
