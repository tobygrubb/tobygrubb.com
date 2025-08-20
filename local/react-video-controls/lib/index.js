import React, { useContext, useRef, useEffect, createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useVideo } from 'react-use';
import styled from 'styled-components';
import Hammer from 'hammerjs';
import { VideoCtx as VideoCtx$1 } from '..';
import screenfull from 'screenfull';
import TimeFormat from 'hh-mm-ss';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }

  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  display: block;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral([""]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}
var Wrapper = styled.div(_templateObject());
var Video = styled.video(_templateObject2());
var Styled = {
  Video: Video,
  Wrapper: Wrapper
};

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  background: black;\n  height: 10px;\n  width: 100%;\n\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2$1() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  background: rgba(0, 0, 0, 0.15);\n  overflow: hidden;\n  cursor: pointer;\n"]);

  _templateObject2$1 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject$1() {
  var data = _taggedTemplateLiteral(["\n  background: blue;\n  width: 100%;\n  appearance: none;\n  outline: none;\n  height: 10px;\n\n  &::-webkit-slider-thumb {\n    opacity: 0.5;\n    height: 100%;\n  }\n"]);

  _templateObject$1 = function _templateObject() {
    return data;
  };

  return data;
}
var Range = styled.input(_templateObject$1());
var Bar = styled.div(_templateObject2$1());
var Progress = styled.div.attrs(function (props) {
  return {
    style: {
      width: "".concat(props.percent * 100, "%")
    }
  };
})(_templateObject3(), ''
/* transition: ${props => (!props.dragging ? '250ms transform linear' : '0ms')}; */
);
var Styled$1 = {
  Range: Range,
  Bar: Bar,
  Progress: Progress
};

function getValidPercent(num) {
  if (num > 1) return 1;
  if (num < 0) return 0;
  return num;
}

function useControls() {
  var _useContext = useContext(MemoizedCtx),
      duration = _useContext.duration,
      videoRef = _useContext.videoRef,
      setSeeking = _useContext.setSeeking;

  var parentRef = useRef();
  var childRef = useRef();
  var prevPlaying = useRef(false);
  useEffect(function () {
    var $video = videoRef.current;
    var $wrapper = parentRef.current;
    var $bar = childRef.current;
    var hammer = new Hammer($wrapper);

    function DOMUpdate(time, percent) {
      $bar.style.width = "".concat(percent * 100, "%");
      $video.currentTime = time;
    }

    function onPan(e) {
      var _$wrapper$getBounding = $wrapper.getBoundingClientRect(),
          left = _$wrapper$getBounding.left,
          width = _$wrapper$getBounding.width;

      var percent = getValidPercent((e.srcEvent.clientX - left) / width);
      var time = duration * percent;
      DOMUpdate(time, percent);
    }

    function onPanEnd() {
      if (prevPlaying.current === true) $video.play();
      setSeeking(false);
    }

    function onPanStart() {
      prevPlaying.current = !$video.paused;
      $video.pause();
      setSeeking(true);
    }

    hammer.on('pan', onPan);
    hammer.on('tap', onPan);
    hammer.on('panend', onPanEnd);
    hammer.on('panstart', onPanStart);
    return function () {
      hammer.off('pan');
      hammer.off('tap');
      hammer.off('panend');
      hammer.off('panstart');
    };
  }, [duration, parentRef, setSeeking, videoRef]);
  return {
    parentRef: parentRef,
    childRef: childRef
  };
}

var SeekBarCtx = createContext();
var MemoizedCtx = createContext();

function ContextMemoizer(props) {
  var _useContext = useContext(VideoCtx),
      controls = _useContext.controls,
      state = _useContext.state,
      ref = _useContext.ref;

  return useMemo(function () {
    return React.createElement(MemoizedCtx.Provider, {
      value: {
        videoRef: ref,
        setSeeking: controls.setSeeking,
        duration: state.duration
      }
    }, React.createElement(SeekBarInner, props));
  }, [controls.setSeeking, props, ref, state.duration]);
}

function SeekBarInner(_ref) {
  var children = _ref.children,
      className = _ref.className;

  var _useControls = useControls(),
      childRef = _useControls.childRef,
      parentRef = _useControls.parentRef;

  return React.createElement(Styled$1.Bar, {
    ref: parentRef,
    className: className
  }, React.createElement(SeekBarCtx.Provider, {
    value: {
      childRef: childRef
    }
  }, children || React.createElement(Progress$1, null)));
}

