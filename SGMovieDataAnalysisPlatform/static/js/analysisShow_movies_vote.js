// 公司电影产量和电影评分 散点图  syf

fetch('../static/json/movies_vote.json')
    .then(response => response.json())
    .then(data => {
        // 初始化存储数据的数组
        const dataArray = [];

        // 遍历二维数组，获取每个子数组的第三和第四个元素
        data.forEach(subArray => {
            // 检查子数组是否足够长以避免索引超出范围
            if (subArray.length >= 3) {
                const score = subArray[1]; // 评分
                const production = subArray[2]; // 产量
                // 将评分和产量添加到存储数据的数组中
                dataArray.push([production, score, subArray[0]]);
            }
        });

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_movieVote'));

        var option = {
            title: {
                text: '评分和产量关系', // 标题内容
                left: 'center'
            },
            xAxis: {
                name: '产量 (单位)',
                type: 'value'
            },
            yAxis: {
                name: '评分',
                type: 'value'
            },
            tooltip: { // 设置 tooltip
                formatter: function (params) {
                    return params.value[2] + '，产量: ' + params.value[0] + ' - 评分: ' + params.value[1];
                }
            },
            series: [
                {
                    symbolSize: 10,
                    data: dataArray,
                    type: 'scatter'
                }
            ]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })