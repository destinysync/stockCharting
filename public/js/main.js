var names = [];
var invalidStockCode = false;
var stockTabs = '';
var stockTabID = '';
var stockDivPart1 = '<div class="col-lg-4" id="' + stockTabID + '"><div class="stockDiv"><h3 class="stockCode">';
var stockDivPart2 = '</h3><button class="deleteButton"><h5>X</h5></button><h5 class="companyDes">';
var stockDivPart3 = '</h5></div></div>';
var inputStockCode = '';
var stockInDB = [];
// var socketServer = 'http://localhost:7464';
// var socketServer = 'http://stock-charting.herokuapp.com/';
var socketServer = 'https://stockcharting-destinysync.c9users.io/';
var socket;

function emptyStockChart() {
    var seriesOptions = [{
            "name": "sample stock",
            "data": [
                [1370822400000, 24.33],
                [1370908800000, 24.03],
                [1370995200000, 23.77],
                [1371081600000, 23.73],
                [1371168000000, 23.63],
                [1371427200000, 24.02],
                [1371513600000, 24.21],
                [1371600000000, 24.31],
                [1371686400000, 23.9],
                [1371772800000, 24.53],
                [1372032000000, 23.94],
                [1372118400000, 24.25],
                [1372204800000, 24.16],
                [1372291200000, 24.66],
                [1372377600000, 24.88],
                [1372636800000, 24.81],
                [1372723200000, 24.41],
                [1372809600000, 24.52],
                [1372982400000, 24.37],
                [1373241600000, 24.71],
                [1373328000000, 25.48],
                [1373414400000, 25.8],
                [1373500800000, 25.81],
                [1373587200000, 25.91],
                [1373846400000, 26.28],
                [1373932800000, 26.32],
                [1374019200000, 26.65],
                [1374105600000, 26.18],
                [1374192000000, 25.88],
                [1374451200000, 26.05],
                [1374537600000, 26.13],
                [1374624000000, 26.51],
                [1374710400000, 34.36],
                [1374796800000, 34.01],
                [1375056000000, 35.43],
                [1375142400000, 37.63],
                [1375228800000, 36.8],
                [1375315200000, 37.49],
                [1375401600000, 38.05],
                [1375660800000, 39.19],
                [1375747200000, 38.55],
                [1375833600000, 38.87]
            ]
        }],
        seriesCounter = 0;

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {

        $('#container').highcharts('StockChart', {
            legend: {
                enabled: true,
                align: 'right',
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderWidth: 2,
                layout: 'vertical',
                verticalAlign: 'top',
                y: 100,
                shadow: true
            },

            title: {
                text: 'Stock Chart',
                align: 'center',
                x: -10
            },
            credits: {
                enabled: false
            },

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }
    createChart();
}

function resetStockDivPart1() {
    stockDivPart1 = '<div class="col-lg-4" id="' + stockTabID + '"><div class="stockDiv"><h3 class="stockCode">';
}

function recharting() {

    var seriesOptions = [],
        seriesCounter = 0;

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {

        $('#container').highcharts('StockChart', {
            legend: {
                enabled: true,
                align: 'right',
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderWidth: 2,
                layout: 'vertical',
                verticalAlign: 'top',
                y: 100,
                shadow: true
            },

            title: {
                text: 'Stock Chart',
                align: 'center',
                x: -10
            },
            credits: {
                enabled: false
            },

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function(i, name) {

        $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/' + name.toLowerCase() + '.json?api_key=dC2jsWbBMyzEfk49T_Yd&order=asc&start_date=2013-06-10&column_index=4&collapse=daily', function(json) {

            stockTabID = name;
            var fullStockTab = stockDivPart1 + json.dataset.dataset_code + stockDivPart2 + json.dataset.name + stockDivPart3;

            stockTabs += fullStockTab;

            var data = json.dataset.data;
            var count = 0;

            data.map(function(item) {
                item[0] = new Date(item[0]).getTime();
                count++;
            });

            if (count == data.length) {
                seriesOptions[i] = {
                    name: name,
                    data: data
                };
            }

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;
            if (seriesCounter === names.length) {
                createChart();
            }
        })
    });
}

function addStockTab(callback) {
    var seriesOptions = [],
        seriesCounter = 0;

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {

        $('#container').highcharts('StockChart', {
            legend: {
                enabled: true,
                align: 'right',
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderWidth: 2,
                layout: 'vertical',
                verticalAlign: 'top',
                y: 100,
                shadow: true
            },

            title: {
                text: 'Stock Chart',
                align: 'center',
                x: -10
            },
            credits: {
                enabled: false
            },

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function(i, name) {

        $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/' + name.toLowerCase() + '.json?api_key=dC2jsWbBMyzEfk49T_Yd&order=asc&start_date=2013-06-10&column_index=4&collapse=daily', function(json) {

            stockTabID = name;

            resetStockDivPart1();

            var fullStockTab = stockDivPart1 + json.dataset.dataset_code + stockDivPart2 + json.dataset.name + stockDivPart3;

            stockTabs += fullStockTab;

            var data = json.dataset.data;
            var count = 0;

            data.map(function(item) {
                item[0] = new Date(item[0]).getTime();
                count++;
            });

            if (count == data.length) {
                seriesOptions[i] = {
                    name: name,
                    data: data
                };
            }

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;
            if (seriesCounter === names.length) {
                fillstockTabsContainer();
                callback();
            }
        }).fail(function(json, textStatus, error) {
            invalidStockCode = true;
            callback();
        });
    });
}

function fillstockTabsContainer() {
    $('#addDiv').before(stockTabs);
}

function charting(callback) {

    var seriesOptions = [],
        seriesCounter = 0;

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {

        $('#container').highcharts('StockChart', {
            legend: {
                enabled: true,
                align: 'right',
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderWidth: 2,
                layout: 'vertical',
                verticalAlign: 'top',
                y: 100,
                shadow: true
            },

            title: {
                text: 'Stock Chart',
                align: 'center',
                x: -10
            },
            credits: {
                enabled: false
            },

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function(i, name) {

        $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/' + name.toLowerCase() + '.json?api_key=dC2jsWbBMyzEfk49T_Yd&order=asc&start_date=2013-06-10&column_index=4&collapse=daily', function(json) {

            stockTabID = name;
            resetStockDivPart1();

            var fullStockTab = stockDivPart1 + json.dataset.dataset_code + stockDivPart2 + json.dataset.name + stockDivPart3;

            stockTabs += fullStockTab;

            var data = json.dataset.data;
            var count = 0;

            data.map(function(item) {
                item[0] = new Date(item[0]).getTime();
                count++;
            });

            if (count == data.length) {
                seriesOptions[i] = {
                    name: name,
                    data: data
                };
            }

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            if (seriesCounter === names.length) {
                createChart();
                fillstockTabsContainer();
                callback();
            }
        }).fail(function(json, textStatus, error) {
            invalidStockCode = true;
            callback();
        });
    });

}

function validateStockCode(callback) {

    var seriesOptions = [],
        seriesCounter = 0;

    /**
     * Create the chart when all data is loaded
     * @returns {undefined}
     */
    function createChart() {

        $('#container').highcharts('StockChart', {
            legend: {
                enabled: true,
                align: 'right',
                backgroundColor: '#FCFFC5',
                borderColor: 'black',
                borderWidth: 2,
                layout: 'vertical',
                verticalAlign: 'top',
                y: 100,
                shadow: true
            },

            title: {
                text: 'Stock Chart',
                align: 'center',
                x: -10
            },
            credits: {
                enabled: false
            },

            rangeSelector: {
                selected: 4
            },

            yAxis: {
                labels: {
                    formatter: function() {
                        return (this.value > 0 ? ' + ' : '') + this.value + '%';
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 2,
                    color: 'silver'
                }]
            },

            plotOptions: {
                series: {
                    compare: 'percent'
                }
            },

            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                valueDecimals: 2
            },

            series: seriesOptions
        });
    }

    $.each(names, function(i, name) {

        $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/' + name.toLowerCase() + '.json?api_key=dC2jsWbBMyzEfk49T_Yd&order=asc&start_date=2013-06-10&column_index=4&collapse=daily', function(json) {
            stockTabID = name;
            var data = json.dataset.data;
            var count = 0;

            data.map(function(item) {
                item[0] = new Date(item[0]).getTime();
                count++;
            });

            if (count == data.length) {
                seriesOptions[i] = {
                    name: name,
                    data: data
                };
            }

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            seriesCounter += 1;

            if (seriesCounter === names.length) {
                callback();
            }
        }).fail(function(json, textStatus, error) {
            invalidStockCode = true;
            callback();
        });
    });
}

