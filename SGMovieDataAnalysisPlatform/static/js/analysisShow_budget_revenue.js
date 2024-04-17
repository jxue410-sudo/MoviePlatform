// 预算与票房关系图

// 从 JSON 文件中获取数据并绘制散点图
fetch('../static/json/budget_revenue.json')
  .then(response => response.json())
  .then(data => {
    // 提取电影名称、预算和票房数据
    const movies = data.map(item => item[0]);
    const budgets = data.map(item => parseInt(item[1]) / 1000000);
    const boxOffices = data.map(item => parseInt(item[2]) / 1000000);

    // 初始化echarts实例
    const myChart = echarts.init(document.getElementById('chart_budgetRevenue'));

    // 配置项
    const option = {
        title: {
            text: '电影预算和票房关系散点图',
            left: 'center',
            textStyle: {
                fontSize: 16,
            }
        },
        tooltip: {
            formatter: function (params) {
                return '电影名称：' + params.name + '<br>预算：$' + params.value[0] + 'M<br>票房：$' + params.value[1] + 'M';
            }
        },
        xAxis: {
            type: 'value',
            name: '预算（百万美元）',
            nameLocation: 'middle',
            nameGap: 30,
            min: 0,
            max: 300
        },
        yAxis: {
            type: 'value',
            name: '票房（百万美元）',
            nameGap: 30,
            min: 0,
            max: 2000
        },
        series: [{
            type: 'scatter',
            symbolSize: 10,
            data: budgets.map((budget, index) => [budget, boxOffices[index]]),
            label: {
                emphasis: {
                    show: true,
                    formatter: function (params) {
                        return params.data[2];
                    },
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(59,8,131,0.5)'
                }
            }
        }]
    };

    // 使用刚指定的配置项和数据显示图表
    myChart.setOption(option);

    // 浏览器缩放时，图表也等比例缩放
      window.addEventListener("resize", function () {
          // 让我们的图表调用 resize这个方法
          myChart.resize();
      });

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
