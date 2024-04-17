//各语言占比饼图
// 使用 fetch API 从 JSON 文件中获取数据
fetch('static/json/language.json')
    .then(response => response.json())
    .then(data => {
        // 解析数据
        const languages = data.map(item => item.language);
        const counts = data.map(item => item.count);

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('chart_Top10Language'));
var option = {
    title: {
        text: '所有电影中个语言所所占比例',
        left: 'center' // 标题居中显示
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            // roseType: 'angle',
            data:[
                {value:4485, name:'English'},
                {value:437, name:'Fran\u00e7ais'},
                {value:351, name:'Espa\u00f1ol'},
                {value:188, name:'Italiano'},
                {value:185, name:'P\u0443\u0441\u0441\u043a\u0438\u0439'},
                {value:107, name:'\u666e\u901a\u8bdd'},
                {value:97, name:'\u65e5\u672c\u8a9e'},
                {value:68,  name:'Portugu\u00eas'},
                {value:67,  name:'\u0627\u0644\u0639\u0631\u0628\u064a\u0629'}
            ]
        }
    ]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    })