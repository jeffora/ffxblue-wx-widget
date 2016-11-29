const WX_STORAGE_KEY = 'wx_widget_store';

function getWidgets() {
  let widgets;

  try {
    let widgetsJson = window.localStorage.getItem(WX_STORAGE_KEY);
    widgets = JSON.parse(widgetsJson) || [];
  } catch (e) {
    widgets = [];
  }

  return widgets;
}

function saveWidgets(widgets) {
  let wxWidgets = widgets;
  if (!Array.isArray(wxWidgets)) {
    wxWidgets = [wxWidgets];
  }

  window.localStorage.setItem(WX_STORAGE_KEY, JSON.stringify(wxWidgets));
}

function getCode(widget) {
  return `<script type="text/javascript" src="${window.location.origin}/embed.js?title=${widget.title}&units=${widget.units}&wind=${widget.wind}&selector=${widget.selector}"></script>`;
}

function createWidget(opts) {
  let options = opts || {};

  let wind = Boolean(opts.showWind);
  let units = opts.units;
  let title = opts.title || 'Missing Title';
  let selector = opts.selector || 'wx-embed';

  if (['metric', 'imperial'].indexOf(units) < 0) {
    units = 'metric';
  }

  let widget = {
    title: title,
    units: units,
    wind: wind,
    selector: selector,
  }

  widget.code = getCode(widget);

  let widgets = getWidgets();
  widgets.unshift(widget);
  saveWidgets(widgets);

  return widget;
}