function addStockTabAndRecharting(result) {

    inputStockCode = result.inputStockCode;
    stockInDB = result.stockInDB;

    function a(callback) {

        names = [inputStockCode];

        addStockTab(callback);

    }

    function b() {
        names = stockInDB;
        var seriesOptions = [],
            seriesCounter = 0;

        /**
         * Create the chart when all data is loaded
         * @returns {undefined}
         */
        function createChart() {

            $('#container').highcharts('StockChart', {
                legend: {
                    enabled: true,
                    align: 'right',
                    backgroundColor: '#FCFFC5',
                    borderColor: 'black',
                    borderWidth: 2,
                    layout: 'vertical',
                    verticalAlign: 'top',
                    y: 100,
                    shadow: true
                },

                title: {
                    text: 'Stock Chart',
                    align: 'center',
                    x: -10
                },
                credits: {
                    enabled: false
                },

                rangeSelector: {
                    selected: 4
                },

                yAxis: {
                    labels: {
                        formatter: function() {
                            return (this.value > 0 ? ' + ' : '') + this.value + '%';
                        }
                    },
                    plotLines: [{
                        value: 0,
                        width: 2,
                        color: 'silver'
                    }]
                },

                plotOptions: {
                    series: {
                        compare: 'percent'
                    }
                },

                tooltip: {
                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                    valueDecimals: 2
                },

                series: seriesOptions
            });
        }

        $.each(names, function(i, name) {

            $.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/' + name.toLowerCase() + '.json?api_key=dC2jsWbBMyzEfk49T_Yd&order=asc&start_date=2013-06-10&column_index=4&collapse=daily', function(json) {

                stockTabID = name;

                resetStockDivPart1();

                var fullStockTab = stockDivPart1 + json.dataset.dataset_code + stockDivPart2 + json.dataset.name + stockDivPart3;

                stockTabs += fullStockTab;

                var data = json.dataset.data;
                var count = 0;

                data.map(function(item) {
                    item[0] = new Date(item[0]).getTime();
                    count++;
                });

                if (count == data.length) {
                    seriesOptions[i] = {
                        name: name,
                        data: data
                    };
                }

                // As we're loading the data asynchronously, we don't know what order it will arrive. So
                // we keep a counter and create the chart when all the data is loaded.
                seriesCounter += 1;

                if (seriesCounter === names.length) {
                    createChart();
                    socket.emit('addStockTabMsgToServer', result);
                }
            })
        });
    }

    a(b);
}


