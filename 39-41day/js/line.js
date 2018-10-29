// 鼠标移动到元素上画相对应的柱状图和折线图
tableWrapper.onmouseover = function (e) {
    draw(e.target);
}

// 鼠标移出根据选项画多条折线图
tableWrapper.onmouseout = function () {
    var data = getCheckData(localData());
    
    lineChart.setData(data);
    lineChart.drawMany();
}

// 定义折线图
var lineChart = {
    // 定义数据
    data: new Array(),

    // 定义canvas宽高和布局方式
    width: 600,
    height: 250,
    display: "inline_block",

    // 定义轴的宽高和绘制区域
    axisX: 550,
    axisY: 200,
    topSpacer: 10,

    // 定义数据点的初始位置，半径，颜色和间隔
    circleX: 20,
    circleY: 0,
    radius: 2.5,
    color: {
        phone: ["#60acfc", "#4da0e4", "#5cb1e5"],
        laptop: ["#6db198", "#5bc49f", "#86ab6e"],
        sound: ["#d0b651", "#feb64d", "#bb7e59"]
    },
    spacer: 48,

    // 画单条折线图
    drawOne: function () {
        removeLineChart();

        if (this.data) {
            // 拿到折线图中的最大值Max
            var data = this.data;
            var max = 0;

            for (let i = 0; i < data.length; i++) {
                if (max - data[i] < 0) {
                    max = data[i];
                }
            }

            // 根据Max和Y轴高度，计算比例
            var proportion = this.axisY / max;

            // 画轴
            lineChartAxis();

            //画线
            drawLine(data,proportion, "#60acfc");
        }
    },

    // 画多条折线图
    drawMany: function () {
        removeLineChart();

        if (this.data) {
            // 拿到折线图中的最大值Max
            var data = this.data;
            var max = 0;

            for (const key in data) {
                
                for (let i = 0; i < data[key].sale.length; i++) {
                    
                    if (max - data[key].sale[i] < 0) {
                        max = data[key].sale[i];
                    } 
                }
            }
            
            // 根据Max和Y轴高度，计算比例
            var proportion = this.axisY / max;

            // 画轴
            lineChartAxis();

            // 画线
            var phoneColor = 0,
                laptopColor = 0,
                soundColor = 0;

            for (let i = 0; i < data.length; i++) {

                if (data[i].product == "手机") {
                    drawLine(data[i].sale, proportion, this.color.phone[phoneColor]);
                    phoneColor ++;
                }

                if (data[i].product == "笔记本") {
                    drawLine(data[i].sale, proportion, this.color.laptop[laptopColor]);
                    laptopColor ++;
                }

                if (data[i].product == "智能音箱") {
                    drawLine(data[i].sale, proportion, this.color.sound[soundColor]);
                    soundColor ++;
                }
            }
        }
    },

    // 设置数据
    setData: function (data) {
        this.data = data;
    }
};

// 画轴
function lineChartAxis() {
    var wrapper = document.getElementById("draw-wrapper");
    var canvas = document.createElement("canvas");

    canvas.width = lineChart.width;
    canvas.height = lineChart.height;
    canvas.style.display = lineChart.display;

    var ctx = canvas.getContext("2d");

    // 定义轴线的位置和绘制区域
    var axisX = lineChart.axisX,
        axisY = lineChart.axisY;
        topSpacer = lineChart.topSpacer;

    // 绘制横轴及纵轴
    ctx.beginPath();
    ctx.moveTo(lineChart.circleX, topSpacer);
    ctx.lineTo(lineChart.circleX, axisY + topSpacer);
    ctx.lineTo(axisX + lineChart.circleX, axisY + topSpacer);
    ctx.stroke();

    wrapper.appendChild(canvas);
}

// 画线
function drawLine(data, proportion, color) {
    // 获取canvas
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");

    // 获取轴线数据
    var axisY = lineChart.axisY;

    // 获取topspacer
    var topSpacer = lineChart.topSpacer;

    // 获取数据点的位置,半径，定义startAngle和endAngle 
    var circleX = lineChart.circleX,
        circleY = lineChart.circleY,
        radius = lineChart.radius,
        startAngle = 0,
        endAngle = circleX,
        lineX = circleX,
        lineY = axisY + topSpacer - (data[0] * proportion);

    // 遍历数据,计算将要绘制数据点的位置，然后绘制
    for (let i = 0; i < data.length; i++) {
        circleY = axisY + topSpacer - (data[i] * proportion);

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(circleX, circleY, radius, startAngle, endAngle, false);
        ctx.fill();

        // 如果不是第一个数据点，则绘制这个数据点和上一个数据点的连线
        if (data[i] != 0) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(lineX, lineY);
            ctx.lineTo(circleX, circleY);
            ctx.stroke();
        }

        lineX = circleX;
        lineY = circleY;
        circleX += lineChart.spacer;
    }
}

// 删除折线图
function removeLineChart() {
    var canvas = document.querySelector("#draw-wrapper > canvas");

    if (canvas) {
        canvas.remove();
    }
}

// 画图函数
function draw(node) {
    var tr = node.parentNode,
        temp = new Array();

    // 如果tr的元素为内容区则渲染，主要是为了防止移动到thead导致渲染错误
    if (tr.parentNode.tagName.toLowerCase() == "tbody") {
        // 这一步是为了区分有没有rowspan
        if (tr.childNodes.length != 13) {
            for (let i = 2; i < tr.childNodes.length; i++) {
                var number = parseInt(tr.childNodes[i].innerText);
                temp.push(number);
            }
        }else {
            for (let i = 1; i < tr.childNodes.length; i++) {
                var number = parseInt(tr.childNodes[i].innerText);
                temp.push(number);
            }
        }

        // 设置数据然后绘制图形
        histogram.setData(temp);
        histogram.drawOne();

        lineChart.setData(temp);
        lineChart.drawOne();
    }
}