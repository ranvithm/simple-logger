const Logger = require("./logger")

var logger = new Logger('logs', 'infoxd_', 'txt', ["Row 1", "Row 2", "Row 3", "Row 4", "Row 5"])

logger.log('Row1', "row2", 'row3', 'row4', 'row5')