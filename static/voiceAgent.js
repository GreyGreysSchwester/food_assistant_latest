/**
 * VoiceAgent — 语音输入 Agent（Web Speech API）
 * 全局命名空间: window.DX
 */
window.DX = window.DX || {};

(function(DX) {
  'use strict';

  function VoiceAgent() {
    this._recognition = null;
    this._isRecording = false;
    this._transcript = '';
    this._supported = this._checkSupport();
    this._callbacks = { onResult: null, onError: null, onEnd: null };
  }

  VoiceAgent.prototype._checkSupport = function() {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  };

  VoiceAgent.prototype.isSupported = function() {
    return this._supported;
  };

  VoiceAgent.prototype.isRecording = function() {
    return this._isRecording;
  };

  VoiceAgent.prototype.on = function(event, fn) {
    if (event in this._callbacks) this._callbacks[event] = fn;
    return this;
  };

  VoiceAgent.prototype.start = function() {
    var self = this;
    return new Promise(function(resolve, reject) {
      if (!self._supported) {
        var err = '当前浏览器不支持语音识别，请使用 Chrome 或 Edge';
        if (self._callbacks.onError) self._callbacks.onError(err);
        reject(new Error(err));
        return;
      }
      if (self._isRecording) {
        reject(new Error('正在录音中'));
        return;
      }

      var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      self._recognition = new SpeechRecognition();
      self._recognition.lang = 'zh-CN';
      self._recognition.continuous = false;
      self._recognition.interimResults = true;
      self._recognition.maxAlternatives = 1;

      self._isRecording = true;
      self._transcript = '';


      self._recognition.onresult = function(event) {
        console.log('onresult结果:', event);
        var interimText = '';
        var finalText = '';

        for (var i = event.resultIndex; i < event.results.length; i++) {
          var result = event.results[i];
          if (result.isFinal) {
            finalText += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalText) self._transcript += finalText;
        var currentText = self._transcript + interimText;
        if (self._callbacks.onResult) self._callbacks.onResult(currentText, !!finalText);
      };

      self._recognition.onerror = function(event) {
        console.log('onerror错误:', event);
        self._isRecording = false;
        var errorMsg = '语音识别错误: ' + event.error;
        if (self._callbacks.onError) self._callbacks.onError(errorMsg);
        reject(new Error(errorMsg));
      };

      self._recognition.onend = function() {
        console.log('onend结束:', event);
        self._isRecording = false;
        if (self._callbacks.onEnd) self._callbacks.onEnd();
        resolve(self._transcript || '');
      };

      self._recognition.start();
    });
  };

  /*
  VoiceAgent.prototype.stop = function() {
    if (this._recognition && this._isRecording) {
      this._recognition.stop();
      this._isRecording = false;
    }
  };
  */

  VoiceAgent.prototype.stop = function() {
  if (this._recognition) {
    try {
      this._recognition.onend = null;
      this._recognition.stop();
      this._recognition.abort?.(); // ⭐关键
    } catch (e) {
      console.log(e);
    }

    this._isRecording = false;
  }
};

  VoiceAgent.prototype.abort = function() {
    if (this._recognition && this._isRecording) {
      this._recognition.abort();
      this._isRecording = false;
    }
  };

  VoiceAgent.prototype.getTranscript = function() {
    return this._transcript;
  };

  VoiceAgent.prototype.reset = function() {
    this._transcript = '';
  };

  var _instance = null;
  DX.getVoiceAgent = function() {
    if (!_instance) _instance = new VoiceAgent();
    return _instance;
  };

})(window.DX);
