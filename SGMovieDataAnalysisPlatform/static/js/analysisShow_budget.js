// 预算分布图

// 读取JSON文件
fetch('../static/json/budget.json')
  .then(response => response.json())
  .then(data => {
    // 提取top10的数据
    const top10Data = data.slice(0, 10);

    // 提取预算和数量
    const budgets = top10Data.map(item => item.budget / 100000);
    const counts = top10Data.map(item => item.count);

    // 初始化echarts实例
    const myChart = echarts.init(document.getElementById('chart_budget'));

    // 配置项
    const option = {
		title: {
			text: '电影预算分布',
			left: 'center',
			textStyle: {
				fontSize: 16,
			}
		},
		tooltip: {},
		xAxis: {
			name: '预算（百万美元）',
			nameLocation: 'middle',
			nameGap: 30,
			data: budgets,
			axisLabel: {
				interval: 0,
				color: '#999'
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},

		yAxis: {
			name: '电影数量（部）',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				color: '#999'
			}
		},

		series: [
			{
				name: '电影数量',
				type: 'bar',
				showBackground: true,
				itemStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{offset: 0, color: '#83bff6'},
						{offset: 0.5, color: '#188df0'},
						{offset: 1, color: '#188df0'}
					])
				},
				emphasis: {
					itemStyle: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
							{offset: 0, color: '#2378f7'},
							{offset: 0.7, color: '#2378f7'},
							{offset: 1, color: '#83bff6'}
						])
					}
				},
				data: counts,
				label: {
					show: true,
					position: 'top'
				}
			}
		]
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

