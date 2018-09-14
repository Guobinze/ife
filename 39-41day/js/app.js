// select变更渲染表格
region.onchange = function() {
    var data = getSelectData(localData());
    createTable(data);
}

product.onchange = function () {
    var data = getSelectData(localData());
    createTable(data);
}

// checkbox点击则渲染表格
regionCheck.onclick = function (e) {
    checkClick(e);

    setHistory();

    var data = getCheckData(localData());
    createTable(data);

    lineChart.setData(data);
    lineChart.drawMany();
}

productCheck.onclick = function (e) {
    checkClick(e);

    setHistory();

    var data = getCheckData(localData());
    createTable(data);

    lineChart.setData(data);
    lineChart.drawMany();
}

// 当页面刷新时获取location.hash并渲染
getHash();