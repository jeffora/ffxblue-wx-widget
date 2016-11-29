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
  return `// TODO: Generate code for widget: ${widget.title} (${widget.units} / ${widget.wind})`;
}

function createWidget(opts) {
  let options = opts || {};

  let wind = Boolean(opts.showWind);
  let units = opts.units;
  let title = opts.title || 'Missing Title';

  if (['metric', 'imperial'].indexOf(units) < 0) {
    units = 'metric';
  }

  let widget = {
    title: title,
    units: units,
    wind: wind,
  }

  widget.code = getCode(widget);

  let widgets = getWidgets();
  widgets.unshift(widget);
  saveWidgets(widgets);

  return widget;
}
