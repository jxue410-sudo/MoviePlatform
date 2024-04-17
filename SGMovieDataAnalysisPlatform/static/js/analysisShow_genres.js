// 电影类型数量分析 hx

fetch('static/json/genres.json')
    .then(response => response.json())
    .then(data => {
        // 提取电影类型和数量数据
        const genres = data.map(item => item.genre);
        const counts = data.map(item => {
            return {
                name: item.genre,
                value: item.count
            };
        });

        // 初始化 ECharts 实例
        const chart = echarts.init(document.getElementById('chart_genres'));

        // 蓝色风格的配色方案
        const colorPalette = [
            '#5470c6', '#91cc75', '#fac858', '#ee6666',
            '#73c0de', '#3ba272', '#fc8452', '#9a60b4',
            '#ea7ccc', '#b6a2de', '#ffc9a3', '#768692',
            '#f7a8b8', '#5a7b9a', '#c3e5cb', '#b88884',
            '#e098c7', '#7294d4', '#6b9db8', '#8b8b8b'
        ];

        // 配置项
        const options = {
            title: {
                text: '电影类型数量分析',
                left: 'center' // 将标题居中显示
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: genres
            },
            series: [
                {
                    name: '电影类型',
                    type: 'pie',
                    radius: '50%',
                    center: ['50%', '60%'],
                    data: counts,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    color: colorPalette // 使用蓝色风格的配色方案
                }
            ]
        };

        // 使用配置项显示图表
        chart.setOption(options);
    })
    .catch(error => {
        console.error('加载数据时出错:', error);
    });