function Progress$1(_ref2) {
  var className = _ref2.className;

  var _useContext2 = useContext(SeekBarCtx),
      childRef = _useContext2.childRef;

  var _useContext3 = useContext(VideoCtx),
      state = _useContext3.state;

  var playedPercent = state.time / state.duration || 0;
  return React.createElement(Styled$1.Progress, {
    className: className,
    dragging: state.seeking,
    percent: playedPercent,
    ref: childRef
  });
} // SeekBar.propTypes = {}


var SeekBar = ContextMemoizer;
SeekBar.Progress = Progress$1;

function _templateObject$2() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  border: none;\n  outline: none;\n  margin: 0;\n  padding: 0;\n  width: auto;\n  overflow: visible;\n  text-align: left;\n\n  background: transparent;\n\n  /* inherit font & color from ancestor */\n  color: inherit;\n  font: inherit;\n\n  line-height: normal;\n\n  /* Corrects font smoothing for webkit */\n  -webkit-font-smoothing: inherit;\n  -moz-osx-font-smoothing: inherit;\n\n  -webkit-appearance: none;\n"]);

  _templateObject$2 = function _templateObject() {
    return data;
  };

  return data;
}
var Button = styled.button(_templateObject$2());
var Styled$2 = {
  Button: Button
};

function Play(props) {
  var _useContext = useContext(VideoCtx$1),
      controls = _useContext.controls;

  return React.createElement(Styled$2.Button, _extends({
    onClick: controls.play
  }, props));
}
function Pause(props) {
  var _useContext2 = useContext(VideoCtx$1),
      controls = _useContext2.controls;

  return React.createElement(Styled$2.Button, _extends({
    onClick: controls.pause
  }, props));
}
function Mute(props) {
  var _useContext3 = useContext(VideoCtx$1),
      controls = _useContext3.controls;

  return React.createElement(Styled$2.Button, _extends({
    onClick: controls.mute
  }, props));
}
function Unmute(props) {
  var _useContext4 = useContext(VideoCtx$1),
      controls = _useContext4.controls;

  return React.createElement(Styled$2.Button, _extends({
    onClick: controls.unmute
  }, props));
}
function Fullscreen(props) {
  var _useContext5 = useContext(VideoCtx$1),
      controls = _useContext5.controls;

  return React.createElement(Styled$2.Button, _extends({
    onClick: function onClick() {
      return controls.fullScreen(props.playerRef && props.playerRef.current);
    }
  }, props));
}

function formatSecs(secs) {
  var rounded = Math.round(secs);
  var formatted = TimeFormat.fromS(rounded);
  return formatted;
}

function useContextSuppliment(ctxValue, wrapperRef) {
  var _ctxValue = _slicedToArray(ctxValue, 4),
      video = _ctxValue[0],
      state = _ctxValue[1],
      functions = _ctxValue[2],
      ref = _ctxValue[3];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      seeking = _useState2[0],
      setSeeking = _useState2[1];

  var togglePlay = state.isPlaying ? functions.pause : functions.play;

  function fullScreen() {
    if (ref.current && screenfull.enabled) {
      screenfull.toggle(wrapperRef.current || ref.current);
    }
  }

  return {
    state: _objectSpread2({}, state, {
      seeking: seeking,
      formatted: {
        duration: formatSecs(state.duration),
        time: formatSecs(state.time)
      }
    }),
    ref: ref,
    wrapperRef: wrapperRef,
    controls: _objectSpread2({}, functions, {
      togglePlay: togglePlay,
      fullScreen: fullScreen,
      setSeeking: setSeeking
    }),
    video: video
  };
}

var VideoCtx = createContext();

function VideoProvider(_ref) {
  var children = _ref.children,
      videoProps = _objectWithoutProperties(_ref, ["children"]);

  var wrapperRef = useRef();
  var playerData = useVideo(React.createElement(Styled.Video, videoProps));
  var ctxVal = useContextSuppliment(playerData, wrapperRef);
  return React.createElement(VideoCtx.Provider, {
    value: ctxVal
  }, children);
}

VideoProvider.propTypes = {
  src: PropTypes.string.isRequired
};

export default VideoProvider;
export { Fullscreen, Mute, Pause, Play, SeekBar, Unmute, VideoCtx };
