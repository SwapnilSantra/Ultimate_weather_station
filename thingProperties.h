
#include <ArduinoIoTCloud.h>
#include <Arduino_ConnectionHandler.h>
#include "audrinosecrets.h"

const char DEVICE_LOGIN_NAME[]  = "Device_ID";  //Genareted automatically after connecting device on iot cloud platform

const char SSID[]               = SECRET_SSID;    // Network SSID (name)
const char PASS[]               = SECRET_OPTIONAL_PASS;    // Network password (use for WPA, or use as key for WEP)
const char DEVICE_KEY[]  = SECRET_DEVICE_KEY;    // Secret device password

//In IOT cloud free version you can only assign 5 things. Get premium for 10 things slot or more than 10 
float hUMIDITY;
float pressure;
float altitude;
CloudLuminousFlux light_Intensity;
CloudTemperature temperature;

void initProperties(){

  ArduinoCloud.setBoardId(DEVICE_LOGIN_NAME);
  ArduinoCloud.setSecretDeviceKey(DEVICE_KEY);
  ArduinoCloud.addProperty(hUMIDITY, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(pressure, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(altitude, READ, ON_CHANGE, NULL, 50);
  ArduinoCloud.addProperty(light_Intensity, READ, ON_CHANGE, NULL);
  ArduinoCloud.addProperty(temperature, READ, ON_CHANGE, NULL);
}

WiFiConnectionHandler ArduinoIoTPreferredConnection(SSID, PASS);
