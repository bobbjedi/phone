<template>
<div>
    <f7-button fill popup-open=".demo-popup-swipe">Открыть терминал</f7-button>
    <p>График {{pairName}}</p>
    <div :id="'chart-candlestick-' + pairName"></div>
    <div :id="'chart-bar-' + pairName"></div>
    Список открытых ордеров
     <f7-popup class="demo-popup-swipe" swipe-to-close>
      <f7-page>
        <f7-navbar :title="'Терминал ' + pairName">
          <f7-nav-right>
            <f7-link popup-close>Close</f7-link>
          </f7-nav-right>
        </f7-navbar>

        <div style="height: 100%" class="display-flex justify-content-center align-items-center">
          <p>Стакан и терминал как в бинансе (можно свайпнуть вниз чтоб закрыть)</p>
        </div>
      </f7-page>
    </f7-popup>
</div>
</template>

<script>
import ApexCharts from 'ApexCharts';
window.ApexCharts = ApexCharts;
export default {
    props: ['pairName'],
      mounted(){
         var optionsCandlestick = {
            chart: {
                id: 'candles',
                height: 290,
                type: 'candlestick',
                toolbar: {
                    autoSelected: 'pan',
                    show: false
                },
                zoom: {
                    enabled: false
                },
            },
            plotOptions: {
                candlestick: {
                    colors: {
                    upward: '#3C90EB',
                    downward: '#DF7D46'
                    }
                }
            },
            series: [{
                  data: [{
                            x: new Date(0),
                            y: [51.98, 56.29, 51.59, 53.85]
                        },
                        {
                            x: new Date(100000),
                            y: [53.66, 54.99, 51.35, 52.95]
                        },
                        {
                            x: new Date(200000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(300000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(500000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(600000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(700000),
                            y: [51.76, 57.35, 59.15, 47.03]
                        },
                        {
                            x: new Date(800000),
                            y: [52.76, 52.35, 59.15, 57.03]
                        },
                        {
                            x: new Date(900000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(1000000),
                            y: [34.76, 77.35, 52.15, 37.03]
                        },
                        {
                            x: new Date(1100000),
                            y: [59.76, 52.35, 62.15, 47.03]
                        },
                    ]
            }],
            xaxis: {
                type: 'datetime'
            }
        }

        var chartCandlestick = new ApexCharts(
            document.querySelector("#chart-candlestick-" + this.pairName),
            optionsCandlestick
        );

        chartCandlestick.render();
        var options = {
            chart: {
                height: 160,
                type: 'bar',
                brush: {
                    enabled: true,
                    target: 'candles'
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: new Date(700000).getTime(),
                        max: new Date(1200000).getTime()
                    },
                    fill: {
                        color: '#ccc',
                        opacity: 0.4
                    },
                    stroke: {
                        color: '#0D47A1',
                    }
                },
            },
            dataLabels: {
                enabled: true
            },
            plotOptions: {
                bar: {
                    columnWidth: '80%',
                    colors: {
                        ranges: [
                            {
                                from: -1000,
                                to: 0,
                                color: '#F15B46'
                            }, {
                                from: 1,
                                to: 10000,
                                color: '#FEB019'
                            }
                        ],
                       
                    },
                }        
            },
            stroke: {
                width: 0
            },
            series: [{
                name: 'volume',
                    data: [{
                            x: new Date(0),
                            y: [51.98, 56.29, 51.59, 53.85]
                        },
                        {
                            x: new Date(100000),
                            y: [53.66, 54.99, 51.35, 52.95]
                        },
                        {
                            x: new Date(200000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(300000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(500000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(600000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(700000),
                            y: [51.76, 57.35, 59.15, 47.03]
                        },
                        {
                            x: new Date(800000),
                            y: [52.76, 52.35, 59.15, 57.03]
                        },
                        {
                            x: new Date(900000),
                            y: [52.76, 57.35, 52.15, 57.03]
                        },
                        {
                            x: new Date(1000000),
                            y: [34.76, 77.35, 52.15, 37.03]
                        },
                        {
                            x: new Date(1100000),
                            y: [59.76, 52.35, 62.15, 47.03]
                        },
                    ]
                }],
                xaxis: {
                type: 'datetime',
                axisBorder: {
                    offsetX: 13
                }
            },
            yaxis: {
                labels: {
                    show: true
                }
            }
        }
        var chart = new ApexCharts(
            document.querySelector("#chart-bar-"  + this.pairName),
            options
        );

        chart.render();
    }
}
</script>