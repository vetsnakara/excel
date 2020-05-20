export function getTopbar(tableName) {
  return `
    <input type="text" class="input" value="${tableName}" />
    <div class="topbar__buttons">
      <button
        data-type="button"
        data-role="remove"
        class="button topbar__button"
      >
        <span class="material-icons">delete</span>
      </button>
      <button
        data-type="button"
        data-role="exit"
        class="button topbar__button"
      >
        <span class="material-icons">exit_to_app</span>
      </button>
    </div>
  `
}
