// checkbox点击则渲染表格
regionCheck.onclick = function (e) {
    checkClick(e);

    setHistory();

    var data = getCheckData(localData());    
    createTable(data);

    if (!data) {
        removeHistogram();
    }

    lineChart.setData(data);
    lineChart.drawMany();
}

productCheck.onclick = function (e) {
    checkClick(e);

    setHistory();

    var data = getCheckData(localData());
    createTable(data);

    if (!data) {
        removeHistogram();
    }

    lineChart.setData(data);
    lineChart.drawMany();
}

// 当页面刷新时获取history并渲染
getState();