// 使用 fetch API 从 JSON 文件中获取数据
fetch('static/json/budget.json')
    .then(response => response.json())
    .then(data => {
        // 解析数据
        const languages = data.map(item => item.language);
        const counts = data.map(item => item.count);

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart'));

        // 配置图表
        var option = {
            title: {
                text: '语言使用统计'
            },
            tooltip: {},
            xAxis: {
                data: languages
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'bar',
                data: counts
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });