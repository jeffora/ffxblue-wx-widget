function renderWidget(widget, target) {
  let container = document.createElement('div');
  container.className = 'panel panel-default';

  let header = document.createElement('div');
  header.className = 'panel-heading';
  header.innerText = widget.title;

  let body = document.createElement('div');
  body.className = 'panel-body';

  let bodyText = document.createElement('p');
  bodyText.innerText = `Units: ${widget.units}\nWind: ${Boolean(widget.wind)}`;

  let bodyCode = document.createElement('pre');
  bodyCode.innerText = widget.code;

  body.appendChild(bodyText);
  body.appendChild(bodyCode);

  container.appendChild(header);
  container.appendChild(body);

  target.insertBefore(container, target.firstChild);
}

function renderAllWidgets(target) {
  // normally reverse would be unwise due to in-place editing
  // but getWidgets returns a new reference array based on json
  // in local storage
  getWidgets()
    .reverse()
    .forEach(w => renderWidget(w, target));
}

function onCreateWidget(e) {
  let title = document.getElementById('titleInput').value;
  let units = document.getElementById('unitsInput').value;
  let showWind = document.getElementById('windInput').checked;

  let widget = createWidget({
    title: title,
    units: units,
    showWind: showWind,
  });

  renderWidget(widget, document.getElementById('widgetsPanel'));

  e.preventDefault();
  return false;
}

function setup() {
  let btn = document.getElementById('btnCreateWidget');

  btn.addEventListener('click', onCreateWidget);
  renderAllWidgets(document.getElementById('widgetsPanel'));
}