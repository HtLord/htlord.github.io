---
title: Linux Tips
pubDate: '2021-04-25'
tags: 
  - linux
---
Resource
---
| Task name| Synopsis| Example|
| ---| ---| ---|
| Resource dashboard dynamically| top| top|
| Fancy resource dashboard dynamically| htop| htop|
| Network interface| ip a| ip a|
| Resource of memory(mac not supported)| cat /proc/meminfo| cat /proc/meminfo
| Resource of CUP(mac not supported)| cat /proc/cpuinfo| cat /proc/cupinfo


Users
---
| Task name| synopsis| Example|
|---|---|---|
| Add new user(in supervisor mode)| useradd <user-login>| useradd weichen
| Add user into group(in supervisor mode)| usermod <group> <user-login>| usermod admin weichen|
| Change password| passwd| passwd|
| Change folder file ownership| chown <your-id>| chown weichen|
| Change folder file ownership| chown <your-id>:<group-id>| chown weichen:share|
| Change read, write, and execution auth| chmod <auth-number> <file-name>| chmod 666 README.md|
| Change file auth for group| chmod g<add_permission_or_remove_permission>| chmod g+rwx admin</br>or</br>chmod g-rwx admin|
| View my id| whoami| whoami|
| View my group| groups| groups|
| Add user to group | usermod -a -G <group-id> <user-login>| usermod -a -G admin weichen|
| Remove user from system| userdel <user-login>| userdel hello|
| Remove user from group| gpasswd -d <user-login> <group-id>| gpasswd -d hello adm |
| Change to using as other user| su -l <user-login>| su -l hello|


Environment checking(Administrating)
---
| Task name| synopsis| Example|
|---|---|---|
| Showing used command counting| hash | hash|
| Pring where is the command you want to know| where <command-you-want-to-know> | where docker|
| Display all enviroment variables| env| env|
| Check current direcotry disk space usage| du| du|
| Check mounted disk space usage| df| df|
| Check disk usage sumarizing| du -h --max-depth=1| du -h --max-depth=1|
| Sort the incoming inputs| <cmd> &#124; sort| du &#124; sort|
| Print only top n result of input| <cmd> &#124; head -n <top-n-rows>| du &#124; head -n 3|
| Find password and account| cat /etc/passwd| cat /etc/passwd|
| Find groups | cat /ect/group| cat /etc/group|
| Find hardware info| cat /proc/cpuinfo| cat /proc/cpuinfo|
| Find os version| cat /etc/os-release| cat /etc/os-release
| Change default shell| chsh <shell>| chsh zsh|
| Watching machine operation history| journalctl| journalctl|
| Watching systemd operation status| systemctl| systemctl|
| Search file| locate <file_name>| locate hello.world|


Process
---
| Task name| synopsis| Example|
|---|---|---|
| Display ip, port, PID and state of net| netstat -p | netstat -p |
| List opened file for checking port conflict(If there is no return with)| lsof -i <port_or_protocol>| lsof -i :8080 <br/>lsof -i tcp|
| Detach process| CTRL + Z and then run `bg`| CTRL + Z and then run `bg`|
| Terminate procedure| kill -9 <pid>| kill -9 1212|
| Runing command/service without outputing | nohup <command> | nohup npm start|

Network
---
| Task name| synopsis| Example|
|---|---|---|
| Display all procedures| ps -A| ps -A|
| Display ip of domain name| host <domain_name>| host google.com|
| Setting firewall| iptables| iptables|


Authentication
---
| Task name| synopsis| Example|
|---|---|---|
| Get into supervisor mode(root authentication) then it will ask for your password| sudo su| sudo su|
| Get off supervisor mode| exit| exit|

::: warning
- You can not directly get into supervisor mode with command `su` rather `sudo su`.
:::


