var dom = document.getElementById("container");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
    title: {

    },
    color: ['#2688C4'],
    tooltip: {},
    // legend: {
    //     data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
    // },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#2688C4',
                borderRadius: 3,
                padding: [3, 5]
            }
        },
        indicator: [{
            name: 'HTML',
            max: 10
        }, {
            name: 'CSS',
            max: 10
        }, {
            name: 'JavaScript',
            max: 10
        }, {
            name: 'jQuery',
            max: 10
        }, {
            name: 'Vue.js',
            max: 10
        }, {
            name: 'React.js',
            max: 10
        }]
    },
    series: [{
        type: 'radar',
        // areaStyle: {normal: {}},
        data: [{
            value: [6, 7, 7, 7, 5, 4],
            name: '技能示意图'
        }]
    }]
};;
if (option && typeof option === "object") {
    myChart.setOption(option, true);
}