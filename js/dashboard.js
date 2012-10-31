

var data = {
      charts:[
          {id:'ch1',title:'chart 1',data: {"yAxis":{"title":{"text":"People"}},"series":{"pointStart":1337040000000,"pointInterval":86400000,"data":[47,41,46,44,32,19,28,40,31,51,26,35,25,34,31,47,31,34,20,27,30,36,21,20,18,23,16,36]},"title":{"text":"People in the last 28 days"}}},
          {id:'ch2',title:'chart 2',data: {"yAxis":{"title":{"text":"People"}},"series":{"pointStart":1337040000000,"pointInterval":86400000,"data":[47,41,46,44,32,19,28,40,31,51,26,35,25,34,31,47,31,34,20,27,30,36,21,20,18,23,16,36]},"title":{"text":"People in the last 28 days"}}},
          {id:'ch3',title:'chart 3',data:{"yAxis":{"title":{"text":"People"}},"series":{"pointStart":1337040000000,"pointInterval":86400000,"data":[47,41,46,44,32,19,28,40,31,51,26,35,25,34,31,47,31,34,20,27,30,36,21,20,18,23,16,36]},"title":{"text":"People in the last 28 days"}}},
          {id:'ch4',title:'chart 4',data:{"yAxis":{"title":{"text":"People"}},"series":{"pointStart":1337040000000,"pointInterval":86400000,"data":[47,41,46,44,32,19,28,40,31,51,26,35,25,34,31,47,31,34,20,27,30,36,21,20,18,23,16,36]},"title":{"text":"People in the last 28 days"}}}
      ],
     gauges:[
         {id:'g1',title:'gauge 1',percentage:'30'},
         {id:'g2',title:'gauge 2',percentage:'60'},
         {id:'g3',title:'gauge 3',percentage:'92'},
         {id:'g4',title:'gauge 4',percentage:'40'},
         {id:'g2',title:'gauge 2',percentage:'60'},
         {id:'g3',title:'gauge 3',percentage:'92'},
         {id:'g4',title:'gauge 4',percentage:'40'},
         {id:'g2',title:'gauge 2',percentage:'60'},
         {id:'g3',title:'gauge 3',percentage:'92'},
         {id:'g4',title:'gauge 4',percentage:'40'},
         {id:'g2',title:'gauge 2',percentage:'60'},
         {id:'g3',title:'gauge 3',percentage:'92'},
         {id:'g4',title:'gauge 4',percentage:'40'}
         ]
    };

    //declaration of the actions PURE has to do
    var directive = {
        'div.chart':{
            'chart<-charts':{
                '.title':'chart.title'
                ,'.content':function(arg){    
                    var id = arg.item.id;
                    var div = '<div id="'+id+'"></div>';
                    return div;
               }
            }
         },
        'div.gauge':{
            'gauge<-gauges':{
                 '@id':'gauge.id'
                ,'.title':'gauge.title'
                ,'@class+':function(arg) {
                    var type = ' progress-';
                    var subtype = 'success';
                    subtype = (arg.item.percentage>50) ? 'warning':subtype;                    
                    subtype = (arg.item.percentage>90) ? 'danger':subtype;
                    return type+subtype;
                    
                }
                ,'.progress':function(arg){    
                    var pg = arg.item.percentage;
                    var div = '<div class="bar" style="width: '+pg+'%;"><span class="legend">'+pg+'%</span></div>';
                    return div;
               }
            }
        }
    };


    // note the use of render instead of autoRender
    $('div.dashboard').render(data, directive);



function chartOptions(data,into) {
        options = {
          chart:{"type":"spline", "renderTo":into, "zoomType":"x"},
          title:{"text":data.title.text, "style":{"color":"#666666"}},
          
          xAxis:{"type":"datetime", "maxZoom":604800000, "labels":{"enabled":true, "align":"center", "rotation":0, "x":1, "style":{"color":"#666666"}, "y":18}},
          yAxis:{"min":0, "title":{"text":data.yAxis.title.text, "style":{"color":"#666666"}}, "allowDecimals":false},
          tooltip:{"enabled":true, crosshairs: true},
          credits:{"enabled":false},
          series:[
            {data:data.series.data, "pointStart":data.series.pointStart, "pointInterval":data.series.pointInterval, name:data.yAxis.title.text}
          ]};
        return options;
    }

var charts = data['charts'];

jQuery.each(charts, function(i, val) {
    var id = val.id;
    var conf = val.data;
    new Highcharts.Chart(chartOptions(conf, id));
});


var slider = new Swipe(document.getElementById('slider'));