File
---
|Task name|synopsis|Example|
|---|---|---|
|Copy file|cp <src_file> <target_directory> |cp file /pat/to/directory
|Copy files in existed diretory| cp <src_file_directory> <target_directory>|
| Make directory, its child directory, its childs directory, and so on(meanwhile recursive)| mkdir -p \<parent\> / \<child\> / \<grandchil\>| mkdir -p parent/child/grandchil|
| File description, 0: stdin, 1: stdout, 2: stderr| <command> >&1| echo 'hello' >&1|
| Append file content to another| cat <file1> >> <file2>| cat hello.log >> word.log|
| Find file can work with wildcard character| find <location> -name <file_name>| find . -name 'hello*'|
| Remove file start with hypen| rm -- <hypen-named-file>| rm -- -OMG|

STDIN
---
|Task name|synopsis|Example|
|---|---|---|
| Find word in string| grep <what_you_want_to_find>| grep 'hello'|
| Find word with regex| grep -E <regex>| grep -E 'tcp &#124; udp'|
| Cut string with delimiter and indicate partition| cut -d <delimiter> -f <index_or_range_of_partition>| cut -d '' -f 2 <br/> cut -d '' -f 2-5|
| Edit inputs, delete m~n line| sed '<line-number>d'| sed '1,5d'|
| Use pipline output as command args| xargs <some-cmd>| echo my-container &#124; xargs docker stop| 
| Read input as variable to use(in bash)| read -p <arg-name>| read -p "My name is" name|
| Read input as variable to use(in zsh)| read <arg-name>| read "My name is" name|

