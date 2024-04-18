// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('chart_runTime'));

// 指定图表的配置项和数据
var option = {
    title: {
        text: '电影时长分布 (只展示时长大于90min的)',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },

    series: [
        {
            name: '数量',
            type: 'pie',
            radius: [20, 90],
            roseType:'radius',
            itemStyle: {
                borderRadius: 5
            },
             label: {
                length: 4, // 设置标签线的长度
            },
            data: [
                {value: 111, name: '101 min.'},
                {value: 133, name: '98 min.'},
                {value: 114, name: '99 min.'},
                {value: 112, name: '96 min.'},
                {value: 148, name: '100 min.'},
                {value: 109, name: '104 min.'},
                {value: 161, name: '90 min.'},
                {value: 110, name: '93 min.'},
                {value: 122, name: '95 min.'},
                {value: 104, name: '92 min.'},
                {value: 129, name: '97 min.'},
                {value: 104, name: '106 min.'},
                {value: 103, name: '105 min.'},
                {value: 105, name: '91 min.'},
                {value: 115, name: '94 min.'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

window.addEventListener('resize', myChart.resize);