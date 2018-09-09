window.onload =  createTable(getCheckData());

// select变更渲染表格
region.onchange = function() {
    createTable(getSelectData());
}

product.onchange = function () {
    createTable(getSelectData());
}

// checkbox点击则渲染表格
regionCheck.onclick = function (e) {
    checkClick(e);
    createTable(getCheckData());

    lineChart.setData(getCheckData());
    lineChart.drawMany();
}

productCheck.onclick = function (e) {
    checkClick(e);
    createTable(getCheckData());

    lineChart.setData(getCheckData());
    lineChart.drawMany();
}
