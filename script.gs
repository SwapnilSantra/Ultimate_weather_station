function doGet(e) {
  Logger.log("Raw e.parameter: " + JSON.stringify(e.parameter));}
function doGet(e) {
  Logger.log(JSON.stringify(e));
  var result = 'Ok';

  if (!e || !e.parameter) {
    result = 'No Parameters';
  } else {
    var sheet_id = '1dnggcRKV5SROhTPjeb_RFN4XAYWlal32ypaBGAcllMI'; 		
    var sheet = SpreadsheetApp.openById(sheet_id).getActiveSheet();		
    var newRow = sheet.getLastRow() + 1;						
    var rowData = [];
    var d = new Date();
    rowData[0] = d;
    rowData[1] = d.toLocaleTimeString();
    
    var airQuality = null;
    var temperature = null;

    for (var param in e.parameter) {
      var value = stripQuotes(e.parameter[param]);
      Logger.log(param + ':' + value);

      switch (param) {
        case 'value1':
          rowData[2] = value;
          airQuality = parseFloat(value);
          break;
        case 'value2':
          rowData[3] = value;
          temperature = parseFloat(value);
          break;
        case 'value3':
          rowData[4] = value;
          break;
      }
    }

    // Check thresholds and send email alert
    if (airQuality > 150 || temperature > 37) {
      sendAlertEmail(airQuality, temperature);
      result += " | Alert email sent.";
    }

    Logger.log(JSON.stringify(rowData));
    var newRange = sheet.getRange(newRow, 1, 1, rowData.length);
    newRange.setValues([rowData]);
  }

  return ContentService.createTextOutput(result);
}

function stripQuotes(value) {
  return value.replace(/^["']|['"]$/g, "");
}

function sendAlertEmail(airQuality, temperature) {
  var recipient = "swapnilsantra2k20@gmail.com";  // <-- change this
  var subject = "🚨 Sensor Alert from IoT System";
  var body = "⚠️ ALERT!\n\n";

  if (airQuality > 150) {
    body += "Air Quality is too high: " + airQuality + " (safe ≤ 150)\n";
  }

  if (temperature > 37) {
    body += "Temperature is too high: " + temperature + "°C (safe ≤ 37°C)\n";
  }

  body += "\nTimestamp: " + new Date().toLocaleString();

  MailApp.sendEmail(recipient, subject, body);
}
