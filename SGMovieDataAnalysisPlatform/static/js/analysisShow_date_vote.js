// 电影评分与时间关系图 hx

// 从外部 JSON 文件加载数据
//散点图
fetch('../static/json/date_vote.json')
    .then(response => response.json())
    .then(data => {

        // 处理数据
        const processedData = data.map(item => {
            return [new Date(item[0]), parseFloat(item[1])];
        });

        // 初始化 ECharts 实例
        const chart = echarts.init(document.getElementById('chart_dateVote'));

        // 获取指定年份的最高评分、最低评分和中位数
        function getStatsOfYear(year, data) {
            const valuesOfYear = data.filter(item => item[0].getFullYear() === year).map(item => item[1]);
            const max = Math.max(...valuesOfYear);
            const min = Math.min(...valuesOfYear);
            const median = valuesOfYear.sort((a, b) => a - b)[Math.floor(valuesOfYear.length / 2)];
            return { max, min, median };
        }

        // 配置项
        const options = {
            title: {
                text: '电影评分与时间关系图',
                left: 'center'
            },
            xAxis: {
                type: 'time',
                name: '年份',
                min: 1934
            },
            yAxis: {
                type: 'value',
                name: '评分',
                min: 2
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    const date = new Date(params[0].value[0]);
                    const year = date.getFullYear();
                    const stats = getStatsOfYear(year, processedData);
                    return `年份：${year}<br />
                            最高评分：${stats.max}<br />
                            最低评分：${stats.min}<br />
                            中位数：${stats.median}`;
                }
            },
            series: [{
                data: processedData,
                type: 'scatter',
                symbolSize: function (data) {
                    // 根据评分调整散点大小
                    return Math.sqrt(data[1]) * 3;
                },
                color: 'rgba(9,189,16,0.2)'
            }]
        };

        // 使用配置项显示图表
        chart.setOption(options);
    })
    .catch(error => {
        console.error('加载数据时出错:', error);
    });