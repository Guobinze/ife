var histogram = {
    // 定义数据
    data: new Array(),

    // 定义svg宽高
    width: 600,
    height: 300,

    // 定义轴的宽高和绘制区域
    axisX: 550,
    axisY: 200,
    startX: 20,
    startY: 260,

    // 定义柱宽，颜色和间隔
    columnW: 30,
    color: {
        phone: ["#60acfc", "#4da0e4", "#5cb1e5"],
        laptop: ["#6db198", "#5bc49f", "#86ab6e"],
        sound: ["#d0b651", "#feb64d", "#bb7e59"]
    },
    spacer: 15,

    // 画单条柱状图
    drawOne: function () {
        removeHistogram();

        var svgWrapper = document.getElementById("draw-wrapper");
        var svgStart = "<svg width = " + "'" + this.width + "'" + "height = " + "'" + this.height + "'" + "version = '1.1' xmlns = 'http://www.w3.org/2000/svg'>";
        var svgEnd = "</svg>";

        // 定义柱宽和间隔
        var rectX = this.startX + this.spacer;
        this.columnW = 30;

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

        // 绘制横轴及纵轴
        var lineX = "<line x1 = " + this.startX + " y1 = " + this.startY + " x2 = " + (this.axisX + this.startX) + " y2 = " + this.startY + " style = 'stroke: black; stroke-width : 2' />";
        var lineY = "<line x1 = " + this.startX + " y1 = " + (this.startY - 1) + " x2 = " + this.startX + " y2 = " + (this.startY - 1 - this.axisY) + " style = 'stroke: black; stroke-width : 2' />";

        // 遍历数据,计算将要绘制柱子的高度和位置，然后绘制每一个柱子
        svgStart = svgStart + lineX + lineY;

        for (let i = 0; i < data.length; i++) {
            var rect = "<rect x = " + rectX + " y = " + (this.startY - 1 - data[i] * proportion) + " width = " + this.columnW + " height = " + (data[i] * proportion) + " style = 'fill:" + this.color.phone[0] + "' />";
            svgStart += rect;
            rectX = rectX + this.columnW + this.spacer;
        }

        svgWrapper.innerHTML = svgStart + svgEnd;
    },

    // 设置数据
    setData: function (data) {
        this.data = data;
    }
};

// 删除柱状图
function removeHistogram() {
    var svg = document.querySelector("svg");

    if (svg) {
        svg.remove();
    }
}