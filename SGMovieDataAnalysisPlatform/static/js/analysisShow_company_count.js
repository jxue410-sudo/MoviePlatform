//这是公司电影产量和电影评分的散点图

// 使用 fetch API 从 JSON 文件中获取数据
fetch('static/json/movies_vote.json')
    .then(response => response.json())
    .then(data => {
        // 使用提供的数据
        const companiesData = [
            {"company": "Warner Bros.", "count": 319},
            {"company": "Universal Pictures", "count": 311},
            {"company": "Paramount Pictures", "count": 285},
            {"company": "Twentieth Century Fox Film Corporation", "count": 222},
            {"company": "Columbia Pictures", "count": 201},
            {"company": "New Line Cinema", "count": 165},
            {"company": "Metro-Goldwyn-Mayer (MGM)", "count": 122},
            {"company": "Touchstone Pictures", "count": 118},
            {"company": "Walt Disney Pictures", "count": 114},
            {"company": "Relativity Media", "count": 102}
        ];

        // 解析数据
        const companies = companiesData.map(item => item.company);
        const counts = companiesData.map(item => item.count);

        // 基于准备好的 dom，初始化 echarts 实例
        var myChart = echarts.init(document.getElementById('chart_CompanyCount'));

        // 配置图表
        var option = {
            title: {
                text: '生产电影最多的 10 大公司',
                left: 'center'
            },
            tooltip: {},
            xAxis: {
                data: companies,
                axisLabel: {
                    interval: 0, // 让所有的下标都显示
                    rotate: -30 // 如果下标文字过长，可以尝试旋转角度
                }
            },
            yAxis: {},
            series: [{
                name: '数量',
                type: 'bar',
                data: counts,
                itemStyle: {
                    normal: {
                        color: 'rgb(131,5,19)'
                    }
                }
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