Script
---
|Task name|synopsis|Example|
|---|---|---|
|Mulitple line cmd| <cmd_section_1> \ <cmd_section_2> \ <cmd_section_3>| docker run \ -p 8080:8080 \ -d \ mycontainer
| If-else statement clause check [here](#APPEND)| if [ <expression> ]<br/> then<br/> <expressions...><br/> fi| if [ $1 = 'hello']<br/> then<br/> echo world<br/>fi|
| Exit shell| exit <exit-code>| exit 1|
| All parameter| $@| function echoParams() {echo $@} \ <br/>echoParams arg1 arg2 arg3 // arg1arg2arg3|
| Inline, enviroment for current cmd| <some_env_key>=<some_env_value> <your_cmd>| SPRING_PROFILES_ACTIVE=dev ./gradlew bootRun|
| Record nohup process pid| nohup <your_cmd> & echo $! > <pid_file>| nohup java -jar my-java & echo $! > ./pid-file.txt

Pipline
---
|Task name| Synopsis| Example|
|---|---|---|
| Redirect command result to other place. You can design which kind of resource to be redirected.<br/>(0: stdin, 1: stdout, 2: stderr)| [< blank &#124;  0 &#124; 1 &#124; 2>]><some_file> <br/>[< blank &#124;  0 &#124; 1 &#124; 2>]><[ stdout &#124; stderr ]>| >log // all msg to log file<br/>2>err.log // error msg to file<br/>2>&1 // error msg to console<br/>>/dev/null 2>err.log // error msg to err.log file. stdout to black hole.|
| Use returned result as parameter for some command| $(<some_command_or_pipelines>)| cp $(ls &#124; egrep 'Hello') /some/else/location|
| Black hole, A pipeline holder which does not care what output send to it | <some_command> >/dev/null| echo 'hello' >/dev/null|
| Output data as variable| <some-output> &#124; read <your-var> | echo "hello world" &#124; read greeting|


cUrl
---
|Task name| Synopsis| Example|
|---|---|---|
| Fire request to location with https schema but ignore it| curl -X <http_method> -k <http_url>| curl -X GET -k 'https://localhost/some/where'|
| Fire request to location with https schema but using cert file| curl -X <http_method> --cacert <cert_file_location> <http_url>| curl -X GET --cacert '/here/is/my/public.cert' 'https://localhost/some/where'


Security/Openssl
---
|Task name| Synopsis| Example|
|---|---|---|
| Generate cert key pair| openssl req -x509 -newkey rsa:2048 -keyout <key_name>.pem -out <cert_name>.pem -days <cert_duration>| openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365|
| Generate cert key paire| openssl req -nodes -new -x509 -keyout <name>.key -out <name>.cert| openssl req -nodes -new -x509 -keyout server.key -out server.cert|
| Checksum sha256| openssl sha256 <file>| openssl sha256 some.file|
| Generate a personal key pair for ssh| ssh-keygen -t rsa -C <your-email>| ssh-keygen -t rsa -C "hello@world.io"|
| Register local machine's ssh-key to remote machine | ssh-copy-id -i <your-public-ssh-key> <remote-machine-url> | ssh-copy-id -i test.key.pub weichen@night.htlord.taipei|
| Access to remote machine using ssh key| ssh -i <your-private-key> <remote-machine-url> | ssh -i test.key weichen@night.htlord.taipei|
| Using ssh key to tell remote machine what to do| ssh -i <your-private-key> -t <remote-machine-url> <command-running-on-remote-machine>| ssh -i test.key -t weichen@night.htlord.taipei touch test-file|
:::warning
If you are using MacOS. You need to use `Keychain Access` to add you certification key pair.
:::

:::warning
If you are using Chrome. Type `chrome://flags/#allow-insecure-localhost` to your url bar and enable localhost ssl
:::

Vim
---
### In operation mode's action a.k.a just press key on keyboard
| Task name| Synopsis| Example|
|---|---|--|
| Cursor operations| ----------| ----------|
| Move to end of line| $(SHIFT + 4)| $(SHIFT + 4)|
| Remove previous word| CTRL + w| CTRL + w|
| Move to specific line| <line-number>gg| 128gg|
| Move to first line of file| gg| gg|
| Move to last line of file| G(SHIFT + g)| G|
| Move to next found word| n| n|
| Editing operations| ----------| ----------|
| Move to next word| e| e|
| Move to previous word| b| b|
| Move to begin of line| 0| 0|
| Undo| u| u|
| Finding operations| ----------| ----------|
| Find 

Tools
---
|Task name| Synopsis| Example|
|---|---|---|
| Generate password| htpasswd| htpasswd|
| Quick zip file into tar| tar zcf <target_name> <source_name_1> <source_name_2> ...| tar zc im.tar.gz hello.log world.log im.log|
| Quick zip a folder to tar| tar -cvf <target-directory>| tar -cvf hello-world|
| Quick unzip a tar| tar zxf <target_name>| tar zxf im.tar.gz|
| File, string to base 64| cat <target-file> &#124; base64 | cat hello.txt &#124; base64 |
| Decode base64 to String | base64 -D <target-file> | base64 -D hello.base64|

Filesystem Hierarchy Standard
---
```
/
└ bin
└ boot
└ dev
└ etc
    └ opt
└ opt
└ home
└ lib
└ run
└ srv
└ var
```

Tips
---
:::info
- Fonts folder: /Users/<user_name>/Library/Fonts
- General speak, morden prompt tools follow with `-<some-alphabet>` to present shortcut of option which can be map to `--<some-option>`. For example, `docker -d ...` equivalent to `docker --deattach=true`
:::

APPEND
----
### IF-ELSE clause table
| Task| Example|
|---|---|
| Not logic| [ ! <expression> ]|
| String logic<br/>-n: not zero length<br/>-z: equal zero| [ <string-1> `=` &#124; `!=` <string-2> ]<br/> or<br/> [ `-n` &#124; `-z` <string> ]
| Number logic| [ <number-1> `-eq` &#124; `-gt` &#124; `-lt`  <number-2> ]
| File logic<br/> -d: exist directory<br/> -e: exist file<br/> -s: is not empty file<br/> -r: exist and has read permission<br/> -w:exist and has write permission<br/>  -x: exist and has excute permission| [ `-d` &#124; `-e` &#124; `-r` &#124; `-s` &#124; `-w` &#124; `-x` <file> ]

### examples
```bash
// User interface with arguments
read "anser?Do you want to remove all local branch except master, release, and develop? "
// If-else clause
if [ $anser = 'yes' ]; then
 echo 'Remove all branch except master, releasae, develop'
fi
```

### Tips
- Command line named as `ch*` means change something
- When to use base64, transfer some data from A to B. for example, transfer image data by json. Or enviroment variable as a file.

### Reference
[Linuxize](https://linuxize.com/)