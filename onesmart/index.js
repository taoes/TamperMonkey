    // ==UserScript==
// @name         精锐教育评课辅助插件
// @namespace    http://tampermonkey.net/
// @version      0.1beta
// @description  精锐教育评课辅助插件
// @author       燕归来兮
// @match        http://guanjia.onesmart.org:990/*
// @grant        none
// ==/UserScript==
;(function () {
  'use strict'
  // 发现手动点击按钮，则自动触发
  let indexButton = document.getElementById('showCanlender');
  if (indexButton != undefined) {
    indexButton.click()
  } else {
    console.warn("暂未发现按钮跳过点击按钮操作")
  }
  // 移除广告层
  let paras = document.getElementsByClassName('ad_mask');
  for (let i = 0; i < paras.length; i++) {
    if (paras[i] != null) {
      paras[i].parentNode.removeChild(paras[i])
    }
  }
  // 判断是否需要添加按钮
  let url = window.location.href;
  if (url.indexOf("Lessons/AddLessonAppraise") !== -1 || url.indexOf("/LessonWorks/ErrorCollection/CollectError.aspx") !== -1) {
    let button = document.createElement("input");
    setButtonStyle('1. 随机选择错题', button, "150px");
    button.addEventListener('click', getItemList);
    let submit = document.createElement("input");
    setButtonStyle('2. 提交本页信息', submit, "200px");
    submit.addEventListener('click', submitAnswser);
    let statButton = document.createElement("input");
    setButtonStyle('3. 星级评价填充', statButton, "250px");
    statButton.addEventListener('click', statFunction);
    let userGuide = document.createElement("input");
    setButtonStyle('4. 使用说明文件', userGuide, "300px");
    userGuide.addEventListener('click', userGuideFunction);
  }
})();
// 生成随机整数 [start,end)
function getRandom1(start, end) {
  var length = end - start + 1;
  return parseInt(Math.random() * (length) + start);
}
function getItemList() {
    // 判断当前的题目选项卡
    let divs = $(".left-content div[id^=JKDiv_]");
    let selectDiv = undefined;
    for (let i=0;i<divs.length;i++){
        if('none' != divs[i].style.display){
            selectDiv = divs[i];
        }
    }

    if(selectDiv == undefined){
        window.alert("未找到选中的标签页")
    }

  // 尝试寻找评分项目
  let itemList = selectDiv.getElementsByClassName('listitem');
  if (itemList === undefined || itemList.length === 0) {
    window.alert("检测错误,本页面未发现题目列表");
    return;
  }
  // 最大题目索引
  let maxQuestionesIndex = itemList.length;
  // 随机生成错题个数
  let mistakeRandomCount = getRandom1(1, 3);
  // 生成错题的序号
  let arrayIndex = [];
  for (let i = 0; i < 2;) {
    let randomCount = parseInt(Math.random() * (0, maxQuestionesIndex));
    if (arrayIndex.indexOf(randomCount) != -1) {
      continue;
    }
    arrayIndex.push(randomCount + 1);
    i++;
  }
  // 将制定错题选中错误
  window.alert("随机错题已生成,本次随机错误题号:" + arrayIndex);
  arrayIndex.forEach(index => {
    // 获取错题HTML
    let mistake = itemList[index - 1].getElementsByClassName("wrong")[0];
    mistake.click();
    // 获取错误原因
    let wrongReasonSelect = mistake.getElementsByClassName('wrongReason')[0];
    var opts = wrongReasonSelect.getElementsByTagName("option");
    opts[getRandom1(2,3)].selected = true;
    // 随机选择学生答案
    let studentAnswerSelect = mistake.getElementsByClassName(
        'studentAnswer')[0];
    opts = studentAnswerSelect.getElementsByTagName("option");
    opts[getRandoml(0,4)].selected = true;
  });
}
// 调用提交按钮
function submitAnswser() {
  let submitButton = document.getElementById('a_lastSave');
  if (submitButton != undefined) {
    submitButton.click();
  } else {
    window.alert("暂未发现提交按钮，无法提交")
  }
}
// 设置按钮样式
function setButtonStyle(value, button, top) {
  button.setAttribute("type", "button");
  button.setAttribute("value", value);
  // 设置样式
  button.style.align = "center";
  button.style.marginLeft = "80px";
  button.style.marginBottom = "10px";
  button.style.background = "#536dfe";
  button.style.border = "0px solid #FFFFFF";//52
  button.style.color = "white";
  // 设置内边距
  button.style.padding = "10px";
  button.style.borderRadius = "9px";
  // 设置字体
  button.style.fontFamily = 'sans-serif';
  // 位置定位
  button.style.position = "fixed";
  button.style.top = top;
  button.style.left = "0px";
  document.getElementById('header').appendChild(button);
}
// 星级评价事件
function statFunction() {
  let statElement = document.getElementsByClassName("five-stars");
  for (let i = 0; i < statElement.length; i++) {
    statElement[i].click();
  }
  // 课堂内容掌握情况
  let scoreRadios = document.getElementsByClassName("scoreRadio");
  for (let i = 0; i < scoreRadios.length; i++) {
    let scoreRadio = scoreRadios[i];
    if ('1' === scoreRadio.getAttribute('value')) {
      scoreRadio.click();
    }
  }
}
// 使用说明文件
function userGuideFunction() {
  alert("暂未实现")
}

