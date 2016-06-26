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
var socketServer = 'http://stock-charting.herokuapp.com/';
// var socketServer = 'https://stockcharting-destinysync.c9users.io/';
var socket;

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
                    // socket = io.connect(socketServer);
                    // socket.on('connect', function(data) {
                    //     socket.emit('addStockTabMsgToServer', result);
                    // });
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
            recharting();
            var json = {
                stockCode: stockCode,
                stockInDB: data
            };
            socket.emit('stockTabRemovalMsgToServer', json);
        })
    });

    $.post('/', function(data, status) {
        names = data;
        charting();
    });

    socket.on('stockTabRemovalMsgToClient', function(data) {

        $("#" + data.stockCode).remove();
        names = data.stockInDB;
        recharting();
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
