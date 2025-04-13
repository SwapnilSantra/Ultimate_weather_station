function doGet(e) {
  Logger.log("Raw e.parameter: " + JSON.stringify(e.parameter));}
function doGet(e) {
  Logger.log(JSON.stringify(e));
  var result = 'Ok';

  if (!e || !e.parameter) {
    result = 'No Parameters';
  } else {
    var sheet_id = 'Your Google Sheet Id Here'; //Paste Your Google Sheet Id 	
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
    if (airQuality > p1 || temperature > p2) {
      sendAlertEmail(airQuality, temperature);
      result += " | Alert email sent.";  // Assign p1 and p2 for your threshold value to send email alert
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
  var recipient = "Email_Id";  // <-- Put Email Id where you want to get email Alert
  var subject = "🚨 Sensor Alert from IoT System";
  var body = "⚠️ Attention!!!\n\n";

  if (airQuality > p1) {
    body += "Air Quality is too high: " + airQuality + " (safe ≤ p1)\n";//put p1 value
  }

  if (temperature > p2) {
    body += "Temperature is too high: " + temperature + "°C (safe ≤ p2)\n";//put p2 value
  }

  body += "\nTimestamp: " + new Date().toLocaleString();

  MailApp.sendEmail(recipient, subject, body);
}
