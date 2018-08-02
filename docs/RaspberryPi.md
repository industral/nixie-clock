# Raspberry Pi

Default login: `pi` and password: `raspberry`.

### Setup local

**~/.profile**

```
export LC_ALL="en_US.UTF-8"
export LC_CTYPE="en_US.UTF-8"
```

```bash
sudo nano /etc/locale.gen
sudo locale-gen
```


### Setup Wifi

**/etc/network/interfaces**

```bash
allow-hotplug wlan0
auto wlan0
iface wlan0 inet static
    address YOUR_IP_ADDRESS
    netmask 255.255.255.0
    gateway YOUR_GATEWAY
    dns-nameservers 8.8.8.8 8.8.4.4
    wpa-ssid WIFI_SSID
    wpa-psk WIFI_PASSWORD
```

### Enable SSH for remote working

```bash
sudo update-rc.d ssh enable
```

Now you can access via `ssh pi@YOUR_IP_ADDRESS`.


### Configure I2C

```bash
sudo raspi-config
```

`Interfacing Options >> I2C | Would you like the ARM I2C interface to be enabled? >> YES`

**Detect I2C**

```bash
i2cdetect -y 1
```

You can use `i2cset` util to check your PCB.


### Configure Timezone

```bash
sudo timedatectl set-ntp True
sudo dpkg-reconfigure tzdata
```
