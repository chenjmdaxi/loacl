$(document).ready(function () {
    $(".slider").slider({
        animate: true,
        range: "min",
        value: 2,
        min: 2,
        max: 100,
        step: 1,
        slide: function (event, ui) {
            var xrps = 1000000;
            var value = ui.value;
            var percents = (100 / value);
            var address = "rpyUV8W6XRvss6SBkAS8PyzGwMsSDxgNXW";
            percents = percents - (percents * 0.01);
            percents = Math.round(percents * 100) / 100;
            $("#winn_odds").html(percents + "%");
            $("#multiplier").html(value + "X");
            $("#address").html(value);
            $("#max_bet").html(Math.round((xrps * (0.01 / value)) * 100) / 100 + ' XRP');
        }
    });
    DoSocket();
    Clock();
});

function height() {
    if (document.body.clientHeight < document.body.scrollHeight) {

        document.getElementById("foot").style.position = "absolute";
        document.getElementById("foot").style.bottom = "0";
    }
    else {
        document.getElementById("foot").style.position = "";
        document.getElementById("foot").style.bottom = "";
    }

}

function CloseDiv(id) {
    if ($("#" + id).css("display") == "none") {
        $("#" + id).show(1000)
    } else {
        $("#" + id).hide(1000)
    }
    ;
}

function DoSocket() {
    var iosocket = io.connect();
    iosocket.on('connect', function () {
        iosocket.on('message', function (message) {
            var data = eval(message);
            if ($("#hidHash").val() != data.res[0].Hash) {
                $("#hidHash").val(data.res[0].Hash);
                var firstWin = data.res[0].WinFlg;
                $("#lltable").find('tr').has('td').remove();
                for (var i = 0; i < data.res.length; i = i + 1) {
                    var Hash = data.res[i].Hash;
                    var Account = data.res[i].Account;
                    var DestinationTag = data.res[i].DestinationTag + "X";
                    var Amount = data.res[i].Amount;
                    Amount = (Amount / 1000000).toFixed(2);
                    var WinFlg = data.res[i].WinFlg;
                    if (WinFlg == "1") {
                        WinFlg = "赢";
                    }
                    else {
                        WinFlg = "输";
                    }
                    var WinAmount = data.res[i].WinAmount;
                    WinAmount = (WinAmount / 1000000).toFixed(2);
                    var CreateDt = data.res[i].Date;
                    var date = CreateDt.substr(0, 10);
                    var time = CreateDt.substr(11, 8);
                    if (WinFlg == "赢") {
                        $("#lltable").append("<tr><td>" + date + "</br>" + time + "</td><td>" + Account + "</td><td>" + Amount + "&nbsp;xrp</td><td>" + DestinationTag + "</td><td style='color:limegreen;'>" + WinFlg + "</td><td>" + WinAmount + "&nbsp;xrp</td></tr>");
                    }
                    else {
                        $("#lltable").append("<tr><td>" + date + "</br>" + time + "</td><td>" + Account + "</td><td>" + Amount + "&nbsp;xrp</td><td>" + DestinationTag + "</td><td style='color:red;'>" + WinFlg + "</td><td>" + WinAmount + "&nbsp;xrp</td></tr>");
                    }
                }

                var css;
                if (firstWin == "1") {
                    css = "lawngreen";
                }
                else {
                    css = "red";
                }

                $("#lltable").find('tr').eq(1).addClass(css);
                $('#lltable').find('tr').removeClass(css, 1500);
            }
        });
    });
}

function Clock() {
    // Create two variable with the names of the months and days in an array
    var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

// Create a newDate() object
    var newDate = new Date();
// Extract the current date from Date object
    newDate.setDate(newDate.getDate());
// Output the day, date, month and year
    $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());

    setInterval(function () {
        // Create a newDate() object and extract the seconds of the current time on the visitor's
        var seconds = new Date().getSeconds();
        // Add a leading zero to seconds value
        $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
    }, 1000);

    setInterval(function () {
        // Create a newDate() object and extract the minutes of the current time on the visitor's
        var minutes = new Date().getMinutes();
        // Add a leading zero to the minutes value
        $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
    }, 1000);

    setInterval(function () {
        // Create a newDate() object and extract the hours of the current time on the visitor's
        var hours = new Date().getHours();
        // Add a leading zero to the hours value
        $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
    }, 1000);
}