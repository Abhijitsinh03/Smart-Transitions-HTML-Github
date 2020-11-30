var picker = {
  attach : function (target) {
  // attach() : attach datepicker to target

    // Default to current month + year
    // Generate a unique random ID for the date picker
    var today = new Date();
    var thisMonth = today.getMonth(); // Note: Jan is 0
    var thisYear = today.getFullYear();
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var uniqueID = 0;
    while (document.getElementById("picker-" + uniqueID) != null) {
      uniqueID = Math.floor(Math.random() * (100 - 2)) + 1;
    }

    // Create wrapper
    var dr = document.createElement("div");
    dr.id = "picker-" + uniqueID;
    dr.attributes.target = target;
    dr.classList.add("picker-wrap");
    dr.addEventListener("click", function (evt) {
      if (evt.target.classList.contains("picker-wrap")) {
        this.classList.remove("show");
      }
    });

    // Create new date picker
    var dp = document.createElement("div");
    dp.classList.add("picker");
    dr.appendChild(dp);

    // Month select
    var select = document.createElement("select");
    var option = null;
    select.id = "picker-m-" + uniqueID;
    select.classList.add("picker-m");
    for (var mth in months) {
      option = document.createElement("option");
      option.value = parseInt(mth) + 1;
      option.text = months[mth];
      select.appendChild(option);
    }
    select.selectedIndex = thisMonth;
    select.addEventListener("change", function(){ picker.draw(this); });
    dp.appendChild(select);

    // Year select
    var yRange = 119; // Year range to show, I.E. from thisYear-yRange to thisYear+yRange
    select = document.createElement("select");
    select.id = "picker-y-" + uniqueID;
    select.classList.add("picker-y");
    for (var y = thisYear-yRange; y <= thisYear; y++) {
      option = document.createElement("option");
      option.value = y;
      option.text = y;
      select.appendChild(option);
    }
    select.selectedIndex = yRange;
    select.addEventListener("change", function(){ picker.draw(this); });
    dp.appendChild(select);

    // Day select
    var days = document.createElement("div");
    days.id = "picker-d-" + uniqueID;
    days.classList.add("picker-d");
    dp.appendChild(days);

    // Attach date picker to body + draw the dates
    document.body.appendChild(dr);
    picker.draw(select);

    // Attach on focus event on target field
    var target = document.getElementById(target);
    target.attributes.dp = uniqueID;
    target.onfocus = function () {
      document.getElementById("picker-" + this.attributes.dp).classList.add("show");
    };
  },
  
  draw : function (el) {
  // draw() : draw the days in month

    // Get the unique ID
    // Get days in month 
    // Get start + end day of week
    var uniqueID = el.id.substring(el.id.lastIndexOf("-")+1);
    var month = document.getElementById("picker-m-" + uniqueID).value;
    var year = document.getElementById("picker-y-" + uniqueID).value;
    var daysInMonth = new Date(year, month, 0).getDate();
    var startDay = new Date(year + "-" + month + "-1").getDay(); // Note: Sun = 0
    var endDay = new Date(year + "-" + month + "-" + daysInMonth).getDay();

    // Generate date squares
    var squares = [];
    // Blank squares before start of month
    if (startDay != 0) {
      for (var i=0; i<startDay; i++) { squares.push("B"); }
    }
    // Days of month
    for (var i=1; i<=daysInMonth; i++) { squares.push(i); }
    // Blank squares after end of month
    if (endDay != 6) {
      var blanks = endDay==0 ? 6 : 6-endDay;
      for (var i=0; i<blanks; i++) { squares.push("B"); }
    }

    // Draw!
    var html = "<table>";
    html += "<tr class='picker-d-h'><td>Su</td><td>Mo</td><td>Tu</td><td>We</td><td>Th</td><td>Fr</td><td>Sa</td></tr><tr>";
    var total = squares.length;
    for (var i=1; i<=total; i++) {
      var thisDay = squares[i-1];
      if (thisDay=="B") { html += "<td class='picker-d-b'></td>"; }
      else { html += "<td class='picker-d-d'>" + thisDay + "</td>"; }
      if (i!=total && i%7==0) { html += "</tr><tr>"; }
    }
    html += "</tr></table>";
    var container = document.getElementById("picker-d-" + uniqueID);
    container.innerHTML = html;

    // Attach onclick
    var days = container.getElementsByClassName("picker-d-d");
    
    Array.prototype.forEach.call(days, function(el) {
    // Do stuff here
     el.addEventListener("click", function(){ picker.pick(this); });
});

    /*for (var i of days) {
      i.addEventListener("click", function(){ picker.pick(this); });
    }*/
  },

  pick : function (el) {
  // pick() : choose a date

    // Get parent container
    var parent = el.parentElement;
    while (parent.tagName.toLowerCase() != "div") {
      parent = parent.parentElement;
    }
    var uniqueID = parent.id.substring(parent.id.lastIndexOf("-")+1);

    // Get full selected year + month + day
    var year = document.getElementById("picker-y-" + uniqueID).value;
    var month = document.getElementById("picker-m-" + uniqueID).value;
    if (parseInt(month)<10) { month = "0" + month; }
    var day = el.innerHTML;
    if (parseInt(day)<10) { day = "0" + day; }

    // In YYYY-MM-DD format
    // You can create a standard date object, THEN format it as you please.
    var fullDate = month + "-" + day + "-" + year;
    // var fullDate = new Date(year + "-" + month + "-" + day);

    // Update selected date
    var target = document.getElementById("picker-" + uniqueID).attributes.target;
    document.getElementById(target).value = fullDate;

    // Close the picker
    document.getElementById("picker-" + uniqueID).classList.remove("show");
  } 
};