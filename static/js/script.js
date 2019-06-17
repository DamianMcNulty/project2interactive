// Source: https://weeknumber.net/how-to/javascript
// Returns the ISO week of the date.
Date.prototype.getWeek = function () {
    var date = new Date(this.getTime());
    date.setHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
};
var data1 = [];

var pie = dc.pieChart("#piechart");

d3.csv("data/Accounts.csv", function (data) {
    function print_filter(filter) {
        var f = eval(filter);
        if (typeof (f.length) != "undefined") { } else { }
        if (typeof (f.top) != "undefined") { f = f.top(Infinity); } else { }
        if (typeof (f.dimension) != "undefined") { f = f.dimension(function (d) { return ""; }).top(Infinity); } else { }
        console.log(filter + "(" + f.length + ") = " + JSON.stringify(f).replace("[", "[\n\t").replace(/}\,/g, "},\n\t").replace("]", "\n]"));
    }

    transactions = [];
    function getTransactions(data) {
        for (var j = 0; j < data.length; j++) {
            let a = {};
            a.date = d3.time.format("%d/%m/%Y").parse(data[j]['Date']);
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            a.month = months[new Date(a.date).getMonth()];
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            a.day = days[new Date(a.date).getDay()];
            a.week = +(new Date(a.date).getWeek());
            a.name = data[j]["Account Name"];
            a.amount = +data[j]['Amount Num.'];
            a.id = +data[j]['id'];
            var payments = ['Cash', 'Bank'];
            if (data[j]['Cash'] === 'true') {
                a.payment = 'cash';
            } else {
                a.payment = 'bank';
            }
            month = new Date(a.date).getMonth();
            if (month <= 2) {
                a.quarter = 'Q1';
            } else if (month > 2 && month <= 5) {
                a.quarter = 'Q2';
            } else if (month > 5 && month <= 8) {
                a.quarter = 'Q3';
            } else {
                a.quarter = 'Q4';
            }
            a.year = new Date(a.date).getFullYear();
            //source: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
            var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            a.dayOfYear = dayCount[new Date(a.date).getMonth()] + new Date(a.date).getDate();
            transactions.push(a);
        }
        return transactions;
    }

    var w = $(window).width() * 0.48;
    var h = $(window).height() * 0.28;
    if ($(window).width() < 450) {
        w = $(window).width();
    }

    data1 = getTransactions(data);
    var ndx = crossfilter(data1);

    var all = ndx.groupAll();
    var sumTotalExpenses = all.reduceSum(function (d) { return d.amount; }).value();
    var ndGroup = all.reduceSum(function (d) { return d.amount; });

    //Source: https://stackoverflow.com/questions/34744243/d3-js-format-as-currency-euro
    var IE = d3.locale({
        "decimal": ".",
        "thousands": ",",
        "grouping": [3],
        "currency": ["€", ""],
        "dateTime": "%a %b %e %X %Y",
        "date": "%m/%d/%Y",
        "time": "%H:%M:%S",
        "periods": ["AM", "PM"],
        "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });

    var cur = IE.numberFormat("$,.2f");

    dc.numberDisplay("#total-amount-display")
        .group(ndGroup)
        .formatNumber(cur)
        .valueAccessor(function (d) { return d; });

    //******************************************************************************
    $("#show").click(function () {
        $("#table").toggle();
    });

    var dateDimension = ndx.dimension(dc.pluck('date'));
    var dataTable = dc.dataTable("#table")
        .width(1150)
        .height(300)
        .dimension(dateDimension)
        .group(function (d) { return ""; })
        .showGroups(false)
        .size(data.length)
        .columns([
            {
                label: "Date",
                format: function (d) { return new Date(d.date).getDate() + "/" + (+(new Date(d.date).getMonth()) + 1) + "/" + new Date(d.date).getFullYear(); }
            },
            'day',
            'week',
            'month',
            'name',
            'payment',
            'amount'])
        .sortBy(function (d) { return +d.date; })
        .order(d3.ascending);
    // *****************************************************************************

    // *****************************************************************************
    var name_dim = ndx.dimension(dc.pluck('name'));

    var total_per_account = name_dim.group().reduce(
        function (p, v) {
            ++p.count;
            p.total += v.amount;
            return p;
        },
        function (p, v) {
            --p.count;
            p.total -= v.amount;
            return p;
        },
        function () {
            return {
                count: 0,
                total: 0
            };
        }
    );
    // print_filter('total_per_account');

    dc.barChart('#per-account-chart')
        .width(w)
        .height(h)
        .margins({ top: 10, right: 5, bottom: 50, left: 35 })
        .dimension(name_dim)
        .group(total_per_account)
        .transitionDuration(1000)
        .x(d3.scale.ordinal())
        .colorAccessor(function (d) { return d.key; })
        .valueAccessor(function (p) {
            return p.value.total;
        })
        .colors(d3.scale.category20b())
        .xUnits(dc.units.ordinal)
        .title(function (d) { return d.key + ': \u20ac' + Math.round((d.value.total + 0.00001) * 100) / 100 + '\nCount: ' + d.value.count + '\nAverage: \u20ac' + Math.round((d.value.total / d.value.count + 0.00001) * 100) / 100; })
        .xAxisLabel("Account")
        .yAxisLabel("Amount (Euros)")
        .yAxis().ticks(5)
        .tickFormat(function (d) {
            return "\u20ac" + d;
        });

    // *****************************************************************************

    // *****************************************************************************

    var date_dim = ndx.dimension(dc.pluck('date'));
    var total_expense_per_day = date_dim.group().reduceSum(dc.pluck('amount'));

    dc.lineChart('#by-date-day-line')
        .width(w)
        .height(h)
        .margins({ top: 10, right: 5, bottom: 50, left: 35 })
        .dimension(date_dim)
        .group(total_expense_per_day)
        .x(d3.time.scale().domain([new Date(2019, 0, 1), new Date(2019, 11, 31)]).range([0, w]))
        .xAxisLabel("Date")
        .brushOn(false)
        .yAxisLabel("Amount (Euros)")
        .yAxis().ticks(5)
        .tickFormat(function (d) {
            return "\u20ac" + d;
        });

    // *****************************************************************************

    // *****************************************************************************

    var payment = ndx.dimension(dc.pluck('payment'));
    var paymentGroup = payment.group().reduceSum(dc.pluck('amount'));

    dc.pieChart('#cash-bank')
        .width(w)
        .height(h)
        .radius(w)
        .dimension(payment)
        .group(paymentGroup)
        .transitionDuration(500)
        .title(function (d) { return d.key + ': \u20ac' + Math.round((d.value + 0.00001) * 100) / 100; })
        .label(function (d) { return d.key + ': ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
        .colors(d3.scale.category20());

    // *****************************************************************************

    // *****************************************************************************

    var quarter_dim = ndx.dimension(dc.pluck('quarter'));
    var quarterGroup = quarter_dim.group().reduceSum(dc.pluck('amount'));
    // print_filter('quarterGroup');

    var month_dim = ndx.dimension(dc.pluck('month'));
    var monthGroup = month_dim.group().reduceSum(dc.pluck('amount'));

    var week_dim = ndx.dimension(dc.pluck('week'));
    var weekGroup = week_dim.group().reduceSum(dc.pluck('amount'));

    var daily_dim = ndx.dimension(dc.pluck('day'));
    var dailyGroup = daily_dim.group().reduceSum(dc.pluck('amount'));


    var h1 = $(window).height() * 0.65;

    pie
        .width(w)
        .height(h1)
        .radius(w)
        .dimension(quarter_dim)
        .group(quarterGroup)
        .transitionDuration(500)
        .title(function (d) { return d.key + ': \u20ac' + Math.round((d.value + 0.00001) * 100) / 100 + '\nPercentage: ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
        .label(function (d) { return d.key + ': ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
        .colors(d3.scale.category20())
        .legend(dc.legend().x(0).y(0).itemHeight(12).gap(5));

    function changeEventHandler(event) {
        var key = this.value;
        switch (key) {
            case 'quarterly':
                pie
                    .width(w)
                    .height(h1)
                    .radius(w)
                    .dimension(quarter_dim)
                    .group(quarterGroup)
                    .transitionDuration(500)
                    .title(function (d) { return d.key + ': \u20ac' + Math.round((d.value + 0.00001) * 100) / 100 + '\nPercentage: ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .label(function (d) { return d.key + ': ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .colors(d3.scale.category20())
                    .legend(dc.legend().x(0).y(0).itemHeight(12).gap(5));
                dc.redrawAll();

                break;
            case "monthly":
                pie
                    .width(w)
                    .height(h1)
                    .radius(w)
                    .dimension(month_dim)
                    .group(monthGroup)
                    .transitionDuration(500)
                    .title(function (d) { return d.key + ': \u20ac' + Math.round((d.value + 0.00001) * 100) / 100 + '\nPercentage: ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .label(function (d) { return Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .colors(d3.scale.category20())
                    .legend(dc.legend().x(0).y(0).itemHeight(12).gap(5));
                dc.redrawAll();

                break;
            case "weekly":
                pie
                    .width(w)
                    .height(h1)
                    .radius(w)
                    .dimension(week_dim)
                    .group(weekGroup)
                    .transitionDuration(500)
                    .title(function (d) { return 'Wk ' + d.key + ': \u20ac' + Math.round((d.value + 0.00001) * 100) / 100 + '\nPercentage: ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .label(function (d) { return Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .colors(d3.scale.category20())
                    .legend(dc.legend().x(0).y(0).itemHeight(12).gap(5));
                dc.redrawAll();

                break;
            default:
                pie
                    .width(w)
                    .height(h1)
                    .radius(w)
                    .dimension(daily_dim)
                    .group(dailyGroup)
                    .transitionDuration(500)
                    .title(function (d) { return d.key + ': \u20ac' + Math.round((d.value + 0.00001) * 100) / 100 + '\nPercentage: ' + Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .label(function (d) { return Math.round((d.value / sumTotalExpenses) * 100, 0) + '%'; })
                    .colors(d3.scale.category20())
                    .legend(dc.legend().x(0).y(0).itemHeight(12).gap(5));
                dc.redrawAll();

                break;
        }
    }

    d3.selectAll(".pie")
        .on("change", changeEventHandler);

    // *****************************************************************************

    dc.renderAll();
});
