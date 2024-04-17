// 电影人气与评分关系散点图

fetch('../static/json/pop_vote.json')
    .then(response => response.json())
    .then(data => {
        // 解析数据
        const movies = data.map(item => item[0]); // 电影标题
        const popularity = data.map(item => parseFloat(item[1])); // 流行度
        const voteAverage = data.map(item => parseFloat(item[2])); // 评价

        // 基于准备好的 dom，初始化 echarts 实例
        var myChart = echarts.init(document.getElementById('chart_popVote'));

        // 整理散点图的数据
        var scatterData = popularity.map((value, index) => {
            return [value, voteAverage[index]];
        });

        // 配置图表
        var option = {
            title: {
                text: '电影人气与评分关系散点图',
                left: 'center',
            },
            visualMap: {
                min: 2,
                max: 9,
                dimension: 1,
                orient: 'vertical',
                right: 10,
                top: 'center',
                text: ['HIGH', 'LOW'],
                calculable: true,
                inRange: {
                    color: ['#f2c31a', '#24b7f2']
                }
            },
            tooltip: {
                trigger: 'item',
                axisPointer: {
                    type: 'cross'
                },
                formatter: function (params) {
                    return movies[params.dataIndex] + '<br>' + '人气: ' + params.data[0] + '<br>' + '评分: ' + params.data[1];
                }
            },
            xAxis: [
                {
                    type: 'value',
                    name: '人气',
                    min: 0,
                    max: 200
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '评分',
                    min: 2,
                    max: 9
                }
            ],
            series: [
                {
                    name: '人气与评分',
                    type: 'scatter',
                    symbolSize: 7,
                    itemStyle:{
                        opacity: 0.5   // 设置点的透明度
                    },
                    data: scatterData
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
