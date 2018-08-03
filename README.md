# Sainsmart 16 Channel USB Relay Guide
Hi. I recently purchased a Sainsmart 16-Channel USB Relay Board (the "Relay Board" from here on out). It wasn't until it was delivered and I went to try it out with a Rasperry Pi that I noticed that documentation for this product was rather sparse/nonexistent. After many failed attempts and much frustration, I was finally able to get it to work. Since I couldn't find any direct guides for how to do so, I figured I'd throw one together. So here we go.

### To Use
If you wanna skip all the nonsense, just do the following:

0. `sudo apt-get update`, `sudo apt-get upgrade`
1. Download the driver - `sudo wget https://github.com/aperepel/raspberrypi-ch340-driver/releases/download/4.4.11-v7/ch34x.ko`
2. Update your pi - `sudo rpi-update`
3. Reboot your pi - `sudo reboot`
4. Check to make sure ch341.ko is installed - `ls /lib/modules/$(uname -r)/kernel/drivers/usb/serial` ($(uname -r) should evaluate to something like "4.14.58-v7+")
5. Plug the Relay Board into your Pi
6. Check to make sure ch341 (and usbserial) process is running - `lsmod`
7. Check to make sure the Relay Board has been recognized through USB - `ls /dev/tty*` (Look for 'ttyUSB0')
8. Add this repo - `npm install sainsmart-16-channel-usb-relay-ch341` (I'll get around to adding dependencies (just serialport) and all that)
9.`node 16ch_usb.js <relay # (1-16)> <state (on, off)>` to flip individual relays or `node 16ch_usb.js reset` to turn them all off

## Why this Board
I had used the [GPIO-controlled 16-channel board from Sainsmart](https://www.sainsmart.com/products/16-channel-12v-relay-module?nosto=continue-shoppping) in a few projects before. It's pretty well-made and reliable, but wiring it is such a pain and you can only really control about 26 relays or so with the GPIO pins of a Raspi Model B. This is normally more than enough, but I needed a bit more capacity to avoid using multiple Pi's.

So I was very excited when I noticed Sainsmart had added a USB-controlled relay board. Theoretically, it meant that I would be able to control 64 individual relays with one pi (4 USB slots x 16 relays each). So I ordered a few.

## Long Story Short
Sainsmart provided some materials on commands, and I found a github repo for a raspi ch340/341 driver, which allowed me to communicate commands to the Relay Board, eventually resulting in the helper file you see above.

## Short Story Long
After searching some forums to see if anyone had used these in a project before and was kind enough to include sample code, and failing to find anything, I emailed Sainsmart support. They provided this link: [16-Channel wiki](http://wiki.sainsmart.com/index.php/101-70-208)

Out of two .exe files and a couple of diagrams, the only information that was actually useful was the command breakdown for turning relays on and off through USB serial commands. I plugged in the relay to my Pi again to see if I could figure out what drivers it might need. `lsusb` showed a list of usb devices and the relay board showed up with this info: `QinHeng Electronics HL-340 USB-Serial adapter`

The "HL-340" part ended up pointing me to a ch340/341 driver and [this repo](https://github.com/aperepel/raspberrypi-ch340-driver). Getting that .ko file to install on my Pi was frustrating - the `insmod` command was throwing an error, which was documented in the repo's issues tab. I read through the issues and eventually got to the following steps:

0. `sudo apt-get update`, `sudo apt-get upgrade`
1. Download the driver - `sudo wget https://github.com/aperepel/raspberrypi-ch340-driver/releases/download/4.4.11-v7/ch34x.ko`
2. Update your pi - `sudo rpi-update`
3. Reboot your pi - `sudo reboot`
4. Check to make sure ch341.ko is installed - `ls /lib/modules/$(uname -r)/kernel/drivers/usb/serial` ($(uname -r) should evaluate to something like "4.14.58-v7+")
5. Plug the Relay Board into your Pi
6. Check to make sure ch341 (and usbserial) process is running - `lsmod`
7. Check to make sure the Relay Board has been recognized through USB - `ls /dev/tty*` (Look for 'ttyUSB0')
8. Use the serialport library to interact with that port (i.e. `const port = new SerialPort('/dev/ttyUSB0')`) and/or use my code above to test your connection through the command line

# Enjoy
