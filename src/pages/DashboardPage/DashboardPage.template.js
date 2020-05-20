export function getHTML(info) {
  return `
    <header class="dashboard__header">
      <h1 class="dashboard__title">Excel Dashboard</h1>
      <div class="dashboard__toolbar">
        <a class="dashboard-btn" href="#excel/${getTableId()}"
          ><span class="dashboard-btn__content">+</span></a
        >
      </div>
    </header>
    <main class="dashboard__db">
      ${
        info.length > 0
          ? getTable(info)
          : `<p class="dashboard__no-data-msg">
              Вы еще не создали ни одной таблицы
            </p>`
      }
    </main>
  `
}

function getTable(info) {
  return `
    <div class="db">
      <div class="db__header">
        <span>Название таблицы</span>
        <span>Дата открытия</span>
      </div>
      ${getData(info)}
    </div>
  `
}

function getData(info) {
  return `
    ${info
      .map(
        ({ tableId, tableName, tableDate }) => `
        <a
          href="/#excel/${tableId}"
          class="db__row"
        >
          <span>${tableName}</span>
          <span>
            ${new Date(tableDate).toLocaleDateString()}
            ${new Date(tableDate).toLocaleTimeString()}
          </span>
        </a>
      `
      )
      .join('')}
  `
}

function getTableId() {
  return new Date().getTime().toString()
}
