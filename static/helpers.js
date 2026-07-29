/**
 * 通用工具函数
 * 全局命名空间: window.DX
 */
window.DX = window.DX || {};

(function(DX) {
  'use strict';

  /** DOM 选择器简写 */
  DX.$ = function(selector, context) {
    return (context || document).querySelector(selector);
  };

  DX.$$ = function(selector, context) {
    return [].slice.call((context || document).querySelectorAll(selector));
  };

  /** 安全设置元素文本 */
  DX.setText = function(el, text) {
    if (el) el.textContent = text;
  };

  /** 安全设置元素 HTML */
  DX.setHTML = function(el, html) {
    if (el) el.innerHTML = html;
  };

  /** 切换元素可见性 */
  DX.toggleVisible = function(el, show) {
    if (!el) return;
    el.style.display = show ? '' : 'none';
  };

  /** 类名操作 */
  DX.addClass = function(el, cls) {
    if (el) el.classList.add(cls);
  };

  DX.removeClass = function(el, cls) {
    if (el) el.classList.remove(cls);
  };

  DX.toggleClass = function(el, cls, force) {
    if (el) el.classList.toggle(cls, force);
  };

  /** 延迟函数 */
  DX.sleep = function(ms) {
    return new Promise(function(resolve) { setTimeout(resolve, ms); });
  };

  /** 生成唯一 ID */
  DX.uid = function() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  };

})(window.DX);
