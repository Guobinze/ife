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

    var data = getCheckData(localData());
    createTable(data);

    lineChart.setData(data);
    lineChart.drawMany();
}

productCheck.onclick = function (e) {
    checkClick(e);

    var data = getCheckData(localData());
    createTable(data);

    lineChart.setData(data);
    lineChart.drawMany();
}
