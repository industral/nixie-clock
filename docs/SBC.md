### Developing

On working machine share you folder via SMB.

On macOS it's `Preferences -> Sharing -> File Sharing`. 
Select folder, and in `Options` select `SMB` and enable your account. Enter password.


On **SBC** mount that folder :


```
sudo mount -t cifs //YOUR_IP/YOUR_PATH /mnt -o user=YOUR_USER,uid=$(id -u `whoami`),gid=$(id -g `whoami`)
```

for example:


```
sudo mount -t cifs //192.168.0.11/nixie-clock /mnt -o user=alex,uid=$(id -u `whoami`),gid=$(id -g `whoami`)
```

Where, **YOUR_USER** is a user on dev machine.
