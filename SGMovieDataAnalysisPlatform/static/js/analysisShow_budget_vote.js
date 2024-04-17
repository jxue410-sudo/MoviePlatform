// 预算与评分关系图 -xyt

var chartDom = document.getElementById('chart_budgetVote');
var myChart = echarts.init(chartDom);
var option;

function processData(data) {
  return data.map(function (item) {
    return {
      value: [parseInt(item[1] / 1000000), parseFloat(item[2])],
      name: item[0]
    };
  });
}

fetch('../static/json/budget_vote.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(jsonData) {
    var formattedData = processData(jsonData);


    option = {
      title: {
        text: '预算与评分的关系',
        left: 'center',
      },
      xAxis: {
        type: 'value',
        name: '预算（百万美元）',
        nameLocation: 'middle',
        nameGap: 30,
        min: 0,
        max: 300,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        name: '评分',
        min: 2,
        max: 10,
        splitLine: {
          show: false
        }
      },
      series: [
        {
          name: '预算 vs 评分',
          type: 'scatter',
          symbolSize: 8,
          data: formattedData,
          emphasis: {
            focus: 'series'
          },
          itemStyle: {
            color: 'rgba(32,154,253,0.5)',
            shadowBlur: 7,
            shadowColor: 'rgba(33,56,227,0.5)',
            shadowOffsetY: 0
          }
        }
      ]
    };

    // Use the configuration and data specified to show the chart.
    myChart.setOption(option);

     // 浏览器缩放时，图表也等比例缩放
	  window.addEventListener("resize", function () {
		  // 让我们的图表调用 resize这个方法
		  myChart.resize();
	  });
  })
  .catch(function(error) {
    console.error('Error fetching or processing data:', error);
  });


