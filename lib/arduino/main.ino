#include <Wire.h>

#include <Time.h>
#include <TimeLib.h>

int I2C_HH_MM_PORT = 0x20;
int I2C_SS_TUBES_PORT = 0x21;

struct TIME {
  String hh;
  String mm;
  String ss;
};

void setup() {
  Serial.begin(9600);
  Wire.begin();
}

void loop() {
  //time_t t = now();
  TIME time = getTime(now());

  int s = (String(time.ss)).toInt();
  Serial.println(byte(12));

  Wire.beginTransmission(I2C_HH_MM_PORT);
  byte test[] = {22, 33};
  Wire.write(test, 2);
  Wire.endTransmission();

  delay(1000);
}

TIME getTime(time_t timestamp) {
  String hh = formatNumberAsString(hour(timestamp));
  String mm = formatNumberAsString(minute(timestamp));
  String ss = formatNumberAsString(second(timestamp));

  //  Serial.println(hh);
  //  Serial.println(mm);
  //  Serial.println(ss);

  return (TIME) {
    hh, mm, ss
  };
}

String formatNumberAsString(int number) {
  String str = '0' + String(number);
  return str.substring(str.length() - 2);
}