$(document).ready(function() {

    socket = io.connect(socketServer);

    $(document).on('click', '.deleteButton', function() {
        var stockCode = $(this).parents(".col-lg-4").attr('id');
        $(this).parents(".col-lg-4").remove();
        $.post('/delStockTab/' + stockCode, function(data, status) {
            names = data;
            if (names[0] !== undefined) {
                recharting();
            }
            else {
                emptyStockChart();
            }
            var json = {
                stockCode: stockCode,
                stockInDB: data
            };
            socket.emit('stockTabRemovalMsgToServer', json);
        })
    });

    $.post('/', function(data, status) {
        names = data;
        if (names != '') {
            charting();
        }
        else {
            emptyStockChart();
        }

    });

    socket.on('stockTabRemovalMsgToClient', function(data) {

        $("#" + data.stockCode).remove();
        names = data.stockInDB;
        if (names[0] !== undefined) {
            recharting();
        }
        else {
            emptyStockChart();
        }

    });

    socket.on('addStockTabMsgToClient', function(data) {

        function a(callback) {
            stockTabs = '';
            names = [data.inputStockCode];
            addStockTab(callback);
        }

        function b() {
            names = data.stockInDB;
            recharting();
        }

        a(b);
    });
    
    
    
        var typingTimer;
    var doneTypingInterval = 1000;
    var $input = $("input[type='text']");

    $input.on('keyup', function () {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });

    $input.on('keydown', function () {
        clearTimeout(typingTimer);
    });

    function doneTyping() {
        addStock();
    }
    
    
    
});

function addStock() {

    stockTabs = '';
    invalidStockCode = false;
    document.getElementById('invalidStockCode').innerHTML = "";

    function getStockCodeValidationResult() {
        if (invalidStockCode === true) {
            document.getElementById('invalidStockCode').innerHTML = 'Invalid Stock Code';
        }
        else {
            $.post('/addStock/' + inputStockCode, function(result, status) {
                addStockTabAndRecharting(result);
            });
        }
    }

    var inputStockCode = document.getElementById('stockCodeInputBox').value;
    names = [inputStockCode];
    validateStockCode(getStockCodeValidationResult);
    document.getElementById("stockCodeInputBox").value = '';
}
